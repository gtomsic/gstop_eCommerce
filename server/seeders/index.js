require("dotenv").config();
const { v4: uuid } = require("uuid");
const db = require("../models");
const colors = require("colors");
const users = require("../data/users");
const products = require("../data/products");

const importData = async () => {
  try {
    await db.Order.destroy({ where: {} });
    await db.Product.destroy({ where: {} });
    await db.User.destroy({ where: {} });
    const createdUser = await db.User.bulkCreate(users);
    const user_id = createdUser[0].id;
    const sampleProducts = await products.map((product) => {
      return { ...product, user_id, id: uuid() };
    });
    console.log(sampleProducts);
    await db.Product.bulkCreate(sampleProducts);
    console.log("Data Imported! ".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await db.Order.destroy({ where: {} });
    await db.Product.destroy({ where: {} });
    await db.User.destroy({ where: {} });
    console.log("Data Destroy! ".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
