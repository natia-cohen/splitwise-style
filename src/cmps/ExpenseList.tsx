import type { Group } from "../models/group.model"
import { ExpensePreview } from "../cmps/ExpensePreview"

interface GroupExpenseList {
  group: Group
  onDelete: (expenseId: string) => void
}


export function ExpenseList({ group , onDelete }: GroupExpenseList) {
  const currentUserId = 'a1b' 
if(!group) return <div>Loading...</div>

  return (
    <div className="main-expense">
      <div className="expense-list">
        {group.expenses.map((expense) => (
          <ExpensePreview key={expense.id} expense={expense} currentUserId={currentUserId} onDelete={onDelete}/>
        ))}
      </div>
      <div className="month-divider"></div>
    </div>
  )
}
