import { Button } from "@ui/components/Button";
import { theme } from "@ui/styles/theme";
import { ChevronLeftIcon } from 'lucide-react-native';
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

export function OnboardingHeader() {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginTop: top }]}>
      <Button size="icon" variant="ghost">
        <ChevronLeftIcon color={theme.colors.black[700]} />
      </Button>

      <View style={styles.progressBarBackground}>
        <View style={styles.progressBarForeground} />
      </View>

      <View style={styles.rightActionPlaceholder} />
    </View>
  );
}
