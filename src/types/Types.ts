export type TErpInput = {
  businessName: string;
  businessAddress: string;
  city: string;
  businessPin: string;
  telephone: string;
  date: string;
  time: string;
  currency: string;
  taxType: string;
  taxPercentage: number;
  modeOfPayment: string;
  items: ItemType[];
};
export type ItemType = {
  quantity: string;
  productName: string;
  price: string;
};
