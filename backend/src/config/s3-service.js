require('dotenv').config()
const {
  S3Client,
  CreateBucketCommand,
  PutObjectCommand,
} = require('@aws-sdk/client-s3')
const { v4: uuidv4 } = require('uuid')

const s3Upload = async (req, files) => {
  const s3client = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION,
  })

  const params = files.map((file) => {
    const destination = req.path.split('/').pop()
    const filename = uuidv4() + '---' + file.originalname
    const key = destination + '/' + filename

    return {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
    }
  })

  return await Promise.all(
    params.map(async (param) => {
      const command = new PutObjectCommand(param)

      await s3client.send(command)
      return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${param.Key}`
    })
  )
}

module.exports = {
  s3Upload,
}
