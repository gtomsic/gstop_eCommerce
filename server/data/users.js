const bcrypt = require("bcryptjs")
const { v4: uuid } = require("uuid")

const users = [
  {
    id: uuid(),
    first_name: "Admin",
    last_name: "User",
    email: "admin@example.com",
    password: bcrypt.hashSync("password", 10),
    is_admin: true,
  },
  {
    id: uuid(),
    first_name: "John",
    last_name: "Do",
    email: "john@example.com",
    password: bcrypt.hashSync("password", 10),
  },
  {
    id: uuid(),
    first_name: "Jane",
    last_name: "Do",
    email: "jane@example.com",
    password: bcrypt.hashSync("password", 10),
  },
]

module.exports = users
