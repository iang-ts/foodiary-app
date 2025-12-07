import { HomeContext, IHomeContextValue } from ".";

interface IHomeProviderProps extends IHomeContextValue {
  children: React.ReactElement;
}

export function HomeProvider({ children, ...ctxValue }: IHomeProviderProps) {
  return (
    <HomeContext value={ctxValue}>
      {children}
    </HomeContext>
  );
}
