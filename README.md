# Electoral Intelligence - India

A high-precision, non-partisan AI assistant designed to guide citizens through the complexities of the Indian electoral process with clarity and accuracy.

## 🎯 Function
Electoral Intelligence serves as a digital companion for voters, simplifying the journey from registration to the polling booth. It provides instant, grounded answers to queries regarding:
- **Voter Registration** (Form 6, 6A)
- **Modifications & Shifting** (Form 8)
- **Deletions & Objections** (Form 7)
- **Polling Day Logistics** (ID requirements, EVM process, and location finding)

## 🧠 Approach and Logic
The application operates on a **"Civic-First"** logic, prioritizing official documentation as the absolute source of truth.
- **Categorization Engine**: Automatically routes user queries into Registration, Modification, or Logistics workflows.
- **Qualifying Date Awareness**: Proactively educates users on the four qualifying dates (Jan 1, April 1, July 1, Oct 1) for eligibility.
- **Wait-Time Logic**: Emphasizes that possessing an EPIC (Voter ID) is a necessary but insufficient condition; verifying presence in the Electoral Roll is mandatory.

## 🛠️ How it Works
The solution provides a dual-interface experience:
1. **Interactive AI Agent**: A conversational interface where users can ask complex questions and receive cited, simplified answers based on ECI Handbooks.
2. **Scenario Dashboard**: A structured directory of common use cases (First-time voter, NRI, Lost ID, PwD marking) providing instant checklists and process notes.

## 🌍 Real-World Use
- **New Voters**: Helps youth understand exactly which documents are needed for Form 6.
- **Migrants**: Simplifies the process of shifting constituencies using Form 8.
- **Inclusive Voting**: Guides Persons with Disabilities (PwD) on marking themselves for priority services.
- **Election Day Readiness**: Provides a "Practice Booth" and checklist to ensure voters don't get turned away for missing ID or registration errors.

## 🤖 AI Utilization
- **Gemini 2.5 Flash**: Leveraged for high-speed, accurate natural language processing.
- **Grounded Persona**: The AI is strictly constrained to a non-partisan persona, preventing political speculation or bias.
- **Contextual Injection**: The agent uses a specialized prompt engineering layer that injects specific ECI guidelines and standard operating procedures into the conversation flow.

## 💻 Tech Implementation
- **Frontend**: Built with **React** and **Vite** for a modern, responsive user experience.
- **Styling**: **Tailwind CSS** for a premium, glassmorphic UI design.
- **API Integration**: Secure implementation using the `@google/generative-ai` SDK with **Lazy Initialization** to handle environment variables safely.
- **Deployment**: Containerized using **Docker** and deployed on **Google Cloud Run**.
- **Security & CI/CD**: 
  - **Google Secret Manager** stores the Gemini API key.
  - **Google Cloud Build** injects secrets during the build phase to ensure they are baked securely into the production bundle without being exposed in the repository.

---
**National Voter's Service Helpline: 1950**
