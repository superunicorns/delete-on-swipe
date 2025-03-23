import { ImageSourcePropType } from "react-native";

export interface IFoodItem {
  id: number;
  name: string;
  amount: string;
  quantity: number; 
  imageUrl: ImageSourcePropType | undefined;
}