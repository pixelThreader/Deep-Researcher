# Deep Researcher Agent API Documentation

## Overview

The Deep Researcher Agent is a comprehensive research system that performs multi-step research including web search, content scraping, RAG-based retrieval, and optional image/news search. All results are streamed in real-time via WebSocket with progress updates.

## Base URL

```
ws://localhost:8000/ws/research
```

## WebSocket Endpoint: `/ws/research`

### Connection

Establish a WebSocket connection to the endpoint:

```javascript
const ws = new WebSocket("ws://localhost:8000/ws/research");
```

### Request Format

Send a JSON message with the following structure:

```json
{
  "query": "Your research query here",
  "model": "gemini-2.0-flash", // Optional, defaults to gemini-2.0-flash
  "session_id": "optional-session-id" // Optional
}
```

#### Request Fields

- **query** (required): The research query string
- **model** (optional): Gemini model to use for generation. Defaults to `gemini-2.0-flash`
- **session_id** (optional): Optional session ID for tracking conversations

### Response Messages

The WebSocket will send multiple messages during the research process. Each message has a `type` field to identify the message type.

#### 1. Progress Updates

Progress updates are sent throughout the research process to show current stage:

```json
{
  "type": "progress",
  "stage": "analyzing|searching|scraping|saving|rag_query|image_search|news_search|analyzing_data|generating",
  "message": "Human-readable progress message"
}
```

**Progress Stages:**

- `analyzing`: Checking content safety and analyzing query requirements
- `searching`: Performing web search
- `scraping`: Scraping URLs from search results
- `saving`: Saving scraped content to database
- `rag_query`: Querying knowledge base for relevant information
- `image_search`: Searching for images (if needed)
- `news_search`: Searching for news (if needed)
- `analyzing_data`: Analyzing collected data
- `generating`: Generating final answer

#### 2. Answer Chunks

As the final answer is generated, it's streamed in chunks:

```json
{
  "type": "answer_chunk",
  "chunk": "Text chunk of the answer..."
}
```

**Note:** Multiple `answer_chunk` messages will be sent as the answer is generated. Concatenate all chunks to get the complete answer.

#### 3. Final Result

After all answer chunks are sent, the final result metadata is sent:

```json
{
  "type": "result",
  "data": {
    "answer": "Complete generated answer",
    "sources": ["https://example.com", "https://example2.com"],
    "images": [
      {
        "url": "https://image-url.com/image.jpg",
        "file_url": "http://localhost:8000/files/generated/image.jpg",
        "file_id": "unique-file-id",
        "title": "Image title"
      }
    ],
    "news": {
      "file_url": "http://localhost:8000/files/generated/news.json",
      "file_id": "unique-file-id",
      "items": [
        {
          "title": "News title",
          "body": "News body",
          "url": "https://news-url.com",
          "date": "2025-10-31T09:15:41+00:00",
          "source": "News Source"
        }
      ]
    },
    "rag_results": [
      {
        "id": "doc-id",
        "content": "Relevant content from RAG",
        "distance": 0.123,
        "metadata": {
          "url": "https://source-url.com",
          "chunk_index": 0
        }
      }
    ],
    "metadata": {
      "research_time": 45.67,
      "sources_count": 5,
      "images_count": 3,
      "news_count": 5,
      "model": "gemini-2.0-flash",
      "session_id": "session-id"
    }
  }
}
```

#### 4. Error Messages

If an error occurs at any stage:

```json
{
  "type": "error",
  "message": "Error message describing what went wrong"
}
```

**Common Error Messages:**

- `"Sorry, I can't help with that."` - Sexual/inappropriate content detected
- `"No relevant information found. Please try rephrasing your query."` - No web search results
- `"I'm not sure what you mean. Please try again with a more specific query."` - Query is too vague/ambiguous
- `"Research failed: [error details]"` - General research failure

## Research Flow

The agent follows this flow:

1. **Content Safety Check** - Filters sexual/inappropriate content
2. **Query Analysis** - Determines if query needs images, news, and if it's clear
3. **Web Search** - Searches the web for relevant information
4. **Scrape URLs** - Scrapes top 5 URLs from search results
5. **Save to RAG** - Saves scraped content to vector database
6. **Query RAG** - Retrieves relevant information from knowledge base
7. **Check Relevance** - Determines if relevant information was found
8. **Optional Image Search** - If query needs images, searches and saves images
9. **Optional News Search** - If query needs news, searches and saves news
10. **Generate Answer** - Combines all information and generates final answer

## Example Usage

### JavaScript/TypeScript

```javascript
const ws = new WebSocket("ws://localhost:8000/ws/research");

ws.onopen = () => {
  // Send research query
  ws.send(
    JSON.stringify({
      query: "What are the latest developments in artificial intelligence?",
      model: "gemini-2.0-flash",
    })
  );
};

let fullAnswer = "";

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);

  switch (message.type) {
    case "progress":
      console.log(`[${message.stage}] ${message.message}`);
      // Update UI with progress
      updateProgressBar(message.stage, message.message);
      break;

    case "answer_chunk":
      // Append chunk to answer
      fullAnswer += message.chunk;
      // Update UI with streaming text
      updateAnswerDisplay(fullAnswer);
      break;

    case "result":
      // Final result received
      console.log("Research complete!");
      console.log("Sources:", message.data.sources);
      console.log("Images:", message.data.images);
      console.log("News:", message.data.news);
      console.log("Metadata:", message.data.metadata);
      displayFinalResult(message.data);
      break;

    case "error":
      // Handle error
      console.error("Error:", message.message);
      showError(message.message);
      break;
  }
};

ws.onerror = (error) => {
  console.error("WebSocket error:", error);
};

ws.onclose = () => {
  console.log("WebSocket closed");
};
```

### Python

```python
import asyncio
import json
import websockets

async def research_query(query: str):
    uri = "ws://localhost:8000/ws/research"

    async with websockets.connect(uri) as websocket:
        # Send request
        request = {
            "query": query,
            "model": "gemini-2.0-flash"
        }
        await websocket.send(json.dumps(request))

        full_answer = ""

        # Receive messages
        async for message in websocket:
            data = json.loads(message)

            if data["type"] == "progress":
                print(f"[{data['stage']}] {data['message']}")

            elif data["type"] == "answer_chunk":
                full_answer += data["chunk"]
                print(data["chunk"], end="", flush=True)

            elif data["type"] == "result":
                print("\n\nResearch complete!")
                print(f"Sources: {data['data']['sources']}")
                print(f"Images: {len(data['data']['images'])}")
                print(f"News items: {data['data']['metadata']['news_count']}")
                return data["data"]

            elif data["type"] == "error":
                print(f"\nError: {data['message']}")
                return None

# Usage
result = asyncio.run(research_query("What is quantum computing?"))
```

## Response Data Structure

### Sources

Array of URLs that were scraped and used as sources.

### Images

Array of image objects, each containing:

- `url`: Original image URL
- `file_url`: Local file URL for accessing the saved image
- `file_id`: Unique file identifier
- `title`: Image title from search results

### News

Object containing:

- `file_url`: URL to access the saved news JSON file
- `file_id`: Unique file identifier
- `items`: Array of news items with title, body, url, date, source

### RAG Results

Array of relevant documents from the knowledge base, each containing:

- `id`: Document ID
- `content`: Document content
- `distance`: Similarity distance (lower is more similar)
- `metadata`: Additional metadata including source URL

### Metadata

Research metadata including:

- `research_time`: Total time taken in seconds
- `sources_count`: Number of sources scraped
- `images_count`: Number of images saved
- `news_count`: Number of news items saved
- `model`: Model used for generation
- `session_id`: Session ID (if provided)

## File Access

### Images

Access saved images via:

```
GET http://localhost:8000/files/generated/{filename}
```

### News JSON

Access saved news files via:

```
GET http://localhost:8000/files/generated/{filename}
```

## Error Handling

The WebSocket connection will remain open until:

1. The research completes successfully (final result sent)
2. An error occurs (error message sent)
3. The connection is closed by the client

Always check the `type` field to determine the message type and handle accordingly.

## Best Practices

1. **Handle Progress Updates**: Show progress to users for better UX
2. **Stream Answer Chunks**: Display answer chunks as they arrive for real-time feel
3. **Error Handling**: Always handle error messages appropriately
4. **Connection Management**: Close WebSocket after receiving final result or error
5. **Session Management**: Use session_id to track related research queries
6. **Timeout Handling**: Implement timeout for long-running queries

## Rate Limiting

Currently, there are no rate limits, but be mindful of:

- API rate limits from search providers
- Gemini API rate limits
- Server resource limits

## Database Architecture

The research agent uses ChromaDB for vector storage with the following features:

### RAG Database Location

```
gemini/rag_store/rag_vector_db/
├── chroma.sqlite3          # Main database file
├── [collection files]      # Collection-specific data
└── [index files]          # Vector index files
```

### ChromaDB Configuration

- **Persistence**: Automatic persistence to disk
- **Embedding Function**: Google Generative AI Embeddings
- **Collection**: Named "deep_researcher" (or "deep_researcher_beta" in dev mode)
- **Settings**: Optimized for persistence with telemetry disabled

### Collection Management

- **Automatic Embedding**: Documents are automatically embedded on addition
- **Metadata Filtering**: Support for filtering by metadata fields
- **Batch Operations**: Efficient bulk document operations
- **Persistent Storage**: All data survives server restarts

## Dependencies

- **ChromaDB**: Latest version with persistent storage and Settings configuration
- **Google Generative AI**: For embeddings and content analysis
- **Existing**: `gemini.tools.web_search`, `bucket.stores`
- **Image download**: Uses built-in `urllib` (no external dependencies)
- **News storage**: JSON format with automatic metadata handling

## Support

For issues or questions, please refer to the main API documentation or contact the development team.
