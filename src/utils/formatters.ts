import moment from 'moment'

export const formatDate = (date: Date | number): string => {
  return moment(date).format('YYYY.M.D H:m:ss')
}
