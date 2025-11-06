import { Button } from "@ui/components/Button";
import { FormGroup } from "@ui/components/FormGroup";
import { Input } from "@ui/components/Input";
import React from "react";
import { View } from "react-native";
import { Step, StepContent, StepFooter, StepHeader, StepSubTitle, StepTitle } from "../components/Step";
import { useOnboarding } from "../context/useOnboarding";

export function CreateAccountStep() {
  const { nextStep } = useOnboarding();
  const emailInputRef = React.useRef<any>(null);
  const passwordInputRef = React.useRef<any>(null);
  const confirmPasswordInputRef = React.useRef<any>(null);

  function handleSubmit() {
    nextStep();
  }

  return (
    <Step>
      <StepHeader>
        <StepTitle>Crie sua conta</StepTitle>
        <StepSubTitle>Para poder visualizar seu progresso</StepSubTitle>
      </StepHeader>

      <StepContent>
        <View style={{ gap: 24 }}>
          <FormGroup label="Nome">
            <Input
              placeholder="João Silva"
              autoCapitalize="words"
              autoCorrect={false}
              autoComplete="name"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />
          </FormGroup>

          <FormGroup label="E-mail">
            <Input
              ref={emailInputRef}
              placeholder="joaosilva@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
          </FormGroup>

          <FormGroup label="Senha">
            <Input
              ref={passwordInputRef}
              placeholder="Mínimo 8 caracteres"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="new-password"
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
            />
          </FormGroup>

          <FormGroup label="Confirmar Senha">
            <Input
              ref={confirmPasswordInputRef}
              placeholder="Mínimo 8 caracteres"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="new-password"
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
          </FormGroup>
        </View>
      </StepContent>

      <StepFooter>
        <Button onPress={handleSubmit}>
          Criar conta
        </Button>
      </StepFooter>
    </Step>
  );
}
