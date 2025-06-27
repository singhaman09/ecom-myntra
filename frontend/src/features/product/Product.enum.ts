// product enum

export const PRODUCT_INFO = {
  INGREDIENTS: 'ingredients',
  ADDITIONAL_INFO: 'additionalInfo',
  WHAT_IT_DOES: 'whatItDoes',
} as const;
export type PRODUCT_INFO_TYPE = typeof PRODUCT_INFO[keyof typeof PRODUCT_INFO];

export const TAB_KEYS= {
  CATEGORY: "category",
  SUBCATEGORY: "subCategory",
  BRAND: "brand",
  COLOR: "color",
  GENDER: "gender",
  PRICE: "price"
} as const;
export type TabKey = typeof TAB_KEYS[keyof typeof TAB_KEYS];


export const OFFER_TYPE = {
  BANK: 'bank',
  COUPON: 'coupon',
  DEAL: 'deal',
  OTHER: 'other',
} as const;

export type OfferType = typeof OFFER_TYPE[keyof typeof OFFER_TYPE];

export const PRODUCT_DETAILS_VARIANT={
 SIZE:'size',
 COLOR:'color'
}

export const UPPER_FILTER={
  SORT:'sort',
    PRICE_ASC:'price_asc',
     PRICE_DSC:'price_desc',
    NEW:'new'
}