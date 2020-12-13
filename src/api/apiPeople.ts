import api from './api'

export const getPeople = () =>
  api({
    url: '/people',
    method: 'get',
  })
