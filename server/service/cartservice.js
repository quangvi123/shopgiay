const { Cart, Product, User } = require("../models");

async function getAllCarts(userId) {
  try {
    return await Cart.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "name", "price", "image"], // Thêm image1 vào để lấy ảnh sản phẩm
        },
      ],
    });
  } catch (error) {
    throw new Error("Lỗi khi lấy giỏ hàng: " + error.message);
  }
}

async function createCart({ userId, productId, quantity }) {
  try {
    const product = await Product.findByPk(productId);
    if (!product) throw new Error("Sản phẩm không tồn tại");

    const user = await User.findByPk(userId);
    if (!user) throw new Error("Người dùng không tồn tại");

    const cart = await Cart.create({
      userId,
      productId,
      quantity,
    });
    return cart;
  } catch (error) {
    throw new Error("Lỗi khi tạo giỏ hàng: " + error.message);
  }
}

async function getCartDetail(id) {
  try {
    const cart = await Cart.findByPk(id, {
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "name", "price", "image"], // Thêm image1 vào
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    });
    return cart;
  } catch (error) {
    throw new Error("Lỗi khi lấy chi tiết giỏ hàng: " + error.message);
  }
}

async function deleteCart(id) {
  try {
    const cart = await Cart.findByPk(id);
    if (!cart) throw new Error("Giỏ hàng không tồn tại");

    await cart.destroy();
    return true;
  } catch (error) {
    throw new Error("Lỗi khi xóa giỏ hàng: " + error.message);
  }
}

async function updateCart({ id, quantity }) {
  try {
    const cart = await Cart.findByPk(id);
    if (!cart) throw new Error("Giỏ hàng không tồn tại");

    cart.quantity = quantity;
    await cart.save();
    return cart;
  } catch (error) {
    throw new Error("Lỗi khi cập nhật giỏ hàng: " + error.message);
  }
}

module.exports = {
  getAllCarts,
  createCart,
  getCartDetail,
  deleteCart,
  updateCart,
};
