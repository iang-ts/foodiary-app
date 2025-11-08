import { zodResolver } from "@hookform/resolvers/zod";
import { OnboardingStack } from "@ui/screens/Onboarding/OnboardingStack";
import { theme } from "@ui/styles/theme";
import { FormProvider, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { OnboardingHeader } from "./components/OnboardingHeader";
import { OnboardingProvider } from "./context/OnboardingProvider";
import { onboardingSchema } from "./schema";

export function Onboarding() {
  const form = useForm({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      birthDate: new Date(),
      height: '',
      weight: '',
      account: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      }
    },
  });

  return (
    <FormProvider {...form}>
      <OnboardingProvider>
        <View style={{ flex: 1, backgroundColor: theme.colors.white }}>
          <KeyboardAvoidingView
            style={{ flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <OnboardingHeader />
            <OnboardingStack />
          </KeyboardAvoidingView>
        </View>
      </OnboardingProvider>
    </FormProvider>
  );
}
