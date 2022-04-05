import { INewOrder, IOrder, IState } from '../types/orderTypes';

const Orders = require('../models/orders');
const Users = require('../models/users');

export const getAllOrderService = async () => {
  try {
    return await Orders.find({}).populate('requestedUser');
  } catch (err) {
    throw new Error('Orders not found');
  }
};
export const getOneOrderService = async (id: string) => {
  try {
    return await Orders.findOne({ _id: id }).populate('requestedUser');
  } catch (err) {
    throw new Error('Order not found');
  }
};

export const addOrderService = async (newOrder: INewOrder) => {
  try {
    const UserObject = await Users.findOne({ _id: newOrder.requestedUser });
    if (newOrder.changeShippingAddress) {
      return await Orders.create({ ...newOrder, requestedUser: UserObject });
    } else {
      return await Orders.create({
        ...newOrder,
        requestedUser: UserObject,
        billingDetails: {
          fullName: UserObject.name,
          address: UserObject.address,
          city: UserObject.city,
          postalCode: UserObject.postalCode,
          country: UserObject.country,
          contactNumber: UserObject.phoneNumber,
        },
      });
    }
  } catch (err) {
    throw new Error('Failed to add new order');
  }
};

export const changeOrderStatusService = async (id: string, newState: IState) => {
  try {
    return await Orders.findOneAndUpdate({ _id: id }, { status: newState }, { new: true });
  } catch (err) {
    throw new Error('Failed to change state of order');
  }
};