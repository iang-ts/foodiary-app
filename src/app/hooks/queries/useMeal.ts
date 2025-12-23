import { MealsService } from '@app/services/MealService';
import { MealStatus } from '@app/types/Meal';
import { useQuery } from '@tanstack/react-query';

const processingStatuses = [
  MealStatus.UPLOADING,
  MealStatus.QUEUED,
  MealStatus.PROCESSING,
];

export function useMeal(mealId?: string) {
  const { data: meal, isFetching } = useQuery({
    queryKey: ['meal', mealId],
    staleTime: Infinity,
    enabled: !!mealId,
    queryFn: async () => {
      const { meal } = await MealsService.getMealsById(mealId!);

      return meal;
    },
    refetchInterval: (query) => {
      const mealsStatus = query.state.data?.status;
      if (mealsStatus && processingStatuses.includes(mealsStatus)) {
        return 3_000;
      }

      return false;
    },
  });

  const isProcessing = !!(meal && processingStatuses.includes(meal.status));

  return {
    meal,
    isLoading: isFetching,
    isProcessing,
  };
}
