interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
}

interface Group {
  _id: string;
  title: string;
  members: string[];
  expenses: Expense[];
}



export const groupsData: Group[] = [
  {
    _id: 'g101',
    title: 'Trip to Paris',
    members: ['Natia', 'Alon', 'Dana'],
    expenses: [
      {
        id: 'e101',
        title: 'Hotel',
        amount: 900,
        paidBy: 'Natia',
        splitBetween: ['Natia', 'Alon', 'Dana'],
      },
      {
        id: 'e102',
        title: 'Dinner',
        amount: 300,
        paidBy: 'Alon',
        splitBetween: ['Natia', 'Alon', 'Dana'],
      },
    ],
  },
  {
    _id: 'g102',
    title: 'Roommates',
    members: ['Natia', 'Shiran'],
    expenses: [
      {
        id: 'e103',
        title: 'Electric Bill',
        amount: 200,
        paidBy: 'Shiran',
        splitBetween: ['Natia', 'Shiran'],
      },
    ],
  },
];
