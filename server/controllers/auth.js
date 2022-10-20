const bcrypt = require('bcrypt')

const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const {username, password} = req.body

      let userFound = false


      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          userFound = true
          //we found a user with that username, now let's check the password
          bcrypt.compare(password, users[i].password, (error, match) => {
            if (match){
              res.status(200).send(users[i])
            }else {
              res.status(400).send('bad password')
            }
          })
        }
      }

      if (!userFound) {
        res.status(400).send('user not found')
      }

    },
    register: (req, res) => {
      const saltRounds = 10
      console.log('Registering User')

      bcrypt.hash(req.body.password, saltRounds, (error, hashPass) => {
        let newUser = {...req.body}
        newUser.password = hashPass
        users.push(newUser)
        res.status(200).send(req.body)
        console.log(users)
      })
    }
}