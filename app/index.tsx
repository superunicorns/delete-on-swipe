import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { IFoodItem } from '@/types/utils';
import FoodItem from '@/components/FoodItem';

import '@/reanimatedConfig';
import { StatusBar } from 'expo-status-bar';

const FOOD_ITEMS: IFoodItem[] = [
  {
    id: 1,
    name: 'Caprese Pizza',
    amount: 'LKR 2,100.00',
    quantity: 2, 
  },
  {
    id: 2,
    name: 'French Fries',
    amount: 'LKR 700.00',
    quantity: 1,
  },
  {
    id: 4,
    name: 'Milk Shake',
    amount: 'LKR 700.00',
    quantity: 4,
  },
];

function HomeScreen() {

  const [allItems, setAllItems] = useState(FOOD_ITEMS);

  const flatListRef = useRef(null);
  const panRef = useRef<React.Ref<any> | undefined>(undefined);

  return (
    <GestureHandlerRootView>
      <StatusBar hidden={true} backgroundColor={'transparent'} translucent/>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require("../assets/images/pizza-italiana.jpeg")} style={styles.image} alt="Italian Pizza" />
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.topView}>
          <Text style={styles.yourItems}>Your Cart</Text>
          <Text style={styles.seeMenu}>see menu</Text>
          </View>
          <FlatList 
            ref={flatListRef} 
            data={allItems} 
            simultaneousHandlers={panRef} 
            keyExtractor={(_item, _) => _item.id.toString()} 
            renderItem={renderItem} 
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );

  function renderItem({ item }: { item: IFoodItem }) {
    return (
      <FoodItem 
          simultaneousHandlers={flatListRef} 
          passRef={(ref) => panRef.current = ref} 
          data={item} 
          onRemove={handleRemove} />
    )
  }

  function handleRemove(id: number) {
    setAllItems(prevState => prevState.filter(item => item.id !== id));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 360,
    width: "100%",
    backgroundColor: "red"
  },
  innerContainer: {
    height: 380,
    width: '100%',
    backgroundColor: "yellow"
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "cover"
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 6,
    backgroundColor: "blue"
  },
  yourItems: {
    fontSize: 16,
    fontWeight: '500'
  },
  seeMenu: {
    color: 'green',
    fontWeight: '500'
  }
});

export default HomeScreen;