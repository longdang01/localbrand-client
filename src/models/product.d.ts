import { CategorySmallProps } from './category-small';
import { ProductColorsProps } from './product-color';

export type ProductProps = {
  _id: string;
  subCategory: string | CategorySmallProps;
  brand: string;
  collectionInfo: string;
  supplier: string;
  productName: string;
  path: string;
  origin: string;
  material: string;
  style: string;
  sizeGuide: string;
  description: string;
  colors: ProductColorsProps[];
  active: number;
  createdAt: string;
  updatedAt: string;
};
