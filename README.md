# OmniIntel - AI Intelligence Platform

<div align="center">

![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi)
![OpenRouter](https://img.shields.io/badge/OpenRouter-Free-blueviolet)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000)

**Enterprise-Grade AI Intelligence Platform with 55+ Specialized Agents**

</div>

---

## 🚀 Features

- **55 AI Agents** - Specialized intelligence across markets, compliance, news, fraud detection, and more
- **300+ Data Streams** - Real-time ingestion from markets, filings, news, and macro sources
- **OpenRouter Integration** - Smart fallback system with 8 free models
- **Modern React Frontend** - Vite + React 19 + TypeScript + Tailwind CSS
- **FastAPI Backend** - High-performance Python API
- **Vercel Ready** - Optimized for one-click deployment

---

## 📦 Quick Deploy

### Frontend (Vercel)

```bash
cd frontend
npm install
npx vite build
# Deploy dist/ to Vercel
```

### Backend (Railway/Render/Docker)

```bash
cd backend
pip install -r requirements.txt
python main.py
```

---

## ⚙️ Configuration

Create `.env` in root:

```env
# OpenRouter (Required) - Get from https://openrouter.ai/keys
OPENROUTER_API_KEY=your_key_here

# Model Selection (optional)
OPENROUTER_MODEL=openrouter/free

# Server
HOST=0.0.0.0
PORT=8000
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Vite 6, React 19, TypeScript, Tailwind CSS |
| Backend | FastAPI, Python 3.10+, Pathway |
| AI | OpenRouter (Gemini, GPT, Claude, Llama, DeepSeek) |
| Database | In-memory vault (production: PostgreSQL) |
| Deployment | Vercel (frontend), Railway/Render (backend) |

---

## 📁 Project Structure

```
OmniIntel/
├── frontend/           # Vite + React frontend
│   ├── src/
│   │   ├── components/ # React components
│   │   └── lib/        # Utilities
│   ├── index.html
│   └── vite.config.ts  # Vite config
├── backend/           # FastAPI backend
│   ├── agents/         # 55 agent prompts & skills
│   ├── main.py         # API server
│   └── requirements.txt
├── .env                # Environment variables
├── vercel.json         # Vercel config (SPA)
└── README.md
```

---

## 🔧 Development

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
pip install -r requirements.txt
python main.py
```

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/query` | POST | Query intelligence |
| `/market/live` | GET | Live market data |
| `/models` | GET | Model configuration |
| `/models/set` | POST | Set active model |

---

## 📄 License

MIT License

---

<div align="center">

**Built with ❤️ using OpenRouter & Pathway**

</div>