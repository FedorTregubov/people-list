import { MutationTree } from 'vuex'
import { State, PeopleItem, HistoryItem } from './state'

export enum MutationType {
  SetPeople = 'SET_PEOPLE',
  SetAction = 'SET_ACTION',
  CreateHistory = 'CREATE_HISTORY',
  SetLoading = 'SET_LOADING',
}

export type Mutations = {
  [MutationType.SetPeople](state: State, items: PeopleItem[]): void

  [MutationType.SetAction](
    state: State,
    item: Partial<PeopleItem> & { id: number }
  ): void

  [MutationType.CreateHistory](state: State, item: HistoryItem): void

  [MutationType.SetLoading](state: State, value: boolean): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetPeople](state, items) {
    state.items = items
  },

  [MutationType.SetAction](state, newItem) {
    const item = state.items.findIndex(s => s.id === newItem.id)
    if (item === -1) return
    state.items[item] = { ...state.items[item], ...newItem }
  },

  [MutationType.CreateHistory](state, item) {
    state.history = [...state.history, item]
  },

  [MutationType.SetLoading](state, value) {
    state.loading = value
  },
}
