import type { Expense } from "../models/group.model"
import {
  formatDate,
  getUserPaid,
  getUserLent,
  getUserOwes,
} from "../services/expense.utils"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"

interface ExpensePreviewProps {
  expense: Expense
  currentUserId: string
  onDelete: (expenseId: string) => void
}

//function that renders the expense preview
export function ExpensePreview({
  expense,
  currentUserId,
  onDelete,
}: ExpensePreviewProps) {
  if (!expense) return null
  console.log("currentUserId", currentUserId)

  const paid = getUserPaid(expense, currentUserId)
  const lents = getUserLent(expense, currentUserId)
  console.log("lents", lents)
  const owes = getUserOwes(expense, currentUserId)

  return (
    <div className="expense-preview">
      <div className="expense-left">
        <span className="expense-date">{formatDate(expense.createdAt)}</span>
        <img
          className="expense-img"
          src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/food-and-drink/dining-out@2x.png"
          alt=""
        />
        <span className="expense-title">{expense.title}</span>
      </div>
      <div className="expense-middle">
        {paid > 0 && (
          <div className="expense-paid">
            {expense.paidBy[0].name} <b>${paid}</b>
          </div>
        )}

        {expense.splitBetween.map((member: any) => {
          if(member.id === currentUserId) return null
          return (
            <div className="expense-lent">
              <b>
               {member.name} {member.owes}
              </b>
            </div>
          )
        })}

        {owes > 0 && (
          <div className="expense-owes">
            <b>${owes}</b>
          </div>
        )}
        {paid === 0 && lents.lent?.amount === 0 && owes === 0 && (
          <div className="expense-nothing">
            No balance for you in this expense
          </div>
        )}
      </div>
      <IconButton
        aria-label="delete"
        onClick={(ev) => {
          ev.stopPropagation()
          onDelete(expense.id)
        }}
        sx={{
          color: "#e61855",
          ml: 2,
          "&:hover": {
            background: "#ffe4ee",
          },
        }}
        size="small"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  )
}
