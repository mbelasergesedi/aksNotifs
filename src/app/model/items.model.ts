import { Timestamp } from '@firebase/firestore-types';

export class Item {
  id?: string;
  title: string;
  description: string;
  createdAt: Timestamp;
  modifiedAt: Timestamp;
  link: string;
  imageUrl: string = null;
}