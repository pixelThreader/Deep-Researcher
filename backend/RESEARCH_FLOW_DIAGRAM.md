# Research Agent Flow Diagram

## Complete Research Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER SUBMITS QUERY                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 1: Content Safety Check                                   │
│ ✓ Filter sexual/inappropriate content                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 2: Analyze Query Needs                                    │
│ ✓ Determine if needs images                                    │
│ ✓ Determine if needs news                                      │
│ ✓ Check query clarity                                          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 2.5: Generate Sub-Questions ⭐ NEW                        │
│ ✓ AI generates 3-5 relevant research questions                │
│ ✓ Break down topic into specific aspects                      │
│ ✓ Guide comprehensive research                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 3: Web Search                                             │
│ ✓ DuckDuckGo search (10 results)                              │
│ ✓ Extract URLs                                                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 4: Scrape URLs                                            │
│ ✓ Crawl4AI scraping (top 5 URLs)                              │
│ ✓ Extract markdown content                                     │
│ ✓ Save to daily folders with metadata                         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 5: Save to RAG Knowledge Base                            │
│ ✓ Chunk content for embeddings                                │
│ ✓ Store in ChromaDB vector database                           │
│ ✓ Enable semantic search                                      │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 6: Query RAG                                              │
│ ✓ Semantic search for relevant chunks                         │
│ ✓ Retrieve top 5 results                                      │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 7: Check Relevant Info Found                             │
│ ✓ Verify scraped content or RAG results exist                │
└────────────────────────┬────────────────────────────────────────┘
                         │
        ┌────────────────┴────────────────┐
        │                                 │
        ▼                                 ▼
┌──────────────────┐            ┌──────────────────┐
│ STEP 8:          │            │ STEP 9:          │
│ Image Search     │            │ News Search      │
│ (if needed)      │            │ (if needed)      │
│                  │            │                  │
│ ✓ Find 3 images  │            │ ✓ Find 5 news   │
│ ✓ Download       │            │ ✓ Save to bucket │
│ ✓ Save to bucket │            └──────────────────┘
└──────────────────┘
        │
        └────────────────┬────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 9.5: YouTube Video Search ⭐ NEW                          │
│ ✓ Search for relevant videos                                  │
│ ✓ Get top 2 most relevant                                     │
│ ✓ Fetch detailed metadata:                                    │
│   - Title, description, channel                               │
│   - Views, duration, publish date                             │
│   - Thumbnail URL                                             │
│ ✓ Attempt to get transcript                                   │
│ ✓ Save to bucket as JSON                                      │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 10: Generate Structured Report ⭐ UPDATED                 │
│                                                                 │
│ Prepare Context:                                               │
│ ✓ RAG results (top 3)                                         │
│ ✓ Scraped content (top 3)                                     │
│ ✓ Web search snippets                                         │
│ ✓ Sub-questions                                               │
│ ✓ Images metadata                                             │
│ ✓ YouTube videos metadata                                     │
│ ✓ News articles                                               │
│                                                                 │
│ Generate AI Response in Format:                                │
│ ┌─────────────────────────────────────────────────────────┐  │
│ │ [START RESEARCH]                                        │  │
│ │                                                         │  │
│ │ ## Introduction                                         │  │
│ │ [Context setting, 2-3 paragraphs]                      │  │
│ │                                                         │  │
│ │ ## Main Analysis                                        │  │
│ │ [Detailed comprehensive analysis]                       │  │
│ │ [Addresses all sub-questions]                          │  │
│ │ [Includes citations and data]                          │  │
│ │                                                         │  │
│ │ ## YouTube Resources                                    │  │
│ │ 1. Video Title by Channel                              │  │
│ │    Description...                                       │  │
│ │    Watch: [URL]                                        │  │
│ │ 2. Video Title by Channel                              │  │
│ │    Description...                                       │  │
│ │    Watch: [URL]                                        │  │
│ │                                                         │  │
│ │ ## Related News                                         │  │
│ │ 1. News Title - Source                                 │  │
│ │    Summary...                                           │  │
│ │ 2. News Title - Source                                 │  │
│ │    Summary...                                           │  │
│ │                                                         │  │
│ │ ## Conclusion                                           │  │
│ │ [Summary, insights, recommendations]                    │  │
│ │                                                         │  │
│ │ [END RESEARCH]                                          │  │
│ └─────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 11: Save Transcript & Return Results                     │
│ ✓ Save complete transcript to bucket                          │
│ ✓ Update database with metadata                               │
│ ✓ Return structured JSON response                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FINAL RESPONSE                               │
│                                                                 │
│ {                                                               │
│   "type": "result",                                            │
│   "data": {                                                    │
│     "answer": "[START RESEARCH]...[END RESEARCH]",            │
│     "sub_questions": [...], ⭐ NEW                            │
│     "sources": [...],                                          │
│     "images": [...],                                           │
│     "youtube": {           ⭐ NEW                             │
│       "file_url": "...",                                       │
│       "videos": [                                              │
│         {                                                      │
│           "url": "...",                                        │
│           "title": "...",                                      │
│           "description": "...",                                │
│           "channel": "...",                                    │
│           "views": "...",                                      │
│           "duration": "...",                                   │
│           "published": "...",                                  │
│           "has_transcript": true/false                         │
│         }                                                      │
│       ]                                                        │
│     },                                                         │
│     "news": {...},                                             │
│     "metadata": {                                              │
│       "youtube_count": 2, ⭐ NEW                              │
│       "sub_questions_count": 4, ⭐ NEW                        │
│       ...                                                      │
│     }                                                          │
│   }                                                            │
│ }                                                              │
└─────────────────────────────────────────────────────────────────┘
```

## Progress Updates Sent to Frontend

```
Stage 1:  analyzing        → "Checking content safety..."
Stage 2:  analyzing        → "Analyzing query requirements..."
Stage 3:  planning         → "Generating research sub-questions..." ⭐ NEW
Stage 4:  searching        → "Searching web for relevant information..."
Stage 5:  scraping         → "Scraping 5 URLs..."
Stage 6:  saving           → "Saving scraped content to knowledge base..."
Stage 7:  rag_query        → "Querying knowledge base..."
Stage 8:  image_search     → "Searching for relevant images..."
Stage 9:  news_search      → "Searching for recent news..."
Stage 10: youtube_search   → "Searching for relevant YouTube videos..." ⭐ NEW
Stage 11: analyzing_data   → "Analyzing collected data..."
Stage 12: generating       → "Generating structured research report..."
Stage 13: saving           → "Saving research transcript..."
```

## Data Flow

```
User Query
    ↓
[Content Safety] → Filter
    ↓
[Query Analysis] → needs_images, needs_news, is_clear
    ↓
[Sub-Questions] → 3-5 questions ⭐ NEW
    ↓
[Web Search] → 10 URLs
    ↓
[Scrape URLs] → Markdown content (5 pages)
    ↓
[RAG Storage] → ChromaDB embeddings
    ↓
[RAG Query] → 5 relevant chunks
    ↓
┌──────────┬──────────┬──────────┐
│          │          │          │
▼          ▼          ▼          ▼
Images    News    YouTube    Context
(3)       (5)     (2) ⭐      Assembly
│          │          │          │
└──────────┴──────────┴──────────┘
              ↓
    [AI Generation]
    Structured Report
              ↓
    [Response Streaming]
              ↓
         Frontend
```

## Storage Locations

```
bucket/
├── _downloads/
│   └── crawls/
│       ├── crawls.sqlite3 (metadata)
│       └── 2025-11-10-Sunday/
│           ├── abc123.md (scraped page 1)
│           ├── def456.md (scraped page 2)
│           └── ...
│
├── _generated/
│   ├── images/
│   │   ├── 20251110_123456_hash1.jpg
│   │   ├── 20251110_123457_hash2.png
│   │   └── 20251110_123458_hash3.jpg
│   │
│   └── docs/
│       ├── youtube_20251110_123456_hash.json ⭐ NEW
│       ├── 20251110_123456_news_hash.json
│       └── research_transcript.json
│
gemini/rag_store/rag_vector_db/
└── chroma.sqlite3 (embeddings)
```

## Key Improvements

1. ⭐ **YouTube Integration**

   - 2 relevant videos with full metadata
   - Thumbnails, descriptions, channel info
   - Transcript availability check
   - Saved to bucket for persistence

2. ⭐ **Sub-Questions**

   - AI-generated research questions
   - Guide comprehensive analysis
   - Included in final response

3. ⭐ **Structured Output**

   - Clear sections for easy parsing
   - Consistent format every time
   - Frontend-friendly structure
   - Professional presentation

4. ⭐ **Complete Metadata**
   - Count fields for all resources
   - File URLs for all saved content
   - Research time tracking
   - Session management
