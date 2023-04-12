//-- Adding a module.exports = () => ... function that generates a random hexadecimal string--//
//--This function can be imported and used in other parts of the code--//

    uuid = () => {
      var num = Math.floor((1 + Math.random()) * 0x10000)
      num.toString(16)
      num.substring(1);
      return num
    }
    module.exports = uuid 