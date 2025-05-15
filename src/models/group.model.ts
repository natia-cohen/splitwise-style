export interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
}

export interface Group {
  _id: string;
  title: string;
  members: string[];
  expenses: Expense[];
}
