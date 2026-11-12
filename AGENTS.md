<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
# Mobile - first design approach
# Progressive web app
# React Project Custom Instructions

## Tech Stack & Environment
- Framework: React 19+ (using Vite or Next.js App Router)
- Language: TypeScript (always provide explicit types for props and state)
- Styling: Tailwind CSS

## Architecture & Component Design
- Always prefer functional components with hooks over class components.
- Use the Single Responsibility Principle: Keep components small and focused.
- Separate presentational components from container/logic components.
- Place shared custom hooks in the `src/hooks/` directory.
- Place TypeScript types/interfaces in a dedicated `src/types/` folder; do not declare them inline inside components.

## Coding Standards & Patterns
- Component naming: Use `PascalCase` for filenames and component declarations.
- Variable and function naming: Use `camelCase`.
- Constants: Use `UPPER_SNAKE_CASE`.
- Always destructure props in the component function signature.
- Avoid inline styles. Use Tailwind utility classes.
- Use arrow functions for component definitions and internal handlers.

## Hooks and Effects
- Follow the rules of hooks strictly.
- Always provide exhaustive dependency arrays for `useEffect`, `useMemo`, and `useCallback`.
- Implement clean-up functions in `useEffect` when setting up event listeners or intervals to prevent memory leaks.

## Performance & Security
- Use `React.lazy` and `Suspense` for route-based code splitting.
- Sanitize user inputs and never use `dangerouslySetInnerHTML` unless explicitly requested.


## Canvas & Graphics
- Use Konva.js for 2D canvas rendering.
- Always wrap canvas components in `React.Suspense` to handle lazy-loaded Konva modules.
- Use `useKonvaImage` hook for loading and caching images.
- Ensure proper cleanup of event listeners and layers when the component unmounts.

# Progressive web app
 it should be pwa app
 seo optimized


Architecture
App Router with server and client components
Group routes by feature/domain
Implement proper error boundaries
Use React Server Components by default
Leverage static optimization where possible
TypeScript
Strict mode enabled
Clear type definitions
Proper error handling with type guards
Zod for runtime type validation
Styling
Tailwind CSS with consistent color palette
Responsive design patterns
Dark mode support
Follow container queries best practices
Maintain semantic HTML structure
State Management
React Server Components for server state
React hooks for client state
Proper loading and error states
Optimistic updates where appropriate
Data Fetching
Server Components for direct database queries
React Suspense for loading states
Proper error handling and retry logic
Cache invalidation strategies
Security
Input validation and sanitization
Proper authentication checks
CSRF protection
Rate limiting implementation
Secure API route handling
Performance
Image optimization with next/image
Font optimization with next/font
Route prefetching
Proper code splitting
Bundle size optimization
Implementation Process
Plan component hierarchy
Define types and interfaces
Implement server-side logic
Build client components
Add proper error handling
Implement responsive styling
Add loading states
Write tests

# Code Review Skill

When reviewing code, follow these steps:

## Review checklist

1. **Correctness**: Does the code do what it's supposed to?
2. **Edge cases**: Are error conditions handled?
3. **Style**: Does it follow project conventions?
4. **Performance**: Are there obvious inefficiencies?

## How to provide feedback

- Be specific about what needs to change
- Explain why, not just what
- Suggest alternatives when possible
<!-- END:nextjs-agent-rules -->
