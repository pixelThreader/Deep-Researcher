# Deep Researcher - Desktop Interface

The **Deep Researcher Frontend** is a modern, responsive desktop interface built with Tauri and React. It serves as the command center for the research operations, providing a sleek, professional UI for interacting with the Deep Research engine.

## Technology Stack

We utilize a cutting-edge frontend stack to ensure a premium user experience and high performance.

-   **Core Framework**: [React](https://react.dev/) v18+ with [Vite](https://vitejs.dev/) for lightning-fast HMR and bundling.
-   **Desktop Engine**: [Tauri v2](https://tauri.app/) - A lightweight, secure framework for building cross-platform applications.
-   **Styling**: 
    -   [TailwindCSS v4](https://tailwindcss.com/) for utility-first styling.
    -   [Radix UI](https://www.radix-ui.com/) for accessible, unstyled UI primitives.
-   **Animations**: 
    -   [Framer Motion](https://www.framer.com/motion/) for complex, declarative animations.
    -   `gsap` for high-performance motion graphics.
-   **State & Utilities**:
    -   `sonner` for toast notifications.
    -   `axios` for API communication.
    -   `monaco-editor` for advanced text editing capabilities.

## Prerequisites

Before starting, ensure you have the following installed:

-   **Node.js**: LTS version recommended.
-   **Rust**: Required for Tauri. Install via [rustup](https://rustup.rs/).
    ```powershell
    # Windows
    winget install --id Rustlang.Rustup
    ```
-   **Visual Studio C++ Build Tools**: Required for compiling native dependencies on Windows.

## Getting Started

### Installation

Navigate to the `app` directory and install the dependencies:

```bash
npm install
```

### Development Server

Start the application in development mode. This will launch the frontend dev server and the Tauri window simultaneously.

```bash
npm run tauri dev
```

>  [!TIP]
> This command handles both the Vite server and the Rust backend process needed for the Tauri shell.

### Building for Production

To create an optimized production build of the application:

```bash
npm run tauri build
```

The executable will be generated in `src-tauri/target/release/bundle/msi/` (on Windows).

## Project Structure

-   `src/`: React source code (components, pages, hooks).
-   `src-tauri/`: Rust backend code for the desktop shell.
-   `public/`: Static assets.
-   `index.html`: Entry point.

## Backend Integration

The frontend communicates with the `deep-researcher-backend` via HTTP requests. Ensure the backend server is running on `http://localhost:8000` (or your configured port) for the application to function correctly.

---
*Deep Researcher Frontend - Powered by pixelThreader & Team*
