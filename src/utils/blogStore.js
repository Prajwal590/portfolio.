/**
 * blogStore.js
 * All localStorage operations for blog CRUD.
 * Seed data is based on Prajwal Marapur's actual tech stack:
 * React.js, FastAPI, LLM/RAG, YOLOv8, PostgreSQL, Java, Docker
 */

const STORAGE_KEY = 'portfolio_blogs'

// Seed blogs — topics aligned with Prajwal's real work experience
const SEED_BLOGS = [
  {
    id: '1',
    title: 'Building a Real-Time Object Detection App with YOLOv8 and Streamlit',
    content: `## Introduction

Real-time computer vision was once the domain of expensive hardware and complex setups. YOLOv8 and Streamlit change that — you can have a working detection app running in minutes.

In this post, I'll walk through how I built the **Nail Disease Detection System** that achieves 90%+ accuracy using a webcam feed.

## Why YOLOv8?

YOLOv8 (You Only Look Once v8) by Ultralytics is the fastest and most accurate single-stage object detector available today. Key benefits:

- Pre-trained on COCO dataset (80 classes)
- Supports custom training with just a few hundred images
- Runs in real-time on CPU — no GPU required for inference

## Setup

\`\`\`bash
pip install ultralytics streamlit opencv-python
\`\`\`

## Training on Custom Data

\`\`\`python
from ultralytics import YOLO

model = YOLO('yolov8n.pt')  # start from pretrained nano model

results = model.train(
    data='nail_disease.yaml',
    epochs=50,
    imgsz=640,
    batch=16,
)
\`\`\`

## Streamlit UI

\`\`\`python
import streamlit as st
import cv2
from ultralytics import YOLO

model = YOLO('best.pt')

st.title("Nail Disease Detector")
run = st.checkbox("Start Webcam")

FRAME_WINDOW = st.image([])
camera = cv2.VideoCapture(0)

while run:
    _, frame = camera.read()
    results = model(frame)
    annotated = results[0].plot()
    FRAME_WINDOW.image(annotated, channels='BGR')
\`\`\`

## Results

After training on 500+ images across 5 nail disease classes, the model achieved:
- **mAP@50**: 91.4%
- **Precision**: 89.2%
- **Recall**: 88.7%
- Inference time: ~25ms per frame on a standard laptop CPU

## Conclusion

YOLOv8 + Streamlit is a game-changing combo for rapid prototyping of real-time vision apps. The entire pipeline — from data prep to a live Streamlit demo — took less than a week.`,
    excerpt: 'How I built a real-time nail disease detection system achieving 90%+ accuracy using YOLOv8, OpenCV, and Streamlit.',
    status: 'published',
    createdAt: '2026-03-10T09:00:00Z',
    tags: ['YOLOv8', 'OpenCV', 'Python', 'Computer Vision', 'Streamlit'],
  },
  {
    id: '2',
    title: 'RAG Pipelines in Production: LangChain + FastAPI + PostgreSQL',
    content: `## What is RAG?

Retrieval-Augmented Generation (RAG) is the technique of grounding LLM responses in real documents. Instead of relying purely on the model's training data, you retrieve relevant context from your own knowledge base first.

This is exactly what we use in production at Brightpath Technology & Services to build intelligent, context-aware AI assistants.

## Architecture Overview

\`\`\`
User Query
    ↓
Embedding Model (e.g., text-embedding-ada-002)
    ↓
Vector Search (pgvector in PostgreSQL)
    ↓
Top-K Relevant Chunks retrieved
    ↓
LLM Prompt = Context + Query
    ↓
LLM Response (OpenAI / Mistral / Llama)
\`\`\`

## FastAPI Backend

\`\`\`python
from fastapi import FastAPI
from pydantic import BaseModel
from langchain.vectorstores import PGVector
from langchain.embeddings import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA

app = FastAPI()

embeddings = OpenAIEmbeddings()
vectorstore = PGVector(
    connection_string="postgresql://user:pass@localhost/ragdb",
    embedding_function=embeddings,
)

llm = ChatOpenAI(model="gpt-4", temperature=0)
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever(search_kwargs={"k": 4}),
)

class QueryRequest(BaseModel):
    question: str

@app.post("/query")
async def query(req: QueryRequest):
    answer = qa_chain.run(req.question)
    return {"answer": answer}
\`\`\`

## PostgreSQL with pgvector

\`\`\`sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    content TEXT,
    embedding VECTOR(1536)
);

CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops);
\`\`\`

## Key Lessons from Production

1. **Chunk size matters** — 512 tokens with 50-token overlap works for most docs
2. **Metadata filtering** — Filter by document type before vector search for better precision
3. **Hybrid search** — Combine BM25 (keyword) + vector search for the best results
4. **Caching** — Cache frequent queries in Redis to cut LLM API costs by ~60%

## Conclusion

RAG + FastAPI + PostgreSQL gives you a completely open, production-grade AI backend without vendor lock-in. This is the stack I'd recommend for any enterprise RAG application today.`,
    excerpt: 'A deep dive into building production-grade RAG pipelines using LangChain, FastAPI, and PostgreSQL pgvector — lessons from real enterprise deployments.',
    status: 'published',
    createdAt: '2026-03-22T11:30:00Z',
    tags: ['LLM', 'RAG', 'FastAPI', 'PostgreSQL', 'LangChain', 'AI'],
  },
  {
    id: '3',
    title: 'React.js + FastAPI: The Perfect Full Stack Combo in 2026',
    content: `## Why This Stack?

After building several production applications, I've settled on **React.js + FastAPI** as my default full-stack combo. Here's why:

- **React** — Component model, ecosystem, and DX are unmatched for frontends
- **FastAPI** — Python's fastest framework, automatic OpenAPI docs, async-first, perfect for AI/ML backends

## Project Structure

\`\`\`
project/
├── frontend/          # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── api/       # Axios API layer
│   └── package.json
└── backend/           # FastAPI
    ├── app/
    │   ├── routers/
    │   ├── models/
    │   ├── schemas/
    │   └── main.py
    └── requirements.txt
\`\`\`

## FastAPI Backend

\`\`\`python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="My API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health():
    return {"status": "ok"}
\`\`\`

## React API Layer

\`\`\`javascript
// src/api/client.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
})

export const fetchProjects = () => api.get('/api/projects')
export const createProject = (data) => api.post('/api/projects', data)
\`\`\`

## Deployment

- **Frontend**: Vercel (zero-config for Vite)
- **Backend**: Railway or Render (free tier works great for APIs)
- **Database**: Neon.tech (serverless PostgreSQL)

## Conclusion

React + FastAPI covers everything: lightning-fast UI, type-safe API via Pydantic, auto-generated docs, and easy AI integration when you need it. This is the stack I use daily at Brightpath.`,
    excerpt: 'Why React.js + FastAPI is the ideal full-stack combo in 2026 — from project structure to deployment, with real code examples.',
    status: 'published',
    createdAt: '2026-04-01T08:00:00Z',
    tags: ['React.js', 'FastAPI', 'Full Stack', 'Python', 'JavaScript'],
  },
  {
    id: '4',
    title: 'Content-Based Movie Recommendation with TF-IDF and Cosine Similarity',
    content: `## The Problem

Netflix has 15,000+ movies. How do you suggest the right one? Collaborative filtering needs user history. What if you're a new user? Content-based filtering solves this.

## How It Works

1. Extract features (genre, director, cast, plot keywords)
2. Vectorize with **TF-IDF**
3. Compute **cosine similarity** between movies
4. Return top-N most similar movies

## Implementation with Scikit-learn

\`\`\`python
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

df = pd.read_csv('movies.csv')

# Combine features
df['combined'] = (
    df['genre'] + ' ' +
    df['director'] + ' ' +
    df['cast'] + ' ' +
    df['keywords']
)

# TF-IDF matrix
tfidf = TfidfVectorizer(stop_words='english', max_features=5000)
tfidf_matrix = tfidf.fit_transform(df['combined'])

# Cosine similarity
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

def recommend(title, n=10):
    idx = df[df['title'] == title].index[0]
    scores = list(enumerate(cosine_sim[idx]))
    scores = sorted(scores, key=lambda x: x[1], reverse=True)[1:n+1]
    movie_indices = [i[0] for i in scores]
    return df['title'].iloc[movie_indices].tolist()

print(recommend("The Dark Knight"))
\`\`\`

## Flask API

\`\`\`python
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/recommend')
def get_recommendations():
    title = request.args.get('title')
    results = recommend(title)
    return jsonify({"recommendations": results})
\`\`\`

## What I Learned

- TF-IDF alone is surprisingly powerful for text similarity
- Feature engineering (what you combine) matters more than the algorithm
- Stemming + lemmatization improved results by ~15%

This project taught me how ML algorithms work under the hood before diving into deep learning.`,
    excerpt: 'How I built a movie recommendation engine using TF-IDF and cosine similarity with Scikit-learn and Flask — step by step.',
    status: 'published',
    createdAt: '2026-04-04T14:00:00Z',
    tags: ['Machine Learning', 'Python', 'Scikit-learn', 'Flask', 'NLP'],
  },
  {
    id: '5',
    title: 'Spring Boot + Hibernate + PostgreSQL: Enterprise Java Backend',
    content: `## Why Java for Backend?

Python (FastAPI) is my primary backend language, but Java with Spring Boot is the industry standard for large enterprise systems. Here's how I approach it.

## Project Setup

\`\`\`xml
<!-- pom.xml dependencies -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
</dependency>
\`\`\`

## Entity + Repository

\`\`\`java
@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    private String email;
    private Double cgpa;
    
    // getters & setters...
}

public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByNameContainingIgnoreCase(String name);
}
\`\`\`

## REST Controller

\`\`\`java
@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentRepository repo;

    @GetMapping
    public List<Student> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Student create(@RequestBody Student student) {
        return repo.save(student);
    }

    @PutMapping("/{id}")
    public Student update(@PathVariable Long id, @RequestBody Student data) {
        return repo.findById(id).map(s -> {
            s.setName(data.getName());
            s.setCgpa(data.getCgpa());
            return repo.save(s);
        }).orElseThrow();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
\`\`\`

## Coming Up

I'll extend this into a full Student Management System with React.js frontend, JWT auth, and Docker Compose setup in a follow-up post.`,
    excerpt: 'Building a clean Spring Boot + Hibernate + PostgreSQL CRUD API — the enterprise Java approach, simplified.',
    status: 'draft',
    createdAt: '2026-04-06T17:00:00Z',
    tags: ['Java', 'Spring Boot', 'Hibernate', 'PostgreSQL', 'Backend'],
  },
]

/** Initialize localStorage with seed data if empty */
export function initBlogStore() {
  const existing = localStorage.getItem(STORAGE_KEY)
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_BLOGS))
  }
}

/** Get all blogs */
export function getAllBlogs() {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

/** Get published blogs only */
export function getPublishedBlogs() {
  return getAllBlogs().filter(b => b.status === 'published')
}

/** Get a single blog by ID */
export function getBlogById(id) {
  return getAllBlogs().find(b => b.id === id) || null
}

/** Add a new blog */
export function addBlog({ title, content, status, tags }) {
  const blogs = getAllBlogs()
  const newBlog = {
    id: Date.now().toString(),
    title,
    content,
    excerpt: content.replace(/[#`*_>\[\]]/g, '').trim().slice(0, 150) + '...',
    status,
    tags: tags || [],
    createdAt: new Date().toISOString(),
  }
  blogs.unshift(newBlog)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs))
  return newBlog
}

/** Update an existing blog */
export function updateBlog(id, updates) {
  const blogs = getAllBlogs()
  const index = blogs.findIndex(b => b.id === id)
  if (index === -1) return null
  blogs[index] = {
    ...blogs[index],
    ...updates,
    excerpt: updates.content
      ? updates.content.replace(/[#`*_>\[\]]/g, '').trim().slice(0, 150) + '...'
      : blogs[index].excerpt,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs))
  return blogs[index]
}

/** Delete a blog */
export function deleteBlog(id) {
  const blogs = getAllBlogs().filter(b => b.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs))
}

/** Toggle published/draft status */
export function toggleBlogStatus(id) {
  const blog = getBlogById(id)
  if (!blog) return null
  const newStatus = blog.status === 'published' ? 'draft' : 'published'
  return updateBlog(id, { status: newStatus })
}

/** Format a date string */
export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
