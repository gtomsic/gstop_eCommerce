module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    comment: { type: DataTypes.STRING, allowNull: false },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
  return Review;
};
