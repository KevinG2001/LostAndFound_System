export interface ItemData {
  article: string;
  itemID: string;
  description: string;
  category: string;
  type: string;
  route: string;
  garage: string;
  dateLost: string;
  status: string;
  dateClaimed: string;
  imageUrl?: string;
  notes: string;
  collectionDetails?: {
    firstName: string;
    surname: string;
    email: string;
    phone: string;
  };
}

export interface ItemDetailsTabProps {
  data: Partial<ItemData> & { itemID: string };
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
}

export interface CollectionDetails {
  firstName?: string;
  surname?: string;
  email?: string;
  phone?: string;
}
