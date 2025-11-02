import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { AppText } from '../AppText';
import { ISignInBottomSheet } from './iSignInBottomSheet';
import { useSignInBottomSheetController } from './useSignInBottomSheetController';

interface ISignInBottomSheetProps {
  ref: React.Ref<ISignInBottomSheet>;
}

export function SignInBottomSheet({ ref }: ISignInBottomSheetProps) {
  const { bottom, bottomSheetModalRef } = useSignInBottomSheetController(ref);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal ref={bottomSheetModalRef}>
        <BottomSheetView style={{ paddingBottom: bottom }}>
          <AppText>Acesse a sua conta</AppText>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
