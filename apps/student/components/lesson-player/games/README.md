# Game Components

This directory contains all 12 interactive game components used in the lesson player.

## Completed Games (12/12)

### 1. Quiz ✅
- **Type**: `quiz`
- **Description**: Multiple choice questions with scenario-based context
- **Features**: 4 options (A-D), visual feedback, scenario panel with image
- **File**: `games/quiz/`

### 2. Fill Blank ✅
- **Type**: `fill-blank`
- **Description**: Fill in the missing words in legal/technical text
- **Features**: Multiple blanks, hint system, context panel
- **File**: `games/fill-blank/`

### 3. Match ✅
- **Type**: `match`
- **Description**: Match legal terms with their definitions
- **Features**: Drag-and-drop, visual feedback, pair validation
- **File**: `games/match/`

### 4. Sequence ✅
- **Type**: `sequence`
- **Description**: Arrange steps in correct chronological order
- **Features**: Drag-and-drop reordering, step validation
- **File**: `games/sequence/`

### 5. Hotspot ✅
- **Type**: `hotspot`
- **Description**: Click on specific areas of an image
- **Features**: Interactive image map, location validation
- **File**: `games/hotspot/`

### 6. Label Image ✅
- **Type**: `label`
- **Description**: Drag labels to correct positions on an image
- **Features**: Drag-and-drop labels, position validation
- **File**: `games/label/`

### 7. Memory Flip ✅
- **Type**: `memory`
- **Description**: Match pairs of cards (term + definition)
- **Features**: Card flipping animation, pair matching, timer
- **File**: `games/memory/`

### 8. Word Scramble ✅
- **Type**: `word-scramble`
- **Description**: Unscramble letters to form correct terms
- **Features**: Letter tiles, drag-and-drop, hint system
- **File**: `games/word-scramble/`

### 9. Crossword ✅
- **Type**: `crossword`
- **Description**: Complete crossword puzzle with legal terms
- **Features**: Grid-based input, clue list, hint system, timer
- **File**: `games/crossword/`

### 10. Swipe ✅
- **Type**: `swipe`
- **Description**: Swipe left/right to make decisions on scenarios
- **Features**: Card-based UI, binary choices, scenario analysis
- **File**: `games/swipe/`

### 11. Branching ✅
- **Type**: `branching`
- **Description**: Navigate through branching story scenarios
- **Features**: Multiple choice paths, consequence tracking, story progression
- **File**: `games/branching/`

### 12. Timed Sprint ✅
- **Type**: `timed-sprint`
- **Description**: Rapid-fire quiz with countdown timer
- **Features**: Time pressure, score tracking, progress indicators
- **File**: `games/timed-sprint/`

## Usage

All games follow the same interface pattern:

```typescript
interface GameProps {
  content: GameContent // Specific to each game type
  onComplete: (isCorrect: boolean, score: number) => void
}
```

## Integration

Games are imported and rendered in the lesson player:

```typescript
import { Quiz, FillBlank, Match, ... } from "./games"

// In lesson player
switch (currentGame.type) {
  case "quiz":
    return <Quiz content={content} onComplete={handleComplete} />
  // ... other cases
}
```

## Mock Data

All game content is defined in `frontend/apps/student/lib/training-data.ts` with factory functions for each game type.

## Design System

All games use the consistent design system:
- Primary color: `#0040a1` (blue)
- Secondary color: `#006b5e` (teal)
- Error color: `#ba1a1a` (red)
- Success color: `#006b5e` (teal)
- Tailwind CSS for styling
- Lucide React for icons

## Future Enhancements

- Add sound effects for interactions
- Implement achievement badges
- Add difficulty levels
- Support for multiplayer modes
- Analytics tracking for performance
