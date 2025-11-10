import { useAuth } from "@app/contexts/AuthContext/useAuth";
import { ErrorCode } from "@app/types/ErrorCode";
import { Button } from "@ui/components/Button";
import { FormGroup } from "@ui/components/FormGroup";
import { Input } from "@ui/components/Input";
import { isAxiosError } from "axios";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Alert, View } from "react-native";
import { Step, StepContent, StepFooter, StepHeader, StepSubTitle, StepTitle } from "../components/Step";
import { useOnboarding } from "../context/useOnboarding";
import { OnboardingSchema } from "../schema";

export function CreateAccountStep() {
  const { nextStep } = useOnboarding();
  const form =  useFormContext<OnboardingSchema>();
  const { signUp } = useAuth();

  const emailInputRef = React.useRef<any>(null);
  const passwordInputRef = React.useRef<any>(null);
  const confirmPasswordInputRef = React.useRef<any>(null);

  const handleSubmit = form.handleSubmit(async data => {
    try {
      const birthDate = data.birthDate.toISOString().split('T')[0];
      await signUp({
        account: {
          email: data.account.email,
          password: data.account.password,
        },
        profile: {
          name: data.account.name,
          activityLevel: data.activityLevel,
          birthDate,
          gender: data.gender,
          goal: data.goal,
          height: Number(data.height),
          weight: Number(data.weight),
        }
      });

    } catch (error) {
      if (isAxiosError(error) && error.response?.data?.error.code === ErrorCode.EMAIL_ALREADY_IN_USE) {
        console.log(JSON.stringify(error.response?.data, null, 2))
        Alert.alert('Oops!', 'Este email já está sendo usado por outro usuário.');
        return;
      }
      Alert.alert('Oops!', 'Ocorreu um erro ao criar a sua conta, tente novamente.');
    }
   });

  return (
    <Step>
      <StepHeader>
        <StepTitle>Crie sua conta</StepTitle>
        <StepSubTitle>Para poder visualizar seu progresso</StepSubTitle>
      </StepHeader>

      <StepContent>
        <View style={{ gap: 24 }}>
          <Controller
            control={form.control}
            name="account.name"
            render={({ field, fieldState }) => (
              <FormGroup label="Nome" error={fieldState.error?.message}>
                <Input
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="João Silva"
                  autoCapitalize="words"
                  autoCorrect={false}
                  autoComplete="name"
                  returnKeyType="next"
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                  disabled={form.formState.isSubmitting}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={form.control}
            name="account.email"
            render={({ field, fieldState }) => (
              <FormGroup label="E-mail" error={fieldState.error?.message}>
                <Input
                  value={field.value}
                  onChangeText={field.onChange}
                  ref={emailInputRef}
                  placeholder="joaosilva@gmail.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  disabled={form.formState.isSubmitting}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={form.control}
            name="account.password"
            render={({ field, fieldState }) => (
              <FormGroup label="Senha" error={fieldState.error?.message}>
                <Input
                  value={field.value}
                  onChangeText={field.onChange}
                  ref={passwordInputRef}
                  placeholder="Mínimo 8 caracteres"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="new-password"
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
                  disabled={form.formState.isSubmitting}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={form.control}
            name="account.confirmPassword"
            render={({ field, fieldState }) => (
              <FormGroup label="Confirmar Senha" error={fieldState.error?.message}>
                <Input
                  value={field.value}
                  onChangeText={field.onChange}
                  ref={confirmPasswordInputRef}
                  placeholder="Mínimo 8 caracteres"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="new-password"
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                  disabled={form.formState.isSubmitting}
                />
              </FormGroup>
            )}
          />
        </View>
      </StepContent>

      <StepFooter align="start">
        <Button onPress={handleSubmit} isLoading={form.formState.isSubmitting} >
          Criar conta
        </Button>
      </StepFooter>
    </Step>
  );
}
