import { GetterTree } from 'vuex'
import { State, PeopleAction, PeopleItem, HistoryItem } from './state'

export type Getters = {
  itemsAdded(state: State): PeopleItem[]
  itemsNonAdded(state: State): PeopleItem[]
  historyAdd(state: State): HistoryItem[]
  historyRm(state: State): HistoryItem[]
}

export const getters: GetterTree<State, State> & Getters = {
  itemsAdded(state) {
    return state.items.filter(i => i.action === PeopleAction.add)
  },
  itemsNonAdded(state) {
    return state.items.filter(i => i.action !== PeopleAction.add)
  },
  historyAdd(state) {
    return state.history.filter(i => i.action === PeopleAction.add)
  },
  historyRm(state) {
    return state.history.filter(i => i.action === PeopleAction.rm)
  },
}
