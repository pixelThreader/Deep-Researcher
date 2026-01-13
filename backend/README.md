# Deep Researcher - Backend Engine

The **Deep Researcher Backend** is a high-performance, asynchronous research engine built to power the Deep Researcher desktop application. It leverages advanced AI models and intelligent scraping to synthesize comprehensive research reports from the web.

## System Architecture

This service is engineered using a modern Python stack, prioritizing speed, type safety, and scalability.

-   **Runtime**: [Python 3.12+](https://www.python.org/)
-   **API Framework**: [FastAPI](https://fastapi.tiangolo.com/) - High-performance, easy-to-learn, fast-to-code, ready-for-production.
-   **Server**: [Uvicorn](https://www.uvicorn.org/) - A lightning-fast ASGI server.
-   **AI Core**: [Google Gemini](https://deepmind.google/technologies/gemini/) (via `google-genai` and `google-generativeai`).
-   **Web Intelligence**:
    -   [Crawl4AI](https://github.com/unclecode/crawl4ai) for advanced web scraping and content extraction.
    -   `googlesearch-python` for SERP data.
    -   `py-youtube` & `youtube-transcript-api` for video content analysis.
-   **Memory & Storage**: [ChromaDB](https://www.trychroma.com/) - Open-source vector database for long-term AI memory and semantic search.
-   **Data Processing**: `pandas`, `openpyxl` for structured data manipulation.
-   **Package Management**: [uv](https://github.com/astral-sh/uv) - An extremely fast Python package installer and resolver.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

-   **Python 3.12** or higher.
-   **uv**: Our chosen package manager for its superior speed and dependency resolution.
    ```powershell
    pip install uv
    ```

### Configuration

The application requires specific environment variables to function correctly.

1.  Navigate to the `backend` directory.
2.  Create a `.env` file in the root of the `backend` directory.
3.  Add the following configuration keys:

    ```env
    # Google Gemini API Key for AI inference
    GEMINI_API_KEY=AxxxxxxxxxxxxxxM

    # Secret salt for secure data exporting/hashing
    EXPORTER_SALT_SECRET='pixelThreader-DR-beta'

    # Current application phase (development/production)
    APPLICATION_PHASE=development
    ```

    > [!IMPORTANT]
    > Replace `AxxxxxxxxxxxxxxM` with your actual Google Gemini API credentials.

### Installation

Install the project dependencies using `uv`. This will sync the environment with `pyproject.toml`.

```bash
uv sync API_DOCUMENTATION.md
```

### Running the Server

Start the backend server in development mode with auto-reload enabled:

```bash
uv run fastapi dev main.py
```

Or directly via main entry point if configured:

```bash
uv run main.py
```

The API will be available at `http://127.0.0.1:8000` (default). You can access the automatic API documentation at `http://127.0.0.1:8000/docs`.

## Key Capabilities

-   **Deep Web Search**: Aggregates results from multiple sources to form a ground truth.
-   **Autonomous crawling**: Navigates web pages to extract relevant text, bypassing shallow content.
-   **Video Analysis**: Transcribes and analyzes YouTube videos for multimodal research.
-   **Report Generation**: Synthesizes gathered data into coherent, cited markdown reports.

---
*Deep Researcher Backend - Powered by PixelThreader*
