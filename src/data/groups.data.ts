import type { Group } from "../models/group.model"

export const groupsData: Group[] = [
  {
    _id: "g201",
    title: "Italy Vacation",
    createdAt: "2025-05-10",
    members: [
      { id: "u001", name: "John Doe" },
      { id: "u002", name: "Alice" },
      { id: "u003", name: "Mark" },
    ],
    expenses: [
      {
        id: "e2011",
        title: "Airbnb Milan",
        amount: 600,
        paidBy: [{ id: "u001", name: "John Doe", amount: 600 }],
        createdAt: "2025-05-11",
        splitBetween: [
          { id: "u001", name: "John Doe", owes: 0, isChecked: true, paid: 200, payed: false },
          { id: "u002", name: "Alice", owes: 200, isChecked: true, paid: 0, payed: false },
          { id: "u003", name: "Mark", owes: 200, isChecked: true, paid: 0, payed: false },
        ],
      },
      {
        id: "e2012",
        title: "Museum tickets",
        amount: 90,
        paidBy: [{ id: "u002", name: "Alice", amount: 90 }],
        createdAt: "2025-05-12",
        splitBetween: [
          { id: "u001", name: "John Doe", owes: 30, isChecked: true, paid: 0, payed: false },
          { id: "u002", name: "Alice", owes: 0, isChecked: true, paid: 30, payed: false },
          { id: "u003", name: "Mark", owes: 30, isChecked: true, paid: 0, payed: false },
        ],
      },
    ],
  },

  {
    _id: "g202",
    title: "Flatmates Tel Aviv",
    createdAt: "2025-03-03",
    members: [
      { id: "u001", name: "John Doe" },
      { id: "u004", name: "Ella" },
      { id: "u005", name: "Tom" },
    ],
    expenses: [
      {
        id: "e2021",
        title: "Electric bill",
        amount: 210,
        paidBy: [{ id: "u005", name: "Tom", amount: 210 }],
        createdAt: "2025-03-05",
        splitBetween: [
          { id: "u001", name: "John Doe", owes: 70, isChecked: true, paid: 0, payed: false },
          { id: "u004", name: "Ella", owes: 70, isChecked: true, paid: 0, payed: false },
          { id: "u005", name: "Tom", owes: 0, isChecked: true, paid: 70, payed: false },
        ],
      },
      {
        id: "e2022",
        title: "Cleaning supplies",
        amount: 75,
        paidBy: [{ id: "u001", name: "John Doe", amount: 75 }],
        createdAt: "2025-03-07",
        splitBetween: [
          { id: "u001", name: "John Doe", owes: 0, isChecked: true, paid: 25, payed: false },
          { id: "u004", name: "Ella", owes: 25, isChecked: true, paid: 0, payed: false },
          { id: "u005", name: "Tom", owes: 25, isChecked: true, paid: 0, payed: false },
        ],
      },
      {
        id: "e2023",
        title: "Pizza night",
        amount: 120,
        paidBy: [{ id: "u004", name: "Ella", amount: 120 }],
        createdAt: "2025-03-11",
        splitBetween: [
          { id: "u001", name: "John Doe", owes: 40, isChecked: true, paid: 0, payed: false },
          { id: "u004", name: "Ella", owes: 0, isChecked: true, paid: 40, payed: false },
          { id: "u005", name: "Tom", owes: 40, isChecked: true, paid: 0, payed: false },
        ],
      },
    ],
  },

  {
    _id: "g203",
    title: "Desert Road Trip",
    createdAt: "2025-01-25",
    members: [
      { id: "u001", name: "John Doe" },
      { id: "u006", name: "Maya" },
      { id: "u007", name: "Amit" },
      { id: "u008", name: "Ronen" },
    ],
    expenses: [
      {
        id: "e2031",
        title: "Gasoline",
        amount: 320,
        paidBy: [{ id: "u007", name: "Amit", amount: 320 }],
        createdAt: "2025-01-26",
        splitBetween: [
          { id: "u001", name: "John Doe", owes: 80, isChecked: true, paid: 0, payed: false },
          { id: "u006", name: "Maya", owes: 80, isChecked: true, paid: 0, payed: false },
          { id: "u007", name: "Amit", owes: 0, isChecked: true, paid: 80, payed: false },
          { id: "u008", name: "Ronen", owes: 80, isChecked: true, paid: 0, payed: false },
        ],
      },
      {
        id: "e2032",
        title: "Snacks",
        amount: 60,
        paidBy: [{ id: "u001", name: "John Doe", amount: 60 }],
        createdAt: "2025-01-26",
        splitBetween: [
          { id: "u001", name: "John Doe", owes: 0, isChecked: true, paid: 15, payed: false },
          { id: "u006", name: "Maya", owes: 15, isChecked: true, paid: 0, payed: false },
          { id: "u007", name: "Amit", owes: 15, isChecked: true, paid: 0, payed: false },
          { id: "u008", name: "Ronen", owes: 15, isChecked: true, paid: 0, payed: false },
        ],
      },
    ],
  },

  {
    _id: "g204",
    title: "Startup Project Team",
    createdAt: "2025-04-15",
    members: [
      { id: "u001", name: "John Doe" },
      { id: "u009", name: "Lior" },
      { id: "u010", name: "David" },
      { id: "u011", name: "Sarah" },
    ],
    expenses: [
      {
        id: "e2041",
        title: "SaaS Subscription",
        amount: 200,
        paidBy: [{ id: "u009", name: "Lior", amount: 200 }],
        createdAt: "2025-04-16",
        splitBetween: [
          { id: "u001", name: "John Doe", owes: 50, isChecked: true, paid: 0, payed: false },
          { id: "u009", name: "Lior", owes: 0, isChecked: true, paid: 50, payed: false },
          { id: "u010", name: "David", owes: 50, isChecked: true, paid: 0, payed: false },
          { id: "u011", name: "Sarah", owes: 50, isChecked: true, paid: 0, payed: false },
        ],
      },
      {
        id: "e2042",
        title: "Coffee & Snacks",
        amount: 60,
        paidBy: [{ id: "u001", name: "John Doe", amount: 60 }],
        createdAt: "2025-04-17",
        splitBetween: [
          { id: "u001", name: "John Doe", owes: 0, isChecked: true, paid: 15, payed: false },
          { id: "u009", name: "Lior", owes: 15, isChecked: true, paid: 0, payed: false },
          { id: "u010", name: "David", owes: 15, isChecked: true, paid: 0, payed: false },
          { id: "u011", name: "Sarah", owes: 15, isChecked: true, paid: 0, payed: false },
        ],
      },
    ],
  },

  {
    _id: "g205",
    title: "Family Expenses",
    createdAt: "2025-02-14",
    members: [
      { id: "u001", name: "John Doe" },
      { id: "u012", name: "Mom" },
      { id: "u013", name: "Dad" },
      { id: "u014", name: "Lily" },
    ],
    expenses: [
      {
        id: "e2051",
        title: "Supermarket",
        amount: 380,
        paidBy: [{ id: "u013", name: "Dad", amount: 380 }],
        createdAt: "2025-02-15",
        splitBetween: [
          { id: "u001", name: "John Doe", owes: 95, isChecked: true, paid: 0, payed: false },
          { id: "u012", name: "Mom", owes: 95, isChecked: true, paid: 0, payed: false },
          { id: "u013", name: "Dad", owes: 0, isChecked: true, paid: 95, payed: false },
          { id: "u014", name: "Lily", owes: 95, isChecked: true, paid: 0, payed: false },
        ],
      },
      {
        id: "e2052",
        title: "Birthday Cake",
        amount: 120,
        paidBy: [{ id: "u014", name: "Lily", amount: 120 }],
        createdAt: "2025-02-18",
        splitBetween: [
          { id: "u001", name: "John Doe", owes: 40, isChecked: true, paid: 0, payed: false },
          { id: "u012", name: "Mom", owes: 40, isChecked: true, paid: 0, payed: false },
          { id: "u013", name: "Dad", owes: 40, isChecked: true, paid: 0, payed: false },
          { id: "u014", name: "Lily", owes: 0, isChecked: true, paid: 40, payed: false },
        ],
      },
    ],
  },
]
