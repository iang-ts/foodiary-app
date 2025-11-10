import { AccountService } from '@app/services/AccountService';
import { useQuery } from '@tanstack/react-query';

interface IUseAccountParams {
  enabled?: boolean;
}

export function useAccount(params?: IUseAccountParams) {
  const { data, refetch, isLoading } = useQuery({
    enabled: params?.enabled ?? true,
    queryKey: ['account'],
    queryFn: () => AccountService.getMe(),
    staleTime: Infinity,
  });

  return {
    account: data,
    loadAccount: refetch,
    isLoading,
  };
}
