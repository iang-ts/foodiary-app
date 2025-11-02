import { theme } from "@ui/styles/theme";
import React, { useState } from "react";
import { FocusEvent, TextInput, TextInputProps } from "react-native";
import { inputStyles } from "./styles";

type BaseTextInputProps = Omit<TextInputProps, 'readOnly'>;

export interface InputProps extends BaseTextInputProps {
  error?: boolean;
  disabled?: boolean;
  InputComponent?: React.ComponentType<TextInputProps>;
  ref?: React.Ref<TextInput>;
}

export function Input({
  style,
  onFocus,
  onBlur,
  disabled,
  error,
  InputComponent = TextInput,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  function handleFocus(event: FocusEvent) {
    setIsFocused(true);
    onFocus?.(event);
  }

  function handleBlur(event: FocusEvent) {
    setIsFocused(false);
    onBlur?.(event);
  }

  return (
    <InputComponent
      style={[
        inputStyles({
         status: error ? 'error' : (isFocused ? 'focus' : 'default'),
         disabled: disabled ? 'true' : 'false',
        }),
        style,
      ]}
      placeholderTextColor={theme.colors.gray[700]}
      onFocus={handleFocus}
      onBlur={handleBlur}
      readOnly={disabled}
      {...props}
    />
  );
}
