import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lime[900],
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  video: {
    width: 136,
    height: 136,
    borderRadius: 68,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
});
