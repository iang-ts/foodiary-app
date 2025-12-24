import { useUpdateProfile } from '@app/hooks/mutations/useUpdateProfile';
import { useAccount } from '@app/hooks/queries/useAccount';
import { Gender } from '@app/types/Gender';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, TextInput } from 'react-native';
import { editProfileSchema, EditProfileSchema } from './schema';

export function useEditProfileController() {
  const heightInputRef = useRef<TextInput>(null);
  const weightInputRef = useRef<TextInput>(null);

  const { account, isLoading } = useAccount();
  const { updateProfile, isPending } = useUpdateProfile();

  const form = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema as any),
    defaultValues: {
      name: '',
      birthDate: new Date(),
      height: '',
      weight: '',
      gender: Gender.MALE,
    },
  });

  useEffect(() => {
    if (account?.profile) {
      form.reset({
        name: account.profile.name,
        birthDate: account.profile.birthDate,
        height: String(account.profile.height),
        weight: String(account.profile.weight),
        gender: account.profile.gender,
      });
    }
  }, [account]);

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const year = data.birthDate.getFullYear();
      const month = String(data.birthDate.getMonth() + 1).padStart(2, '0');
      const day = String(data.birthDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      await updateProfile({
        name: data.name,
        birthDate: formattedDate,
        height: Number(data.height),
        weight: Number(data.weight),
        gender: data.gender,
      });

      Alert.alert('Sucesso!', 'Perfil atualizado com sucesso');
    } catch (error) {
      console.log(error);
      Alert.alert('Oops!', 'Não foi possível salvar o perfil');
    }
  });

  return {
    form,
    handleSubmit,
    heightInputRef,
    weightInputRef,
    isLoading: isLoading || isPending,
  };
}
