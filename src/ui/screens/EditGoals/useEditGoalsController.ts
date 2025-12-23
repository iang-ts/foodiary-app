import { useUpdateGoal } from '@app/hooks/mutations/useUpdateGoal';
import { useAccount } from '@app/hooks/queries/useAccount';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, TextInput } from 'react-native';
import { editGoalsSchema, EditGoalsSchema } from './schema';

export function useEditGoalsController() {
  const carbohydratesInputRef = useRef<TextInput>(null);
  const proteinsInputRef = useRef<TextInput>(null);
  const fatsInputRef = useRef<TextInput>(null);

  const { goBack } = useNavigation();
  const { account, isLoading } = useAccount();
  const { updateGoal, isPending } = useUpdateGoal();

  const form = useForm<EditGoalsSchema>({
    resolver: zodResolver(editGoalsSchema as any),
    defaultValues: {
      calories: '',
      carbohydrates: '',
      proteins: '',
      fats: '',
    },
  });

  useEffect(() => {
    if (account?.goal) {
      form.reset({
        calories: String(account.goal.calories),
        carbohydrates: String(account.goal.carbohydrates),
        proteins: String(account.goal.proteins),
        fats: String(account.goal.fats),
      });
    }
  }, [account]);

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await updateGoal({
        calories: Number(data.calories),
        carbohydrates: Number(data.carbohydrates),
        proteins: Number(data.proteins),
        fats: Number(data.fats),
      });

      Alert.alert('Sucesso!', 'Metas atualizadas com sucesso');
    } catch (error) {
      console.log(error);
      Alert.alert('Oops!', 'Não foi possível salvar as metas');
    }
  });

  return {
    form,
    handleSubmit,
    carbohydratesInputRef,
    proteinsInputRef,
    fatsInputRef,
    isLoading: isLoading || isPending,
  };
}
