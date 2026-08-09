# Yearly Screen - Product Requirements Document

## 1. Overview

The Yearly Screen provides users with a comprehensive annual overview of their goals, progress, and activity patterns. It combines data visualization (activity heatmap), goal tracking, AI-powered insights, and motivational elements to help users understand their yearly progress and maintain momentum.

**Key Objectives:**

- Visualize yearly activity patterns and streaks
- Track progress across multiple goals
- Provide actionable AI insights
- Motivate continued engagement through visual feedback
- Enable goal prioritization and management

## 2. Page Structure

### 2.1 Navigation Header

- **Left**: Year selector dropdown (e.g., "2024 ▼")
- **Subtitle**: "Annual Overview" in secondary text
- **Height**: 60pt + safe area
- **Background**: System background (#F2F2F7)

### 2.2 Content Sections (Scrollable)

1. **Statistics Cards** - Overview metrics (2 cards side-by-side)
2. **Activity Map** - Yearly contribution-style heatmap
3. **AI Insight Card** - Personalized recommendations
4. **Your Goals** - List of all annual goals with progress
5. **Add Button** - Floating action button (FAB)

### 2.3 Bottom Navigation

- Tab bar with 4 options: Today, Monthly, Yearly, Map
- Yearly tab is active (blue highlight)

## 3. Component Architecture

### 3.1 YearSelector Component

**Props:**

- `selectedYear`: Number - Currently selected year
- `availableYears`: Number[] - List of years with data
- `onYearChange`: (year: number) => void

**Behavior:**

- Tap to open dropdown/picker
- Shows current year by default
- Allows navigation to previous years
- Animates transition when year changes

**Visual Design:**

```
┌─────────────────────────────────────┐
│ 2024 ▼          Annual Overview  ⋮⋮ │
└─────────────────────────────────────┘
```

### 3.2 StatCard Component

**Props:**

- `icon`: String - Icon name or emoji
- `value`: Number - Main metric value
- `label`: String - Description text
- `iconColor`: String - Icon background color
- `iconBackground`: String - Icon container background

**Structure:**

```
┌──────────────────┐
│  🏁    12        │
│  Total Goals     │
└──────────────────┘
```

**Variants:**

- Total Goals: Flag icon (🏁), blue accent
- Completed: Checkmark icon (✓), green accent
- In Progress: Clock icon (⏰), orange accent (future)
- Archived: Box icon (📦), gray accent (future)

**Layout:**

- 2 cards per row on phone
- 3-4 cards per row on tablet
- Equal width with 12pt gap
- 16pt padding inside card
- 12pt corner radius

### 3.3 ActivityMap Component

**Props:**

- `year`: Number - Year to display
- `activityData`: ActivityData[] - Daily activity records
- `currentStreak`: Number - Days in current streak
- `onDayPress`: (date: Date) => void - Optional callback

**Data Structure:**

```typescript
interface ActivityData {
  date: string; // ISO date format "2024-01-15"
  level: 0 | 1 | 2 | 3 | 4; // Activity intensity
  tasksCompleted: number;
  goalsWorkedOn: number;
}
```

**Visual Design:**

- Grid layout: 7 rows (Mon-Sun) × 53 columns (weeks)
- Cell size: 12×12pt on phone, 14×14pt on tablet
- Cell spacing: 2pt gap
- Corner radius: 2pt per cell
- Color scale: Less (light blue) → More (dark blue)
  - Level 0: #EBEDF0 (no activity)
  - Level 1: #C6E0F5 (light)
  - Level 2: #7FB3D5 (medium-light)
  - Level 3: #49A3D1 (medium)
  - Level 4: #1E7BA4 (intense)

**Interactive Elements:**

- Tap on day cell: Shows detail popover
- Popover shows: Date, tasks completed, goals worked on
- Current day highlighted with border

**Streak Display:**

- Positioned below heatmap
- Format: "You are on a **12 day streak!**"
- Blue accent color for streak number
- Motivational copy: "Consistent activity leads to 3× higher success rate."

**Month Labels:**

- Row above heatmap
- Shows: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
- Font: 11pt, semibold, gray (#8E8E93)

**Day Labels:**

- Column on left side
- Shows: Mon, Wed, Fri (alternating for space)
- Font: 11pt, regular, gray (#8E8E93)

### 3.4 AIInsightCard Component

**Props:**

- `title`: String - Insight title
- `message`: String - Main insight text
- `actionLabel`: String - CTA button text
- `actionUrl`: String - Navigation target
- `category`: Enum - 'suggestion' | 'warning' | 'celebration'
- `onAction`: () => void

**Visual Design:**

```
┌─────────────────────────────────────┐
│ ✨ AI INSIGHT                        │
│                                     │
│ You're slightly behind on reading.  │
│ Try reading 20 pages every Tuesday  │
│ to catch up.                        │
│                                     │
│         [ View Analysis → ]         │
└─────────────────────────────────────┘
```

**Styling:**

- Background: Gradient blue (#5B7EFF to #4D6BFF)
- Padding: 20pt all sides
- Corner radius: 16pt
- White text for all content
- Icon: Sparkles (✨) or robot (🤖)
- CTA button: Semi-transparent white background (rgba(255,255,255,0.2))
- Shadow: 0 4pt 12pt rgba(0,0,0,0.15)

**Types of Insights:**

- **Progress alerts**: "You're behind on [goal]"
- **Streak celebrations**: "5-day streak! Keep it up!"
- **Pattern recognition**: "You complete most tasks on Tuesdays"
- **Recommendations**: "Try breaking [large goal] into smaller tasks"
- **Motivational**: "You're 80% to your yearly target!"

**Behavior:**

- Swipeable if multiple insights exist
- Dots indicator at bottom if multiple
- Auto-rotates every 10 seconds
- Dismiss button (× in top right)
- Dismissed insights don't reappear for 7 days

### 3.5 GoalCard Component

**Props:**

- `goal`: Goal - Goal data object
- `onPress`: () => void - Navigate to goal detail
- `onMenuPress`: () => void - Open action menu

**Data Structure:**

```typescript
interface Goal {
  id: string;
  title: string;
  category: string;
  icon: string;
  progress: number; // 0-100
  current: number;
  target: number;
  unit: string;
  status: "on-track" | "behind" | "ahead" | "at-risk" | "started";
  priority: "high" | "medium" | "low";
  tip?: string; // Optional suggestion
}
```

**Visual Design:**

```
┌─────────────────────────────────────┐
│ 📚  Read Books               33%    │
│     Personal Growth                 │
│                                     │
│ 8 / 24 Books            ⚠️ Behind   │
│ ████████░░░░░░░░░░░░░░              │
│                                     │
│ 💡 Tip: Put aside $200 extra this  │
│    month to catch up.               │
└─────────────────────────────────────┘
```

**Layout Structure:**

```
Header Row:
├─ Icon (40×40pt circle background)
├─ Title + Category (flex: 1)
└─ Percentage (bold, large)

Progress Row:
├─ Current/Target text
└─ Status badge

Progress Bar:
└─ Full width, 8pt height, rounded

Tip Row (conditional):
└─ Light bulb icon + tip text
```

**Status Indicators:**

- **On Track**: Green badge, "On Track"
- **Behind**: Orange badge with warning icon, "Behind"
- **Ahead**: Blue badge, "Ahead"
- **At Risk**: Red badge, "At Risk"
- **Started**: Purple badge, "Started"

**Progress Bar Colors:**

- Behind: Orange (#FF9500)
- On Track: Blue (#007AFF)
- Ahead: Green (#34C759)
- At Risk: Red (#FF3B30)

**Category Colors (Icon Backgrounds):**

- Personal Growth: Orange (#FF9500)
- Health & Fitness: Blue (#007AFF)
- Finance: Green (#34C759)
- Education: Purple (#AF52DE)
- Career: Indigo (#5856D6)
- Relationships: Pink (#FF2D55)

**Tip Styling:**

- Background: Light yellow (#FFF9E6)
- Border: 1pt, #FFE4A1
- Corner radius: 8pt
- Padding: 12pt
- Icon: 💡 (light bulb)
- Font: 13pt, regular

### 3.6 SectionHeader Component

**Props:**

- `title`: String - Section title
- `action`: String? - Optional action text (e.g., "Sort by Priority")
- `onActionPress`: () => void?

**Structure:**

```
┌─────────────────────────────────────┐
│ Your Goals            Sort by Priority │
└─────────────────────────────────────┘
```

**Styling:**

- Title: 22pt, bold, black
- Action: 15pt, semibold, blue (#007AFF)
- Margin: 24pt top, 16pt bottom

### 3.7 FloatingActionButton (FAB)

**Props:**

- `icon`: String - Icon to display (usually "+")
- `onPress`: () => void
- `position`: { bottom: number, right: number }

**Visual Design:**

```
     ┌───────┐
     │   +   │
     └───────┘
```

**Styling:**

- Size: 56×56pt
- Background: Blue (#007AFF)
- Icon: White "+" (28pt)
- Corner radius: 28pt (circle)
- Shadow: 0 8pt 20pt rgba(0, 122, 255, 0.3)
- Position: Fixed, 88pt from bottom (above tab bar), 24pt from right

**Behavior:**

- Tap: Opens "Create Goal" modal
- Long press: Shows quick actions menu (future)
- Scroll: Shrinks slightly when scrolling down, returns when scrolling up
- Animation: Spring bounce on press

## 4. Interaction Design

### 4.1 Year Selection

**Interaction Flow:**

1. User taps "2024 ▼" in header
2. Picker/dropdown appears with available years
3. User selects different year
4. Content fades out (0.2s)
5. New year data loads
6. Content fades in (0.2s)
7. Scroll position resets to top

**Picker Options:**

- **iOS**: Native UIPickerView or action sheet
- **Android**: Bottom sheet with year list
- **Web**: Custom dropdown with smooth animation

### 4.2 Activity Map Interactions

**Daily Cell Tap:**

1. User taps on activity cell
2. Haptic feedback (light impact)
3. Popover appears above cell (or below if near top)
4. Shows:
   - Date: "Monday, January 15"
   - Tasks: "5 tasks completed"
   - Goals: "Worked on 3 goals"
   - Duration: "2h 35m active" (optional)

**Popover Design:**

- Background: White with shadow
- Corner radius: 12pt
- Padding: 16pt
- Arrow pointing to selected cell
- Tap outside to dismiss

**Visual Feedback:**

- Selected cell: Border highlight (2pt, blue)
- Hover (desktop): Slight scale increase (1.1)

### 4.3 AI Insight Interactions

**Primary Action:**

- Tap "View Analysis →" button
- Navigate to detailed insight page
- Smooth push transition

**Dismiss:**

- Swipe down or tap × button
- Card slides down and fades out
- Don't show again for 7 days

**Multiple Insights:**

- Swipe left/right to navigate
- Dot indicators at bottom
- Auto-advance every 10 seconds
- Pause auto-advance when user interacts

### 4.4 Goal Card Interactions

**Primary Tap:**

- Tap anywhere on card (except tip area)
- Navigate to Goal Detail screen
- Smooth push transition
- Pass goal ID and data

**Tip Interaction:**

- Tap on tip area
- Shows expanded tip with full explanation
- Optional: "Mark as done" or "Remind me later"

**Long Press (Future):**

- Shows context menu with:
  - Edit Goal
  - Change Priority
  - Archive Goal
  - Share Progress
  - Delete Goal

### 4.5 Goal Sorting

**Sort Options:**

1. **By Priority**: High → Medium → Low
2. **By Progress**: Behind → On Track → Ahead
3. **By Category**: Alphabetical grouping
4. **By Completion %**: Lowest → Highest
5. **Custom**: Manual reordering (drag & drop)

**Sorting Interaction:**

1. Tap "Sort by Priority" in section header
2. Bottom sheet appears with sort options
3. Current sort has checkmark
4. Select new sort option
5. Goals animate to new positions (staggered, 50ms delay each)
6. Sheet dismisses

**Animation:**

- Use shared element transitions
- Cards crossfade position changes
- Smooth spring animation (damping: 0.8)

### 4.6 Floating Action Button

**Create Goal Flow:**

1. Tap FAB
2. FAB scales down (0.9) with haptic
3. Modal slides up from bottom
4. Form appears with:
   - Goal title input
   - Category picker
   - Icon selector
   - Target value input
   - Unit selector
   - Priority selector
   - Save/Cancel buttons

**Scroll Behavior:**

- Scrolling down: FAB shrinks to 44×44pt, shows only icon
- Scrolling up: FAB expands back to 56×56pt
- At top of scroll: Always full size
- Threshold: 50pt scroll distance

### 4.7 Pull to Refresh

**Interaction:**

1. User pulls down from top of scroll view
2. Refresh indicator appears
3. Shows loading animation
4. Fetches latest data:
   - Activity data
   - Goal progress
   - AI insights
   - Statistics
5. Content updates with fade animation
6. Refresh indicator dismisses

**Visual Feedback:**

- Standard iOS refresh control (iOS)
- Material refresh indicator (Android)
- Custom animated icon (Web)

## 5. Data & State Management

### 5.1 Data Models

```typescript
interface YearlyData {
  year: number;
  statistics: YearlyStatistics;
  activityMap: ActivityData[];
  insights: AIInsight[];
  goals: Goal[];
  metadata: {
    lastUpdated: Date;
    totalDaysActive: number;
    currentStreak: number;
    longestStreak: number;
  };
}

interface YearlyStatistics {
  totalGoals: number;
  completedGoals: number;
  inProgressGoals: number;
  overallProgress: number; // 0-100
  totalTasksCompleted: number;
  totalHoursActive: number;
}

interface ActivityData {
  date: string; // "2024-01-15"
  level: 0 | 1 | 2 | 3 | 4;
  tasksCompleted: number;
  goalsWorkedOn: number;
  hoursActive: number;
}

interface AIInsight {
  id: string;
  type: "progress" | "streak" | "pattern" | "recommendation" | "motivation";
  priority: "high" | "medium" | "low";
  title: string;
  message: string;
  actionLabel: string;
  actionUrl: string;
  dismissedAt?: Date;
  createdAt: Date;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  progress: number; // 0-100
  current: number;
  target: number;
  unit: string;
  status: "on-track" | "behind" | "ahead" | "at-risk" | "started";
  priority: "high" | "medium" | "low";
  startDate: Date;
  targetDate: Date;
  tip?: string;
  milestones?: Milestone[];
}

interface Milestone {
  id: string;
  title: string;
  targetValue: number;
  completed: boolean;
  completedAt?: Date;
}
```

### 5.2 State Management

**Global State (Redux/Context):**

```typescript
interface YearlyScreenState {
  selectedYear: number;
  data: YearlyData | null;
  isLoading: boolean;
  error: string | null;
  sortOption: SortOption;
  selectedGoal: string | null;
  refreshing: boolean;
}

type SortOption =
  | "priority"
  | "progress"
  | "category"
  | "completion"
  | "custom";
```

**Local Component State:**

- Activity map hover state
- Insight card swipe position
- Goal card expansion state
- Sort menu visibility
- FAB size (based on scroll)

### 5.3 Data Loading Strategy

**Initial Load:**

1. Show skeleton screens for all sections
2. Load critical data first (statistics + goals)
3. Stream in activity map data (week by week)
4. Fetch AI insights last (can be delayed)

**Caching:**

- Cache yearly data locally (IndexedDB/AsyncStorage)
- Cache expires after 1 hour
- Background refresh when app opens
- Optimistic updates for goal progress

**Pagination:**

- Goals list: Load 10 at a time
- Infinite scroll or "Load More" button
- Activity map: Load full year at once (pre-calculated)

## 6. Layout Specifications

### 6.1 Spacing System (8pt Grid)

- **Section spacing**: 24pt
- **Card spacing**: 12pt
- **Inner padding**: 16pt
- **Tight spacing**: 8pt
- **Micro spacing**: 4pt

### 6.2 Responsive Breakpoints

**Phone (< 768pt width):**

- 2 stat cards per row
- Activity map: 12×12pt cells
- Single column goal cards
- 16pt horizontal padding

**Tablet (768-1024pt width):**

- 4 stat cards per row
- Activity map: 14×14pt cells
- 2 column goal cards
- 24pt horizontal padding

**Desktop (> 1024pt width):**

- 4-6 stat cards per row
- Activity map: 16×16pt cells
- 3 column goal cards
- Max width: 1200pt, centered
- 32pt horizontal padding

### 6.3 Typography Scale

**iOS (SF Pro):**

- Large Title: 34pt, Bold (Year + Title)
- Title 1: 28pt, Bold (Not used)
- Title 2: 22pt, Bold (Section headers)
- Title 3: 20pt, Semibold (Goal titles)
- Headline: 17pt, Semibold (Card titles)
- Body: 17pt, Regular (Description text)
- Callout: 16pt, Regular (Meta info)
- Subhead: 15pt, Regular (Secondary text)
- Footnote: 13pt, Regular (Captions)
- Caption 1: 12pt, Regular (Labels)
- Caption 2: 11pt, Regular (Tiny labels)

**Android (Roboto):**

- Similar scale, adjusted for Material Design

### 6.4 Color Palette

**Brand Colors:**

- Primary: #007AFF (iOS Blue)
- Success: #34C759 (Green)
- Warning: #FF9500 (Orange)
- Error: #FF3B30 (Red)
- Info: #5856D6 (Purple)

**Category Colors:**

- Personal Growth: #FF9500 (Orange)
- Health & Fitness: #007AFF (Blue)
- Finance: #34C759 (Green)
- Education: #AF52DE (Purple)
- Career: #5856D6 (Indigo)
- Relationships: #FF2D55 (Pink)
- Hobbies: #FFD60A (Yellow)
- Home: #5E5CE6 (Light Purple)

**Neutral Colors:**

- Background: #F2F2F7 (Light gray)
- Card Background: #FFFFFF (White)
- Border: #C7C7CC (Light gray)
- Text Primary: #000000
- Text Secondary: #8E8E93
- Text Tertiary: #C7C7CC

**Activity Map Colors:**

- No Activity: #EBEDF0
- Level 1: #C6E0F5
- Level 2: #7FB3D5
- Level 3: #49A3D1
- Level 4: #1E7BA4

## 7. Animation Specifications

### 7.1 Page Transitions

**Enter Animation:**

- Fade in from bottom (0.3s, ease-out)
- Cards stagger in (50ms delay between each)
- Activity map draws left to right (0.5s total)

**Exit Animation:**

- Fade out (0.2s, ease-in)
- No complex animations (for performance)

**Year Change:**

- Current content fades out (0.2s)
- New content fades in (0.2s)
- Overlap by 0.1s for smoothness

### 7.2 Component Animations

**Card Hover/Press:**

- Scale: 1.0 → 0.98 (0.1s, ease-out)
- Shadow: Subtle increase
- Release: Return to 1.0 (0.2s, spring)

**Goal Card Expansion:**

- Height: Auto-expand with spring (0.3s, damping: 0.8)
- Content: Fade in (0.2s, delayed by 0.1s)

**Progress Bar:**

- Animate from 0 to target value (1s, ease-out)
- Delayed start (0.2s after card appears)
- Use spring animation for final 10%

**FAB Scroll Behavior:**

- Shrink: 56pt → 44pt (0.2s, ease-out)
- Expand: 44pt → 56pt (0.3s, spring bounce)

**Sort Animation:**

- Cards crossfade position (0.4s, ease-in-out)
- Stagger: 50ms delay per card
- Use shared element transitions when possible

### 7.3 Loading States

**Skeleton Screens:**

- Shimmer animation (1.5s loop, linear)
- Gradient: #E0E0E0 → #F0F0F0 → #E0E0E0
- Show for: Stat cards, activity map, goal cards

**Pull to Refresh:**

- Spinner rotation (1s loop, linear)
- Slight bounce when released (0.2s, spring)

**Infinite Scroll:**

- Spinner at bottom (same as pull to refresh)
- Fade in new cards (0.3s, ease-out)

## 8. Accessibility

### 8.1 VoiceOver / TalkBack

**Element Labels:**

- Year selector: "Year selector, 2024, double-tap to change"
- Stat card: "Total goals, 12"
- Activity cell: "January 15, 2024, 5 tasks completed, medium activity"
- Goal card: "Read Books, 33% complete, 8 of 24 books, behind schedule"
- FAB: "Add new goal, button"

**Grouping:**

- Group stat cards together
- Group activity map separately
- Each goal card is single element

**Actions:**

- Double-tap to activate
- Swipe up/down for custom actions
- Context menus announced properly

### 8.2 Dynamic Type

**Scaling:**

- Support -3 to +5 size classes
- Test at largest size (XXXL)
- Allow text to wrap, not truncate
- Increase spacing proportionally

**Layout Adjustments:**

- At largest sizes, switch to single column
- Increase card heights
- Maintain minimum touch targets (44pt)

### 8.3 Color Contrast

**WCAG AAA Compliance:**

- Text on white: Minimum 7:1 contrast
- Text on colored backgrounds: Adjust opacity if needed
- Status badges: Ensure readable text

**High Contrast Mode:**

- Increase border thickness (1pt → 2pt)
- Darken text colors
- Remove subtle shadows

### 8.4 Reduce Motion

**Disabled Animations:**

- No spring animations
- Linear transitions only (0.2s max)
- Crossfade instead of slide
- No auto-rotation of insights

## 9. Performance Optimization

### 9.1 Rendering Performance

**Virtualization:**

- Use FlatList/RecyclerView for goal list
- Render only visible goal cards
- Recycle cards when scrolling

**Activity Map:**

- Pre-calculate heatmap data
- Render as canvas/SVG, not 365 individual components
- Cache rendered image

**Image Optimization:**

- Use vector icons where possible
- Lazy load goal icons
- Compress and cache images

### 9.2 Data Fetching

**Lazy Loading:**

- Load statistics first (instant)
- Stream activity data (week by week)
- Defer AI insights
- Paginate goal list

**Caching Strategy:**

- Cache yearly data for 1 hour
- Cache activity map for 24 hours
- Cache goal data for 30 minutes
- Invalidate on manual refresh

**Background Sync:**

- Sync when app opens
- Sync every 15 minutes when active
- Use diff updates, not full reload

### 9.3 Memory Management

**Image Memory:**

- Limit cached images to 50MB
- Clear cache when memory warning
- Use lower resolution on low-end devices

**Data Pruning:**

- Keep only current + previous year in memory
- Archive older years to disk
- Lazy load archived years on demand

## 10. Error Handling

### 10.1 Network Errors

**No Connection:**

```
┌─────────────────────────────────────┐
│            📡                        │
│                                     │
│  No Internet Connection              │
│  Please check your connection       │
│  and try again.                     │
│                                     │
│         [ Try Again ]                │
└─────────────────────────────────────┘
```

**Timeout:**

- Show retry button
- Cache last known data
- Display "Data may be outdated" message

**Server Error:**

- Show generic error message
- Log error for debugging
- Offer "Contact Support" option

### 10.2 Data Errors

**Missing Data:**

- Show empty state illustrations
- Provide "Add Goal" CTA
- Helpful message: "Start by adding your first goal!"

**Incomplete Data:**

- Show partial data
- Indicate which sections failed
- Allow retry for failed sections only

### 10.3 User Errors

**Invalid Input:**

- Inline validation on forms
- Clear error messages
- Disable submit until valid

**Permission Denied:**

- Explain why permission needed
- Show settings deep link
- Offer alternative flow

## 11. Analytics & Metrics

### 11.1 Key Metrics to Track

**Engagement:**

- Daily active users viewing Yearly screen
- Average time spent on page
- Scroll depth (how far users scroll)
- Feature adoption (activity map clicks, sort usage)

**Goal Performance:**

- Goals created per user
- Goal completion rate
- Average progress across all goals
- Most popular goal categories

**Activity Patterns:**

- Days with activity vs. no activity
- Average streak length
- Peak activity days/months
- Activity level distribution

**AI Insights:**

- Insight view rate
- Action taken rate (clicked CTA)
- Dismiss rate
- Most impactful insight types

### 11.2 Events to Log

**Page Events:**

- `yearly_screen_viewed`
- `year_selected` (with year parameter)
- `page_scrolled` (with depth)

**Interaction Events:**

- `stat_card_tapped`
- `activity_cell_tapped` (with date)
- `insight_viewed` (with insight ID)
- `insight_action_tapped`
- `insight_dismissed`
- `goal_card_tapped` (with goal ID)
- `sort_option_selected` (with option)
- `fab_tapped`

**Goal Events:**

- `goal_created` (with category, priority)
- `goal_updated` (with changes)
- `goal_completed`
- `goal_archived`

**Error Events:**

- `data_load_failed` (with error type)
- `network_error`
- `timeout_error`

### 11.3 A/B Testing Opportunities

**Layout Variants:**

- Activity map size (current vs. larger vs. smaller)
- Stat card arrangement (2x2 vs. 4x1)
- Goal card density (compact vs. spacious)

**Feature Variants:**

- With vs. without AI insights
- Tip visibility (always vs. on-tap)
- Sort default (priority vs. progress)

**Copy Variants:**

- Motivational messages
- CTA button text
- Tip phrasing

## 12. Future Enhancements

### 12.1 Phase 2 Features

**Social Features:**

- Share yearly progress image
- Compare with friends (opt-in)
- Public goal boards
- Team/group goals

**Advanced Analytics:**

- Productivity score calculation
- Time-of-day patterns
- Goal correlation analysis
- Predictive completion dates

**Gamification:**

- Achievement badges
- Streak rewards
- Level system
- Challenges and competitions

**Customization:**

- Theme colors
- Icon packs
- Layout preferences
- Widget for home screen

### 12.2 Phase 3 Features

**AI Enhancements:**

- Voice input for goals
- Smart goal suggestions
- Automated time blocking
- Habit formation tracking

**Integrations:**

- Calendar sync (Google, Apple)
- Health app integration
- Task manager imports
- Notion/Obsidian export

**Advanced Visualization:**

- Goal dependency graphs
- Burn-down charts
- Category breakdowns
- Year-over-year comparison

## 13. Success Criteria

### 13.1 User Engagement

**Target Metrics:**

- 70% of users view Yearly screen at least weekly
- Average 2-3 minutes time on page
- 40% of users interact with activity map
- 50% of users click on at least one goal card

### 13.2 Goal Management

**Target Metrics:**

- Average 5-8 active goals per user
- 60% goal completion rate by year-end
- 30% of users create goals from Yearly screen
- 80% of users update goal progress regularly

### 13.3 Performance

**Target Metrics:**

- Page load time < 1.5s
- Time to interactive < 2s
- 60fps scrolling on mid-range devices
- < 100MB memory usage

### 13.4 Satisfaction

**Target Metrics:**

- 4.5+ star rating for feature
- < 5% negative feedback
- 70% users find insights helpful
- 80% users understand their progress

## 14. Technical Considerations

### 14.1 Backend Requirements

**API Endpoints:**

```
GET /api/yearly/:year/statistics
GET /api/yearly/:year/activity-map
GET /api/yearly/:year/insights
GET /api/yearly/:year/goals
POST /api/goals
PUT /api/goals/:id
DELETE /api/goals/:id
```

**Database Schema:**

```sql
-- Goals table
CREATE TABLE goals (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR(255),
  description TEXT,
  category VARCHAR(100),
  icon VARCHAR(50),
  current_value INT,
  target_value INT,
  unit VARCHAR(50),
  status VARCHAR(50),
  priority VARCHAR(20),
  start_date DATE,
  target_date DATE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Activity table
CREATE TABLE daily_activity (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  date DATE,
  tasks_completed INT,
  goals_worked_on INT,
  hours_active DECIMAL(4,2),
  activity_level INT,
  created_at TIMESTAMP
);

-- Insights table (generated)
CREATE TABLE ai_insights (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type VARCHAR(50),
  priority VARCHAR(20),
  title VARCHAR(255),
  message TEXT,
  action_label VARCHAR(100),
  action_url VARCHAR(255),
  dismissed_at TIMESTAMP,
  created_at TIMESTAMP
);
```

### 14.2 Platform-Specific Implementation

**iOS:**

- UICollectionView for goal list
- Canvas for activity map rendering
- UIScrollView for main content
- Combine for reactive data flow

**Android:**

- RecyclerView for goal list
- Custom Canvas drawing for activity map
- NestedScrollView for main content
- Flow for reactive state

**React Native:**

- FlatList for goal list
- SVG or Canvas for activity map
- ScrollView for main content
- Redux or Context for state

**Web:**

- Virtual scroll for goal list
- SVG or Canvas for activity map
- Standard scroll container
- React Query for data fetching

## 15. Design Checklist

**Pre-Development:**

- [ ] Finalize all component specs
- [ ] Complete design mockups (all states)
- [ ] Define API contracts
- [ ] Review accessibility requirements
- [ ] Prototype key interactions

**Development:**

- [ ] Implement component library
- [ ] Build skeleton screens
- [ ] Add error states
- [ ] Implement analytics events
- [ ] Write unit tests

**Testing:**

- [ ] Test on multiple screen sizes
- [ ] Test with VoiceOver/TalkBack
- [ ] Test with Dynamic Type (all sizes)
- [ ] Test with Reduce Motion enabled
- [ ] Performance profiling

**Launch:**

- [ ] Beta test with 100 users
- [ ] Gather qualitative feedback
- [ ] Monitor crash reports
- [ ] Track key metrics
- [ ] Iterate based on data

---

## Appendix A: Design Tokens

```json
{
  "spacing": {
    "xs": "4pt",
    "sm": "8pt",
    "md": "12pt",
    "lg": "16pt",
    "xl": "24pt",
    "2xl": "32pt"
  },
  "borderRadius": {
    "sm": "8pt",
    "md": "12pt",
    "lg": "16pt",
    "xl": "24pt",
    "full": "999pt"
  },
  "fontSize": {
    "caption2": "11pt",
    "caption1": "12pt",
    "footnote": "13pt",
    "subhead": "15pt",
    "callout": "16pt",
    "body": "17pt",
    "headline": "17pt",
    "title3": "20pt",
    "title2": "22pt",
    "title1": "28pt",
    "largeTitle": "34pt"
  },
  "colors": {
    "primary": "#007AFF",
    "success": "#34C759",
    "warning": "#FF9500",
    "error": "#FF3B30",
    "info": "#5856D6"
  }
}
```

## Appendix B: Sample Data

```json
{
  "year": 2024,
  "statistics": {
    "totalGoals": 12,
    "completedGoals": 5,
    "inProgressGoals": 7,
    "overallProgress": 58
  },
  "metadata": {
    "currentStreak": 12,
    "longestStreak": 28,
    "totalDaysActive": 287
  },
  "goals": [
    {
      "id": "1",
      "title": "Read Books",
      "category": "Personal Growth",
      "icon": "📚",
      "progress": 33,
      "current": 8,
      "target": 24,
      "unit": "Books",
      "status": "behind",
      "priority": "high"
    }
  ]
}
```
