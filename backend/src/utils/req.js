const filterNullUndefined = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key] !== null && obj[key] !== undefined) {
      acc[key] = obj[key]
    }
    return acc
  }, {})
}

module.exports = { filterNullUndefined }
