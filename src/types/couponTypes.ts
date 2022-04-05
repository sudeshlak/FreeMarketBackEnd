export interface INewCoupon {
  id: string,
  title: string,
  fromDate: IDate,
  toDate: IDate,
  couponCode: string,
  discountPercentage: number,
}

export interface IDate {
  stringDate: string
  numberDate: number|null
}