# Today Screen Design Documentation (Final Version)

## 1. Overview

The Today Screen is the core interface of the application, displaying the user's daily task planning. The design follows Apple Human Interface Guidelines, emphasizing simplicity, usability, and visual feedback. This final version uses a simplified interaction model where only priority tasks can be reordered through drag-and-drop.

## 2. Page Structure

### 2.1 Navigation Bar

- **Left**: Menu button temporarily removed
- **Center**: Date display (Large Title style - "Monday, Oct 24")
- **Right**: Year Goal progress ring (78%), tap to navigate to Year page
- **Below**: Greeting text "Good Morning, Alex"

### 2.2 Content Sections

1. **AI Insight Card** (optional): Smart suggestions for schedule optimization
2. **HIGH PRIORITY Section**: Draggable tasks without fixed times
3. **TIME oriented Section**: Time-based tasks (read-only display)
4. **Footer Message**: "All other tasks are scheduled for tomorrow"

### 2.3 Bottom Navigation

- Tab bar with 4 options: Today, Monthly, Yearly, Map
- Use NativeTabs, NativeTabs.Trigger, Label, Icon from "expo-router/unstable-native-tabs";
- Build Apple Glass liquid native tab bar

## 3. Component Architecture

### 3.1 TaskCard Component (Draggable - Priority Section)

Reusable card component for priority tasks with drag-and-drop functionality.

**Props:**

- `id`: String - Unique identifier
- `title`: String - Task title
- `category`: String - Task category (Daily Sync, Team Call, Development, etc.)
- `position`: Number - Sort order within priority section
- `isDraggable`: Boolean - Always true for priority tasks

**Visual States:**

- Default: White background, normal shadow
- Pressed (long-press 0.5s): Slight scale down
- Dragging: Scale(1.02), elevated shadow, reduced opacity (0.8)
- Completed: Reduced opacity (0.5), no drag handle

**Structure:**

```
┌─────────────────────────────────────┐
│ [○] Task Title               ⋮⋮     │
│     Category Tag                    │
└─────────────────────────────────────┘
```

### 3.2 TaskCard Component (Static - Time Sections)

Display-only card component for scheduled tasks.

**Props:**

- `id`: String - Unique identifier
- `title`: String - Task title
- `category`: String - Task category
- `time`: String - Scheduled time (HH:mm format)

**Visual States:**

- Default: White background, normal shadow
- Completed: Reduced opacity (0.5)
- No dragging functionality

**Structure:**

```
┌─────────────────────────────────────┐
│ [○] Task Title                      │
│     Category Tag    14:00           │
└─────────────────────────────────────┘
```

### 3.3 SectionHeader Component

Section divider with title.

**Props:**

- `title`: String - Section name (e.g., "HIGH PRIORITY", "AFTERNOON", "EVENING")

**Style:**

- Font: SF Pro Text, 13pt, Semibold
- Color: System Gray (#8E8E93)
- Letter spacing: 0.5px
- All caps
- Margin bottom: 12pt

### 3.4 AIInsightCard Component

Special card for AI-generated suggestions.

**Props:**

- `title`: String
- `description`: String
- `actionLabel`: String
- `onAction`: Function

## 4. Interaction Design

### 4.1 Priority Section Behavior

**Section**: HIGH PRIORITY

**Drag Interaction:**

1. User long-presses on the drag handle (⋮⋮) on the right side of a TaskCard
2. After 0.5s:
   - Haptic feedback triggers (UIImpactFeedbackStyle.medium)
   - Card enters dragging state (lifts with shadow, scale increases to 1.02)
   - Opacity reduces to 0.8
3. User can drag vertically to reorder within the priority section
4. Other cards animate smoothly to make space
   - Spring animation (damping: 0.8, response: 0.4)
   - Cards move up or down based on dragged card position
5. Real-time reordering as user drags over other cards
6. On release:
   - Card snaps to new position with spring animation
   - Medium haptic feedback confirms
   - All cards update their positions

**Visual Feedback:**

- Long press (0.5s): Medium haptic (UIImpactFeedbackStyle.medium)
- Drag in progress: Card lifts, other cards shift smoothly
- Drop: Medium haptic (UIImpactFeedbackStyle.medium)
- Cancel (release before 0.5s): No action

**Important Notes:**

- Task times do NOT exist in priority section (these are unscheduled tasks)
- Only the order/position changes
- Completed tasks cannot be dragged
- Smooth animations maintain visual continuity

### 4.2 Time-Based Sections Behavior

**Sections**: MORNING, AFTERNOON, EVENING, based on if user has tasks inside of that time period, if not, don't show the section title

**Static Display:**

- Cards are **not draggable**
- Display title, category, and scheduled time
- Time is edited manually through task settings (not via drag interaction)
- Users can tap the card to open edit modal (future enhancement)

**Rationale for Simplified Design:**

- Drag-to-adjust-time proved too complex for reliable UX
- Manual time editing provides more precise control
- Focuses interaction on what matters: priority ordering
- Cleaner, more predictable user experience

### 4.3 Haptic Feedback Specifications

Following Apple's guidelines for tactile feedback:

| Event             | Haptic Type   | Description                        |
| ----------------- | ------------- | ---------------------------------- |
| Long press (0.5s) | Medium Impact | Card "lifts" and becomes draggable |
| Drop/Release      | Medium Impact | Card "lands" in new position       |

**Simplified from original design:**

- Removed light impact on press start (too subtle)
- Removed selection haptics during drag (unnecessary)
- Only two haptic moments: lift and drop

### 4.4 Animation Specifications

All animations follow Apple's standard curves:

**Priority Section Dragging:**

- **Card lift**: Immediate (no animation on long-press detection)
- **Card drag**: Follows finger position (no animation, direct manipulation)
- **Other cards reorder**: Spring animation (damping: 0.8, response: 0.4, duration: ~0.3s)
- **Card drop**: Spring animation (damping: 0.7, response: 0.3)
- **Card scale on drag**: 1.0 → 1.02 (instant)

**General Transitions:**

- **Section transitions**: Fade (duration: 0.2s, ease-in-out)
- **Card appearance**: Fade + slight scale (duration: 0.3s, spring)

## 5. Layout Specifications

### 5.1 Spacing (Following iOS HIG)

- Screen padding: 16pt (horizontal)
- Section spacing: 24pt (vertical)
- Card spacing: 12pt (vertical)
- Card padding: 16pt (internal)
- Corner radius: 12pt (cards), 8pt (buttons)
- Drag handle width: 40pt × 40pt (minimum touch target)

### 5.2 Typography (SF Pro)

- Date: Large Title (34pt, Bold)
- Greeting: Body (17pt, Regular)
- Section headers: Footnote (13pt, Semibold, All Caps)
- Task titles: Body (17pt, Semibold)
- Task metadata: Subheadline (15pt for category), Footnote (13pt for time)
- Button text: Body (15pt, Semibold)

### 5.3 Colors (System Colors)

- Primary text: Label (system)
- Secondary text: Secondary Label (system)
- Tertiary text: Tertiary Label (system)
- Background: System Background (#F2F2F7 in light mode)
- Card background: Secondary System Background (white in light mode)
- Accent: System Blue (#007AFF)
- Urgent: System Red (#FF3B30)
- Goal: System Purple (#AF52DE)
- Completed: System Green (#34C759)
- Personal: System Gray (#8E8E93)
- Development: System Indigo (#5856D6)
- Planning: System Orange (#FF9500)

### 5.4 Card Layout Details

**Priority Section Card:**

```
Padding: 16pt all sides
├─ Checkbox: 24×24pt
├─ Gap: 12pt
├─ Content (flex: 1)
│  ├─ Title: 17pt semibold
│  └─ Category: 13pt semibold (colored)
├─ Gap: 12pt
└─ Drag Handle: 40×40pt (⋮⋮ icon, 20pt)
```

**Time Section Card:**

```
Padding: 16pt all sides
├─ Checkbox: 24×24pt
├─ Gap: 12pt
└─ Content (flex: 1)
   ├─ Title: 17pt semibold
   └─ Meta Row
      ├─ Category: 13pt semibold (colored)
      ├─ Gap: 8pt
      └─ Time: 13pt regular (gray)
```

## 6. State Management

### 6.1 Task Data Model

```typescript
interface Task {
  id: string;
  title: string;
  category: string;
  section: "priority" | "morning" | "afternoon" | "evening";

  // Only for priority section
  position?: number;

  // Only for time sections
  time?: string; // Format: "HH:mm"
}
```

### 6.2 Drag State

```typescript
interface DragState {
  isDragging: boolean;
  draggedElement: HTMLElement | null;
  draggedTask: Task | null;
  draggedIndex: number;
  startY: number;
  offsetY: number;
  longPressTimer: NodeJS.Timeout | null;
}
```

### 6.3 Priority Task Reordering Logic

```typescript
function reorderPriorityTasks(fromIndex: number, toIndex: number) {
  const priorityTasks = tasks
    .filter((t) => t.section === "priority")
    .sort((a, b) => a.position - b.position);

  // Remove task from old position
  const [movedTask] = priorityTasks.splice(fromIndex, 1);

  // Insert at new position
  priorityTasks.splice(toIndex, 0, movedTask);

  // Update all positions
  priorityTasks.forEach((task, index) => {
    task.position = index;
  });
}
```

## 7. Accessibility

### 7.1 VoiceOver Support

- All interactive elements have proper labels
- Drag handle: "Reorder button, double-tap and hold, then drag to reorder"
- Task cards: "Task title, category, status" (priority section)
- Task cards: "Task title, category, scheduled time, status" (time sections)
- Completion checkbox: "Mark complete" or "Completed"

### 7.2 Dynamic Type

- All text scales from -3 to +5 size classes
- Maintain minimum 44pt touch targets
- Layout adapts to larger text sizes

### 7.3 Reduce Motion

- When enabled, replace spring animations with linear transitions
- Reduce animation duration by 50%
- Maintain functionality without relying on motion

### 7.4 High Contrast Mode

- Increase border thickness from 1pt to 2pt
- Ensure 7:1 contrast ratio for all text
- Make drag handle more visible

## 8. Edge Cases & Error Handling

### 8.1 Empty States

**No Priority Tasks:**

```
┌─────────────────────────────────────┐
│   No high priority tasks today      │
│   Tap + to add a new task           │
└─────────────────────────────────────┘
```

**No Time-Based Tasks:**

```
┌─────────────────────────────────────┐
│   No tasks scheduled                │
└─────────────────────────────────────┘
```

### 8.2 Completed Tasks

- Remain in their section
- Visual opacity reduced to 50%
- Cannot be dragged (priority section)
- Can be unchecked to restore

### 8.3 Long Press Edge Cases

- **Accidental movement**: If user moves >5pt during long-press, cancel timer
- **Quick tap**: If released before 0.5s, no drag initiated
- **Scroll interference**: Disable scroll when drag is active

### 8.4 Drag Edge Cases

- **Drag beyond bounds**: Rubber-band effect at top/bottom of section
- **Rapid reordering**: Throttle position updates to every 50ms
- **Concurrent gestures**: Only one card can be dragged at a time

## 9. Performance Considerations

### 9.1 Rendering Optimization

- Use virtualization for long lists (>20 items)
- Lazy load task cards as they enter viewport
- Cache rendered card components
- Debounce reorder calculations

### 9.2 Animation Performance

- Use `transform` and `opacity` for animations (GPU-accelerated)
- Avoid animating `height`, `width`, `top`, `left`
- Use `will-change` hint for dragging element
- Remove `will-change` after animation completes

### 9.3 Haptic Performance

- Throttle haptic feedback to maximum 1 per 50ms
- Queue haptics if multiple fire simultaneously
- Avoid haptic overload which can drain battery

### 9.4 State Updates

- Batch position updates during drag
- Only commit to database on drag end
- Use optimistic UI updates
- Debounce auto-save to 1 second after changes

## 10. Implementation Guide

### 10.1 iOS Native (UIKit)

**Components:**

- `UICollectionView` with custom flow layout
- `UILongPressGestureRecognizer` for drag initiation (0.5s delay)
- `UIPanGestureRecognizer` for drag movement
- `UIImpactFeedbackGenerator` (medium weight) for haptics
- `CASpringAnimation` for reordering animations

**Key Classes:**

```swift
class TaskCardCell: UICollectionViewCell {
    let checkboxView: UIView
    let titleLabel: UILabel
    let categoryLabel: UILabel
    let timeLabel: UILabel?  // Only for time sections
    let dragHandle: UIView?  // Only for priority section
}

class PriorityCollectionViewController: UICollectionViewController {
    var draggedIndexPath: IndexPath?
    var draggedCell: UICollectionViewCell?

    @objc func handleLongPress(_ gesture: UILongPressGestureRecognizer)
    @objc func handlePan(_ gesture: UIPanGestureRecognizer)
}
```

### 10.2 iOS Native (SwiftUI)

**Components:**

```swift
struct TaskCard: View {
    let task: Task
    let isDraggable: Bool
    @Binding var draggedTask: Task?

    var body: some View {
        HStack(spacing: 12) {
            CheckboxView(status: task.status)
            TaskContent(task: task)
            if isDraggable {
                DragHandle()
            }
        }
        .padding(16)
        .background(Color.secondarySystemBackground)
        .cornerRadius(12)
        .shadow(radius: draggedTask?.id == task.id ? 10 : 1)
        .scaleEffect(draggedTask?.id == task.id ? 1.02 : 1.0)
    }
}

struct PrioritySection: View {
    @State private var draggedTask: Task?
    @State private var tasks: [Task]

    var body: some View {
        ForEach(tasks) { task in
            TaskCard(task: task, isDraggable: true, draggedTask: $draggedTask)
                .onLongPressGesture(minimumDuration: 0.5) {
                    draggedTask = task
                    triggerHaptic(.medium)
                }
                .gesture(
                    DragGesture()
                        .onChanged { value in
                            // Handle drag
                        }
                        .onEnded { value in
                            draggedTask = nil
                            triggerHaptic(.medium)
                        }
                )
        }
    }
}
```

### 10.3 Cross-Platform (React Native)

**Libraries:**

- `react-native-draggable-flatlist` - For drag-and-drop lists
- `react-native-haptic-feedback` - For tactile feedback
- `react-native-reanimated` - For smooth animations

**Key Components:**

```jsx
import DraggableFlatList from "react-native-draggable-flatlist";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const PrioritySection = ({ tasks, onReorder }) => {
  const renderItem = ({ item, drag, isActive }) => (
    <TaskCard
      task={item}
      isDraggable={true}
      onLongPress={() => {
        ReactNativeHapticFeedback.trigger("impactMedium");
        drag();
      }}
      isActive={isActive}
    />
  );

  return (
    <DraggableFlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onDragEnd={({ data }) => onReorder(data)}
      activationDistance={5}
      longPressDelay={500}
    />
  );
};
```

### 10.4 Web Implementation

**Key Technologies:**

- HTML5 Drag and Drop API (with polyfill for touch devices)
- CSS transforms for GPU-accelerated animations
- Vibration API for haptic feedback (mobile web)
- Intersection Observer for viewport optimization

**Example:**

```javascript
const handleLongPress = (e, card, task) => {
  let timer = setTimeout(() => {
    if (navigator.vibrate) {
      navigator.vibrate(10); // 10ms medium haptic
    }
    startDrag(card, task);
  }, 500);

  const clearTimer = () => {
    clearTimeout(timer);
    document.removeEventListener("mousemove", clearTimer);
    document.removeEventListener("touchmove", clearTimer);
  };

  document.addEventListener("mousemove", clearTimer);
  document.addEventListener("touchmove", clearTimer);
};
```

## 11. Testing Checklist

### 11.1 Functional Testing

- [ ] Long press activates drag after exactly 0.5 seconds
- [ ] Cards reorder correctly in all positions (top, middle, bottom)
- [ ] Haptic feedback fires on drag start and drop
- [ ] Completed tasks cannot be dragged
- [ ] Time section cards cannot be dragged
- [ ] Position updates persist after app restart
- [ ] Smooth animations without jank

### 11.2 Edge Case Testing

- [ ] Drag with one task in section
- [ ] Drag with 20+ tasks in section
- [ ] Quick tap doesn't activate drag
- [ ] Drag while scrolling doesn't break
- [ ] Rapid drag and drop multiple times
- [ ] App backgrounded during drag
- [ ] Network loss during drag

### 11.3 Accessibility Testing

- [ ] VoiceOver announces drag gesture correctly
- [ ] Double-tap and hold works with VoiceOver
- [ ] Dynamic Type scales correctly
- [ ] High contrast mode visible
- [ ] Reduce motion disables spring animations
- [ ] 44pt minimum touch targets maintained

### 11.4 Performance Testing

- [ ] 60fps during drag animation
- [ ] No memory leaks on repeated drags
- [ ] Haptic feedback doesn't lag
- [ ] Smooth on iPhone SE (lowest spec device)
- [ ] Battery impact acceptable (<1% per hour)

## 12. Future Enhancements

### 12.1 Potential Features (Not in Current Scope)

- **Drag between sections**: Move tasks from priority to time sections and vice versa
- **Swipe actions**: Quick actions (complete, delete, snooze) via swipe
- **Multi-select**: Batch operations on multiple tasks
- **Task grouping**: Collapsible groups within sections
- **Time editing modal**: Tap time section cards to edit time
- **Recurring tasks**: Support for daily/weekly repeating tasks
- **Task dependencies**: Link tasks that must be completed in order

### 12.2 Analytics to Track

- Frequency of drag operations
- Average time spent dragging
- Most common reordering patterns
- Drop-off points (where users stop using feature)
- Haptic feedback effectiveness (A/B test with/without)

### 12.3 A/B Testing Ideas

- Long-press duration: 0.3s vs 0.5s vs 0.7s
- Visual feedback: Scale 1.02 vs 1.05
- Animation speed: 0.3s vs 0.4s vs 0.5s
- Haptic patterns: Single vs double pulse

## 13. Design Rationale

### 13.1 Why Simplified from Original Design?

**Original Design Issues:**

- Timeline picker wheel was too complex
- Drag-to-adjust-time had poor discoverability
- High learning curve for new users
- Increased development and testing time
- More points of failure

**Simplified Design Benefits:**

- Single interaction pattern (drag to reorder)
- Familiar to users from other apps (email, notes)
- Easier to implement reliably
- Faster, more predictable UX
- Focus on core value: priority management

### 13.2 Why 0.5 Second Long Press?

- **Too short (<0.3s)**: Accidental activations during scrolling
- **Too long (>0.7s)**: Feels unresponsive, users give up
- **0.5s**: Sweet spot - iOS standard, proven effective

### 13.3 Why No Drag for Time Sections?

- **Manual time editing** is more precise and reliable
- **Reduced cognitive load** - one interaction to learn
- **Prevents accidents** - can't accidentally change scheduled times
- **Performance** - simpler rendering and state management

## 14. Conclusion

This design document specifies a simplified, robust implementation of the Today Screen with drag-and-drop reordering for priority tasks. The design prioritizes:

1. **Simplicity**: One clear interaction pattern
2. **Reliability**: Proven UX patterns from iOS
3. **Performance**: Optimized animations and haptics
4. **Accessibility**: Full VoiceOver and Dynamic Type support

The implementation should feel native, responsive, and delightful to use while avoiding complexity that doesn't add proportional value to the user experience.
