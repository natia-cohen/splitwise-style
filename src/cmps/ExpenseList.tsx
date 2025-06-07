import type { Group } from "../models/group.model"
import { ExpensePreview } from "../cmps/ExpensePreview"

interface GroupExpenseList {
  group: Group
  onDelete: (expenseId: string) => void
}

export function ExpenseList({ group, onDelete }: GroupExpenseList) {


  if (!group) return 

  return (
    <section className="expense-list-container">
      <div className="expense-list">
        {group.expenses.map((expense) => (
          <ExpensePreview
            key={expense.id}
            expense={expense}
            currentUserId={expense.paidBy[0].id}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  )
}


