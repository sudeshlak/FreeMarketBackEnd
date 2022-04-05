import mongoose = require('mongoose');
import { strict } from 'assert';

const CouponSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    couponCode: {
      type: String,
      required: true,
    },
    fromDate: {
      type: { stringDate: String, numberDate: Number },
      required: true,
    },
    toDate: {
      type: { stringDate: String, numberDate: Number },
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
  },
);

module.exports = mongoose.model('Coupons', CouponSchema);