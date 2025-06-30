export const CartModalAction = {
  REMOVE: "remove",
  WISHLIST: "wishlist"
} as const;

export type CartModalAction = typeof CartModalAction[keyof typeof CartModalAction];

export const CartActionType = {
  INCREMENT: "increment",
  DECREMENT: "decrement"
} as const;

export type CartActionType = typeof CartActionType[keyof typeof CartActionType];

export const CartModalType = {
  REMOVE: "remove",
  COUPON: "coupon",
  ADDRESS: "address"
} as const;

export type CartModalType = typeof CartModalType[keyof typeof CartModalType];

export const PaymentOption = {
  CARD: "CARD",
  UPI: "UPI",
  COD: "COD",
  WALLET: "WALLET",
  EMI: "EMI",
  NETBANKING: "NETBANKING",
  PAYLATER: "PAYLATER",
  PAYIN3: "PAYIN3"
} as const;

export type PaymentOption = typeof PaymentOption[keyof typeof PaymentOption];