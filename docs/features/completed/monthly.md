# Monthly Screen - Product Requirements Document

## 1. Overview

The Monthly screen provides users with a **calendar-centric view** of their tasks and goals, enabling them to:

- Track monthly goal progress by category
- Visualize task distribution across the month
- Manage daily tasks with AI-powered suggestions
- Access monthly recap reports

---

## 2. Screen Structure

### 2.1 Header Section

**Components:**

- Month selector dropdown ("October 2023" + chevron icon)
- Status indicator ("DEEP FOCUS" with lightning icon)
- Grid view toggle button (top-right, but don't include it right now)

**Interactions:**

- Tap month → Open month picker modal (previous/next navigation)
- Tap DEEP FOCUS → it's the text user set for themselfs

**Styles:**

- Month title: 18-20px, Bold
- Status badge: 12px, Blue text with icon
- Background: Light gray (#F5F5F5) or theme background

---

### 2.2 Category Progress Cards

**Layout:**

- Horizontal scrollable grid (2 columns visible, more scrollable)
- Each card displays: Icon, Category name, Percentage, Progress bar

**Data Model:**

```typescript
interface CategoryProgress {
  id: string;
  name: string; // "Health", "Learning", "Work"
  icon: string; // SF Symbol name (e.g., "heart.fill", "book.fill")
  color: string; // Primary color (#FF6B6B, #4A90E2)
  percentage: number; // 0-100
  completedTasks: number;
  totalTasks: number;
}
```

**Interactions:**

- Tap card → Navigate to category detail view with task breakdown
- Swipe horizontally → View more categories

**Styles:**

- Card: White background, 16px border radius, light shadow
- Icon circle: 48x48px, colored background
- Percentage: 36px, Bold
- Progress bar: 6px height, rounded, colored fill
- Card spacing: 12px gap

---

### 2.3 Calendar Component

**Features:**

- Full month grid view (7 columns × 5-6 rows)
- Navigation arrows for previous/next month (earliest of this plan year)
- Visual indicators for task density
- Highlight current date
- Week day headers (S M T W T F S)

**Date States:**

- **Today**: Blue circular background (#4A90E2), white text
- **Has tasks**: Small dot indicator below date or badge count
- **All tasks completed**: Green checkmark or border
- **Past dates**: Gray text (#999999)
- **Future dates**: Default text color
- **Selected date**: Light blue background

**Interactions:**

- Tap date → Scroll to that date's task list (or filter tasks)
- Swipe left/right → Navigate months (alternative to arrows)
- Tap arrows → Navigate to previous/next month

**Styles:**

- Container: White card, 16px radius, padding 16px
- Month title: 16px, Bold, centered
- Day labels: 12px, gray (#8E8E93)
- Date numbers: 16px, Regular
- Indicator dot: 4px circle below date

---

### 2.4 Daily Task List

**Section Header:**

- "Today, Oct 5" (dynamic date)
- Task count badge ("5 Tasks")

**Task Card Types:**

**A. Regular Task Card**
consider to combine with the Task type in today screen, in the end they should be the same Type

```typescript
interface Task {
  id: string;
  title: string;
  category: string; // it's customized based on user's content
  time?: string; // "10:00 AM - 12:00 PM" or "5:30 PM"
  completed: boolean;
  hasAI: boolean; // Shows AI badge
  priority: "high" | "medium" | "low";
}
```

**B. AI Suggestion Card** (Schedule Optimization)

- Distinct background color (light blue/purple tint)
- Icon (sparkle/brain icon)
- Title + description text
- Action buttons: "Reschedule" (primary) + "Dismiss" (secondary)
- Dismissed cards are hidden and logged

**Task Card Layout:**

- Checkbox (left)
- Task content (title, category, time)
- Drag handle icon (right, ⋮⋮)
- AI badge if applicable

**Interactions:**

- Tap checkbox → Toggle completion (with haptic feedback)
- Tap card → Open task detail/edit modal
- Long press → Enable drag-to-reorder
- Swipe left → Show delete/reschedule options
- Tap AI badge → View AI reasoning/suggestions

**Styles:**

- Card: White, 12px radius, 2px shadow
- Completed tasks: Line-through text, 50% opacity
- Category label: Small colored pill
- Time text: 13px, gray

---

### 2.5 Monthly Recap Card (Ignore this part right now)

**Purpose:**
Encourage continued engagement by teasing upcoming monthly summary

**Content:**

- Lock icon + "Monthly Recap" title
- "Keep going!" heading
- Countdown text: "Your October story will be ready in **23 days**"
- Link: "View September Recap"

**Interactions:**

- Tap card → Show locked state animation or preview
- Tap "View September Recap" → Navigate to previous month's report
- Available on last day of month or beginning of next month

**Styles:**

- Light blue/purple gradient background
- Lock icon: 24px
- Countdown number: Bold

---

### 2.6 Floating Action Button (do the same as in today's screen)

---

## 3. Data Flow

### 3.1 On Screen Load

```
1. Fetch current month's tasks
2. Calculate category progress percentages
3. Determine calendar date states (has tasks, completed)
4. Load today's task list
5. Check for AI suggestions (schedule conflicts, optimization)
```

### 3.2 User Actions

- **Change month** → Fetch new month's data, update calendar
- **Complete task** → Update UI optimistically, sync to backend
- **Reorder tasks** → Update positions, save to state
- **Accept AI suggestion** → Execute action (reschedule), update tasks

---

## 4. Technical Specifications

### 4.1 Components Needed

- `MonthPicker` - Dropdown selector
- `CategoryProgressCard` - Reusable progress display
- `CalendarGrid` - Interactive month view
- `TaskCard` - Reusable task item (similar to Today screen)
- `AISuggestionCard` - Special card for AI recommendations
- `MonthlyRecapCard` - Teaser card for reports

### 4.2 State Management

```typescript
interface MonthlyScreenState {
  selectedDate: Date;
  currentMonth: Date;
  tasks: Task[];
  categoryProgress: CategoryProgress[];
  aiSuggestions: AISuggestion[];
  showRecapCard: boolean;
}
```

### 4.3 APIs Required

- `GET /tasks?month=YYYY-MM` - Fetch month's tasks
- `GET /progress/categories?month=YYYY-MM` - Category stats
- `GET /ai/suggestions` - AI-generated suggestions
- `POST /tasks/:id/complete` - Toggle task completion
- `GET /recap/:month` - Monthly recap report

---

## 5. Design Specifications

### 5.1 Spacing

- Section gaps: 24px
- Card internal padding: 16px
- Horizontal card gaps: 12px

### 5.2 Colors (Light Mode)

- Background: #F5F5F5
- Card background: #FFFFFF
- Primary blue: #4A90E2
- Success green: #34C759
- Text primary: #1C1C1E
- Text secondary: #8E8E93
- Health red: #FF6B6B
- Learning blue: #4A90E2

### 5.3 Typography

- Screen title: 20px, Bold
- Section headers: 18px, Bold
- Card title: 16px, Semibold
- Body text: 14px, Regular
- Caption: 12px, Regular

### 5.4 Shadows

- Cards: `0 1px 3px rgba(0,0,0,0.1)`
- Active state: `0 4px 12px rgba(0,0,0,0.15)`

---

## 6. Edge Cases & States

### 6.1 Empty States

- **No tasks this month**: Show illustration + "Plan your month" CTA
- **No category progress**: Hide progress cards or show 0%
- **No AI suggestions**: Don't show AI card

### 6.2 Loading States

- Skeleton loaders for cards during data fetch
- Calendar dates load with animation

### 6.3 Error Handling

- Failed to load tasks: Show retry button
- Offline mode: Use cached data, show sync indicator

---

## 7. Success Metrics

- **Engagement**: % of users viewing calendar daily
- **Task completion**: Average tasks completed per month
- **AI adoption**: % of AI suggestions accepted
- **Retention**: Users returning to view monthly recap

---

## 8. Future Enhancements

- Week view toggle
- Multi-month comparison
- Share monthly recap to social media
- Calendar sync with Google/Apple Calendar
- Custom category creation
- Habit tracking integration
