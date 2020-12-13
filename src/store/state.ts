export const enum PeopleAction {
  add = '+',
  rm = '-',
}

export interface Person {
  id: number
  name: string
}

export interface PeopleItem extends Person {
  items?: Person[]
  action?: PeopleAction
}

export interface HistoryItem extends PeopleItem {
  action: PeopleAction
  updatedAt: Date
}

export interface State {
  loading: boolean
  items: PeopleItem[]
  history: HistoryItem[]
}

export const state: State = {
  loading: false,
  items: [],
  history: [],
}
