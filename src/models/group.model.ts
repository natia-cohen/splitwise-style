export interface ExpenseSplit {
  name: string
  owes: number
}

export interface Expense {
  id: string
  title: string
  amount: number
  paidBy: string
  createdAt: string
  splitBetween: ExpenseSplit[]
}

export interface Group {
  _id: string
  title: string
  members: string[]
  createdAt: string
  expenses: Expense[]
}
