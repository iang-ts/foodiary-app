import { useNavigation } from '@react-navigation/native';
import { AppHeader } from '@ui/components/AppHeader';
import { Button } from '@ui/components/Button';
import { FormGroup } from '@ui/components/FormGroup';
import { Input } from '@ui/components/Input';
import React from 'react';
import { Controller } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { useEditGoalsController } from './useEditGoalsController';

export function EditGoals() {
  const { top, bottom } = useSafeAreaInsets();
  const { goBack } = useNavigation();
  const {
    form,
    handleSubmit,
    carbohydratesInputRef,
    proteinsInputRef,
    fatsInputRef,
    isLoading,
  } = useEditGoalsController();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <AppHeader title="Suas Metas" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.content}
          contentContainerStyle={{ minHeight: '100%' }}
        >
          <View style={styles.form}>
            <Controller
              control={form.control}
              name="calories"
              render={({ field, fieldState }) => (
                <FormGroup label="Calorias" error={fieldState.error?.message}>
                  <Input
                    keyboardType="numeric"
                    returnKeyType="next"
                    onSubmitEditing={() => carbohydratesInputRef.current?.focus()}
                    value={field.value}
                    onChangeText={field.onChange}
                    disabled={isLoading || form.formState.isSubmitting}
                    error={!!fieldState.error}
                    suffix="kcal"
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="carbohydrates"
              render={({ field, fieldState }) => (
                <FormGroup label="Carboidratos" error={fieldState.error?.message}>
                  <Input
                    ref={carbohydratesInputRef}
                    keyboardType="numeric"
                    returnKeyType="next"
                    onSubmitEditing={() => proteinsInputRef.current?.focus()}
                    value={field.value}
                    onChangeText={field.onChange}
                    disabled={isLoading || form.formState.isSubmitting}
                    error={!!fieldState.error}
                    suffix="g"
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="proteins"
              render={({ field, fieldState }) => (
                <FormGroup label="Proteínas" error={fieldState.error?.message}>
                  <Input
                    ref={proteinsInputRef}
                    keyboardType="numeric"
                    returnKeyType="next"
                    onSubmitEditing={() => fatsInputRef.current?.focus()}
                    value={field.value}
                    onChangeText={field.onChange}
                    disabled={isLoading || form.formState.isSubmitting}
                    error={!!fieldState.error}
                    suffix="g"
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="fats"
              render={({ field, fieldState }) => (
                <FormGroup label="Gorduras" error={fieldState.error?.message}>
                  <Input
                    ref={fatsInputRef}
                    keyboardType="numeric"
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit}
                    value={field.value}
                    onChangeText={field.onChange}
                    disabled={isLoading || form.formState.isSubmitting}
                    error={!!fieldState.error}
                    suffix="g"
                  />
                </FormGroup>
              )}
            />
          </View>

          <View style={[styles.footer, { paddingBottom: bottom + 10 }]}>
            <View style={{ flex: 1 }}>
              <Button
                variant='secondary'
                onPress={goBack}
                isLoading={form.formState.isSubmitting}
              >
                Cancelar
              </Button>
            </View>

            <View style={{ flex: 1 }}>
              <Button
                onPress={handleSubmit}
                isLoading={form.formState.isSubmitting}
              >
                Salvar
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
