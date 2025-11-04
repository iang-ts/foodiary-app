import { theme } from "@ui/styles/theme";
import React, { createContext, use, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { AppText } from "../AppText";
import { styles } from "./styles";

interface IRadioGroupContextValue {
  value: string | null;
  setValue: (value: string | null) => void;
}

const RadioGroupContext = createContext({} as IRadioGroupContextValue)

interface IRadioGrouProps {
  children: React.ReactNode,
  initalValue?: string | null;
}

export function RadioGroup({ children, initalValue }: IRadioGrouProps) {
  const [value, setValue] = useState<string | null>(initalValue ?? null);

  return (
    <RadioGroupContext.Provider
      value={{ value, setValue }}
    >
      <View style={styles.container}>
        {children}
      </View>
    </RadioGroupContext.Provider>
  )
}

interface IRadioGroupItemProps {
  children: React.ReactNode;
  value: string;
}

const RadioGroupItemContext = createContext({ isSelected: false });

export function RadioGroupItem({ children, value }: IRadioGroupItemProps) {
  const { value: selectedValue, setValue } = use(RadioGroupContext);
  const isSelected = value === selectedValue;

  return (
    <RadioGroupItemContext.Provider value={{ isSelected }}>
      <TouchableOpacity style={[styles.item, isSelected && styles.selectedItem]} onPress={() => setValue(value)}>
        {children}
      </TouchableOpacity>
    </RadioGroupItemContext.Provider>
  );
}

export function RadioGroupIcon({ children }: { children: string }) {
  const { isSelected } = use(RadioGroupItemContext);

  return (
    <View style={[styles.icon, isSelected && styles.iconSelected]}>
      <AppText size="base">{children}</AppText>
    </View>
  );
}

export function RadioGroupLabel({ children }: { children: string }) {
  return (
    <AppText weight="semiBold" style={{ letterSpacing: -0.32 }}>{children}</AppText>
  );
}

export function RadioGroupDescription({ children }: { children: string }) {
  return (
    <AppText size="sm" color={theme.colors.gray[700]}>{children}</AppText>
  );
}

export function RadioGroupItemInfo({ children }: { children: React.ReactNode; }) {
  return (
    <View style={styles.itemInfo}>
      {children}
    </View>
  );
}
