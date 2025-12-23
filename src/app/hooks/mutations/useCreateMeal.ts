import { getFileInfo } from '@app/lib/getFileInfo';
import { MealsService } from '@app/services/MealService';
import { useMutation } from '@tanstack/react-query';

export function useCreateMeal() {
  const { mutateAsync, isPending, data } = useMutation({
    mutationFn: async (fileUri: string) => {
      const { size, type, fileName } = await getFileInfo(fileUri);

      const { mealId } = await MealsService.createMeal({
        file: {
          size,
          type,
          name: fileName,
          uri: fileUri,
        },
      });

      return {
        mealId,
      };
    },
  });

  return {
    createMeal: mutateAsync,
    createdMealId: data?.mealId,
    isPending,
  };
}
