module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    num_reviews: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    count_in_stock: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  })
  return Product
}
