import { BorderRadius, Colors, Spacing, Typography } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import * as Haptics from "expo-haptics";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AIInsightCardProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  onClose?: () => void;
}

export function AIInsightCard({
  title,
  description,
  actionLabel,
  onAction,
  onClose,
}: AIInsightCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose?.();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.accent,
        },
      ]}
    >
      {onClose && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleClose}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.closeIcon, { color: colors.secondaryText }]}>
            ×
          </Text>
        </TouchableOpacity>
      )}
      <View style={styles.header}>
        <Text style={styles.icon}>💡</Text>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      </View>
      <Text style={[styles.description, { color: colors.secondaryText }]}>
        {description}
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.accent }]}
        onPress={onAction}
      >
        <Text style={styles.buttonText}>{actionLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xs,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    elevation: 3,
  },
  closeButton: {
    position: "absolute",
    top: Spacing.md,
    right: Spacing.md,
    zIndex: 1,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    fontSize: 28,
    fontWeight: "300",
    lineHeight: 28,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
    paddingRight: Spacing.xxl,
  },
  icon: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  title: {
    fontSize: Typography.bodySemibold.fontSize,
    fontWeight: Typography.bodySemibold.fontWeight,
    lineHeight: Typography.bodySemibold.lineHeight,
  },
  description: {
    fontSize: Typography.subheadline.fontSize,
    fontWeight: Typography.subheadline.fontWeight,
    lineHeight: Typography.subheadline.lineHeight,
    marginBottom: Spacing.lg,
  },
  button: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.button,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: Typography.subheadline.fontSize,
    fontWeight: "600",
    lineHeight: Typography.subheadline.lineHeight,
  },
});
