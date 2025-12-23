import { useAuth } from '@app/contexts/AuthContext/useAuth';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import React, { useImperativeHandle, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ISignInBottomSheet } from './ISignInBottomSheet';
import { signInSchema } from './schema';

export function useSignInBottomSheetController(ref: React.Ref<ISignInBottomSheet>) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { bottom } = useSafeAreaInsets();
  const { signIn } = useAuth();

  const form = useForm({
    resolver: zodResolver(signInSchema as any),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetModalRef.current?.present(),
   }), []);

   const handleSubmit = form.handleSubmit(async data => {
    try {
      setIsLoading(true);
      await signIn(data);
    } catch (error) {
      setIsLoading(true);
      if (isAxiosError(error)) {
        Alert.alert('Oops!', 'As credenciais informadas são inválidas');
      }
    }
   });

  return {
    bottom,
    bottomSheetModalRef,
    passwordInputRef,
    form,
    handleSubmit,
    isLoading,
  };
}
