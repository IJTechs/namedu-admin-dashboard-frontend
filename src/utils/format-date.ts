import { format } from 'date-fns';

/**
 * Format a given ISO date string into the specified format
 * @param isoString - The ISO date string to format
 * @param formatString - The desired output format
 * @returns {string} - Formatted date string
 */
export const formatDate = (isoString: string | Date, formatString: string = 'yyyy-MM-dd HH:mm:ss'): string => {
  return format(new Date(isoString), formatString);
};
