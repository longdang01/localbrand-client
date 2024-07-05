import { CollectionImageProps } from './collection-image';

export type CollectionProps = {
  _id: string;
  collectionName: string;
  path: string;
  releaseDate: string;
  description: string;
  active: number;
  createdAt: string;
  updatedAt: string;
  collectionImages: CollectionImageProps[];
};
