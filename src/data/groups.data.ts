import type { Group } from "../models/group.model"

export const groupsData: Group[] = [
  {
    _id: "g101",
    title: "Trip to Paris",
    createdAt: "2025-05-01",
    members: ["Natia", "Alon", "Dana"],
    expenses: [
      {
        id: "e101",
        title: "Hotel",
        amount: 900,
        paidBy: "Natia",
        createdAt: "2025-05-02",
        splitBetween: ["Natia", "Alon", "Dana"],
      },
      {
        id: "e102",
        title: "Dinner",
        amount: 300,
        paidBy: "Alon",
        createdAt: "2025-05-03",
        splitBetween: ["Natia", "Alon", "Dana"],
      },
    ],
  },
  {
    _id: "g102",
    title: "Roommates",
    createdAt: "2025-04-20",
    members: ["Natia", "Shiran"],
    expenses: [
      {
        id: "e103",
        title: "Electric Bill",
        amount: 200,
        paidBy: "Shiran",
        createdAt: "2025-04-21",
        splitBetween: ["Natia", "Shiran"],
      },
    ],
  },
  {
    _id: "g103",
    title: "Birthday Party",
    createdAt: "2025-03-10",
    members: ["Natia", "Alon", "Dana", "Shiran"],
    expenses: [
      {
        id: "e104",
        title: "Cake",
        amount: 150,
        paidBy: "Dana",
        createdAt: "2025-03-11",
        splitBetween: ["Natia", "Alon", "Dana", "Shiran"],
      },
      {
        id: "e105",
        title: "Drinks",
        amount: 100,
        paidBy: "Alon",
        createdAt: "2025-03-11",
        splitBetween: ["Natia", "Alon", "Dana", "Shiran"],
      },
    ],
  },
  {
    _id: "g104",
    title: "Vacation to Eilat",
    createdAt: "2025-02-05",
    members: ["Natia", "Alon", "Dana", "Shiran", "Oren"],
    expenses: [
      {
        id: "e106",
        title: "Hotel",
        amount: 1200,
        paidBy: "Oren",
        createdAt: "2025-02-06",
        splitBetween: ["Natia", "Alon", "Dana", "Shiran", "Oren"],
      },
      {
        id: "e107",
        title: "Gas",
        amount: 300,
        paidBy: "Natia",
        createdAt: "2025-02-07",
        splitBetween: ["Natia", "Alon", "Dana", "Shiran", "Oren"],
      },
    ],
  },
  {
    _id: "g105",
    title: "Office Lunch",
    createdAt: "2025-01-15",
    members: ["Natia", "Alon", "Dana", "Shiran", "Oren"],
    expenses: [
      {
        id: "e108",
        title: "Sushi",
        amount: 500,
        paidBy: "Shiran",
        createdAt: "2025-01-16",
        splitBetween: ["Natia", "Alon", "Dana", "Shiran", "Oren"],
      },
    ],
  },
]
