# UI Preview & Visual Guide

This document describes the visual appearance of the Bubble Chat Enhancer extension.

## 🎨 Visual Overview

### Light Theme

```
┌─────────────────────────────────────────────────────────────┐
│                    MESSENGER PAGE                            │
│                                                              │
│  [Regular Messenger Interface]                              │
│                                                              │
│                                                              │
│                                          ┌──────────────┐   │
│                                          │  ◯  John Doe │   │
│                                          │  Hey there!  │ ◉ │
│                                          └──────────────┘   │
└─────────────────────────────────────────────────────────────┘

Legend:
◯ = Avatar (circular profile picture)
◉ = Badge (red notification count)
```

### Bubble States

#### Collapsed State (Default)

```
╔══════════════════════════════╗
║  [◯]  John Doe          [5] ║
║       Hey there!            ║
╚══════════════════════════════╝

- Width: 200-300px
- Height: ~60px
- Position: Bottom-right (configurable)
- Shadow: Subtle elevation
- Hover: Lifts slightly upward
```

#### Bubble with No Messages

```
╔══════════════════════════════╗
║  [◯]  Messenger             ║
║       Click to open         ║
╚══════════════════════════════╝
```

### Popup (Expanded State)

```
┌────────────────────────────────────┐
│ [◯] Conversation Title    [📌] [✕] │ ← Header (draggable)
├────────────────────────────────────┤
│                                    │
│     ╭──────────────╮               │ ← Incoming message
│     │ Hello!       │               │   (gray, left-aligned)
│     ╰──────────────╯               │
│                                    │
│               ╭──────────────╮     │ ← Outgoing message
│               │ Hi there!    │     │   (blue, right-aligned)
│               ╰──────────────╯     │
│                                    │
│     ╭──────────────╮               │
│     │ How are you? │               │
│     ╰──────────────╯               │
│                                    │
│               ╭──────────────╮     │
│               │ I'm great!   │     │
│               ╰──────────────╯     │
│                                    │
│  [Scroll indicator]                │
├────────────────────────────────────┤
│ [Type a message...      ] [Send]   │ ← Input area
└────────────────────────────────────┘

Dimensions: 360x500px
Position: Above bubble (bottom-right)
```

### Settings Panel

```
╔════════════════════════════════════╗
║ 💬 Bubble Chat Settings            ║
╠════════════════════════════════════╣
║                                    ║
║ ┌────────────────────────────────┐ ║
║ │ Enable Extension               │ ║
║ │ Show floating bubble...        │ ║
║ │                    [⚪═══ ON] │ ║
║ └────────────────────────────────┘ ║
║                                    ║
║ ┌────────────────────────────────┐ ║
║ │ Bubble Position                │ ║
║ │ Choose where to display...     │ ║
║ │  [Bottom Left] [Bottom Right✓] │ ║
║ └────────────────────────────────┘ ║
║                                    ║
║ ┌────────────────────────────────┐ ║
║ │ Theme                          │ ║
║ │ Choose your preferred theme    │ ║
║ │  [☀️ Light✓] [🌙 Dark]         │ ║
║ └────────────────────────────────┘ ║
║                                    ║
║ ┌────────────────────────────────┐ ║
║ │ Pinned Chats (Max 3)           │ ║
║ │ ┌──────────────────────────┐   │ ║
║ │ │ [◯] John Doe    [Unpin]  │   │ ║
║ │ └──────────────────────────┘   │ ║
║ │ ┌──────────────────────────┐   │ ║
║ │ │ [◯] Jane Smith  [Unpin]  │   │ ║
║ │ └──────────────────────────┘   │ ║
║ └────────────────────────────────┘ ║
║                                    ║
║        Bubble Chat Enhancer v1.0   ║
╚════════════════════════════════════╝

Width: 320px
Accessed via: Extension icon in toolbar
```

## 🎨 Color Schemes

### Light Theme

- **Background**: White (#ffffff)
- **Secondary BG**: Light gray (#f0f2f5)
- **Text Primary**: Dark (#050505)
- **Text Secondary**: Medium gray (#65676b)
- **Accent**: Messenger blue (#0084ff)
- **Bubble Incoming**: Light gray (#e4e6eb)
- **Bubble Outgoing**: Blue (#0084ff)

### Dark Theme

- **Background**: Dark gray (#242526)
- **Secondary BG**: Darker gray (#3a3b3c)
- **Text Primary**: Light (#e4e6eb)
- **Text Secondary**: Medium gray (#b0b3b8)
- **Accent**: Messenger blue (#0084ff)
- **Bubble Incoming**: Dark gray (#3a3b3c)
- **Bubble Outgoing**: Blue (#0084ff)

### Common Colors

- **Badge**: Red (#ff3b30)
- **Success**: Green (#4caf50)
- **Unpin Button**: Red (#ff3b30)

## 📐 Spacing & Typography

### Font Sizes

- **Bubble Name**: 14px, bold
- **Bubble Message**: 13px, regular
- **Message Text**: 14px
- **Settings Label**: 14px, semi-bold
- **Settings Description**: 12px
- **Badge**: 11px, bold

### Spacing

- **Bubble Padding**: 8px 16px
- **Popup Padding**: 16px
- **Message Gap**: 8px
- **Border Radius**:
  - Bubble: 24px
  - Popup: 12px
  - Message: 18px
  - Input/Button: 20px

## 🎭 Animations

### Bubble Hover

```
Transform: translateY(-2px)
Duration: 0.3s ease
Shadow: Increases from 4px to 6px
```

### Popup Open

```
Animation: popupFadeIn
Duration: 0.3s ease
From: opacity 0, translateY(10px)
To: opacity 1, translateY(0)
```

### Badge Pulse

```
Animation: pulse
Duration: 2s infinite
Keyframes:
  0%, 100%: scale(1)
  50%: scale(1.1)
```

### Button Hover

```
Transform: scale(1.05)
Duration: 0.2s
Opacity: 0.9
```

### Button Active

```
Transform: scale(0.95)
Duration: 0.1s
```

## 📱 Responsive Breakpoints

### Desktop (> 768px)

- Bubble width: 200-300px
- Popup: 360x500px
- Full feature set

### Mobile (≤ 768px)

- Bubble width: max 250px
- Popup: 320x450px
- Touch-optimized tap targets

## 🖱️ Interactive States

### Bubble

- **Default**: White/dark background, subtle shadow
- **Hover**: Lifted appearance, stronger shadow
- **Active**: Slightly compressed (scale 0.98)

### Buttons

- **Default**: Colored background
- **Hover**: Slightly larger (scale 1.05), reduced opacity
- **Active**: Compressed (scale 0.95)
- **Disabled**: Grayed out, no hover effect

### Input Fields

- **Default**: Light background, subtle border
- **Focus**: Blue border, no outline
- **Filled**: Dark text on light background
- **Empty**: Gray placeholder text

### Popup Header

- **Default**: Secondary background color
- **Hover (draggable area)**: Cursor changes to 'move'
- **Dragging**: Follows mouse position

## 🎪 Special Effects

### Badge Animation

- Pulses continuously when count > 0
- Appears with fade-in
- Disappears with fade-out

### Message Scroll

- Auto-scrolls to bottom on new message
- Custom thin scrollbar (6px)
- Smooth scrolling behavior

### Save Confirmation

- Appears: Fade in from bottom
- Duration: Visible for 2 seconds
- Disappears: Fade out
- Background: Success green

## 🔍 Visual Hierarchy

### Information Priority

1. **Primary**: Avatar, conversation name (bold)
2. **Secondary**: Last message preview (regular)
3. **Tertiary**: Badge count (when present)

### Settings Priority

1. **Primary**: Setting labels (bold)
2. **Secondary**: Descriptions (lighter, smaller)
3. **Tertiary**: Input controls (interactive)

## 🌟 Design Principles Applied

1. **Proximity**: Related elements grouped together
2. **Contrast**: Clear distinction between elements
3. **Alignment**: Everything aligned to grid
4. **Repetition**: Consistent spacing and styling
5. **Color**: Limited palette for clarity
6. **Typography**: Clear hierarchy with size/weight
7. **White Space**: Breathing room between elements
8. **Feedback**: Visual response to all interactions

## 📸 Mock Screenshots

### Desktop View (Light Theme)

```
Messenger Page with Bubble in Bottom-Right:
┌────────────────────────────────────────────┐
│ Messenger Header                           │
├────────────────────────────────────────────┤
│ [Sidebar]  │  Chat Area                    │
│            │                               │
│            │  Message history...           │
│            │                               │
│            │  Input field...               │
│            │                               │
│            │                  ╔══════════╗ │
│            │                  ║ [◯] John ║ │
│            │                  ║ Hey!  [3]║ │
│            │                  ╚══════════╝ │
└────────────────────────────────────────────┘
```

### Mobile View (Dark Theme)

```
┌─────────────────────┐
│ Messenger Header    │
├─────────────────────┤
│                     │
│  Message history    │
│  (dark theme)       │
│                     │
│  Input field        │
│                     │
│       ╔═══════════╗ │
│       ║ [◯] Jane  ║ │
│       ║ Hello [1] ║ │
│       ╚═══════════╝ │
└─────────────────────┘
```

## 🎯 Visual Testing Checklist

When visually inspecting the extension, verify:

- [ ] Bubble appears in correct position
- [ ] Colors match theme (light/dark)
- [ ] Text is legible and properly sized
- [ ] Avatar is circular and properly sized
- [ ] Badge appears in top-right of bubble
- [ ] Hover effects are smooth
- [ ] Popup opens with animation
- [ ] Message bubbles are properly styled
- [ ] Scrollbar is visible when needed
- [ ] Input field is clearly visible
- [ ] Send button is prominent
- [ ] Settings panel is well-organized
- [ ] Toggle switches work visually
- [ ] Radio buttons show selection
- [ ] All spacing is consistent
- [ ] No visual glitches or overlaps

This UI has been designed to be clean, modern, and intuitive while maintaining high usability and accessibility standards.
