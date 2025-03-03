module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products", // Name of the products table
          key: "id", // Primary key of the products table
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Name of the users table
          key: "id", // Primary key of the users table
        },
      },
      image: { // New image field
        type: DataTypes.STRING,
        allowNull: true, // This can be null if you don't always want to store an image URL
      },
    },
    {
      timestamps: true, // Automatically create createdAt and updatedAt fields
    }
  );

  // Define relationships between Cart and other models
  Cart.associate = (models) => {
    // Relationship with Product
    Cart.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product", // Alias for the relationship
    });

    // Relationship with User
    Cart.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user", // Alias for the relationship
    });
  };

  return Cart;
};
