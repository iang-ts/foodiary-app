import { Button } from "@ui/components/Button";
import { ChevronLeftIcon } from 'lucide-react-native';
import { Animated, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { theme } from "@ui/styles/theme";

import React, { useEffect, useRef } from "react";
import { useOnboarding } from "../../context/useOnboarding";
import { TOTAL_STEPS } from "../../steps";
import { styles } from "./styles";

export function OnboardingHeader() {
  const { top } = useSafeAreaInsets();
  const { previousStep, currentStepIndex } = useOnboarding();

  const widthAnimation = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(widthAnimation.current, {
      toValue: (currentStepIndex + 1) * 100 / TOTAL_STEPS,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentStepIndex]);

  return (
    <View style={[styles.container, { marginTop: top }]}>
      <Button size="icon" variant="ghost" onPressOut={previousStep}>
        <ChevronLeftIcon color={theme.colors.black[700]} />
      </Button>

      <View
        style={styles.progressBarBackground}
      >
        <Animated.View
          style={[styles.progressBarForeground, {
            width: widthAnimation.current.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          }]}
        />
      </View>

      <View style={styles.rightActionPlaceholder} />
    </View>
  );
}
