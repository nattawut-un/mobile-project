import dayjs from "dayjs"
import { Timestamp } from "firebase/firestore"
import _ from "lodash"
import { MD3Colors } from "react-native-paper"

export function parseAppointmentsToMarkedDates(dates) {
  //? react-native-calendars example
  //? markedDates = {
  //?   '2012-05-16': {selected: true, marked: true, selectedColor: 'blue'},
  //?   '2012-05-17': {marked: true},
  //?   '2012-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
  //?   '2012-05-19': {disabled: true, disableTouchEvent: true}
  //? }

  var groupedAssignments = _.groupBy(dates, item =>
    dayjs(
      new Timestamp(item.dueDate.seconds, item.dueDate.nanoseconds).toDate()
    ).format('YYYY-MM-DD')
  )

  var markedAssignments = {}
  for (const [key, value] of Object.entries(groupedAssignments)) {
    markedAssignments[key] = {
      customStyles: {
        container: {
          backgroundColor: 'red',
        },
        text: {
          color: 'white',
          fontWeight: 'bold',
        },
      },
    }
  }

  return [groupedAssignments, markedAssignments]
}
