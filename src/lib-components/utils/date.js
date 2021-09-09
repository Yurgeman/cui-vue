export const DateTime = (date) => {
  const options = {
    day:    'numeric',
    month:  '2-digit',
    year:   '2-digit',
    hour:   '2-digit',
    minute: '2-digit'
  }
  return (date)
    ? new Date(date).toLocaleString('ru', options)
    : new Date().toLocaleString('ru', options)
}
