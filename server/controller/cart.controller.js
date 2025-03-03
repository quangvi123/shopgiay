const { resErrors, resData } = require("./common/common");
const { getAllCarts, createCart, deleteCart, updateCart, getCartDetail } = require("../service/cartService");
class ApiCartController {
  // Lấy tất cả giỏ hàng của người dùng
  static async index(req, res) {
    try {
      const userId = req.user.id; // Lấy id người dùng từ JWT
      const carts = await getAllCarts(userId); // Lấy tất cả giỏ hàng của người dùng
      let message = "Get data successfully";
      resData(res, 200, message, carts);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }

  // Lấy chi tiết giỏ hàng theo ID
  static async findById(req, res) {
    const { id } = req.params; // Lấy id từ params trong URL
    try {
      const cart = await getCartDetail(id); // Lấy chi tiết giỏ hàng theo id

      if (!cart) {
        return resErrors(res, 404, "Giỏ hàng không tồn tại");
      }

      let message = "Get cart detail successfully";
      resData(res, 200, message, cart);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  // Tạo mới giỏ hàng
  static async create(req, res) {
    try {
      const { productId, quantity } = req.body; // Lấy dữ liệu từ request body
      const userId = req.user.id; // Lấy id người dùng từ JWT
      const cart = await createCart({ userId, productId, quantity, image });
      let message = "Create cart successfully";
      resData(res, 200, message, cart);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  // Xóa giỏ hàng
  static async delete(req, res) {
    const { id } = req.params;
    try {
      await deleteCart(id); // Xóa giỏ hàng theo id
      let message = "Delete cart successfully";
      resData(res, 200, message);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }

  // Cập nhật giỏ hàng
  static async update(req, res) {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
      await updateCart({ id, quantity });
      let message = "Update cart successfully";
      resData(res, 200, message);
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
}

module.exports = ApiCartController;
