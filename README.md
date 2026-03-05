# Jarvis AI Assistant 🤖

A modern, voice-controlled AI assistant with 2026-style UI design. Built with HTML, CSS, and JavaScript.

![Jarvis AI Assistant](https://img.shields.io/badge/Version-2026.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🎤 Voice Control
- Natural language voice recognition
- Hands-free command execution
- Text-to-speech responses

### 📱 App Launcher
- Open any app by voice command
- Supports 40+ popular apps (WhatsApp, Instagram, YouTube, etc.)
- Beautiful app launch animations

### 🤖 AI Chat
- Intelligent question answering
- Knowledge base with various topics
- Conversational responses

### 🔒 Security Features (2026)
- PIN protection (Default: 2026)
- Animated Jarvis face recognition
- Secure lock mode
- End-to-end encryption UI

### 🎨 Modern UI
- Glassmorphism design
- Animated Jarvis core
- Glowing effects
- Responsive design
- Cyberpunk/Futuristic aesthetic

## 🚀 Getting Started

### Quick Start
Simply open `index.html` in any modern web browser:

```bash
# Using VS Code Live Server
1. Install Live Server extension
2. Right-click index.html
3. Select "Open with Live Server"

# Or directly
double-click index.html
```

### Voice Commands
- "Open WhatsApp" - Launch WhatsApp
- "Open Camera" - Launch Camera
- "What is AI?" - Get AI information
- "Tell me a joke" - Hear a joke
- "What time is it?" - Get current time

## 📁 Project Structure

```
jarvis-ai-assistant/
├── index.html      # Main HTML structure
├── style.css      # 2026 modern UI styles
├── app.js         # Voice recognition & AI logic
└── README.md      # This file
```

## 🔧 Customization

### Change PIN
Edit `app.js`:
```javascript
const correctPin = '2026'; // Change to your desired PIN
```

### Add More Apps
Edit `appsDatabase` in `app.js`:
```javascript
'your-app': { name: 'Your App', icon: 'fas fa-icon', color: '#HEXCODE' },
```

### Add More Knowledge
Edit `knowledgeBase` in `app.js`:
```javascript
'your question': 'Your answer here',
```

## 📱 Convert to Android App

### Using Capacitor (Recommended)

1. **Install Capacitor**
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

2. **Initialize Capacitor**
```bash
npx cap init "Jarvis AI" com.jarvis.ai --web-dir .
```

3. **Add Android Platform**
```bash
npx cap add android
```

4. **Build and Run**
```bash
npx cap sync
npx cap open android
```

### Using Cordova

```bash
npm install -g cordova
cordova platform add android
cordova build android
```

## 🔐 Security

- Default PIN: **2026**
- Change PIN in code for personal security
- App includes lock button in header

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Jarvis character from Marvel Comics
- Web Speech API for voice recognition
- Font Awesome for icons
- Google Fonts for typography

---

Made with ❤️ | Jarvis AI Assistant v2026.0

