import { MealsService } from '@app/services/MealService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export function useMeals(date: Date) {
  const [formattedDate] = date.toISOString().split('T');

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['meals', formattedDate],
    queryFn: async () => {
      const { meals } = await MealsService.getMealsByDate(formattedDate);
      return meals;
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  return {
    meals: data ?? [],
    isInitialLoading: isLoading,
    isLoading: isFetching,
    loadMeals: refetch,
  };
}
