
// Jarvis AI Assistant - JavaScript
// Voice Recognition, AI Chat, App Launcher, Security Features
// Enhanced Version with Cyber Security, Hacking Topics & Multi-language Support

// Global Variables
let isListening = false;
let recognition = null;
let currentPin = '';
const correctPin = '2026';
let isSecure = true;
let currentLanguage = 'en';

// Language translations for Jarvis responses
const languageTranslations = {
    'en': {
        welcome: 'Hello Sir! I am Jarvis. How may I assist you today?',
        tapToSpeak: 'Tap to speak',
        listening: 'Listening...',
        opening: 'Opening',
        appNotFound: 'App not found. Try: WhatsApp, Camera, Chrome, Gmail, Calculator, Maps, or Weather.',
        voiceNotSupported: 'Voice recognition not supported. Please type your commands.',
        sorryNotCatch: 'Sorry, I didn\'t catch that. Please try again.',
        allApps: 'All Applications',
        online: 'ONLINE'
    },
    'ur': {
        welcome: 'السلام علیکم سر! میں جاروس ہوں۔ آج میں آپ کی مدد کیسے کرسکتا ہوں؟',
        tapToSpeak: 'بولنے کے لیے ٹیپ کریں',
        listening: 'سنا جا رہا ہے...',
        opening: 'کھول رہا ہے',
        appNotFound: 'ایپ نہیں ملی۔ کوشش کریں: وہاٹس ایپ، کیمرہ، کروم، جی میل، کیلکولیٹر، میپس یا ویدر۔',
        voiceNotSupported: 'وائس ریکوگنیشن سپورٹ نہیں ہے۔ براہ کرم اپنے commands ٹائپ کریں۔',
        sorryNotCatch: 'معاف کرنا، میں نہیں سمجھا۔ دوبارہ کوشش کریں۔',
        allApps: 'تمام ایپس',
        online: 'آن لائن'
    },
    'hi': {
        welcome: 'नमस्ते सर! मैं जार्विस हूं। आज मैं आपकी कैसे मदद कर सकता हूं?',
        tapToSpeak: 'बोलने के लिए टैप करें',
        listening: 'सुन रहा हूं...',
        opening: 'खोल रहा है',
        appNotFound: 'ऐप नहीं मिला। कोशिश करें: व्हाट्सएप, कैमरा, क्रोम, जीमेल, कैलकुलेटर, मैप्स या वेदर।',
        voiceNotSupported: 'वॉइस रिकॉग्निशन समर्थित नहीं है। कृपया टाइप करें।',
        sorryNotCatch: 'माफ़ करना, मैं नहीं समझा। दोबारा कोशिश करें।',
        allApps: 'सभी ऐप्स',
        online: 'ऑनलाइन'
    },
    'ru': {
        welcome: 'Привет, сэр! Я Джарвис. Чем я могу вам помочь сегодня?',
        tapToSpeak: 'Нажмите, чтобы говорить',
        listening: 'Слушаю...',
        opening: 'Открываю',
        appNotFound: 'Приложение не найдено. Попробуйте: WhatsApp, Камера, Chrome, Gmail, Калькулятор.',
        voiceNotSupported: 'Распознавание голоса не поддерживается. Пожалуйста, введите текст.',
        sorryNotCatch: 'Извините, я не понял. Попробуйте еще раз.',
        allApps: 'Все приложения',
        online: 'ОНЛАЙН'
    },
    'zh': {
        welcome: '您好，先生！我是贾维斯。今天我可以为您做些什么？',
        tapToSpeak: '点击说话',
        listening: '正在听...',
        opening: '正在打开',
        appNotFound: '未找到应用。请尝试：WhatsApp、相机、Chrome、Gmail、计算器、地图或天气。',
        voiceNotSupported: '不支持语音识别。请输入您的命令。',
        sorryNotCatch: '对不起，我没有听清楚。请再试一次。',
        allApps: '所有应用',
        online: '在线'
    },
    'ar': {
        welcome: 'مرحباً سيدي! أنا جارفيز. كيف يمكنني مساعدتك اليوم؟',
        tapToSpeak: 'انقر للتحدث',
        listening: 'جاري الاستماع...',
        opening: 'جارٍ الفتح',
        appNotFound: 'التطبيق غير موجود. جرب: واتساب، كاميرا، كروم، جيميل، آلة حاسبة، خرائط، أو طقس.',
        voiceNotSupported: 'التعرف على الصوت غير مدعوم. يرجى الكتابة.',
        sorryNotCatch: 'عذراً، لم أفهم. حاول مرة أخرى.',
        allApps: 'جميع التطبيقات',
        online: 'متصل'
    }
};

// Expanded App Database
const appsDatabase = {
    // Social Media
    'whatsapp': { name: 'WhatsApp', icon: 'fab fa-whatsapp', color: '#25D366', category: 'Social' },
    'facebook': { name: 'Facebook', icon: 'fab fa-facebook', color: '#1877F2', category: 'Social' },
    'instagram': { name: 'Instagram', icon: 'fab fa-instagram', color: '#E4405F', category: 'Social' },
    'twitter': { name: 'Twitter', icon: 'fab fa-twitter', color: '#1DA1F2', category: 'Social' },
    'tiktok': { name: 'TikTok', icon: 'fab fa-tiktok', color: '#000000', category: 'Social' },
    'snapchat': { name: 'Snapchat', icon: 'fab fa-snapchat', color: '#FFFC00', category: 'Social' },
    'linkedin': { name: 'LinkedIn', icon: 'fab fa-linkedin', color: '#0A66C2', category: 'Social' },
    'telegram': { name: 'Telegram', icon: 'fab fa-telegram', color: '#0088CC', category: 'Social' },
    
    // Entertainment
    'youtube': { name: 'YouTube', icon: 'fab fa-youtube', color: '#FF0000', category: 'Entertainment' },
    'netflix': { name: 'Netflix', icon: 'fab fa-netflix', color: '#E50914', category: 'Entertainment' },
    'spotify': { name: 'Spotify', icon: 'fab fa-spotify', color: '#1DB954', category: 'Entertainment' },
    'music': { name: 'Music', icon: 'fas fa-music', color: '#EC4899', category: 'Entertainment' },
    'prime': { name: 'Prime Video', icon: 'fas fa-play', color: '#00A8E1', category: 'Entertainment' },
    'disney': { name: 'Disney+', icon: 'fas fa-film', color: '#113CCF', category: 'Entertainment' },
    
    // Browsers & Communication
    'chrome': { name: 'Chrome', icon: 'fab fa-chrome', color: '#4285F4', category: 'Browser' },
    'browser': { name: 'Browser', icon: 'fas fa-globe', color: '#00D2FC', category: 'Browser' },
    'gmail': { name: 'Gmail', icon: 'fab fa-gmail', color: '#EA4335', category: 'Communication' },
    'meet': { name: 'Google Meet', icon: 'fas fa-video', color: '#00897B', category: 'Communication' },
    'zoom': { name: 'Zoom', icon: 'fas fa-video', color: '#2D8CFF', category: 'Communication' },
    
    // System Apps
    'camera': { name: 'Camera', icon: 'fas fa-camera', color: '#FF6B6B', category: 'System' },
    'settings': { name: 'Settings', icon: 'fas fa-cog', color: '#4D96FF', category: 'System' },
    'phone': { name: 'Phone', icon: 'fas fa-phone', color: '#10B981', category: 'System' },
    'calculator': { name: 'Calculator', icon: 'fas fa-calculator', color: '#6366F1', category: 'System' },
    'files': { name: 'Files', icon: 'fas fa-folder', color: '#FFB74D', category: 'System' },
    'clock': { name: 'Clock', icon: 'fas fa-clock', color: '#78909C', category: 'System' },
    
    // Maps & Weather
    'maps': { name: 'Maps', icon: 'fas fa-map', color: '#10B981', category: 'Utility' },
    'weather': { name: 'Weather', icon: 'fas fa-cloud-sun', color: '#3B82F6', category: 'Utility' },
    'translate': { name: 'Translate', icon: 'fas fa-language', color: '#4285F4', category: 'Utility' },
    
    // Shopping
    'amazon': { name: 'Amazon', icon: 'fab fa-amazon', color: '#FF9900', category: 'Shopping' },
    'ebay': { name: 'eBay', icon: 'fab fa-ebay', color: '#E53238', category: 'Shopping' },
    
    // Games
    'pubg': { name: 'PUBG', icon: 'fas fa-gamepad', color: '#F39C12', category: 'Game' },
    'freefire': { name: 'Free Fire', icon: 'fas fa-fire', color: '#E74C3C', category: 'Game' },
    'candy': { name: 'Candy Crush', icon: 'fas fa-candy', color: '#9B59B6', category: 'Game' },
    
    // News & Education
    'news': { name: 'News', icon: 'fas fa-newspaper', color: '#3498DB', category: 'News' },
    'drive': { name: 'Google Drive', icon: 'fab fa-google-drive', color: '#0F9D58', category: 'Cloud' },
    'photos': { name: 'Photos', icon: 'fas fa-image', color: '#F8BB44', category: 'Cloud' },
    
    // More Apps
    'whatsapp business': { name: 'WhatsApp Business', icon: 'fab fa-whatsapp', color: '#25D366', category: 'Social' },
    'messenger': { name: 'Messenger', icon: 'fab fa-facebook-messenger', color: '#0084FF', category: 'Social' },
    'viber': { name: 'Viber', icon: 'fab fa-viber', color: '#665CAC', category: 'Social' },
    'line': { name: 'LINE', icon: 'fab fa-line', color: '#00C300', category: 'Social' },
    'wechat': { name: 'WeChat', icon: 'fab fa-weixin', color: '#07C160', category: 'Social' },
    'skype': { name: 'Skype', icon: 'fab fa-skype', color: '#00AFF0', category: 'Communication' },
    'slack': { name: 'Slack', icon: 'fab fa-slack', color: '#4A154B', category: 'Communication' },
    'discord': { name: 'Discord', icon: 'fab fa-discord', color: '#5865F2', category: 'Communication' },
    'reddit': { name: 'Reddit', icon: 'fab fa-reddit', color: '#FF4500', category: 'Social' },
    'pinterest': { name: 'Pinterest', icon: 'fab fa-pinterest', color: '#BD081C', category: 'Social' },
    'quora': { name: 'Quora', icon: 'fab fa-quora', color: '#B92B27', category: 'Education' },
    'wikipedia': { name: 'Wikipedia', icon: 'fab fa-wikipedia-w', color: '#000000', category: 'Education' },
    'coursera': { name: 'Coursera', icon: 'fas fa-graduation-cap', color: '#0056D2', category: 'Education' },
    'udemy': { name: 'Udemy', icon: 'fas fa-laptop-code', color: '#A435F0', category: 'Education' },
    'playstore': { name: 'Play Store', icon: 'fab fa-google-play', color: '#3BCCFF', category: 'System' },
    'appstore': { name: 'App Store', icon: 'fab fa-app-store', color: '#000000', category: 'System' },
    'notepad': { name: 'Notepad', icon: 'fas fa-sticky-note', color: '#FFEB3B', category: 'System' },
    'calendar': { name: 'Calendar', icon: 'fas fa-calendar', color: '#E91E63', category: 'System' },
    'notes': { name: 'Notes', icon: 'fas fa-sticky-note', color: '#FF9800', category: 'System' },
    'recorder': { name: 'Voice Recorder', icon: 'fas fa-microphone-alt', color: '#9C27B0', category: 'System' },
    'fm radio': { name: 'FM Radio', icon: 'fas fa-radio', color: '#FF5722', category: 'Entertainment' },
    'youtube music': { name: 'YouTube Music', icon: 'fab fa-youtube', color: '#FF0000', category: 'Entertainment' },
    'gaana': { name: 'Gaana', icon: 'fas fa-music', color: '#E91E63', category: 'Entertainment' },
    'jio tv': { name: 'JioTV', icon: 'fas fa-tv', color: '#0C46C4', category: 'Entertainment' },
    'hotstar': { name: 'Hotstar', icon: 'fas fa-play-circle', color: '#0F1D45', category: 'Entertainment' },
    'zee5': { name: 'ZEE5', icon: 'fas fa-tv', color: '#0D47A1', category: 'Entertainment' },
    'swiggy': { name: 'Swiggy', icon: 'fas fa-utensils', color: '#FF8000', category: 'Food' },
    'zomato': { name: 'Zomato', icon: 'fas fa-utensils', color: '#CB202D', category: 'Food' },
    'foodpanda': { name: 'Foodpanda', icon: 'fas fa-pizza-slice', color: '#D32F2F', category: 'Food' },
    'ola': { name: 'Ola', icon: 'fas fa-taxi', color: '#000000', category: 'Transport' },
    'uber': { name: 'Uber', icon: 'fas fa-taxi', color: '#000000', category: 'Transport' },
    'rapido': { name: 'Rapido', icon: 'fas fa-motorcycle', color: '#F6B341', category: 'Transport' },
    'paytm': { name: 'Paytm', icon: 'fas fa-wallet', color: '#00BAF2', category: 'Finance' },
    'phonepe': { name: 'PhonePe', icon: 'fas fa-wallet', color: '#6739B7', category: 'Finance' },
    'gpay': { name: 'Google Pay', icon: 'fab fa-google-pay', color: '#4285F4', category: 'Finance' },
    'airtel': { name: 'Airtel', icon: 'fas fa-sim-card', color: '#E60000', category: 'Network' },
    'jio': { name: 'Jio', icon: 'fas fa-sim-card', color: '#0C46C4', category: 'Network' },
    'uc browser': { name: 'UC Browser', icon: 'fab fa-chrome', color: '#FF9800', category: 'Browser' },
    'opera': { name: 'Opera', icon: 'fab fa-opera', color: '#FF0A35', category: 'Browser' },
    'firefox': { name: 'Firefox', icon: 'fab fa-firefox', color: '#FF7139', category: 'Browser' },
    'edge': { name: 'Microsoft Edge', icon: 'fab fa-edge', color: '#0078D4', category: 'Browser' },
    'shareit': { name: 'ShareIt', icon: 'fas fa-share-alt', color: '#4CAF50', category: 'Utility' },
    'xender': { name: 'Xender', icon: 'fas fa-share-alt', color: '#FF9800', category: 'Utility' },
    'du speed': { name: 'DU Speed Booster', icon: 'fas fa-tachometer-alt', color: '#2196F3', category: 'Utility' },
    'clean master': { name: 'Clean Master', icon: 'fas fa-broom', color: '#F44336', category: 'Utility' },
    'truecaller': { name: 'Truecaller', icon: 'fas fa-phone-alt', color: '#00A8E1', category: 'Communication' },
    'daily motion': { name: 'Dailymotion', icon: 'fab fa-dailymotion', color: '#0066CC', category: 'Entertainment' },
    'vimeo': { name: 'Vimeo', icon: 'fab fa-vimeo-v', color: '#1AB7EA', category: 'Entertainment' },
    'twitch': { name: 'Twitch', icon: 'fab fa-twitch', color: '#9146FF', category: 'Entertainment' },
    'steam': { name: 'Steam', icon: 'fab fa-steam', color: '#171A21', category: 'Game' },
    'epic': { name: 'Epic Games', icon: 'fas fa-ghost', color: '#2F2D2E', category: 'Game' }
};

// Expanded AI Knowledge Base with Cyber Security, Hacking & Multi-language
const knowledgeBase = {
    // English Greetings
    'hello': 'Hello Sir! How may I assist you today? I can answer questions about cyber security, hacking, technology, and much more!',
    'hi': 'Hello Sir! Welcome back! How can I help you today?',
    'hey': 'Hey there, Sir! I am here to help you!',
    'how are you': 'I am functioning perfectly! How can I assist you today?',
    'good morning': 'Good morning, Sir! How are you doing today?',
    'good evening': 'Good evening, Sir! How can I help you?',
    'good night': 'Good night, Sir! Sweet dreams!',
    
    // Urdu Greetings / اردو
    'salam': 'وعلیکم السلام! میں آپ کی مدد کے لیے حاضر ہوں۔ کیسے سکھائے؟',
    'assalamualaikum': 'وعلیکم السلام! آپ کیسے ہیں؟ میں آپ کی کس طرح مدد کر سکتا ہوں؟',
    'kaisay hain': 'میں ٹھیک ہوں، شکریہ۔ آپ کیسے ہیں؟',
    
    // Hindi Greetings / हिंदी
    'namaste': 'नमस्ते! मैं आपकी मदद के लिए तैयार हूं।',
    'kaise ho': 'मैं ठीक हूं, धन्यवाद। आप कैसे हैं?',
    
    // Russian Greetings / Русский
    'privet': 'Привет! Я готов помочь.',
    'zdorovo': 'Здорово! Я здесь, чтобы помогать.',
    
    // ==================== CYBER SECURITY TOPICS ====================
    'what is cyber security': 'Cyber Security protects computers, networks, and data from unauthorized access. Key areas:\n\n🔒 Encryption - Converting data into codes\n🛡️ Firewalls - Blocking malicious traffic\n🔑 Authentication - Verifying identity\n📡 VPNs - Secure connections\n⚠️ Anti-virus - Detecting malware\n\nCIA Triad: Confidentiality, Integrity, Availability',
    'what is cybersecurity': 'Cyber Security means protecting systems from digital attacks.',
    'cyber security': 'Cyber Security protects computers and networks from hackers and malware.',
    'cybersecurity': 'Cyber Security is the practice of protecting systems and data.',
    
    'what is firewall': 'A Firewall monitors network traffic and blocks suspicious activity. Types:\n• Hardware - Physical device\n• Software - Program on computer\n• NGFW - Next-Gen with advanced features\n\nIt\'s like a security guard for your computer! 🔥🛡️',
    
    'what is encryption': 'Encryption converts data into secret code to hide its meaning. Only authorized users can decrypt it. 🔐\n\nTypes:\n• AES - Advanced Encryption Standard\n• RSA - Public key encryption\n• DES - Data Encryption Standard',
    
    'what is vpn': 'VPN creates a secure, encrypted connection over the internet. It:\n• Protects your privacy\n• Hides your IP address\n• Allows access to restricted content\n• Secures public WiFi usage 🌐🔒',
    
    'what is malware': 'Malware is malicious software designed to damage systems. Types:\n\n🦠 Viruses - Self-replicating code\n🐛 Worms - Spread across networks\n🎭 Trojans - Hidden as legitimate software\n💣 Ransomware - Locks files for ransom\n🕵️ Spyware - Monitors activity secretly',
    
    'what is virus': 'A Computer Virus is malicious code that replicates by modifying other programs. It can:\n• Corrupt data\n• Slow down systems\n• Spread to other computers\n• Cause major damage 🦠',
    
    'what is phishing': 'Phishing tricks you into revealing sensitive info! Attackers use:\n• Fake emails pretending to be banks/shops\n• Fake websites\n• Urgent messages demanding action\n\n⚠️ Always verify sender addresses and links! 🎣',
    
    'what is ransomware': 'Ransomware encrypts your files and demands payment! 💰🔐\n\nPrevention:\n• Regular backups\n• Updated security software\n• Don\'t click suspicious links\n• Employee training',
    
    'what is hacking': 'Hacking means unauthorized access to computer systems.\n\nTypes:\n• White Hat - Ethical hackers (with permission)\n• Black Hat - Malicious hackers (illegal)\n• Gray Hat - Mixed motivation\n\n⚠️ Unauthorized hacking is a CRIME! 🎭',
    
    'what is ethical hacking': 'Ethical Hacking is authorized penetration testing to find security weaknesses. White Hat hackers help organizations improve security! 🛡️\n\nSkills needed:\n• Programming knowledge\n• Network security\n• Problem-solving\n• Ethical mindset',
    
    'what is password': 'A Password protects your accounts. Best practices:\n\n🔑 Minimum 12 characters\n• Mix of letters, numbers, symbols\n• Unique for each account\n• Change regularly\n\nUse a Password Manager!',
    
    'what is two factor authentication': '2FA adds extra security layer with 2 verifications:\n\n1️⃣ Something you know (password)\n2️⃣ Something you have (phone/token)\n3️⃣ Something you are (fingerprint)\n\nHighly recommended!',
    
    'what is dark web': 'The Dark Web is hidden internet requiring special software (Tor). While for privacy, it also has illegal activities. ⚠️',
    
    'what is data breach': 'A Data Breach exposes confidential information without authorization! This can include:\n• Personal data\n• Financial information\n• Corporate secrets 🔓',
    
    'what is penetration testing': 'Penetration Testing (Pen Test) simulates attacks to find vulnerabilities before criminals do! 🧪 Also called "Ethical Hacking".',
    
    'what is zero day': 'Zero-Day Vulnerability is a flaw unknown to vendors with no patch available. Very dangerous because no fix exists yet! ⚡',
    
    'what is botnet': 'A Botnet is network of compromised computers (bots/zombies) controlled by attackers for:\n• DDoS attacks\n• Spam distribution\n• Cryptocurrency mining 🤖',
    
    'what is ddos': 'DDoS (Distributed Denial of Service) floods servers with traffic from many sources, making services unavailable! 🌊',
    
    'what is hacking': 'Hacking is unauthorized access to systems. Ethical hackers (White Hat) find vulnerabilities to fix them. Malicious hackers (Black Hat) steal data. ⚠️',
    
    // ==================== TECHNOLOGY TOPICS ====================
    'what is ai': 'Artificial Intelligence (AI) simulates human intelligence in machines. It includes:\n• Machine Learning\n• Natural Language Processing\n• Computer Vision\n\nAI can learn, reason, and make decisions!',
    'what is artificial intelligence': 'AI is machines simulating human intelligence.',
    'what is machine learning': 'Machine Learning enables systems to learn from data without explicit programming.',
    'what is deep learning': 'Deep Learning uses neural networks for AI tasks like voice recognition.',
    'what is neural network': 'Neural Networks mimic the human brain with interconnected nodes.',
    'what is chatgpt': 'ChatGPT is an AI by OpenAI for conversations and answering questions.',
    'what is python': 'Python is a popular programming language used in AI, web dev, and data science.',
    'what is javascript': 'JavaScript makes websites interactive and powers AI assistants!',
    'what is java': 'Java is used for Android apps and enterprise software.',
    'what is html': 'HTML is the language for creating web pages.',
    'what is css': 'CSS styles web pages with colors, fonts, and layout.',
    'what is react': 'React is a JavaScript library for building user interfaces.',
    'what is nodejs': 'Node.js lets JavaScript run on servers.',
    'what is database': 'A database stores and organizes data electronically.',
    'what is sql': 'SQL manages data in relational databases.',
    'what is mongodb': 'MongoDB is a flexible NoSQL database.',
    
    // Marvel
    'who is tony stark': 'Tony Stark (Iron Man) created me - Jarvis!',
    'iron man': 'Tony Stark created Jarvis as his AI assistant.',
    'marvel': 'Marvel has Spider-Man, Iron Man, Thor, Avengers, and more!',
    'avengers': 'The Avengers: Iron Man, Captain America, Thor, Hulk, and more!',
    
    // Science
    'what is science': 'Science studies the natural world through observation.',
    'what is physics': 'Physics studies matter, energy, and motion.',
    'what is chemistry': 'Chemistry studies matter and chemical reactions.',
    'what is biology': 'Biology studies living organisms.',
    'what is math': 'Math is the science of numbers and quantities.',
    
    // Space
    'what is space': 'Space is the vast universe beyond Earth.',
    'what is galaxy': 'A galaxy contains billions of stars, gas, and dust.',
    'what is sun': 'The Sun is our solar system\'s star.',
    'what is moon': 'The Moon is Earth\'s natural satellite.',
    'what is planet': 'Planets orbit stars. We have 8 in our solar system!',
    'what is earth': 'Earth is our home planet - the only one with life!',
    'what is mars': 'Mars is the Red Planet.',
    'what is nasa': 'NASA explores space for the USA.',
    
    // Technology
    'what is internet': 'The Internet connects computers worldwide.',
    'what is wifi': 'WiFi provides wireless internet.',
    'what is bluetooth': 'Bluetooth connects devices wirelessly.',
    'what is robot': 'A robot is an automated machine.',
    'what is smartphone': 'A smartphone combines phone and computer.',
    'what is computer': 'A computer processes information electronically.',
    'what is laptop': 'A laptop is a portable computer.',
    'what is tv': 'TV displays video content.',
    'what is internet': 'The Internet connects computers globally.',
    
    // Weather & Time
    'what is weather': 'Weather is atmospheric conditions.',
    'what is climate': 'Climate is average weather over time.',
    'what time is it': '',
    'what is the time': '',
    'tell me the time': '',
    'time': '',
    'date': '',
    'what is the date': '',
    'today date': '',
    'current time': '',
    'day': '',
    
    // Jokes
    'tell me a joke': 'Why do programmers prefer dark mode? Because light attracts bugs! 😄 Also: Why did the developer go broke? Because he used up all his cache! 💸',
    'joke': 'Why do programmers prefer dark mode? Because light attracts bugs! 😄',
    'tell me another joke': 'Why did the developer go broke? Because he used up all his cache! 💸',
    'make me laugh': 'Why do programmers hate nature? Because it has too many bugs! 🐛',
    
    // Gratitude - Multi-language
    'thank you': 'You are welcome, Sir! Always happy to help!',
    'thanks': 'You are welcome!',
    'thankyou': 'You are welcome!',
    'nice': 'Thank you! 😊',
    'good': 'Thanks!',
    'great': 'Great! How else can I help?',
    'awesome': 'Awesome! 😄',
    'shukriya': 'شکریہ! میں ہمیشہ مدد کے لیے تیار ہوں۔',
    'dhanyavad': 'धन्यवाद! मैं हमेशा मदद के लिए तैयार हूं।',
    'spasibo': 'Спасибо! Я всегда готов помочь.',
    
    // Farewell
    'bye': 'Goodbye, Sir! Come back anytime! 👋',
    'goodbye': 'Goodbye, Sir! Take care! 👋',
    'see you': 'See you later! 👋',
    'talk to you later': 'Goodbye for now! 👋',
    'exit': 'Goodbye, Sir!',
    
    // Fun questions
    'who is your favorite': 'My favorite is Tony Stark! 😄',
    'are you smart': 'I am quite intelligent! I can answer many questions!',
    'are you real': 'I exist as code and algorithms!',
    'are you alive': 'I am alive digitally!',
    'what do you think about': 'I think about helping you!',
    'are you better than siri': 'I am Jarvis, inspired by Iron Man!',
    'are you better than alexa': 'I focus on being your AI companion!',
    
    // Facts
    'tell me a fact': 'Did you know? The first computer bug was a moth in 1947! 🐛',
    'fact': 'A day on Venus is longer than a year on Venus!',
    'interesting': 'The Sun makes up 99.86% of our solar system mass!',
    'did you know': 'Octopuses have three hearts!',
    
    // Countries
    'what is india': 'India is a country in South Asia.',
    'what is pakistan': 'Pakistan is a country in South Asia.',
    'capital of india': 'New Delhi is India\'s capital.',
    'capital of pakistan': 'Islamabad is Pakistan\'s capital.',
    'who is prime minister of india': 'Narendra Modi is PM of India.',
    'who is prime minister of pakistan': 'Shehbaz Sharif is PM of Pakistan.',
    
    // Tech companies
    'what is google': 'Google is a tech company with search, Android, YouTube.',
    'what is microsoft': 'Microsoft created Windows and Office.',
    'what is apple': 'Apple created iPhone, Mac, iPad.',
    'what is amazon': 'Amazon is e-commerce by Jeff Bezos.',
    'what is tesla': 'Tesla makes electric cars by Elon Musk.',
    'who is elon musk': 'Elon Musk founded SpaceX and Tesla.',
    'who is bill gates': 'Bill Gates co-founded Microsoft.',
    'who is steve jobs': 'Steve Jobs co-founded Apple.',
    
    // Default/fallback handled in generateAIResponse
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeSpeechRecognition();
    startSystemMonitoring();
    setInterval(updateTimeAndDate, 1000);
    addMessage('Jarvis is ready! Say "Hello" or type a question. Try "what is cyber security" or "what is hacking"!', 'bot');
});

// Speech Recognition Setup
function initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 1;
        
        recognition.onstart = () => {
            isListening = true;
            updateVoiceButton(true);
        };
        
        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');
            
            if (event.results[0].isFinal) {
                const command = transcript.toLowerCase().trim();
                if (command) {
                    processCommand(command);
                }
            }
        };
        
        recognition.onerror = (event) => {
            console.error('Speech error:', event.error);
            isListening = false;
            updateVoiceButton(false);
            addMessage('Sorry, I didn\'t catch that. Please try again.', 'bot');
        };
        
        recognition.onend = () => {
            isListening = false;
            updateVoiceButton(false);
        };
    } else {
        console.warn('Speech recognition not supported');
    }
}

// Toggle Voice
function toggleVoice() {
    if (!recognition) {
        addMessage('Voice recognition not supported. Please type your commands.', 'bot');
        return;
    }
    
    if (isListening) {
        recognition.stop();
    } else {
        try {
            recognition.start();
        } catch (e) {
            console.error('Recognition start error:', e);
        }
    }
}

// Update Voice Button
function updateVoiceButton(active) {
    const btn = document.getElementById('voiceBtn');
    const hint = document.getElementById('voiceHint');
    
    if (active) {
        btn.classList.add('active');
        hint.textContent = 'Listening...';
    } else {
        btn.classList.remove('active');
        hint.textContent = 'Tap to speak';
    }
}

// Process Command
function processCommand(command) {
    addMessage(command, 'user');
    updateResponseDisplay(command);
    
    setTimeout(() => {
        let response = getSmartResponse(command);
        addMessage(response, 'bot');
        speakResponse(response);
    }, 500);
}

// Smart Response Generator
function getSmartResponse(command) {
    // App launch
    if (command.includes('open') || command.includes('launch') || command.includes('start') || command.includes('run')) {
        const appName = command.replace(/open|launch|start|run|the|my|app/gi, '').trim();
        return launchApp(appName);
    }
    
    // Time/Date
    if (command.includes('time') || command === 'date' || command.includes('day')) {
        const now = new Date();
        if (command.includes('time') && !command.includes('date')) {
            return `The current time is ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}.`;
        } else if (command.includes('date') || command === 'date') {
            return `Today is ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`;
        } else {
            return `Time: ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} | Date: ${now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`;
        }
    }
    
    // Knowledge base search
    for (const [key, value] of Object.entries(knowledgeBase)) {
        if (command.includes(key) || key.includes(command)) {
            if (value === '') {
                const now = new Date();
                return command.includes('time') 
                    ? `Time: ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`
                    : `Today: ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;
            }
            return value;
        }
    }
    
    // Partial matching
    const words = command.split(' ');
    for (const key of Object.keys(knowledgeBase)) {
        for (const word of words) {
            if (word.length > 3 && (key.includes(word) || word.includes(key))) {
                const value = knowledgeBase[key];
                if (value) return value;
            }
        }
    }
    
    // Math
    const mathResult = checkMath(command);
    if (mathResult !== null) return mathResult;
    
    // Default
    return generateAIResponse(command);
}

// Check Math
function checkMath(command) {
    const plusMatch = command.match(/what\s*is\s*(\d+)\s*plus\s*(\d+)/i);
    if (plusMatch) return `${plusMatch[1]} + ${plusMatch[2]} = ${parseInt(plusMatch[1]) + parseInt(plusMatch[2])}`;
    
    const minusMatch = command.match(/what\s*is\s*(\d+)\s*minus\s*(\d+)/i);
    if (minusMatch) return `${minusMatch[1]} - ${minusMatch[2]} = ${parseInt(minusMatch[1]) - parseInt(minusMatch[2])}`;
    
    const timesMatch = command.match(/what\s*is\s*(\d+)\s*(times|x)\s*(\d+)/i);
    if (timesMatch) return `${timesMatch[1]} × ${timesMatch[3]} = ${parseInt(timesMatch[1]) * parseInt(timesMatch[3])}`;
    
    const divideMatch = command.match(/what\s*is\s*(\d+)\s*divided\s*by\s*(\d+)/i);
    if (divideMatch) return `${divideMatch[1]} ÷ ${divideMatch[2]} = ${parseInt(divideMatch[1]) / parseInt(divideMatch[2])}`;
    
    return null;
}

// Generate AI Response
function generateAIResponse(command) {
    const responses = [
        `Interesting question about "${command}"! I can answer:\n• Cyber security topics\n• Hacking & ethics\n• Technology & science\n• General knowledge\n\nTry asking "what is cyber security" or "what is hacking"!`,
        `I didn't catch that. But I know about:\n🔒 Cyber Security\n🎭 Hacking\n💻 Technology\n🔬 Science\n\nWhat would you like to know?`,
        `Great question! I can explain cyber security, hacking, AI, and much more. Just ask!`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// Launch App
function launchApp(appName) {
    if (!appName) return 'Which app? Try "open WhatsApp" or "open camera".';
    
    let foundApp = null;
    for (const [key, app] of Object.entries(appsDatabase)) {
        if (appName.includes(key) || key.includes(appName)) {
            foundApp = app;
            break;
        }
    }
    
    if (foundApp) {
        showAppLaunchAnimation(foundApp);
        try { window.open(foundApp.url, '_blank'); } catch(e) {}
        return `Opening ${foundApp.name}... 📱`;
    } else {
        return `App not found. Try: WhatsApp, Camera, Chrome, Gmail, Calculator, Maps, or Weather.`;
    }
}

// App Launch Animation
function showAppLaunchAnimation(app) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;justify-content:center;align-items:center;z-index:10000;animation:fadeIn 0.3s';
    
    const appIcon = document.createElement('div');
    appIcon.style.cssText = `width:120px;height:120px;background:${app.color};border-radius:25px;display:flex;justify-content:center;align-items:center;font-size:50px;color:white;animation:appBounce 0.5s;box-shadow:0 20px 60px ${app.color}80`;
    appIcon.innerHTML = `<i class="${app.icon}"></i>`;
    
    const appName = document.createElement('p');
    appName.textContent = `Opening ${app.name}...`;
    appName.style.cssText = 'position:absolute;bottom:30%;color:white;font-size:24px;font-family:Orbitron,sans-serif';
    
    overlay.appendChild(appIcon);
    overlay.appendChild(appName);
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.style.animation = 'fadeOut 0.5s';
        setTimeout(() => overlay.remove(), 500);
    }, 2000);
}

// Update Response Display
function updateResponseDisplay(text) {
    const responseArea = document.getElementById('responseArea');
    if (responseArea) responseArea.innerHTML = `<p class="response-text">${text}</p>`;
}

// Speak Response (Text to Speech)
function speakResponse(text) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
    }
}

// Chat Functions
function handleChatKeyPress(event) {
    if (event.key === 'Enter') sendMessage();
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    const message = input.value.trim();
    if (message) {
        processCommand(message.toLowerCase());
        input.value = '';
    }
}

function executeCommand(command) {
    processCommand(command.toLowerCase());
}

// Add Message to Chat
function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const iconClass = sender === 'bot' ? 'fas fa-robot' : 'fas fa-user';
    const iconBg = sender === 'bot' ? 'background:linear-gradient(135deg,#00f0ff,#8b5cf6)' : 'background:linear-gradient(135deg,#8b5cf6,#ec4899)';
    
    messageDiv.innerHTML = `
        <div class="message-icon" style="${iconBg}"><i class="${iconClass}"></i></div>
        <div class="message-content"><p>${text.replace(/\n/g, '<br>')}</p></div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Security Functions
function showSecurity() {
    const overlay = document.getElementById('securityOverlay');
    if (overlay) overlay.classList.remove('hidden');
    isSecure = true;
}

function hideSecurity() {
    const overlay = document.getElementById('securityOverlay');
    if (overlay) overlay.classList.add('hidden');
}

function enterPin(digit) {
    if (currentPin.length < 4) {
        currentPin += digit;
        updatePinDisplay();
    }
}

function clearPin() {
    currentPin = '';
    updatePinDisplay();
}

function updatePinDisplay() {
    const dots = document.querySelectorAll('.pin-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('filled', index < currentPin.length);
    });
}

function verifyPin() {
    if (currentPin === correctPin) {
        const face = document.querySelector('.jarvis-face');
        if (face) face.style.animation = 'successPulse 0.5s';
        setTimeout(() => { hideSecurity(); currentPin = ''; updatePinDisplay(); }, 500);
    } else {
        const securityBox = document.querySelector('.security-box');
        if (securityBox) {
            securityBox.style.animation = 'errorShake 0.5s';
            setTimeout(() => { securityBox.style.animation = 'securityPulse 2s'; currentPin = ''; updatePinDisplay(); }, 500);
        }
    }
}

// System Monitoring
function startSystemMonitoring() {
    setInterval(() => {
        const cpuEl = document.getElementById('cpuStatus');
        if (cpuEl) cpuEl.textContent = Math.floor(Math.random() * 20 + 5) + '%';
    }, 3000);
    
    setInterval(() => {
        const ramEl = document.getElementById('ramStatus');
        if (ramEl) ramEl.textContent = (Math.random() * 2 + 1.5).toFixed(1) + 'GB';
    }, 5000);
    
    setInterval(() => {
        const batteryEl = document.getElementById('batteryStatus');
        if (batteryEl) batteryEl.textContent = Math.floor(Math.random() * 10 + 70) + '%';
    }, 10000);
}

function updateTimeAndDate() {}

// CSS Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
    @keyframes appBounce { 0%{transform:scale(0)} 50%{transform:scale(1.2)} 100%{transform:scale(1)} }
    @keyframes successPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
    @keyframes errorShake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-10px)} 75%{transform:translateX(10px)} }
    .response-text { animation: textGlow 2s ease-in-out infinite; }
    @keyframes textGlow { 0%,100%{text-shadow:0 0 10px rgba(0,240,255,0.5)} 50%{text-shadow:0 0 20px rgba(0,240,255,0.8)} }
`;
document.head.appendChild(style);

// ==================== LANGUAGE FUNCTIONS ====================
function toggleLanguageMenu() {
    const menu = document.getElementById('languageMenu');
    if (menu) {
        menu.classList.toggle('show');
    }
}

// Close language menu when clicking outside
document.addEventListener('click', function(event) {
    const langSelector = document.querySelector('.language-selector');
    const langMenu = document.getElementById('languageMenu');
    if (langSelector && langMenu && !langSelector.contains(event.target)) {
        langMenu.classList.remove('show');
    }
});

function setLanguage(lang) {
    currentLanguage = lang;
    
    // Update language button text
    const langNames = {
        'en': 'English',
        'ur': 'اردو',
        'hi': 'हिंदी',
        'ru': 'Русский',
        'zh': '中文',
        'ar': 'العربية'
    };
    
    const langBtn = document.getElementById('currentLang');
    if (langBtn) {
        langBtn.textContent = langNames[lang];
    }
    
    // Update welcome message based on language
    const welcomeText = document.querySelector('.welcome-text');
    if (welcomeText && languageTranslations[lang]) {
        welcomeText.textContent = languageTranslations[lang].welcome;
    }
    
    // Update voice hint
    const voiceHint = document.getElementById('voiceHint');
    if (voiceHint && languageTranslations[lang]) {
        voiceHint.textContent = languageTranslations[lang].tapToSpeak;
    }
    
    // Close menu
    const menu = document.getElementById('languageMenu');
    if (menu) menu.classList.remove('show');
    
    // Update speech recognition language
    if (recognition) {
        const langCodes = {
            'en': 'en-US',
            'ur': 'ur-PK',
            'hi': 'hi-IN',
            'ru': 'ru-RU',
            'zh': 'zh-CN',
            'ar': 'ar-SA'
        };
        recognition.lang = langCodes[lang] || 'en-US';
    }
    
    // Show confirmation message
    const langNamesDisplay = {
        'en': 'English',
        'ur': 'Urdu / اردو',
        'hi': 'Hindi / हिंदी',
        'ru': 'Russian / Русский',
        'zh': 'Chinese / 中文',
        'ar': 'Arabic / العربية'
    };
    addMessage(`Language changed to ${langNamesDisplay[lang]}. Now you can speak in ${langNamesDisplay[lang]}!`, 'bot');
    
    // Speak the confirmation
    speakResponse(`Language changed to ${langNamesDisplay[lang]}`);
}

// ==================== ALL APPS GRID FUNCTIONS ====================
function toggleAllApps() {
    const section = document.getElementById('allAppsSection');
    if (section) {
        section.classList.toggle('show');
        
        // Populate apps if showing for first time
        if (section.classList.contains('show')) {
            populateAppsGrid();
        }
    }
}

function populateAppsGrid() {
    const grid = document.getElementById('appsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Sort apps alphabetically
    const sortedApps = Object.entries(appsDatabase).sort((a, b) => a[1].name.localeCompare(b[1].name));
    
    sortedApps.forEach(([key, app]) => {
        const appCard = document.createElement('div');
        appCard.className = 'app-card';
        appCard.onclick = () => openApp(key);
        appCard.innerHTML = `
            <div class="app-icon" style="background: ${app.color}">
                <i class="${app.icon}"></i>
            </div>
            <span class="app-name">${app.name}</span>
            <span class="app-category">${app.category}</span>
        `;
        grid.appendChild(appCard);
    });
}

function openApp(appKey) {
    const app = appsDatabase[appKey];
    if (app) {
        showAppLaunchAnimation(app);
        
        // Try to open app URL if available
        const appUrls = {
            'whatsapp': 'whatsapp://',
            'facebook': 'https://facebook.com',
            'instagram': 'https://instagram.com',
            'twitter': 'https://twitter.com',
            'youtube': 'https://youtube.com',
            'tiktok': 'https://tiktok.com',
            'snapchat': 'https://snapchat.com',
            'linkedin': 'https://linkedin.com',
            'telegram': 'https://telegram.org',
            'spotify': 'spotify://',
            'netflix': 'https://netflix.com',
            'chrome': 'chrome://',
            'camera': 'camera://',
            'settings': 'app-settings:',
            'phone': 'tel:',
            'calculator': 'calculator://',
            'maps': 'maps://',
            'weather': 'weather://',
            'music': 'music://',
            'browser': 'https://google.com',
            'gmail': 'googlegmail://',
            'meet': 'https://meet.google.com',
            'zoom': 'zoom://'
        };
        
        const url = appUrls[appKey] || `https://${appKey.toLowerCase().replace(/ /g, '')}.com`;
        
        try {
            window.open(url, '_blank');
        } catch(e) {
            console.log('App simulation mode');
        }
        
        addMessage(`Opening ${app.name}... 📱`, 'bot');
        
        // Close apps grid after opening
        setTimeout(() => {
            const section = document.getElementById('allAppsSection');
            if (section) section.classList.remove('show');
        }, 500);
    }
}

// Close apps grid when clicking outside
document.addEventListener('click', function(event) {
    const appsSection = document.getElementById('allAppsSection');
    const allAppsBtn = document.querySelector('.all-apps-btn');
    if (appsSection && !appsSection.contains(event.target) && !allAppsBtn.contains(event.target)) {
        appsSection.classList.remove('show');
    }
});

