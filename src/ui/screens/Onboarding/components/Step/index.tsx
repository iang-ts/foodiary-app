import { AppText } from "@ui/components/AppText";
import { theme } from "@ui/styles/theme";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

export function Step({ children }: { children: React.ReactNode; }) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      {children}
    </View>
  );
}


export function StepHeader({ children }: { children: React.ReactNode; }) {
  return (
    <View style={styles.header}>
      {children}
    </View>
  );
}

export function StepTitle({ children }: { children: string; }) {
  return (
    <View style={styles.header}>
      <AppText size="3xl" weight="semiBold" style={styles.title}>
        {children}
      </AppText>
    </View>
  );
}

export function StepSubTitle({ children }: { children: string; }) {
  return (
    <View style={styles.header}>
      <AppText color={theme.colors.gray[700]} style={styles.subTitle}>
        {children}
      </AppText>
    </View>
  );
}

export function StepContent({ children }: { children: React.ReactNode; }) {
  return (
    <View style={styles.content}>
      {children}
    </View>
  );
}

export function StepFooter({ children }: { children: React.ReactNode; }) {
  return (
    <View style={styles.footer}>
      {children}
    </View>
  );
}
