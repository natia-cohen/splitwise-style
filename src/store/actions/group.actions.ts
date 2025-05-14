
import { groupService } from "../../services/group/group.service";

import { store } from "../store";
import {
  setGroups,
  setGroup,
  removeGroup,
  addGroup,
  updateGroup,
  setLoading,
} from "../reducers/group.reducer";


export async function loadGroups() {
  try {
    store.dispatch(setLoading(true));
    const groups = await groupService.query();
    store.dispatch(setGroups(groups));
  } catch (err) {
    console.error("Cannot load groups", err);
    throw err;
  } finally {
    store.dispatch(setLoading(false));
  }
}


export async function loadGroup(groupId: string) {
  try {
    const group = await groupService.getById(groupId);
    store.dispatch(setGroup(group));
  } catch (err) {
    console.error("Cannot load group", err);
    throw err;
  }
}

export async function removeGroupAction(groupId: string) {
  try {
    await groupService.remove(groupId);
    store.dispatch(removeGroup(groupId));
  } catch (err) {
    console.error("Cannot remove group", err);
    throw err;
  }
}

export async function addGroupAction(group: any) {
  try {
    const savedGroup = await groupService.save(group);
    store.dispatch(addGroup(savedGroup));
    return savedGroup;
  } catch (err) {
    console.error("Cannot add group", err);
    throw err;
  }
}


export async function updateGroupAction(group: any) {
  try {
    const savedGroup = await groupService.save(group);
    store.dispatch(updateGroup(savedGroup));
    return savedGroup;
  } catch (err) {
    console.error("Cannot save group", err);
    throw err;
  }
}


