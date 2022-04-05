import { Context } from '../types/context';
import { VerifyAdminAuthorization } from '../decorators/auth.decorator';
import {
  addCouponService,
  deleteCouponService,
  getAllCouponService,
  getOneCouponService,
} from '../services/coupon.service';
import { INewCoupon } from '../types/couponTypes';

export class CouponController {
  @VerifyAdminAuthorization
  async addCoupon(ctx: Context, newCoupon: INewCoupon) {
    return await addCouponService(newCoupon);
  }

  @VerifyAdminAuthorization
  async getAllCoupons(ctx: Context) {
    return await getAllCouponService();
  }

  async getOneCoupon(couponCode: string) {
    return await getOneCouponService(couponCode);
  }

  @VerifyAdminAuthorization
  async deleteCoupon(ctx: Context, id: string) {
    return await deleteCouponService(id);
  }

}