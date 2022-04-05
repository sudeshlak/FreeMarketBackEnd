import { INewCoupon } from '../types/couponTypes';

const Coupons = require('../models/coupon');

export const addCouponService = async (newCoupon: INewCoupon) => {
  try {
    return await Coupons.create(newCoupon);
  } catch (err) {
    throw new Error('Failed to create Coupon');
  }
};

export const getAllCouponService = async () => {
  try {
    return await Coupons.find();
  } catch (err) {
    throw new Error('Coupons not found');
  }
};

export const getOneCouponService = async (couponCode: string) => {
  try {
    return await Coupons.findOne({ couponCode: couponCode });
  } catch (err) {
    throw new Error('Coupon not found');
  }
};

export const deleteCouponService = async (id: string) => {
  try {
    return await Coupons.findByIdAndDelete({ _id: id });
  } catch (err) {
    throw new Error('Failed to delete coupon');
  }
};