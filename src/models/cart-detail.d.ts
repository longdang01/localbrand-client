import { ProductProps } from "./product";
import { ProductColorsProps } from "./product-color";
import { ProductSizeProps } from "./product-size";

export type CartDetailProps = {
  _id?: string;
  customer?: string;
  cart?: string;
  product?: string | ProductProps;
  color?: string | ProductColorsProps;
  size?: string | ProductSizeProps;
  quantity?: number;
  active?: number;
  createdAt?: string;
  updatedAt?: string;
};
