import { Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Text style={[styles.header, { color: colors.tertiaryText }]}>
      {title.toUpperCase()}
    </Text>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: Typography.footnoteSemibold.fontSize,
    fontWeight: Typography.footnoteSemibold.fontWeight,
    lineHeight: Typography.footnoteSemibold.lineHeight,
    letterSpacing: 0.5,
    marginBottom: Spacing.md,
    marginTop: Spacing.xl,
  },
});
