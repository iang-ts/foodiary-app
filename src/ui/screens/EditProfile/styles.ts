import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  form: {
    padding: 20,
    gap: 32,
    flex: 1,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[400],
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
});
