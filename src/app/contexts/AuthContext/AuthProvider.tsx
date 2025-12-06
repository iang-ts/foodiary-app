import * as SplashScreen from 'expo-splash-screen';

import { useForceRender } from '@app/hooks/app/useForceRender';
import { useAccount } from "@app/hooks/queries/useAccount";
import { AuthTokensManager } from "@app/lib/AuthTokensManager";
import { AuthService } from "@app/services/AuthService";
import { Service } from "@app/services/Service";
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useLayoutEffect, useState } from "react";
import { AuthContext } from ".";

SplashScreen.preventAutoHideAsync();

interface ISetupAuthParams {
  accessToken: string;
  refreshToken: string;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  const { account, loadAccount } = useAccount({ enabled: false });
  const queryClient = useQueryClient();
  const forceRender = useForceRender();

  const signOut = useCallback(async () => {
    Service.removeAccessToken();
    Service.removeRefreshTokenHandler();

    queryClient.clear();
    forceRender();

    await AuthTokensManager.clear();
  }, [queryClient]);

  const setupAuth = useCallback(async (tokens: ISetupAuthParams) => {
    Service.setAcessToken(tokens.accessToken);
    Service.setRefreshTokenHandler(async () => {
      try {
        const storedTokens = await AuthTokensManager.load();
        if (!storedTokens) {
          throw new Error('Tokens not found')
        }

        const newTokens = await AuthService.refresh({
          refreshToken: storedTokens.refreshToken
        });

        Service.setAcessToken(newTokens.accessToken);
        await AuthTokensManager.save(newTokens);
      } catch (error) {
        signOut();
        throw error;
      }
    });

    await loadAccount();

    SplashScreen.hideAsync();
    setIsReady(true);
  }, [signOut])

  useLayoutEffect(() => {
    async function load() {
      const tokens = await AuthTokensManager.load();

      if (!tokens) {
        setIsReady(true);
        SplashScreen.hideAsync();
        return;
      }

      await setupAuth(tokens);
    }

    load();
  }, [loadAccount])

  const signIn = useCallback(async (payload: AuthService.SignInPayload) => {
    const tokens = await AuthService.signIn(payload);
    await AuthTokensManager.save(tokens);
    await setupAuth(tokens);
  }, []);

  const signUp = useCallback(async (payload: AuthService.SignUpPayload) => {
    const tokens = await AuthService.signUp(payload);
    await AuthTokensManager.save(tokens);
    await setupAuth(tokens);
    setSignedUp(true);
  }, []);

  if (!isReady) return null;

  return (
    <AuthContext.Provider value={{
      signedIn: !!account,
      signIn,
      signedUp,
      signUp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}
