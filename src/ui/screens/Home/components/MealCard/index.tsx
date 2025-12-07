import { Meal } from "@app/types/Meal";
import { AppText } from "@ui/components/AppText";
import { theme } from "@ui/styles/theme";
import { useMemo } from "react";
import { Platform, Pressable, View } from "react-native";
import { useHomeContext } from "../../context/usehomeContext";
import { styles } from "./styles";

interface IMealCardProps {
  meal: Meal;
}

export function MealCard({ meal }: IMealCardProps) {
  const { isLoading } = useHomeContext();

  const formattedFoods = useMemo(() => (
    meal.foods.map(food => food.name).join(', ')
  ), [meal.foods]);

  const summary = useMemo(() => (
    meal.foods.reduce(
      (acc, food) => ({
        calories: acc.calories + food.calories,
        carbohydrates: acc.carbohydrates + food.carbohydrates,
        proteins: acc.proteins + food.proteins,
        fats: acc.fats + food.fats,
      }),
      { calories: 0, proteins: 0, carbohydrates: 0, fats: 0 },
    )
  ), [meal.foods]);

  return (
    <View style={[styles.container, { opacity: isLoading ? 0.5 : 1 }]}>
      <AppText color={theme.colors.gray[700]}>
        {formatTime(meal.createdAt)}
      </AppText>

      <View style={styles.wrapper}>
        <Pressable
          disabled={isLoading}
          android_ripple={{
            color: 'rgba(0, 0, 0, 0.1)',
            foreground: true,
          }}
          style={({ pressed }) => [
            styles.card,
            pressed && Platform.OS === 'ios' && { opacity: 0.5 },
          ]}
        >
          <View style={styles.header}>
            <View style={styles.icon}>
              <AppText>{meal.icon}</AppText>
            </View>

            <View style={styles.mealDetails}>
              <AppText color={theme.colors.gray[700]} size="sm" numberOfLines={1}>{meal.name}</AppText>
              <AppText weight="medium" numberOfLines={1}>{formattedFoods}</AppText>
            </View>
          </View>

           <View style={styles.body}>
            <View style={styles.mealStatsRow}>
              <View style={styles.mealStat}>
                <AppText weight="medium" color={theme.colors.support.tomato}>{Math.round(summary.calories)}</AppText>
                <AppText color={theme.colors.gray[700]}>Kcal</AppText>
                <AppText weight="medium" color={theme.colors.support.teal}>{Math.round(summary.proteins)}g</AppText>
                <AppText color={theme.colors.gray[700]}>Proteínas</AppText>
              </View>
               <View style={styles.mealStat}>
                <AppText weight="medium" color={theme.colors.support.yellow}>{Math.round(summary.carbohydrates)}g</AppText>
                <AppText color={theme.colors.gray[700]}>Carboídratos</AppText>
                <AppText weight="medium" color={theme.colors.support.orange}>{Math.round(summary.fats)}g</AppText>
                <AppText color={theme.colors.gray[700]}>Gorduras</AppText>
              </View>
            </View>
            </View>
        </Pressable>
      </View>
    </View>
  )
}

function formatTime(date: Date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}h${minutes}`
}
