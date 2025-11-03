import { OnboardingStack } from "@ui/screens/Onboarding/OnboardingStack";
import { View } from "react-native";
import { OnboardingHeader } from "./components/OnboardingHeader";
import { OnboardingProvider } from "./context/OnboardingProvider";

export function Onboarding() {
  return (
    <OnboardingProvider>
      <View style={{ flex: 1 }}>
        <OnboardingHeader />
        <OnboardingStack />
      </View>
    </OnboardingProvider>
  );
}
