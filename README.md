# OmniIntel - AI Intelligence Platform

<div align="center">

![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react)
![OpenRouter](https://img.shields.io/badge/OpenRouter-Free-blueviolet)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000)

**Enterprise-Grade AI Intelligence Platform with 55+ Specialized Agents**

</div>

---

## 🚀 Features

- **55 AI Agents** - Specialized intelligence across markets, compliance, news, fraud detection
- **OpenRouter Integration** - Smart fallback with 8 free models
- **Fully Client-Side** - No backend server needed
- **Vercel Ready** - One-click deploy

---

## ⚡ Quick Deploy

```bash
# 1. Clone & enter
git clone https://github.com/Mohitsharma-2007/OmniIntel.git
cd OmniIntel

# 2. Setup frontend
cd frontend
cp .env.example .env
# Edit .env with your OpenRouter API key from https://openrouter.ai/keys

# 3. Deploy to Vercel
npx vercel deploy
```

---

## ⚙️ Configuration

Create `frontend/.env`:

```env
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
VITE_OPENROUTER_MODEL=openrouter/free
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Vite 6, React 19, TypeScript, Tailwind CSS |
| AI | OpenRouter (free models) |
| Deployment | Vercel |

---

## 📁 Project Structure

```
OmniIntel/
├── frontend/           # Complete app (frontend + API)
│   ├── src/
│   │   ├── components/ # React UI components
│   │   ├── lib/       # OpenRouter API utilities
│   │   └── App.tsx    # Main application
│   ├── .env.example   # Environment template
│   └── vite.config.ts
└── README.md
```

---

## 🔧 Development

```bash
cd frontend
npm install
npm run dev
```

---

## 📄 License

MIT

---

<div align="center">**Built with ❤️ using OpenRouter**</div>