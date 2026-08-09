# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ease is a React Native application built with Expo SDK 54, using the new React Native architecture (`newArchEnabled: true`) and React Compiler (`reactCompiler: true`). The app supports iOS, Android, and web platforms with file-based routing via expo-router.

## Development Commands

### Starting the App
```bash
npx expo start           # Start development server (choose platform interactively)
npm run android          # Run on Android emulator
npm run ios              # Run on iOS simulator
npm run web              # Run in web browser
```

### Code Quality
```bash
npm run lint             # Run ESLint using expo-config-eslint
```

### Project Reset
```bash
npm run reset-project    # Move starter code to app-example and create blank app directory
```

## Architecture

### File-Based Routing (expo-router)
- Routes are defined by the file structure in the `app/` directory
- `app/_layout.tsx` is the root layout with Stack navigation and theme provider
- `app/(tabs)/` contains the tab-based navigation structure
  - `_layout.tsx` defines the tab bar configuration
  - `today.tsx` is the main Today screen with task management
  - `monthly.tsx` is the Monthly view (placeholder)
  - `yearly.tsx` is the Yearly view (placeholder)
  - `map.tsx` is the Map view (placeholder)
- The app uses typed routes (enabled via `experiments.typedRoutes`)

### Task Management System
The app implements a task management system based on iOS Human Interface Guidelines:

**Data Model** (`types/task.ts`):
- Tasks are categorized into sections: `priority`, `morning`, `afternoon`, `evening`
- Priority tasks have a `position` property for drag-and-drop ordering
- Time-based tasks have a `time` property (HH:mm format)

**Components** (`components/`):
- `TaskCard.tsx` - Reusable card component with two modes:
  - Draggable mode for priority tasks (includes drag handle)
  - Static mode for time-based tasks (displays time)
- `SectionHeader.tsx` - Section divider with uppercase title
- `AIInsightCard.tsx` - Special card for AI-generated suggestions

**Drag-and-Drop**:
- Uses `react-native-draggable-flatlist` for priority task reordering
- Long-press (500ms) activates dragging with haptic feedback
- Only priority section tasks are draggable
- Real-time position updates with spring animations

### Path Aliases
- `@/*` maps to the project root (configured in tsconfig.json)
- Use `@/components/`, `@/hooks/`, `@/constants/` for imports

### Theming System
- **Theme Provider**: Root layout wraps the app in `@react-navigation/native`'s `ThemeProvider`
- **Color Scheme**: `useColorScheme()` hook detects system theme (light/dark)
- **Theme Constants**: `constants/theme.ts` exports:
  - `Colors` object with iOS system colors for light/dark modes
  - `Typography` object with SF Pro text styles and sizes
  - `Spacing` object with iOS HIG spacing values (xs, sm, md, lg, xl, xxl)
  - `BorderRadius` object for consistent corner radii
  - `CategoryColors` mapping for task category colors
- **Haptic Feedback**: Uses `expo-haptics` for tactile feedback on interactions
  - Medium impact on drag start/end
  - Light impact on task completion toggle

### Icon System
- **Tab Bar Icons**: Currently using emoji icons (📅 📆 🗓️ 🗺️)
- Future enhancement: Replace with proper icon library like `@expo/vector-icons`

### Component Organization
- `components/` - Shared UI components
  - `TaskCard.tsx` - Main task card with drag-and-drop support
  - `SectionHeader.tsx` - Section title headers
  - `AIInsightCard.tsx` - AI suggestion cards
- `hooks/` - Custom React hooks
  - `use-color-scheme.ts` - Detects system color scheme
  - `use-theme-color.ts` - Returns themed colors
  - Platform-specific hooks use `.web.ts` extension for web overrides
- `constants/` - Theme definitions and design tokens
- `types/` - TypeScript type definitions
  - `task.ts` - Task and drag state interfaces

### Key Dependencies
- **Expo SDK 54**: Latest Expo features and APIs
- **React 19.1.0**: Latest React version
- **React Native 0.81.5**: With new architecture enabled
- **react-native-reanimated**: For smooth animations (worklets-based)
- **react-native-gesture-handler**: For gesture handling
- **react-native-draggable-flatlist**: For drag-and-drop task reordering
- **expo-haptics**: For haptic feedback on interactions

## TypeScript Configuration
- Strict mode enabled
- Extends `expo/tsconfig.base`
- Type checking includes `.expo/types/**/*.ts` for generated types

## Platform-Specific Development

### iOS
- Supports iPad (`supportsTablet: true`)
- Uses native SF Symbols for icons
- Custom font descriptors available via `Fonts.ios`

### Android
- Edge-to-edge display enabled
- Predictive back gestures disabled
- Adaptive icon with background, foreground, and monochrome variants

### Web
- Static output mode
- Custom font stack fallbacks defined in `Fonts.web`

## Code Style Notes
- VSCode settings enforce:
  - Auto-fix on save
  - Organize imports on save
  - Sort members on save
- ESLint uses Expo's flat config format
- Components use functional components with TypeScript
- Haptic feedback integrated into interactive elements (see `HapticTab` component)
