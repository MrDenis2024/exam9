export interface ICategory {
  id: string;
  name: string;
  type: string;
}

export interface CategoryMutation {
  name: string;
  type: string;
}

export interface ApiDishes {
  [id: string]: CategoryMutation;
}

export interface Transaction {
  id: string,
  category: string,
  amount: number,
  createdAt: string,
}

export type ApiTransaction = Omit<Transaction, 'id'>

export interface TransactionMutation {
  category: string,
  categoryName: string,
  amount: string,
}