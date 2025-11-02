import { AppText } from "@ui/components/AppText";
import { View } from "react-native";

export function Onboarding() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AppText size="3xl" weight="semiBold">Onboarding</AppText>
    </View>
  )
}
