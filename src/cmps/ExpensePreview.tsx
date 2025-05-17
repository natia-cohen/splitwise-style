import type { Expense } from "../models/group.model"
import {
  formatDate,
  getUserPaid,
  getUserLent,
  getUserOwes,
} from "../services/expense.utils"

interface ExpensePreviewProps {
  expense: Expense
  currentUserId: string
  onDelete: (expenseId: string) => void
}

export function ExpensePreview({
  expense,
  currentUserId,
  onDelete,
}: ExpensePreviewProps) {
  if (!expense) return null

  const paid = getUserPaid(expense, currentUserId)

  const lent = getUserLent(expense, currentUserId)

  const owes = getUserOwes(expense, currentUserId)

  return (
    <div className="expense-preview">
      <div className="main-block">
        <span className="date">{formatDate(expense.createdAt)}</span>
        <div className="icon">
          <img
            className="expense-img"
            src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/food-and-drink/dining-out@2x.png"
            alt=""
          />
        </div>
        <div className="title">{expense.title}</div>
      </div>

      <div className="cost">
        {paid > 0 && (
          <div className="paid">
            You paid <b>${paid}</b>
          </div>
        )}
        {lent > 0 && (
          <div className="lent">
            You lent <b>${lent}</b>
          </div>
        )}
        {owes > 0 && (
          <div className="owes">
            You owe <b>${owes}</b>
          </div>
        )}
        {paid === 0 && lent === 0 && owes === 0 && (
          <div className="nothing">No balance for you in this expense</div>
        )}
      </div>
      <div className="actions">
        <button
          className="delete-btn"
          onClick={(ev) => {
            ev.stopPropagation()
            onDelete(expense.id)
          }}
        >
          ❌
        </button>
      </div>
    </div>
  )
}
