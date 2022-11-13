export interface List {
  id: string;
  userId: string;
  created_date: Date;
  modified_date: Date;
  title: string;
  owner: Owner;
  categories: Category[];
}

export interface Category {
  id: string;
  listId: string;
  created_date: Date;
  modified_date: Date;
  title: string;
  items: Item[];
}

export interface Item {
  id: string;
  categoryId: string;
  checked: boolean;
  created_date: Date;
  modified_date: Date;
  name: string;
  quantity: number;
}

export interface Owner {
  id: string;
  email: string;
  name: string;
}
