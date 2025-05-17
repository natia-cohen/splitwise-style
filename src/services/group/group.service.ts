import { storageService } from "../async-storage.service"
import { groupsData } from "../../data/groups.data"
import type { Expense, Group } from "../../models/group.model"
import { makeId } from "../util.service"

const GROUP_TYPE = "groups"

export const groupService = {
  query,
  getById,
  save,
  remove,
  getDefaultFilter,
  getEmptyExpense,

}

async function query(): Promise<Group[]> {
  let groups = await storageService.query<Group>(GROUP_TYPE)

  if (!groups.length) {
    groups = await _loadAndCacheFromApi()
  }

  return groups
}

function getById(groupId: string): Promise<Group> {
  return storageService.get<Group>(GROUP_TYPE, groupId)
}

function save(group: Group): Promise<Group> {
  return group._id
    ? storageService.put<Group>(GROUP_TYPE, group)
    : storageService.post<Group>(GROUP_TYPE, group)
}

function remove(groupId: string): Promise<void> {
  return storageService.remove(GROUP_TYPE, groupId)
}

// function getEmptyGroup(): Group {
//   return { title: "" };
// }

function getDefaultFilter(): { txt: string } {
  return { txt: "" }
}

async function _loadAndCacheFromApi(): Promise<Group[]> {
  try {
    await storageService.saveAll(GROUP_TYPE, groupsData)
    return groupsData
  } catch (err) {
    console.error("Failed to load local data:", err)
    throw err
  }
}

export function getEmptyExpense(group: Group): Expense {
  return {
    id: makeId(),
    title: "",
    amount: 0,
    paidBy: [],
    createdAt: new Date().toISOString(),
    splitBetween: group.members.map((member) => ({
      id: member.id,
      name: member.name,
      owes: 0,
      isChecked: true,
      paid: 0,
      payed: false,
    })),
  }
}

