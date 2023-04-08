//-- Adding a module.exports = () => ... function that generates a random hexadecimal string--//
//--This function can be imported and used in other parts of the code--//
module.exports = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);