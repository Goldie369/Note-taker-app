//-- Adding a function uuid--//
//-- The function generates a random unique identifier using the UUID algorithm--//
//-- The function returns the resulting string and generates a random numbers--//

uuid = () => {
  var num = Math.floor((1 + Math.random()) * 0x10000)
  var hexString = num.toString(16)
  hexString = hexString.substring(1)
  return hexString
}

module.exports = uuid
