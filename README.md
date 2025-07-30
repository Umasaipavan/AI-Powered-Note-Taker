AI-Powered Note Taker
A clean and simple app where users can create notes and get AI-generated summaries using OpenAI or Gemini API. 

🔧 Tech Stack (as per their suggestions):
React + TypeScript

Vite

Tailwind CSS

Context API for state management

OpenAI API for AI feature  

✅ Feature Breakdown (Small + Focused):
1. Create and Manage Notes (CRUD + REST API)
Add a note (title + content)

Edit a note

Delete a note

Save notes to a fake REST API like json-server

2. AI Summary (LLM Integration)
Click a "Summarize" button on each note

It sends note content to OpenAI/Gemini and shows the summary

3. State Management (Context API)
Manage all notes using Context

Include loading and error states

4. Styling
Use Tailwind for responsive and clean design

Dark/light mode toggle (optional)  
🖼 UI Pages:
/ (Home page) → List all notes

/create → Form to add a note

Click a note → View + Summarize

