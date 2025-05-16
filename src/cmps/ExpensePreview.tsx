import type { Expense } from "../models/group.model"

interface ExpensePreviewProps {
  expense: Expense
}

export function ExpensePreview({ expense }: ExpensePreviewProps) {

  function formatMonth(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString('default', { month: 'short' }).toUpperCase();
}

function formatDay(dateStr: string) {
  const date = new Date(dateStr);
  return date.getDate();
}
  console.log("expense from ExpensePreview", expense)
  return (
    <div className="expense-preview">
      <div className="main-block">
        <div className="date">
          <span className="month">{formatMonth(expense.createdAt)}</span>
          <span className="day">{formatDay(expense.createdAt)}</span>
        </div>
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
        <div className="paid">
          you paid ${expense.amount}
        </div>
        <div className="lent">
          you lent or ${expense.amount / 2} 
        </div>
      </div>

        <div className="actions">
        <button className="delete-btn">❌</button>
      </div>
    </div>
  )
}
