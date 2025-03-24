import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { GestureHandlerRootView, FlatList, ScrollView } from 'react-native-gesture-handler';
import { IFoodItem } from '@/types/utils';
import FoodItem from '@/components/FoodItem';
import GradientText from '@/components/GradientText';
import { SafeAreaView } from 'react-native-safe-area-context';
import '@/reanimatedConfig';

const date = new Date();

const FOOD_ITEMS: IFoodItem[] = [
  {
    id: 1,
    name: 'Caprese Pizza',
    amount: '$ 8',
    quantity: 2, 
    imageUrl: require("../assets/images/pizza-italiana.jpeg"),
    date
  },
  {
    id: 2,
    name: 'French Fries',
    amount: '$ 4',
    quantity: 1,
    imageUrl: require("../assets/images/french-fries.jpg"),
    date
  },
  {
    id: 4,
    name: 'Milk Shake',
    amount: '$ 5',
    quantity: 4,
    imageUrl: require("../assets/images/milkshake.jpeg"),
    date
  },
];

function HomeScreen() {
  const [allItems, setAllItems] = useState(FOOD_ITEMS);

  const flatListRef = useRef(null);
  const panRef = useRef<React.Ref<any> | undefined>(undefined);

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <StatusBar hidden={true} backgroundColor={'transparent'} translucent/>
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/images/pizza-italiana.jpeg")} style={styles.image} alt="Italian Pizza" />
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.topView}>
        <GradientText style={{ fontSize: 18, fontWeight: 900 }}>Your Cart Food Items</GradientText>
        <Text style={styles.seeMenu}>see menu</Text>
        </View>
        <GestureHandlerRootView>
          <FlatList 
            ref={flatListRef} 
            data={allItems} 
            simultaneousHandlers={panRef} 
            keyExtractor={(_item, _) => _item.id.toString()} 
            renderItem={renderItem} 
          />
        </GestureHandlerRootView>
      </View>
    </View>
  </SafeAreaView>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 300,
    width: "100%",
    backgroundColor: "#475569"
  },
  innerContainer: {
    height: 380,
    width: '100%',
    backgroundColor: "#475569"
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
    backgroundColor: "#020617",
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