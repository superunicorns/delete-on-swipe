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
    amount: '$ 8',
    quantity: 2, 
    imageUrl: require("../assets/images/pizza-italiana.jpeg"),
  },
  {
    id: 2,
    name: 'French Fries',
    amount: '$ 4',
    quantity: 1,
    imageUrl: require("../assets/images/french-fries.jpg"),
  },
  {
    id: 4,
    name: 'Milk Shake',
    amount: '$ 5',
    quantity: 4,
    imageUrl: require("../assets/images/milkshake.jpeg"),
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
          onRemove={handleRemove} 
      />
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
    backgroundColor: "#CBD5E1"
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
    marginBottom: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  yourItems: {
    fontSize: 20,
    fontWeight: '900',
    color: "#020617"
  },
  seeMenu: {
    color: '#6366F1',
    fontWeight: '900',
    borderBottomColor: "#6366F1",
    borderBottomWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 3, 
  }
});

export default HomeScreen;