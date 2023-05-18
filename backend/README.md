# Eventiver Backend

- local: http://localhost:5003
- production: http://16.171.45.211

---

- documentation: https://documenter.getpostman.com/view/21408670/2s93kxb5aE
- DEMO video: https://drive.google.com/drive/folders/1B1iF302M-Lbinx2iTXG2SPM7fusV_zwa?usp=share_link

---

### Deployed VIA:

- Files Manager: **AWS S3**
- Server: **AWS EC2**
- Database: **AWS RDS**

---

## HOW TO:

### Deploy:

```
rsync -e "ssh -i ./eventiver.pem" -av --exclude={'dist','node_modules','eventiver.pem'} ./ ubuntu@16.171.45.211:/home/ubuntu/Code/eventiver
```

### Connect to Ubuntu:

```
ssh ubuntu@16.171.45.211 -i ./eventiver.pem
```

### Run (on Ubuntu):

```
cd Code/eventiver
npm install
npm run build
npm start
```

### Run (local):

```
npm run dev
```

---

###### REMEMBER:

- eventiver.pem
- .env