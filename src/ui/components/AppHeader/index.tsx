import { useNavigation } from "@react-navigation/native";
import { AppText } from "@ui/components/AppText";
import { Button } from "@ui/components/Button";
import { theme } from "@ui/styles/theme";
import { ChevronLeftIcon } from 'lucide-react-native';
import React from "react";
import { View } from "react-native";
import { styles } from "./styles";

interface AppHeaderProps {
  title: string;
  rightAction?: React.ReactNode;
}

export function AppHeader({ title, rightAction }: AppHeaderProps) {
  const { goBack } = useNavigation();


  return (
    <View style={styles.container}>
      <Button size="icon" variant="ghost" onPress={goBack}>
        <ChevronLeftIcon color={theme.colors.black[700]} />
      </Button>

      <AppText size="sm">
        {title}
      </AppText>

      <View style={styles.rightAction}>
        {rightAction}
      </View>
    </View>
  );
}
