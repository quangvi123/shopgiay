const { where } = require("sequelize");
const { Order, OrderItem, Product } = require("../models");
const validStatuses = [
  "Chờ xác nhận",
  "Đã xác nhận",
  "Đang vận chuyển",
  "Đang giao hàng",
  "Đã giao",
  "Đã hoàn thành",
  "Đã hủy đơn",
];
const createOrder = async (data) => {
  console.log("dât order serivce", data);

  try {
    const order = await Order.create(data);
    return order;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
};
const getAllOrderNew = async () => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem, // Bao gồm OrderItem
          as: "orderItems", // Alias cho OrderItem
          include: [
            {
              model: Product, // Bao gồm Product liên kết với OrderItem
              as: "product", // Alias cho Product
            },
          ],
        },
      ],
      attributes: ['id', 'status', 'fullname', 'address']
    });

    return orders;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
};
const updateOrder = async (status, id) => {
  try {
    const order = Order.update({ status }, { where: { id } });
    return order;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
};
// Service cập nhật trạng thái đơn hàng
const updateOrderStatus = async (orderId, newStatus) => {
  try {
    // Kiểm tra trạng thái hợp lệ
    if (!validStatuses.includes(newStatus)) {
      throw new Error("Trạng thái không hợp lệ");
    }

    // Cập nhật trạng thái đơn hàng
    const [updatedRows] = await Order.update(
      { status: newStatus },
      {
        where: { id: orderId },
      }
    );

    // Kiểm tra xem có đơn hàng nào được cập nhật không
    if (updatedRows === 0) {
      throw new Error("Đơn hàng không tồn tại hoặc trạng thái không thay đổi");
    }

    return { message: "Cập nhật trạng thái thành công" };
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error(error.message || "Lỗi khi cập nhật trạng thái đơn hàng");
  }
};

const getOrders = async (userId) => {
  try {
    console.log('usseri serrvice', userId);
    
    const orders = await Order.findAll({
      where: { userId }, // Điều kiện lọc theo userId
      include: [
        {
          model: OrderItem, // Bao gồm OrderItem
          as: "orderItems", // Alias cho OrderItem
          include: [
            {
              model: Product, // Bao gồm Product liên kết với OrderItem
              as: "product", // Alias cho Product
            },
          ],
        },
      ],
      attributes: ['id', 'status', 'fullname', 'address', 'phone','totalPrice', 'createdAt']
    });
    console.log('order serivce', orders);
    
    return orders;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
};

module.exports = {
  createOrder,
  updateOrder,
  getOrders,
  getAllOrderNew,
  updateOrderStatus
};