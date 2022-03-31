module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("Address", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  })
  return Address
}
