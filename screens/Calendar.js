import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Calendar as CalendarItem, Agenda, LocaleConfig } from "react-native-calendars";
import { useContext } from 'react'
import { markedDates } from '../store/MarkedDates'
import { Card, Avatar } from 'react-native-paper'
import dayjs from "dayjs";

const timeToString = time => {
  const date = new Date(time)
  return date.toISOString().split('T')[0]
}

export default function Calendar() {
  const [selected, setSelected] = useState('')
  const [items, setItems] = useState({
    '2023-08-22': [{ name: 'item 1 - any js object' }],
    '2023-08-23': [{ name: 'item 2 - any js object', height: 80 }],
    '2023-08-25': [
      { name: 'item 3 - any js object' },
      { name: 'any js object' },
    ],
  })

  const loadItems = day => {
    // setTimeout(() => {
    //   for (let i = -15; i < 85; i++) {
    //     const time = day.timestamp + i * 24 * 60 * 60 * 1000
    //     const strTime = timeToString(time)
    //     if (!items[strTime]) {
    //       items[strTime] = []
    //       const numItems = Math.floor(Math.random() * 3 + 1)
    //       for (let j = 0; j < numItems; j++) {
    //         items[strTime].push({
    //           name: 'Item for ' + strTime + ' #' + j,
    //           height: Math.max(50, Math.floor(Math.random() * 150)),
    //         })
    //       }
    //     }
    //   }
    //   const newItems = {}
    //   Object.keys(items).forEach(key => {
    //     newItems[key] = items[key]
    //   })
    //   setItems(newItems)
    // }, 1000)
    let currentDate = day.dateString
    setSelected(currentDate)
    let lowerDate = dayjs(currentDate).subtract(1, 'month').format('YYYY-MM-DD')
    let upperDate = dayjs(currentDate).add(1, 'month').format('YYYY-MM-DD')
    // console.log(lowerDate, currentDate, upperDate)

    console.log(items)

    // let newItems = items
    // if (!newItems[currentDate]) {
    //   newItems[currentDate] = []
    // }
    // setItems(newItems)
  }

  useEffect(() => {
    let newItems = items
    for (const [key, value] of Object.entries(newItems)) {
      if (value.length <= 0) {
        delete newItems[key]
      }
    }
    if (!newItems[selected]) {
      newItems[selected] = []
    }
    setItems(newItems)
  }, [selected])

  const renderItem = item => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text>{item.name}</Text>
              {/* <Avatar.Text label="J" /> */}
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={dayjs().format('YYYY-MM-DD')}
        renderItem={renderItem}
      />
    </View>
  )
}


const noItem = () => {
  return (
    <View style={{
      backgroundColor: '#ccc',
      padding: 8
    }}>
      <Text>no items...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
