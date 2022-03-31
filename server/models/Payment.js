module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("Payment", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    payment_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
  return Payment;
};
