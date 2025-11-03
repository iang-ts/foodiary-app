import { AppText } from "@ui/components/AppText";
import { OnboardingStack } from "@ui/screens/Onboarding/OnboardingStack";
import { View } from "react-native";
import { OnboardingProvider } from "./context/OnboardingProvider";

export function Onboarding() {
  return (
    <OnboardingProvider>
      <View style={{ flex: 1 }}>
        <AppText size="3xl" weight="semiBold" style={{ marginTop: 50 }}>Onboarding</AppText>
        <OnboardingStack />
      </View>
    </OnboardingProvider>
  );
}
