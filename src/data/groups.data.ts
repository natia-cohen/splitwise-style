import type { Group } from '../models/group.model';

export const groupsData: Group[] = [
  {
    _id: 'g101',
    title: 'Trip to Paris',
    members: ['Natia', 'Alon', 'Dana'],
    expenses: [
      { id: 'e101', title: 'Hotel', amount: 900, paidBy: 'Natia', splitBetween: ['Natia', 'Alon', 'Dana'] },
      { id: 'e102', title: 'Dinner', amount: 300, paidBy: 'Alon', splitBetween: ['Natia', 'Alon', 'Dana'] },
    ],
  },
  {
    _id: 'g102',
    title: 'Roommates',
    members: ['Natia', 'Shiran'],
    expenses: [
      { id: 'e103', title: 'Electric Bill', amount: 200, paidBy: 'Shiran', splitBetween: ['Natia', 'Shiran'] },
    ],
  },
  {
    _id: 'g103',
    title: 'Birthday Party',
    members: ['Natia', 'Alon', 'Dana', 'Shiran'],
    expenses: [
      { id: 'e104', title: 'Cake', amount: 150, paidBy: 'Dana', splitBetween: ['Natia', 'Alon', 'Dana', 'Shiran'] },
      { id: 'e105', title: 'Drinks', amount: 100, paidBy: 'Alon', splitBetween: ['Natia', 'Alon', 'Dana', 'Shiran'] },
    ],
  },
  {
    _id: 'g104',
    title: 'Vacation to Eilat',
    members: ['Natia', 'Alon', 'Dana', 'Shiran', 'Oren'],
    expenses: [
      { id: 'e106', title: 'Hotel', amount: 1200, paidBy: 'Oren', splitBetween: ['Natia', 'Alon', 'Dana', 'Shiran', 'Oren'] },
      { id: 'e107', title: 'Gas', amount: 300, paidBy: 'Natia', splitBetween: ['Natia', 'Alon', 'Dana', 'Shiran', 'Oren'] },
    ],
  },
  {
    _id: 'g105',
    title: 'Office Lunch',
    members: ['Natia', 'Alon', 'Dana', 'Shiran', 'Oren'],
    expenses: [
      { id: 'e108', title: 'Sushi', amount: 500, paidBy: 'Shiran', splitBetween: ['Natia', 'Alon', 'Dana', 'Shiran', 'Oren'] },
    ],
  },
];
