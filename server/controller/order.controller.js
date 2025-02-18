const { where } = require("sequelize");
const { resErrors, resData } = require("./common/common");
const db = require("../models/index");
const {
  updateOrderStatus,
  createOrder,
  getOrders,
  getAllOrderNew,
} = require("../service/orderService");

class ApiOrderController {
  static async index(req, res) {
    try {
      const { userid } = req.params;
      console.log("userid controller", userid);

      let orders = await getOrders(userid);

      res.json({ orders });
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async index1(req, res) {
    try {
      let orders = await getAllOrderNew();

      res.json({ orders });
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async findById(req, res) {
    const { id } = req.params;
  }

  static async create(req, res) {
    const data = req.body;

    try {
      const userId = Number(data.body.userId);
      const address = data.body.address;
      const totalPrice = Number(data.body.totalPrice);
      const fullname = data.body.fullname;
      const phone = data.body.phone;
      const newData = { userId, address, totalPrice, fullname, phone };

      const order = await createOrder(newData);
      let message = "Get data successfully";
      const status = 200;
      return res.json({ status, message, order });
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
  static async updateStatus(req, res) {
    const { orderId, newStatus } = req.body; // Lấy orderId và newStatus từ body

    try {
      // Gọi service để cập nhật trạng thái đơn hàng
      const result = await updateOrderStatus(orderId, newStatus);

      // Trả về thông báo thành công
      res.json({ status: 200, message: result.message });
    } catch (error) {
      resErrors(res, 500, error.message);
    }
  }
}
module.exports = ApiOrderController;