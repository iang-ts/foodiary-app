import { Meal, MealInputTYpe } from "@app/types/Meal";
import { useNavigation } from "@react-navigation/native";
import { AppText } from "@ui/components/AppText";
import { Button } from "@ui/components/Button";
import { theme } from "@ui/styles/theme";
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeftIcon } from "lucide-react-native";
import { Skeleton } from "moti/skeleton";
import React, { useMemo } from "react";
import { ImageBackground, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

interface iHeaderProps {
  isLoading: boolean;
  meal: Meal | undefined;
}

export function Header({ meal, isLoading }: iHeaderProps) {
  const { top } = useSafeAreaInsets();
  const { goBack } = useNavigation();

  const isPictureInput = meal?.inputType === MealInputTYpe.PICTURE;

  const summary = useMemo(() => (
    (meal?.foods ?? []).reduce(
      (acc, food) => {
        const proteinCalories = food.proteins * 4;
        const carbohydratesCalories = food.carbohydrates * 4;
        const fatsCalories = food.fats * 9;
        const totalCalories = Math.round(proteinCalories + carbohydratesCalories + fatsCalories);

        return {
          calories: acc.calories + totalCalories,
          carbohydrates: acc.carbohydrates + food.carbohydrates,
          proteins: acc.proteins + food.proteins,
          fats: acc.fats + food.fats,
        }

      },
      { calories: 0, proteins: 0, carbohydrates: 0, fats: 0 },
    )
  ), [meal?.foods]);

  const percentages = useMemo(() => {
    const proteinCalories = summary.proteins * 4;
    const carbohydratesCalories = summary.carbohydrates * 4;
    const fatsCalories = summary.fats * 9;

    if (summary.calories === 0) {
      return { proteins: 0, carbohydrates: 0, fats: 0 };
    }

    return {
      proteins: Math.round((proteinCalories / summary.calories) * 100),
      carbohydrates: Math.round((carbohydratesCalories / summary.calories) * 100),
      fats: Math.round((fatsCalories / summary.calories) * 100),
    };
  }, [summary]);

  return (
    <>
      <StatusBar animated translucent barStyle="light-content" />

      <View style={styles.container}>
        {isPictureInput && (
          <ImageBackground
            source={{
              uri: meal.inputFileURL,
            }}
            style={styles.image}
          >
            <LinearGradient
              colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']}
              start={{ y: 0.6, x: 0 }}
              end={{ y: 1, x: 0 }}
              style={[styles.overlay, { paddingTop: top + 12 }]}
            >
              <BlurView style={styles.blurView}>
                <Button onPress={goBack} size="icon" variant="ghost">
                  <ChevronLeftIcon size={20} color={theme.colors.white} />
                </Button>
              </BlurView>
            </LinearGradient>
          </ImageBackground>
        )}

        <View style={[styles.content, { marginTop: !isPictureInput ? top : 0 }]}>
          <View style={styles.pageTitleContainer}>
            <Button onPress={goBack} size="icon" variant="ghost">
              <ChevronLeftIcon size={20} color={theme.colors.white} />
            </Button>
            <AppText color={theme.colors.gray[300]} weight="medium">Refeição</AppText>
          </View>

          <View style={styles.caloriesContainer}>
            <AppText color={theme.colors.gray[300]}>Calorias</AppText>
            <Skeleton colorMode="dark" width={61} height={24}>
              {isLoading ? null : (
                <AppText color={theme.colors.white} weight="medium">{summary.calories}kcal</AppText>
              )}
            </Skeleton>

          </View>
        </View>
      </View>

      <View style={styles.macrosContainer}>
        <View style={styles.macro}>
          <AppText color={theme.colors.gray[700]}>Proteínas</AppText>
          <Skeleton colorMode="light" width={96} height={24}>
            {isLoading ? null : (
              <AppText weight="medium" color={theme.colors.support.teal}>{summary.proteins}g ({percentages.proteins}%)</AppText>
            )}
          </Skeleton>
        </View>

        <View style={styles.macro}>
          <AppText color={theme.colors.gray[700]}>Carboidratos</AppText>
          <Skeleton colorMode="light" width={96} height={24}>
            {isLoading ? null : (
              <AppText weight="medium" color={theme.colors.support.yellow}>{summary.carbohydrates}g ({percentages.carbohydrates}%)</AppText>
            )}
          </Skeleton>
        </View>

        <View style={styles.macro}>
          <AppText color={theme.colors.gray[700]}>Gorduras</AppText>
          <Skeleton colorMode="light" width={96} height={24}>
            {isLoading ? null : (
              <AppText weight="medium" color={theme.colors.support.orange}>{summary.fats}g ({percentages.fats}%)</AppText>
            )}
          </Skeleton>
        </View>
      </View>

      <View style={{ marginHorizontal: 20, marginTop: 4, }}>
        <Skeleton colorMode="light" width="100%" height={4}>
          {isLoading ? null : (
            <View style={styles.macrosProgress}>
              <View
                style={[styles.proteinProgress, { width: `${percentages.proteins}%` }]}
              />
              <View
                style={[styles.carbohydratesProgress, { width: `${percentages.carbohydrates}%` }]}
              />
              <View
                style={[styles.fatsProgress, { width: `${percentages.fats}%` }]}
              />
            </View>
          )}
        </Skeleton>
      </View>

      <View style={styles.divider} />

      <View style={{
        margin: 20,
        marginBottom: 24,
      }}>
        <Skeleton colorMode="light" width={180} height={24}>
          {isLoading ? null : (
            <AppText size="xl" weight="semiBold" style={styles.mealName}>
              {meal?.name}
            </AppText>
          )}
        </Skeleton>
      </View>

      <AppText size="base" weight="medium" color={theme.colors.gray[700]} style={styles.mealItemsHeader}>
        Itens
      </AppText>
    </>
  )
}
