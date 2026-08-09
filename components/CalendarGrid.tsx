import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import * as Haptics from "expo-haptics";
import { Calendar, DateData } from "react-native-calendars";

interface CalendarGridProps {
  currentMonth: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onMonthChange: (date: Date) => void;
  datesWithTasks?: Set<string>; // ISO date strings - dates that have tasks
  datesWithIncompleteTasks?: Set<string>; // ISO date strings - dates with incomplete tasks
}

export function CalendarGrid({
  selectedDate,
  onDateSelect,
  onMonthChange,
  datesWithTasks = new Set(),
  datesWithIncompleteTasks = new Set(),
}: CalendarGridProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // Format selected date for react-native-calendars
  const selectedDateString = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : "";

  // Build marked dates object
  const markedDates: { [date: string]: any } = {};

  // Mark dates with tasks
  datesWithTasks.forEach((dateKey) => {
    const hasIncompleteTasks = datesWithIncompleteTasks.has(dateKey);
    markedDates[dateKey] = {
      marked: true,
      dotColor: hasIncompleteTasks ? "#FF3B30" : "#34C759",
    };
  });

  // Mark selected date
  if (selectedDateString) {
    markedDates[selectedDateString] = {
      ...markedDates[selectedDateString],
      selected: true,
      selectedColor: colors.tint,
    };
  }

  const handleDayPress = (day: DateData) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const date = new Date(day.year, day.month - 1, day.day);
    onDateSelect(date);
  };

  const handleMonthChange = (month: DateData) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const date = new Date(month.year, month.month - 1, 1);
    onMonthChange(date);
  };

  return (
    <Calendar
      onDayPress={handleDayPress}
      onMonthChange={handleMonthChange}
      markedDates={markedDates}
      theme={{
        backgroundColor: colors.cardBackground,
        calendarBackground: colors.cardBackground,
        textSectionTitleColor: colors.secondaryText,
        selectedDayBackgroundColor: colors.tint,
        selectedDayTextColor: "#FFFFFF",
        todayTextColor: colors.tint,
        dayTextColor: colors.text,
        textDisabledColor: colors.secondaryText + "40",
        dotColor: colors.tint,
        selectedDotColor: "#FFFFFF",
        arrowColor: colors.text,
        monthTextColor: colors.text,
        textDayFontWeight: "400",
        textMonthFontWeight: "700",
        textDayHeaderFontWeight: "400",
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 12,
      }}
      style={{
        borderRadius: 12,
        padding: 8,
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
        elevation: 1,
      }}
    />
  );
}
