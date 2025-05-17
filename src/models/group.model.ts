export interface GroupMember {
  id: string
  name: string
}

export interface ExpenseSplit {
  id: string
  name: string
  owes: number
  isChecked: boolean
  paid: number
  payed: boolean
}

export interface ExpensePaidBy {
  id: string
  name: string
  amount: number
}

export interface Expense {
  id: string
  title: string
  amount: number
  paidBy: ExpensePaidBy[] 
  createdAt: string
  splitBetween: ExpenseSplit[]
}

export interface Group {
  _id: string
  title: string
  members: GroupMember[]
  createdAt: string
  expenses: Expense[]
}
