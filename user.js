// users.js

var db = require('db')

function generateUser () {
    
    var users = []
    
    for (var id = 0; id < 50; id++) {
      var firstName = db.users.firstName()
      var lastName = db.users.lastName()
      var bithday = db.users.birthday()
      var address = db.users.address()
      var postalCode = db.users.postalCode()
      var city = db.users.city()
      var telephon = db.users.city()
      var email = db.users.email()
      var secu = db.users.secu()
      
      users.push({
        "id": id,
        "inputFirstName": inputFirstName,
        "inputLastName": inputLastName,
        "inputBirthday" : inputBirthday,
        "inputAdress" : inputAdress,
        "inputpostalCode" : inputpostalCode,
        "inputCity" : inputCity,
        "inputTelephon" : inputTelephon,
        "inputEmail" : inputEmail,
        "inputNbSecu" : inputNbSecu
        
      })
    }
    
    return { "users": users }
  }
  
  module.exports = generateUsers;