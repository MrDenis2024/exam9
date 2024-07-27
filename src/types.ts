export interface Category {
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