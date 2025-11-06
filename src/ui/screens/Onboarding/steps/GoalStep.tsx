import { Button } from "@ui/components/Button";
import { RadioGroup, RadioGroupIcon, RadioGroupItem, RadioGroupLabel } from "@ui/components/RadioGroup";
import { theme } from "@ui/styles/theme";
import { ArrowRightIcon } from "lucide-react-native";
import React from "react";
import { Step, StepContent, StepFooter, StepHeader, StepSubTitle, StepTitle } from "../components/Step";
import { useOnboarding } from "../context/useOnboarding";

export enum Goal {
  LOSE = 'LOSE',
  MAINTAIN = 'MAINTAIN',
  GAIN = 'GAIN'
}

export function GoalStep() {
  const { nextStep } = useOnboarding();

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual é seu objetivo?</StepTitle>
        <StepSubTitle>O que você pretende alcançar com a dieta?</StepSubTitle>
      </StepHeader>

      <StepContent>
        <RadioGroup>
          <RadioGroupItem value={Goal.LOSE}>
            <RadioGroupIcon>🥦</RadioGroupIcon>
            <RadioGroupLabel>Perder Peso</RadioGroupLabel>
          </RadioGroupItem>
          <RadioGroupItem value={Goal.MAINTAIN}>
            <RadioGroupIcon>🍓</RadioGroupIcon>
            <RadioGroupLabel>Manter o Peso</RadioGroupLabel>
          </RadioGroupItem>
          <RadioGroupItem value={Goal.GAIN}>
            <RadioGroupIcon>🥩</RadioGroupIcon>
            <RadioGroupLabel>Ganhar Peso</RadioGroupLabel>
          </RadioGroupItem>
        </RadioGroup>
      </StepContent>

      <StepFooter>
        <Button size="icon" onPress={nextStep}>
          <ArrowRightIcon size={20} color={theme.colors.black[700]} />
        </Button>
      </StepFooter>
    </Step>
  )
}
