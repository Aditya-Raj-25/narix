# Sprint Board

A lightweight, highly responsive, and accessible Kanban board built with React, TypeScript, and Vite. This project serves as a showcase for building performant user interfaces without relying on bloated external dependencies for state management, drag-and-drop, or heavy UI component libraries.

## 🚀 How to Run Locally

To get the Sprint Board up and running on your local machine, follow these steps:

1. **Navigate to the directory**:
   ```bash
   cd sprint-board
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   *(Note: This project strictly uses core React dependencies without bulky external libraries!)*

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **View the app**:
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Technical Decisions & Rationale

During the development of this application, several deliberate architectural choices were made to prioritize performance, maintainability, and clean code:

### 1. Plain CSS Modules Over Utility Frameworks (e.g., Tailwind)
To keep the footprint incredibly small and avoid relying on external libraries, this project utilizes native CSS Modules. This approach guarantees that styles are strictly scoped to their respective components (eliminating global CSS bleeding and specificity wars) while maintaining highly readable markup in the TSX files. It proves that a beautiful, modern, native-feeling UI (complete with responsive CSS scroll-snapping) can be built cleanly using fundamental web technologies.

### 2. Single Source of Truth & Derived State
Rather than passing state down and having each `Column` component independently manage its own array of tasks, the `Board` component acts as the absolute single source of truth. The `tasks` array lives at the top level and is backed by a custom `useLocalStorage` hook. 
- **Filtering & Searching:** Instead of manually syncing multiple state arrays when a search or filter occurs, we use `useMemo` to compute a derived `filteredTasks` array. 
- **Why?** This completely eliminates the entire class of bugs where columns get out of sync with each other. It also dramatically simplifies the CRUD handlers (`addTask`, `editTask`, `deleteTask`, `moveTask`), which only ever need to mutate the master list.

### 3. Deterministic Seed Data Generation
When fetching initial seed data from the JSONPlaceholder API, the mapping function generates priorities (`Low`, `Medium`, `High`) and `Assignees` deterministically using modulo math on the Task ID (e.g., `todo.id % priorities.length`) rather than utilizing `Math.random()`. 
- **Why?** Relying on `Math.random()` can cause hydration mismatches, unpredictable testing environments, and jarring UI shifts if the function is ever re-evaluated. Using deterministic modulo math ensures that "Task 4" will always look mathematically identical across every refresh and every device.

---

## 🔮 Future Improvements

Because this project was scoped to be built rapidly and strictly without external libraries, there are several features knowingly left out that would be prioritized given more time:

- **Drag and Drop (DnD):** Currently, tasks are moved between columns using a highly accessible `<select>` dropdown. A robust implementation would eventually introduce an accessibility-first library like `@dnd-kit/core` to allow physical dragging of `TaskCard`s between columns.
- **Undo functionality & Toast Notifications:** If a user accidentally deletes a task right now, it is permanently purged from `localStorage`. Implementing a short-lived "Undo" toast notification backed by a simple state history stack would be a massive UX improvement.
- **Automated Testing:** There is currently no unit testing (`Vitest`/`React Testing Library`) or E2E testing (`Playwright`/`Cypress`) implemented. Adding strict tests for the derived filtering logic (making sure filters properly stack with AND logic) and the `useLocalStorage` hook would be the immediate next step before a production release.
- **State Management Context:** As the app grows and more layers are added, drilling callback props (`onMove`, `onDelete`, `onEdit`) down from `Board` to `Column` to `TaskCard` will become tedious. Wrapping the core state in a React `Context` (or adopting a lightweight store like `Zustand`) would make the architecture infinitely more scalable.
