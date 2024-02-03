export interface RepresentativeImage {
  url: string;
}
export interface ProductDetails {
  originProductNo: number;
  addressBookNo: number;
  name: string;
  wholesale_url: string;
}

export interface ChannelProduct {
  originProductNo: number;
  channelProductNo: number;
  channelServiceType: string;
  categoryId: string;
  name: string;
  sellerManagementCode: string;
  statusType: string;
  channelProductDisplayStatusType: string;
  salePrice: number;
  discountedPrice: number;
  mobileDiscountedPrice: number;
  stockQuantity: number;
  knowledgeShoppingProductRegistration: boolean;
  deliveryAttributeType: string;
  deliveryFee: number;
  returnFee: number;
  exchangeFee: number;
  managerPurchasePoint: number;
  wholeCategoryName: string;
  wholeCategoryId: string;
  representativeImage: RepresentativeImage;
  modelId: number;
  modelName: string;
  brandName: string;
  manufacturerName: string;
  sellerTags: string[];
  regDate: string;
  modifiedDate: string;
  channelNo: number;
  details: ProductDetails[];
}

export interface Product {
  originProductNo: number;
  channelProducts: ChannelProduct[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  page: number;
  totalElements: number;
  totalPages: number;
}

export interface ProductAddress {
  map(arg0: (prd_addr: ProductAddress) => void): unknown;
  findIndex(arg0: (prd_addr: ProductAddress) => void): unknown;
  addressBookNo: number;
  name: string;
  addressType: string;
  postalCode: string;
  baseAddress: string;
  detailAddress: string;
  address: string;
  phoneNumber1: string;
  phoneNumber2: string;
  hasLocation: boolean;
  roadNameAddress: boolean;
  overseasAddress: boolean;
  is_use: boolean;
  url: string;
}
export interface ProductsResponse {
  products: Product[];
  totalElements: number;
  size: number;
  address: ProductAddress[];
}
