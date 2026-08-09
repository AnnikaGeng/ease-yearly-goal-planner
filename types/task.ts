export type TaskSection = 'priority' | 'morning' | 'afternoon' | 'evening';

export type TaskCategory =
  | 'Daily Sync'
  | 'Team Call'
  | 'Development'
  | 'Planning'
  | 'Personal'
  | 'Urgent'
  | 'Health'
  | 'Learning'
  | 'Work';

export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  section: TaskSection;
  completed: boolean;

  // Only for priority section
  position?: number;

  // Only for time sections
  time?: string; // Format: "HH:mm" or "HH:mm AM/PM - HH:mm AM/PM"

  // Monthly screen features
  hasAI?: boolean; // Shows AI badge
  priority?: TaskPriority;
  date?: string; // ISO date string for monthly tasks
}

export interface DragState {
  isDragging: boolean;
  draggedTask: Task | null;
  draggedIndex: number;
  startY: number;
  offsetY: number;
}
