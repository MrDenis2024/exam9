export interface ICategory {
  id: string;
  name: string;
  type: string;
}

export interface CategoryMutation {
  name: string;
  type: string;
}

export interface ApiCategories {
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
  createdAt: string,
}

export interface ApiTransactions {
  [id: string]: ApiTransaction,
}

export interface Transactions {
  id: string;
  amount: number,
  createdAt: string,
  category: ICategory;
}