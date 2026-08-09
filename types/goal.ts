export type GoalStatus = "on-track" | "behind" | "ahead" | "at-risk" | "started";
export type GoalPriority = "high" | "medium" | "low";
export type GoalCategory =
  | "Personal Growth"
  | "Health & Fitness"
  | "Finance"
  | "Education"
  | "Career"
  | "Relationships"
  | "Hobbies"
  | "Home";

export interface Goal {
  id: string;
  title: string;
  description?: string;
  category: GoalCategory;
  icon: string;
  progress: number; // 0-100
  current: number;
  target: number;
  unit: string;
  status: GoalStatus;
  priority: GoalPriority;
  startDate?: Date;
  targetDate?: Date;
  tip?: string;
}

export interface ActivityData {
  date: string; // ISO date format "2024-01-15"
  level: 0 | 1 | 2 | 3 | 4; // Activity intensity
  tasksCompleted: number;
  goalsWorkedOn: number;
}
