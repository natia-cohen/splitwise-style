import type { Group } from "../models/group.model"
import { ExpensePreview } from "../cmps/ExpensePreview"

interface GroupExpenseList {
  group: Group
}

export function ExpenseList({ group }: GroupExpenseList) {
if(!group) return <div>Loading...</div>
  console.log(' group fromGroupExpenseList', group) 
  return (
    <div className="main-expense">
      <div className="expense-list">
        {group.expenses.map((expense) => (
          <ExpensePreview key={expense.id} expense={expense} />
        ))}
      </div>
      <div className="month-divider"></div>
    </div>
  )
}
