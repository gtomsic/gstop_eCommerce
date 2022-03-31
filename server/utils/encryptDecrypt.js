const bcrypt = require("bcryptjs")

module.exports = {
  encrypt: (password) => {
    return bcrypt.hashSync(password, 10)
  },
  decrypt: (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
  },
}
