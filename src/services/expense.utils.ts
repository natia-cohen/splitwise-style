import type { Expense } from "../models/group.model"

export function formatDate(dateStr: string) {
  if (!dateStr) return ""
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  })
}

export function getUserPaid(expense: Expense, userId: string) {
  if (Array.isArray(expense.paidBy)) {
    const payer = expense.paidBy.find((p) => p.id === userId)
    return payer ? payer.amount : 0
  }
  if (typeof expense.paidBy === "string" && expense.paidBy === userId) {
    return expense.amount
  }
  return 0
}

export function getUserOwes(expense: Expense, userId: string) {
  const split = expense.splitBetween.find((s) => s.id === userId && s.isChecked)
  return split ? Number(split.owes.toFixed(2)) : 0
}

export function getUserLent(expense: Expense, userId: string) {
  const userPaid = getUserPaid(expense, userId)
  if (!userPaid) return
  let lent = { name: "", amount: 0 }
  let lents:any = []

  expense.splitBetween.forEach((split) => {
    if (split.id !== userId && split.isChecked) {

      lent.amount += split.owes
      lent.name = split.name

    }
    lent.amount = Number(lent.amount.toFixed(2))
    lents.push(lent)
  })

  return lents
}

export function buildSplitBetween(expense: Expense, payerId: string) {
  const selectedCount = expense.splitBetween.filter((s) => s.isChecked).length
  const splitAmount = selectedCount ? expense.amount / selectedCount : 0
  return expense.splitBetween.map((split) =>
    !split.isChecked
      ? split
      : {
          ...split,
          owes: split.id === payerId ? 0 : splitAmount,
          paid: split.id === payerId ? splitAmount : 0,
        }
  )
}
