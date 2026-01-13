# Quick Reference: Web Scraping Flow

## How It Works Now

### Step 1: Web Search

```python
web_results = web_search(query, region="us-en", safesearch="on", timelimit="y", max_results=10)
```

### Step 2: Extract URLs

```python
urls = [result.get("href", "") for result in web_results if result.get("href")]
```

### Step 3: Scrape URLs (FIXED)

```python
# Using asyncio.to_thread to run synchronous scrape_urls in async context
scraped_content = await asyncio.to_thread(scrape_urls, urls[:5])

# Result format:
{
    "https://example.com/page1": "---\nTitle: Page Title\nURL: https://...\n---\n\nMarkdown content...",
    "https://example.com/page2": "---\nTitle: Page Title\nURL: https://...\n---\n\nMarkdown content..."
}
```

### Step 4: Save to RAG Database

```python
save_result = save_scraped_content(scraped_content)
# Returns: {"success": True, "count": 5, "collection": "web_scrapes"}
```

### Step 5: Query RAG for Research

```python
rag_results = query_documents(query, max_results=5)
# Returns relevant document chunks with embeddings
```

## Key Functions

### `scrape_urls(urls: List[str]) -> Dict[str, str]`

- **Location**: `gemini/tools/web_search.py`
- **Input**: List of URLs to scrape
- **Output**: Dictionary mapping URL to formatted content with citations
- **Features**:
  - Parallel scraping with crawl4ai
  - Automatic metadata extraction (title, favicon)
  - Saves to daily folders with MD5 hashes
  - Tracks in SQLite database
  - Returns formatted markdown with citations

### `save_scraped_content(scraped_content: Dict[str, str]) -> Dict[str, Any]`

- **Location**: `gemini/rag_store/rag_stores.py`
- **Input**: Dictionary of URL -> content
- **Output**: Success status and document count
- **Features**:
  - Chunks content for optimal embedding
  - Stores in ChromaDB vector database
  - Enables semantic search across all scraped content

## Testing

```bash
# Run the test script
uv run test_research_flow.py

# Or test web_search.py directly
uv run .\gemini\tools\web_search.py
```

## Storage Locations

1. **Crawled Markdown Files**: `bucket/_downloads/crawls/YYYY-MM-DD-DayName/[hash].md`
2. **Crawl Metadata**: `bucket/_downloads/crawls/crawls.sqlite3`
3. **RAG Vector DB**: `gemini/rag_store/rag_vector_db/chroma.sqlite3`
4. **Research Transcripts**: `bucket/_generated/docs/`

## What Changed

✅ Import `scrape_urls` instead of `_scrape_urls_async`
✅ Use `asyncio.to_thread()` for proper async handling
✅ Enhanced logging with character counts
✅ Better error filtering
✅ Improved RAG storage feedback

## Debug Output

When running, you'll see:

```
Successfully scraped 5 URLs
  - https://example.com/page1: 4523 characters
  - https://example.com/page2: 3891 characters
  ...
Attempting to save 5 documents to RAG...
✓ RAG save successful: 5 documents saved
```
