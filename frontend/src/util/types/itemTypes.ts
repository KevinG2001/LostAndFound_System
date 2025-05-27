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
}

export interface ItemDetailsTabProps {
  data: Partial<ItemData> & { itemID: string };
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
}
