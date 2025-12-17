/**
 * Format a date object to a readable string
 * @param {Date|string} date - The date to format
 * @returns {string} Formatted date string
 */
export function useFormatDate(date) {
  if (!date) return ''
  
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  
  return new Date(date).toLocaleDateString(undefined, options)
}
