import {IProduct} from "./productTypes";
import { IUser } from './userTypes';

export interface INewOrder {
  id: string
  orderCode:string
  changeShippingAddress:boolean
  requestedUser: string
  billingDetails: IBillingAddress
  productList: [IProduct]
  status: 'requested'|'approved'|'rejected'
  paymentType: 'cashOnDelivery'|'onlinePayment'
  paymentStatus: boolean
  deliveryInstructions:string
  requestedDate:string
  discountPercentage:number
}

export interface IBillingAddress {
  fullName: string
  address: string
  city: string,
  postalCode: string,
  country: string,
  contactNumber: string,
}

export type IState = 'approved'|'rejected';

export interface IOrder {
  id: string
  orderCode:string
  changeShippingAddress:boolean
  requestedUser: IUser
  billingDetails: IBillingAddress
  productList: [IProduct]
  status: 'requested'|'approved'|'rejected'
  paymentType: 'cashOnDelivery'|'onlinePayment'
  paymentStatus: boolean
  deliveryInstructions:string
  requestedDate:string
  discountPercentage:number
}