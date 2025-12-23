import { AppStackRouteProps } from "@app/navigation/AppStack";
import { useRoute } from "@react-navigation/native";
import { AppText } from "@ui/components/AppText";
import React from "react";
import { View } from "react-native";
import { styles } from "./styles";

export function MealDetails() {
  const { params } = useRoute<AppStackRouteProps<'MealDetails'>>();
  return (
    <View style={styles.container}>
      <AppText>Meal: {params.mealId}</AppText>
    </View>
  )
}
