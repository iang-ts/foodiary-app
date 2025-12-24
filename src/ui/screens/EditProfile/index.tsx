import { Gender } from '@app/types/Gender';
import { useNavigation } from '@react-navigation/native';
import { AppHeader } from '@ui/components/AppHeader';
import { Button } from '@ui/components/Button';
import { DateInput } from '@ui/components/DateInput';
import { FormGroup } from '@ui/components/FormGroup';
import { Input } from '@ui/components/Input';
import { RadioGroup, RadioGroupIcon, RadioGroupItem, RadioGroupLabel } from '@ui/components/RadioGroup';
import { formatDecimal } from '@ui/utils/formatDecimal';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { useEditProfileController } from './useEditProfileController';

export function EditProfile() {
  const { top, bottom } = useSafeAreaInsets();
  const { goBack } = useNavigation();
  const {
    form,
    handleSubmit,
    heightInputRef,
    weightInputRef,
    isLoading,
  } = useEditProfileController();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <AppHeader title="Perfil" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.content}
          contentContainerStyle={{ minHeight: '100%' }}
        >
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://github.com/iang-ts.png' }}
              style={styles.avatar}
            />
          </View>

          <View style={styles.form}>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormGroup label="Nome" error={fieldState.error?.message}>
                  <Input
                    returnKeyType="next"
                    onSubmitEditing={() => heightInputRef.current?.focus()}
                    value={field.value}
                    onChangeText={field.onChange}
                    disabled={isLoading || form.formState.isSubmitting}
                    error={!!fieldState.error}
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="birthDate"
              render={({ field, fieldState }) => (
                <FormGroup label="Data de Nascimento" error={fieldState.error?.message}>
                  <DateInput
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isLoading || form.formState.isSubmitting}
                    error={!!fieldState.error}
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="height"
              render={({ field, fieldState }) => (
                <FormGroup label="Altura" error={fieldState.error?.message}>
                  <Input
                    ref={heightInputRef}
                    keyboardType="numeric"
                    returnKeyType="next"
                    onSubmitEditing={() => weightInputRef.current?.focus()}
                    value={field.value}
                    onChangeText={field.onChange}
                    disabled={isLoading || form.formState.isSubmitting}
                    error={!!fieldState.error}
                    suffix="cm"
                    formatter={formatDecimal}
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="weight"
              render={({ field, fieldState }) => (
                <FormGroup label="Peso" error={fieldState.error?.message}>
                  <Input
                    ref={weightInputRef}
                    keyboardType="numeric"
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit}
                    value={field.value}
                    onChangeText={field.onChange}
                    disabled={isLoading || form.formState.isSubmitting}
                    error={!!fieldState.error}
                    formatter={formatDecimal}
                    suffix="kg"
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="gender"
              render={({ field, fieldState }) => (
                <FormGroup label="Sexo" error={fieldState.error?.message}>
                  <RadioGroup
                    orientation="horizontal"
                    error={!!fieldState.error}
                    value={field.value}
                    onChangeValue={(value) => field.onChange(value)}
                  >
                    <RadioGroupItem value={Gender.MALE}>
                      <RadioGroupIcon>👨</RadioGroupIcon>
                      <RadioGroupLabel>Masculino</RadioGroupLabel>
                    </RadioGroupItem>
                    <RadioGroupItem value={Gender.FEMALE}>
                      <RadioGroupIcon>👩</RadioGroupIcon>
                      <RadioGroupLabel>Feminino</RadioGroupLabel>
                    </RadioGroupItem>
                  </RadioGroup>
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
