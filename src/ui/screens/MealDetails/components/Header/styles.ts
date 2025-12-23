import { theme } from '@ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.black[700],
  },
  image: {
    height: 211,
  },
  overlay: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 12,
  },
  blurView: {
    width: 48,
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    paddingRight: 16,
  },
  pageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  caloriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  macrosContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  macro: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  macrosProgress: {
    height: 4,
    flexDirection: 'row',
  },
  proteinProgress: {
    height: '100%',
    width: '20%',
    backgroundColor: theme.colors.support.teal,
  },
  carbohydratesProgress: {
    height: '100%',
    width: '20%',
    backgroundColor: theme.colors.support.yellow,
  },
  fatsProgress: {
    height: '100%',
    width: '20%',
    backgroundColor: theme.colors.support.orange,
  },
  divider: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[400],
    borderStyle: 'dashed',
  },
  mealName: {
    letterSpacing: -0.24,
  },
  mealItemsHeader: {
    marginHorizontal: 20,
    marginBottom: 8,
  },
});
