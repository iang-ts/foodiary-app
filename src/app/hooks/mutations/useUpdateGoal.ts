import { queryClient } from '@app/lib/queryClient';
import { GoalService } from '@app/services/GoalService';
import { useMutation } from '@tanstack/react-query';

export function useUpdateGoal() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: GoalService.UpdateGoalPayload) => {
      await GoalService.updateGoal(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
  });

  return {
    updateGoal: mutateAsync,
    isPending,
  };
}
