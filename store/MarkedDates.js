import { createContext } from "react";

const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' }
const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' }
const workout = { key: 'workout', color: 'green' }

export const markedDates = {
  '2023-08-21': { dots: [vacation, massage, workout], dotColor: 'red' },
  '2023-08-22': { dots: [massage, workout], dotColor: 'red' },
}
