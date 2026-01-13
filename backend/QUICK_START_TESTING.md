# Quick Start Guide - YouTube Integration Testing

## Prerequisites

Ensure these packages are installed:

```bash
uv add py-youtube youtube-transcript-api
```

## Test the Research Agent

### 1. Simple Test Query

```bash
uv run test_research_flow.py
```

This will run a sample query and display:

- Progress updates for each stage
- Sub-questions generated
- Web scraping results
- YouTube videos found
- Structured markdown response
- Complete metadata

### 2. Custom Query Test

Create a test file `test_custom.py`:

```python
import asyncio
from gemini.gen.research_base import research_agent_stream

async def test_custom_query():
    query = "What is machine learning and how does it work?"

    print(f"Query: {query}")
    print("=" * 80)

    async def progress(update):
        if update.get("type") == "progress":
            print(f"\n[{update['stage'].upper()}] {update['message']}")

    async for update in research_agent_stream(query, progress_callback=progress):
        if update.get("type") == "answer_chunk":
            print(update["chunk"], end="", flush=True)
        elif update.get("type") == "result":
            data = update["data"]
            print("\n\n" + "=" * 80)
            print("RESULTS:")
            print(f"Sub-questions: {len(data['sub_questions'])}")
            print(f"Sources: {len(data['sources'])}")
            print(f"Images: {len(data['images'])}")
            print(f"YouTube Videos: {len(data.get('youtube', {}).get('videos', []))}")
            print(f"News: {len(data.get('news', {}).get('items', []))}")

asyncio.run(test_custom_query())
```

Run it:

```bash
uv run test_custom.py
```

### 3. Test YouTube Search Directly

```python
from gemini.tools.youtube_Search import youtube_search, get_video_data

# Search for videos
videos = youtube_search("Python programming tutorial")
print(f"Found {len(videos)} videos")

# Get details for first video
if videos:
    video_url = videos[0].get("url")
    details = get_video_data(video_url)
    print(f"Title: {details.get('title')}")
    print(f"Channel: {details.get('channel', {}).get('name')}")
    print(f"Views: {details.get('views')}")
```

## Expected Output Structure

### Console Output

```
Query: What is machine learning?
================================================================================

[ANALYZING] Checking content safety...
[ANALYZING] Analyzing query requirements...
[PLANNING] Generating research sub-questions...
Generated 4 sub-questions for research

[SEARCHING] Searching web for relevant information...
[SCRAPING] Scraping 5 URLs...
Successfully scraped 5 URLs
  - https://example.com/ml: 4523 characters
  - https://example.com/ml-guide: 3891 characters
  ...

[SAVING] Saving scraped content to knowledge base...
Attempting to save 5 documents to RAG...
✓ RAG save successful: 5 documents saved

[RAG_QUERY] Querying knowledge base for relevant information...
RAG query successful: 5 results found

[IMAGE_SEARCH] Searching for relevant images...
[NEWS_SEARCH] Searching for recent news...
[YOUTUBE_SEARCH] Searching for relevant YouTube videos...
✓ Found and saved 2 YouTube videos

[ANALYZING_DATA] Analyzing collected data...
[GENERATING] Generating structured research report...

[START RESEARCH]

## Introduction
Machine learning is a subset of artificial intelligence...

## Main Analysis
...detailed analysis...

## YouTube Resources
We found 2 highly relevant videos:
1. **Machine Learning in 10 Minutes** by Tech Education
   - This video provides a quick introduction to ML concepts...
   - Watch: https://youtube.com/watch?v=abc123

2. **Deep Dive into ML Algorithms** by AI Academy
   - Comprehensive tutorial covering various ML algorithms...
   - Watch: https://youtube.com/watch?v=def456

## Related News
Recent developments and news:
1. **New ML Breakthrough Announced** - Tech News
   Researchers have developed a new approach...

## Conclusion
Machine learning represents a transformative technology...

[END RESEARCH]

================================================================================
RESULTS:
Sub-questions: 4
Sources: 5
Images: 3
YouTube Videos: 2
News: 5
Research Time: 45.23s
```

### JSON Response Structure

```json
{
  "type": "result",
  "data": {
    "answer": "[START RESEARCH]...[END RESEARCH]",
    "sub_questions": [
      "What is machine learning?",
      "How does ML differ from traditional programming?",
      "What are the main ML algorithms?",
      "What are practical applications of ML?"
    ],
    "sources": [
      "https://example.com/ml-guide",
      "https://example.com/ml-tutorial"
    ],
    "images": [
      {
        "url": "https://images.example.com/ml.png",
        "file_url": "/bucket/_generated/images/20251110_123456_abc.png",
        "file_id": "img-uuid",
        "title": "Machine Learning Diagram"
      }
    ],
    "youtube": {
      "file_url": "/bucket/_generated/docs/youtube_20251110_123456_xyz.json",
      "file_id": "yt-uuid",
      "videos": [
        {
          "url": "https://youtube.com/watch?v=abc123",
          "title": "Machine Learning in 10 Minutes",
          "description": "This video provides a quick introduction...",
          "thumbnail": "https://i.ytimg.com/vi/abc123/maxresdefault.jpg",
          "channel": "Tech Education",
          "views": "1.2M",
          "duration": "10:15",
          "published": "2 weeks ago",
          "has_transcript": true
        },
        {
          "url": "https://youtube.com/watch?v=def456",
          "title": "Deep Dive into ML Algorithms",
          "description": "Comprehensive tutorial covering...",
          "thumbnail": "https://i.ytimg.com/vi/def456/maxresdefault.jpg",
          "channel": "AI Academy",
          "views": "850K",
          "duration": "25:30",
          "published": "1 month ago",
          "has_transcript": true
        }
      ]
    },
    "news": {
      "file_url": "/bucket/_generated/docs/20251110_123456_news.json",
      "file_id": "news-uuid",
      "items": [
        {
          "title": "New ML Breakthrough Announced",
          "url": "https://technews.com/article",
          "body": "Researchers have developed...",
          "source": "Tech News",
          "date": "2025-11-10"
        }
      ]
    },
    "metadata": {
      "research_time": 45.23,
      "sources_count": 5,
      "images_count": 3,
      "youtube_count": 2,
      "news_count": 5,
      "sub_questions_count": 4,
      "model": "gemini-2.0-flash"
    }
  }
}
```

## Verify Storage

### Check Saved Files

```bash
# Check YouTube data
ls bucket/_generated/docs/youtube_*.json

# Check images
ls bucket/_generated/images/

# Check scraped pages
ls bucket/_downloads/crawls/2025-11-10-Sunday/

# Check research transcript
cat bucket/_generated/docs/research_transcript.json
```

### Inspect YouTube JSON

```bash
# View saved YouTube data
cat bucket/_generated/docs/youtube_*.json | python -m json.tool
```

Expected content:

```json
[
  {
    "url": "https://youtube.com/watch?v=abc123",
    "title": "Video Title",
    "description": "Full description...",
    "thumbnail": "https://...",
    "channel": "Channel Name",
    "views": "1.2M",
    "duration": "10:15",
    "published": "2 weeks ago",
    "has_transcript": true
  }
]
```

## Troubleshooting

### Issue: YouTube search returns empty

**Solution:** Check if `py-youtube` is installed correctly:

```bash
uv add py-youtube
```

### Issue: Video data fetch fails

**Solution:** The video URL format might be incorrect. Ensure it's one of:

- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/watch?v=VIDEO_ID`

### Issue: Transcript not available

**Solution:** This is normal. Not all videos have transcripts. The `has_transcript` field will be `false`.

### Issue: No structured sections in response

**Solution:** Check the AI prompt. Ensure the model is generating with the exact format specified.

## Frontend Integration Test

### Test API Endpoint

```python
# test_api.py
import requests
import json

response = requests.post(
    "http://localhost:8000/api/research",
    json={"query": "What is machine learning?"},
    stream=True
)

for line in response.iter_lines():
    if line:
        update = json.loads(line)
        if update["type"] == "progress":
            print(f"Progress: {update['message']}")
        elif update["type"] == "answer_chunk":
            print(update["chunk"], end="", flush=True)
        elif update["type"] == "result":
            print("\n\nMetadata:", update["data"]["metadata"])
```

### Parse Structured Response

```javascript
// frontend-parser.js
function parseResearchResponse(answer) {
  const sections = {};

  // Split by markdown headers
  const parts = answer.split(/^## /gm);

  parts.forEach((part) => {
    if (part.startsWith("Introduction")) {
      sections.introduction = part.replace("Introduction\n", "");
    } else if (part.startsWith("Main Analysis")) {
      sections.mainAnalysis = part.replace("Main Analysis\n", "");
    } else if (part.startsWith("YouTube Resources")) {
      sections.youtube = part.replace("YouTube Resources\n", "");
    } else if (part.startsWith("Related News")) {
      sections.news = part.replace("Related News\n", "");
    } else if (part.startsWith("Conclusion")) {
      sections.conclusion = part.replace("Conclusion\n", "");
    }
  });

  return sections;
}

// Test
const response = await fetch("/api/research", {
  method: "POST",
  body: JSON.stringify({ query: "What is ML?" }),
});

const data = await response.json();
const sections = parseResearchResponse(data.answer);
console.log("Sections:", Object.keys(sections));
```

## Performance Benchmarks

Expected timings:

- Content Safety: ~1s
- Query Analysis: ~1-2s
- Sub-Questions: ~2-3s
- Web Search: ~2s
- Scraping: ~5-10s (5 URLs)
- RAG Save: ~2-3s
- RAG Query: ~1s
- Image Search: ~2-3s
- YouTube Search: ~3-5s
- News Search: ~2s
- AI Generation: ~10-20s (streaming)

**Total:** ~40-60 seconds for complete research

## Next Steps

1. ✅ Test with various queries
2. ✅ Verify all sections appear in response
3. ✅ Check YouTube videos are relevant
4. ✅ Ensure images load correctly
5. ✅ Verify news is recent
6. ✅ Test frontend parsing
7. ✅ Optimize performance if needed

## Sample Queries to Test

1. **Technical:** "Explain quantum computing"
2. **Tutorial:** "How to build a REST API in Python"
3. **News-worthy:** "Latest developments in AI"
4. **Visual:** "Show me modern web design trends"
5. **Comparative:** "Difference between React and Vue"
6. **How-to:** "How to start a podcast"
7. **Educational:** "What is blockchain technology"

Each should return:

- 3-5 sub-questions
- 5 web sources
- 3 images (for visual queries)
- 2 YouTube videos
- 5 news items (for news queries)
- Structured markdown report
