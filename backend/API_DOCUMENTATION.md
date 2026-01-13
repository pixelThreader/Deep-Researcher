# Chat Session API Documentation

This document provides comprehensive API documentation for the session-based chat management system.

## Base URL

```
http://localhost:8000
```

## Authentication

Currently, no authentication is required. All endpoints are publicly accessible.

---

## Table of Contents

1. [Session Management APIs](#session-management-apis)
2. [Chat History APIs](#chat-history-apis)
3. [WebSocket API](#websocket-api)
4. [Chat Settings APIs](#chat-settings-apis)
5. [Error Handling](#error-handling)
6. [Examples](#examples)

---

## Session Management APIs

### 1. List All Sessions

Get all chat sessions with pagination and statistics.

**Endpoint:** `GET /api/sessions`

**Query Parameters:**

- `limit` (optional, default: 100): Number of sessions to return
- `offset` (optional, default: 0): Number of sessions to skip

**Response:**

```json
{
  "success": true,
  "sessions": [
    {
      "id": 1,
      "session_id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Python Programming Help",
      "created_at": 1704067200.0,
      "updated_at": 1704067800.0,
      "metadata": null,
      "stats": {
        "total_messages": 5,
        "unique_models": 1,
        "avg_generation_time": 2.5,
        "total_tokens": 1250,
        "first_message": "2024-01-01T12:00:00",
        "last_message": "2024-01-01T12:10:00"
      }
    }
  ]
}
```

**Example:**

```javascript
const response = await fetch(
  "http://localhost:8000/api/sessions?limit=20&offset=0"
);
const data = await response.json();
```

---

### 2. Get Session Details

Get a specific session with all its messages and statistics.

**Endpoint:** `GET /api/sessions/{session_id}`

**Path Parameters:**

- `session_id` (required): UUID of the session

**Response:**

```json
{
  "success": true,
  "session": {
    "id": 1,
    "session_id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Python Programming Help",
    "created_at": 1704067200.0,
    "updated_at": 1704067800.0,
    "metadata": null,
    "messages": [
      {
        "sno": 1,
        "chatid": "chat-uuid-1",
        "prompt": "How do I create a list in Python?",
        "response": "You can create a list in Python using square brackets...",
        "model": "gemini-2.0-flash",
        "thinking": false,
        "generation_time": 2.3,
        "tokens_used": 250,
        "datetime_generated": "2024-01-01T12:00:00",
        "session_id": "550e8400-e29b-41d4-a716-446655440000",
        "created_at": 1704067200.0,
        "updated_at": 1704067200.0,
        "metadata": {
          "thinking_enabled": false,
          "model_version": "gemini-2.0-flash"
        }
      }
    ],
    "stats": {
      "total_messages": 5,
      "unique_models": 1,
      "avg_generation_time": 2.5,
      "total_tokens": 1250,
      "first_message": "2024-01-01T12:00:00",
      "last_message": "2024-01-01T12:10:00"
    }
  }
}
```

**Example:**

```javascript
const sessionId = "550e8400-e29b-41d4-a716-446655440000";
const response = await fetch(`http://localhost:8000/api/sessions/${sessionId}`);
const data = await response.json();
```

---

### 3. Get Session Messages

Get messages for a specific session.

**Endpoint:** `GET /api/sessions/{session_id}/messages`

**Path Parameters:**

- `session_id` (required): UUID of the session

**Query Parameters:**

- `limit` (optional, default: 100): Maximum number of messages to return

**Response:**

```json
{
  "success": true,
  "messages": [
    {
      "sno": 1,
      "chatid": "chat-uuid-1",
      "prompt": "How do I create a list?",
      "response": "You can create a list...",
      "model": "gemini-2.0-flash",
      "session_id": "550e8400-e29b-41d4-a716-446655440000",
      "created_at": 1704067200.0,
      "metadata": {}
    }
  ]
}
```

**Example:**

```javascript
const sessionId = "550e8400-e29b-41d4-a716-446655440000";
const response = await fetch(
  `http://localhost:8000/api/sessions/${sessionId}/messages?limit=50`
);
const data = await response.json();
```

---

### 4. Update Session Title

Update the title of a session.

**Endpoint:** `PUT /api/sessions/{session_id}/title`

**Path Parameters:**

- `session_id` (required): UUID of the session

**Request Body:**

```json
{
  "title": "New Title for This Session"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Title updated successfully"
}
```

**Example:**

```javascript
const sessionId = "550e8400-e29b-41d4-a716-446655440000";
const response = await fetch(
  `http://localhost:8000/api/sessions/${sessionId}/title`,
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "New Title for This Session",
    }),
  }
);
const data = await response.json();
```

---

### 5. Regenerate Session Title

Regenerate the title for a session based on its first message using AI.

**Endpoint:** `POST /api/sessions/{session_id}/regenerate-title`

**Path Parameters:**

- `session_id` (required): UUID of the session

**Response:**

```json
{
  "success": true,
  "title": "New AI Generated Title",
  "message": "Title regenerated successfully"
}
```

**Example:**

```javascript
const sessionId = "550e8400-e29b-41d4-a716-446655440000";
const response = await fetch(
  `http://localhost:8000/api/sessions/${sessionId}/regenerate-title`,
  {
    method: "POST",
  }
);
const data = await response.json();
```

---

### 6. Get Session Statistics

Get statistics for a specific session.

**Endpoint:** `GET /api/sessions/{session_id}/stats`

**Path Parameters:**

- `session_id` (required): UUID of the session

**Response:**

```json
{
  "success": true,
  "stats": {
    "total_messages": 5,
    "unique_models": 1,
    "avg_generation_time": 2.5,
    "total_tokens": 1250,
    "first_message": "2024-01-01T12:00:00",
    "last_message": "2024-01-01T12:10:00"
  }
}
```

**Example:**

```javascript
const sessionId = "550e8400-e29b-41d4-a716-446655440000";
const response = await fetch(
  `http://localhost:8000/api/sessions/${sessionId}/stats`
);
const data = await response.json();
```

---

### 7. Delete Session

Delete a session and all its associated messages.

**Endpoint:** `DELETE /api/sessions/{session_id}`

**Path Parameters:**

- `session_id` (required): UUID of the session

**Response:**

```json
{
  "success": true,
  "message": "Session deleted successfully"
}
```

**Example:**

```javascript
const sessionId = "550e8400-e29b-41d4-a716-446655440000";
const response = await fetch(
  `http://localhost:8000/api/sessions/${sessionId}`,
  {
    method: "DELETE",
  }
);
const data = await response.json();
```

---

## Chat History APIs

### 1. Get Chat History

Get chat history with optional session filtering.

**Endpoint:** `GET /api/chat/history`

**Query Parameters:**

- `limit` (optional, default: 50): Number of chats to return
- `offset` (optional, default: 0): Number of chats to skip
- `session_id` (optional): Filter chats by session ID

**Response:**

```json
{
  "success": true,
  "chats": [
    {
      "sno": 1,
      "chatid": "chat-uuid-1",
      "prompt": "Hello",
      "response": "Hi there!",
      "model": "gemini-2.0-flash",
      "session_id": "550e8400-e29b-41d4-a716-446655440000",
      "created_at": 1704067200.0,
      "metadata": {}
    }
  ]
}
```

**Example:**

```javascript
// Get all chats
const response = await fetch("http://localhost:8000/api/chat/history?limit=50");

// Get chats for a specific session
const sessionId = "550e8400-e29b-41d4-a716-446655440000";
const response = await fetch(
  `http://localhost:8000/api/chat/history?session_id=${sessionId}`
);
```

---

### 2. Get Chat by ID

Get a specific chat entry by its ID.

**Endpoint:** `GET /api/chat/{chatid}`

**Path Parameters:**

- `chatid` (required): UUID of the chat entry

**Response:**

```json
{
  "success": true,
  "chat": {
    "sno": 1,
    "chatid": "chat-uuid-1",
    "prompt": "Hello",
    "response": "Hi there!",
    "model": "gemini-2.0-flash",
    "session_id": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": 1704067200.0,
    "metadata": {}
  }
}
```

---

### 3. Generate Chat (Non-Streaming)

Generate a chat response without streaming.

**Endpoint:** `POST /api/chat/generate`

**Query Parameters:**

- `prompt` (required): User prompt
- `thinking` (optional, default: false): Enable thinking mode
- `model` (optional, default: "gemini-2.0-flash"): Model to use
- `session_id` (optional): Session ID to continue conversation

**Response:**

```json
{
  "success": true,
  "data": {
    "response": "AI generated response...",
    "chatid": "chat-uuid-1",
    "generation_time": 2.3,
    "tokens_used": 250,
    "session_id": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

**Example:**

```javascript
const response = await fetch(
  "http://localhost:8000/api/chat/generate?prompt=Hello&session_id=550e8400-e29b-41d4-a716-446655440000"
);
const data = await response.json();
```

---

### 4. Search Chats

Search chats by prompt or response content.

**Endpoint:** `GET /api/chat/search/{query}`

**Path Parameters:**

- `query` (required): Search query

**Query Parameters:**

- `limit` (optional, default: 50): Maximum number of results

**Response:**

```json
{
  "success": true,
  "chats": [
    {
      "chatid": "chat-uuid-1",
      "prompt": "Hello",
      "response": "Hi there!",
      "session_id": "550e8400-e29b-41d4-a716-446655440000"
    }
  ]
}
```

---

### 5. Delete Chat

Delete a specific chat entry.

**Endpoint:** `DELETE /api/chat/{chatid}`

**Path Parameters:**

- `chatid` (required): UUID of the chat entry

**Response:**

```json
{
  "success": true,
  "message": "Chat deleted successfully"
}
```

---

### 6. Get Chat Statistics

Get overall chat statistics.

**Endpoint:** `GET /api/chat/stats`

**Response:**

```json
{
  "success": true,
  "stats": {
    "total_chats": 100,
    "unique_models": 3,
    "avg_generation_time": 2.5,
    "total_tokens": 50000,
    "first_chat": "2024-01-01T12:00:00",
    "last_chat": "2024-01-15T12:00:00"
  }
}
```

---

## WebSocket API

### WebSocket Endpoint: `/ws/generate`

Stream chat responses in real-time.

**Connection:**

```javascript
const ws = new WebSocket("ws://localhost:8000/ws/generate");
```

**Request Format:**
Send a JSON string with the following structure:

```json
{
  "prompt": "User message here",
  "thinking": false,
  "model": "gemini-2.0-flash",
  "session_id": "550e8400-e29b-41d4-a716-446655440000" // Optional
}
```

**Response Format:**
The WebSocket will send multiple messages:

1. **Chunk Messages** (streaming text):

```json
{
  "chunk": "Partial response text..."
}
```

2. **Completion Message** (when done):

```json
{
  "done": true,
  "chatid": "chat-uuid-1",
  "session_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Error Message:**

```json
{
  "error": "Error message here"
}
```

**Complete Example:**

```javascript
const ws = new WebSocket("ws://localhost:8000/ws/generate");

ws.onopen = () => {
  const request = {
    prompt: "Hello, how are you?",
    thinking: false,
    model: "gemini-2.0-flash",
    session_id: null, // Omit or set to null for new session
  };
  ws.send(JSON.stringify(request));
};

let fullResponse = "";

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.chunk) {
    // Append chunk to response
    fullResponse += data.chunk;
    // Update UI with streaming text
    updateChatUI(fullResponse);
  } else if (data.done) {
    // Chat complete
    console.log("Chat ID:", data.chatid);
    console.log("Session ID:", data.session_id);
    ws.close();
  } else if (data.error) {
    console.error("Error:", data.error);
    ws.close();
  }
};

ws.onerror = (error) => {
  console.error("WebSocket error:", error);
};

ws.onclose = () => {
  console.log("WebSocket closed");
};
```

**Session Management:**

- If `session_id` is provided and exists, the conversation continues with context from previous messages
- If `session_id` is provided but doesn't exist, a new session is created
- If `session_id` is omitted or null, a new session is created automatically
- The response always includes the `session_id` for subsequent requests

---

## Chat Settings APIs

These APIs manage chat settings (system prompts, model configurations, etc.).

### 1. Create/Update Global Settings

**Endpoint:** `POST /api/settings/global`

**Query Parameters:**

- `model` (required): Model name
- `system_prompt` (optional): System prompt text
- `user_name` (optional): User name
- `top_p` (optional, default: 0.9): Top-p parameter
- `top_k` (optional, default: 0.9): Top-k parameter
- `document_analysis_mode` (optional, default: "off"): "off" or "auto"
- `enable_thinking` (optional, default: false): Enable thinking mode
- `max_previous_memory_retention` (optional, default: 5): Memory retention (1-10)

---

### 2. Get Global Settings

**Endpoint:** `GET /api/settings/global`

**Response:**

```json
{
  "success": true,
  "settings": {
    "id": 1,
    "model": "gemini-2.0-flash",
    "system_prompt": "You are a helpful assistant",
    "top_p": 0.9,
    "top_k": 0.9
  }
}
```

---

## Error Handling

All endpoints return errors in the following format:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

**Common HTTP Status Codes:**

- `200`: Success
- `400`: Bad Request (invalid parameters)
- `404`: Not Found (session/chat not found)
- `500`: Internal Server Error

**Example Error Handling:**

```javascript
try {
  const response = await fetch("http://localhost:8000/api/sessions/invalid-id");
  const data = await response.json();

  if (!data.success) {
    console.error("Error:", data.error);
    // Handle error in UI
  } else {
    // Process successful response
    console.log("Session:", data.session);
  }
} catch (error) {
  console.error("Network error:", error);
}
```

---

## Examples

### Complete Chat Flow Example

```javascript
// 1. Start a new chat session via WebSocket
const ws = new WebSocket("ws://localhost:8000/ws/generate");

let currentSessionId = null;

ws.onopen = () => {
  ws.send(
    JSON.stringify({
      prompt: "Hello! Can you help me with Python?",
      thinking: false,
      model: "gemini-2.0-flash",
      // No session_id - creates new session
    })
  );
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.chunk) {
    // Display streaming text
    displayChunk(data.chunk);
  } else if (data.done) {
    currentSessionId = data.session_id;
    console.log("Session created:", currentSessionId);
    ws.close();
  }
};

// 2. Continue conversation in same session
const continueChat = async (prompt) => {
  const ws = new WebSocket("ws://localhost:8000/ws/generate");

  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        prompt: prompt,
        session_id: currentSessionId, // Continue existing session
        thinking: false,
        model: "gemini-2.0-flash",
      })
    );
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.chunk) {
      displayChunk(data.chunk);
    } else if (data.done) {
      ws.close();
    }
  };
};

// 3. List all sessions
const loadSessions = async () => {
  const response = await fetch("http://localhost:8000/api/sessions");
  const data = await response.json();

  if (data.success) {
    data.sessions.forEach((session) => {
      console.log(`Session: ${session.title} (${session.session_id})`);
      console.log(`Messages: ${session.stats.total_messages}`);
    });
  }
};

// 4. Load a specific session with messages
const loadSession = async (sessionId) => {
  const response = await fetch(
    `http://localhost:8000/api/sessions/${sessionId}`
  );
  const data = await response.json();

  if (data.success) {
    const session = data.session;
    console.log("Title:", session.title);
    console.log("Messages:", session.messages.length);

    // Display messages in UI
    session.messages.forEach((msg) => {
      displayMessage(msg.prompt, msg.response);
    });
  }
};

// 5. Update session title
const updateTitle = async (sessionId, newTitle) => {
  const response = await fetch(
    `http://localhost:8000/api/sessions/${sessionId}/title`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    }
  );

  const data = await response.json();
  if (data.success) {
    console.log("Title updated successfully");
  }
};

// 6. Delete a session
const deleteSession = async (sessionId) => {
  const response = await fetch(
    `http://localhost:8000/api/sessions/${sessionId}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();
  if (data.success) {
    console.log("Session deleted");
  }
};
```

---

## Session Management Best Practices

1. **New Conversations**: Omit `session_id` or set it to `null` when starting a new chat
2. **Continuing Conversations**: Always include `session_id` in subsequent messages
3. **Session List**: Use `GET /api/sessions` to display chat history sidebar
4. **Title Updates**: Titles are auto-generated, but users can update them via `PUT /api/sessions/{id}/title`
5. **Context**: The system automatically includes last 10 messages (~1000 chars) when `session_id` is provided
6. **Real-time Updates**: Use WebSocket for streaming responses; use REST API for session management

---

## Notes

- All timestamps are Unix timestamps (seconds since epoch)
- Session IDs and Chat IDs are UUIDs (format: `550e8400-e29b-41d4-a716-446655440000`)
- The `session_id` is automatically created by the backend when starting a new chat
- Titles are auto-generated asynchronously after the first message
- Existing chats without sessions will have `session_id: null`
- Context is limited to last 10 messages or ~1000 characters to optimize performance

---

## Support

For issues or questions, refer to the backend implementation in:

- `gemini/gateway.py` - API endpoints
- `gemini/sqlite_crud.py` - Database operations
- `gemini/gen/genText.py` - Generation logic
