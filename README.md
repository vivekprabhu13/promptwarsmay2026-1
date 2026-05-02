Electoral Intelligence
Empowering Voters through Agentic RAG and AI-Driven Civic Guidance.

📖 Overview
Electoral Intelligence is an AI-powered assistant designed to simplify the complexities of the Indian electoral process. By leveraging the Model Context Protocol (MCP) and Agentic RAG, the app provides real-time, accurate answers regarding voter registration, polling booth locations, and legal requirements, sourced directly from official Election Commission of India (ECI) documentation.

🛠️ Tech Implementation
The solution is built on a modern, serverless, and agentic architecture:

Frontend: React with Vite and Tailwind CSS for a responsive, high-speed user interface.

Backend: FastAPI (Python) hosted on Google Cloud Run, providing a stateless, scalable API layer.

AI Engine: Google Gemini (via Generative Language API) utilizing Secret Manager for secure API key handling.

Knowledge Base: ChromaDB used as a local vector database, persisted via a Google Cloud Storage (GCS) FUSE mount to ensure data survives container restarts.

Agentic Framework: Built using Antigravity, utilizing its built-in browser tools to index live URLs and PDF handbooks.

🧠 Approach & Logic
The app follows an Agentic Retrieval-Augmented Generation (RAG) pattern. Unlike standard chatbots that rely on static training data, Electoral Intelligence operates with the following logic:

Dynamic Indexing: The agent uses an automated browser to crawl verified ECI websites and digest PDF manuals into a vector store.

Contextual Retrieval: When a user asks a question, the system performs a semantic search within the vector database to find the most relevant "chunks" of election law or procedure.

Grounded Response: The AI synthesizes an answer only based on the retrieved snippets, ensuring the information is "grounded" in official sources and reducing the risk of hallucinations.

Security-First Design: Sensitive credentials are never exposed to the frontend; all LLM calls are routed through the backend where keys are managed by Secret Manager.

🚀 How the Solution Works
Ingestion: You provide the URL (e.g., voters.eci.gov.in) or upload the ECI handbook PDF.

Processing: The app "shreds" this information into mathematical embeddings.

Interaction: A user asks, "How do I apply for Form 6 as an NRI?"

Inference: The backend identifies the specific requirements for Form 6A from the database and returns a step-by-step guide tailored to the user's query.

🌍 Real-World Use Cases
First-Time Voters: Navigating the registration hurdles and understanding which forms are required for their specific situation.

Civic Education: Acting as a 24/7 digital concierge for NGOs and civic groups during election cycles.

Correction Assistance: Helping users understand the exact documentation needed for name or address changes on their Voter ID.

Accessibility: Translating complex legal jargon into simple, conversational language for the general public.

🛡️ Security & Scalability
Cloud Run: Ensures the app can handle a sudden surge in users during election weeks.

Identity & Access Management (IAM): Uses least-privilege principles, allowing the Cloud Run service account to access only the necessary secrets and storage buckets.

Environment Isolation: Differentiates between build-time variables and runtime secrets to maintain a secure deployment pipeline.

How to Deploy
Push code to GitHub: git push -u origin main

Set up Secret Manager for VITE_GEMINI_API_KEY.

Deploy to Cloud Run with a volume mount for persistent storage:

Bash
gcloud beta run deploy electoral-intelligence --add-volume=name=db,type=cloud-storage,bucket=[BUCKET_NAME] --add-volume-mount=volume=db,mount-path=/mnt/vector_storage
Developed for the PromptWars May 2026 Challenge.
