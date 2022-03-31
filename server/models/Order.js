module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    payment_mode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tax_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    shipping_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    items_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    total_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    is_paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    paid_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 0,
    },
    is_shipped: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_delivered: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    delivered_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 0,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  })
  return Order
}
