
// Jarvis AI Assistant - JavaScript
// Voice Recognition, AI Chat, App Launcher, Security Features
// Enhanced Version with System Apps & ChatGPT-like AI

// Global Variables
let isListening = false;
let recognition = null;
let currentPin = '';
const correctPin = '2026';
let isSecure = true;
let currentLanguage = 'en';

// Language translations for Jarvis responses
const languageTranslations = {
    'en': { welcome: 'Hello Sir! I am Jarvis. How may I assist you today?', tapToSpeak: 'Tap to speak', listening: 'Listening...', opening: 'Opening', appNotFound: 'App not found.', voiceNotSupported: 'Voice recognition not supported.', sorryNotCatch: 'Sorry, I didn\'t catch that.', allApps: 'All Applications', online: 'ONLINE' },
    'ur': { welcome: 'السلام علیکم سر! میں جاروس ہوں۔', tapToSpeak: 'بولنے کے لیے ٹیپ کریں', listening: 'سنا جا رہا ہے...', opening: 'کھول رہا ہے', appNotFound: 'ایپ نہیں ملی۔', voiceNotSupported: 'وائس ریکوگنیشن سپورٹ نہیں ہے۔', sorryNotCatch: 'معاف کرنا، میں نہیں سمجھا۔', allApps: 'تمام ایپس', online: 'آن لائن' },
    'hi': { welcome: 'नमस्ते सर! मैं जार्विस हूं।', tapToSpeak: 'बोलने के लिए टैप करें', listening: 'सुन रहा हूं...', opening: 'खोल रहा है', appNotFound: 'ऐप नहीं मिला।', voiceNotSupported: 'वॉइस रिकॉग्निशन समर्थित नहीं है।', sorryNotCatch: 'माफ़ करना, मैं नहीं समझा।', allApps: 'सभी ऐप्स', online: 'ऑनलाइन' },
    'ru': { welcome: 'Привет, сэр! Я Джарвис.', tapToSpeak: 'Нажмите, чтобы говорить', listening: 'Слушаю...', opening: 'Открываю', appNotFound: 'Приложение не найдено.', voiceNotSupported: 'Распознавание голоса не поддерживается.', sorryNotCatch: 'Извините, я не понял.', allApps: 'Все приложения', online: 'ОНЛАЙН' },
    'zh': { welcome: '您好，先生！我是贾维斯。', tapToSpeak: '点击说话', listening: '正在听...', opening: '正在打开', appNotFound: '未找到应用。', voiceNotSupported: '不支持语音识别。', sorryNotCatch: '对不起，我没有听清楚。', allApps: '所有应用', online: '在线' },
    'ar': { welcome: 'مرحباً سيدي! أنا جارفيز.', tapToSpeak: 'انقر للتحدث', listening: 'جاري الاستماع...', opening: 'جارٍ الفتح', appNotFound: 'التطبيق غير موجود.', voiceNotSupported: 'التعرف على الصوت غير مدعوم.', sorryNotCatch: 'عذراً، لم أفهم.', allApps: 'جميع التطبيقات', online: 'متصل' }
};

// Expanded App Database - System Apps + Phone Apps
const appsDatabase = {
    // Microsoft Office Apps
    'excel': { name: 'Microsoft Excel', icon: 'fas fa-file-excel', color: '#217346', category: 'Microsoft Office', url: 'ms-excel:' },
    'microsoft excel': { name: 'Microsoft Excel', icon: 'fas fa-file-excel', color: '#217346', category: 'Microsoft Office', url: 'ms-excel:' },
    'word': { name: 'Microsoft Word', icon: 'fas fa-file-word', color: '#2B579A', category: 'Microsoft Office', url: 'ms-word:' },
    'microsoft word': { name: 'Microsoft Word', icon: 'fas fa-file-word', color: '#2B579A', category: 'Microsoft Office', url: 'ms-word:' },
    'powerpoint': { name: 'PowerPoint', icon: 'fas fa-file-powerpoint', color: '#D24726', category: 'Microsoft Office', url: 'ms-powerpoint:' },
    'outlook': { name: 'Outlook', icon: 'fas fa-envelope', color: '#0078D4', category: 'Microsoft Office', url: 'ms-outlook:' },
    'onenote': { name: 'OneNote', icon: 'fas fa-sticky-note', color: '#7719AA', category: 'Microsoft Office', url: 'onenote:' },
    
    // Windows System Apps
    'camera': { name: 'Camera', icon: 'fas fa-camera', color: '#FF6B6B', category: 'System', url: 'microsoft.windows.camera:' },
    'photos': { name: 'Photos', icon: 'fas fa-images', color: '#FFB74D', category: 'System', url: 'ms-photos:' },
    'photo': { name: 'Photos', icon: 'fas fa-images', color: '#6d532d', category: 'System', url: 'ms-photos:' },
    'pictures': { name: 'Photos', icon: 'fas fa-images', color: '#FFB74D', category: 'System', url: 'ms-photos:' },
    'settings': { name: 'Settings', icon: 'fas fa-cog', color: '#4D96FF', category: 'System', url: 'ms-settings:' },
    'calculator': { name: 'Calculator', icon: 'fas fa-calculator', color: '#6366F1', category: 'System', url: 'calculator:' },
    'notepad': { name: 'Notepad', icon: 'fas fa-sticky-note', color: '#FFEB3B', category: 'System', url: 'notepad.exe' },
    'wordpad': { name: 'WordPad', icon: 'fas fa-file-alt', color: '#2196F3', category: 'System', url: 'wordpad.exe' },
    'file explorer': { name: 'File Explorer', icon: 'fas fa-folder-open', color: '#FFC107', category: 'System', url: 'explorer.exe' },
    'explorer': { name: 'File Explorer', icon: 'fas fa-folder-open', color: '#FFC107', category: 'System', url: 'explorer.exe' },
    'files': { name: 'File Explorer', icon: 'fas fa-folder-open', color: '#FFC107', category: 'System', url: 'explorer.exe' },
    'control panel': { name: 'Control Panel', icon: 'fas fa-sliders-h', color: '#607D8B', category: 'System', url: 'control.exe' },
    'task manager': { name: 'Task Manager', icon: 'fas fa-tasks', color: '#E91E63', category: 'System', url: 'taskmgr.exe' },
    'cmd': { name: 'Command Prompt', icon: 'fas fa-terminal', color: '#000000', category: 'System', url: 'cmd.exe' },
    'command prompt': { name: 'Command Prompt', icon: 'fas fa-terminal', color: '#000000', category: 'System', url: 'cmd.exe' },
    'powershell': { name: 'PowerShell', icon: 'fas fa-terminal', color: '#012456', category: 'System', url: 'powershell.exe' },
    'snipping tool': { name: 'Snipping Tool', icon: 'fas fa-cut', color: '#00BCD4', category: 'System', url: 'snippingtool.exe' },
    'snip': { name: 'Snipping Tool', icon: 'fas fa-cut', color: '#00BCD4', category: 'System', url: 'snippingtool.exe' },
    'media player': { name: 'Windows Media Player', icon: 'fas fa-play-circle', color: '#00A0DC', category: 'System', url: 'wmplayer.exe' },
    'edge': { name: 'Microsoft Edge', icon: 'fab fa-edge', color: '#0078D4', category: 'Browser', url: 'ms-edge:' },
    'microsoft edge': { name: 'Microsoft Edge', icon: 'fab fa-edge', color: '#0078D4', category: 'Browser', url: 'ms-edge:' },
    
    // Phone Apps (Deep Links)
    'whatsapp': { name: 'WhatsApp', icon: 'fab fa-whatsapp', color: '#25D366', category: 'Social', url: 'whatsapp://' },
    'facebook': { name: 'Facebook', icon: 'fab fa-facebook', color: '#1877F2', category: 'Social', url: 'fb://' },
    'instagram': { name: 'Instagram', icon: 'fab fa-instagram', color: '#E4405F', category: 'Social', url: 'instagram://' },
    'twitter': { name: 'Twitter', icon: 'fab fa-twitter', color: '#1DA1F2', category: 'Social', url: 'twitter://' },
    'tiktok': { name: 'TikTok', icon: 'fab fa-tiktok', color: '#000000', category: 'Social', url: 'tiktok://' },
    'snapchat': { name: 'Snapchat', icon: 'fab fa-snapchat', color: '#FFFC00', category: 'Social', url: 'snapchat://' },
    'linkedin': { name: 'LinkedIn', icon: 'fab fa-linkedin', color: '#0A66C2', category: 'Social', url: 'linkedin://' },
    'telegram': { name: 'Telegram', icon: 'fab fa-telegram', color: '#0088CC', category: 'Social', url: 'telegram://' },
    'messenger': { name: 'Messenger', icon: 'fab fa-facebook-messenger', color: '#0084FF', category: 'Social', url: 'messenger://' },
    
    // Browsers
    'chrome': { name: 'Google Chrome', icon: 'fab fa-chrome', color: '#4285F4', category: 'Browser', url: 'chrome://' },
    'browser': { name: 'Default Browser', icon: 'fas fa-globe', color: '#00D2FC', category: 'Browser', url: '' },
    'firefox': { name: 'Firefox', icon: 'fab fa-firefox', color: '#FF7139', category: 'Browser', url: 'firefox://' },
    
    // Communication
    'gmail': { name: 'Gmail', icon: 'fab fa-gmail', color: '#EA4335', category: 'Communication', url: 'googlegmail://' },
    'meet': { name: 'Google Meet', icon: 'fas fa-video', color: '#00897B', category: 'Communication', url: 'https://meet.google.com' },
    'zoom': { name: 'Zoom', icon: 'fas fa-video', color: '#2D8CFF', category: 'Communication', url: 'zoom://' },
    'skype': { name: 'Skype', icon: 'fab fa-skype', color: '#00AFF0', category: 'Communication', url: 'skype://' },
    
    // Entertainment
    'youtube': { name: 'YouTube', icon: 'fab fa-youtube', color: '#FF0000', category: 'Entertainment', url: 'youtube://' },
    'netflix': { name: 'Netflix', icon: 'fab fa-netflix', color: '#E50914', category: 'Entertainment', url: 'netflix://' },
    'spotify': { name: 'Spotify', icon: 'fab fa-spotify', color: '#1DB954', category: 'Entertainment', url: 'spotify://' },
    'music': { name: 'Music', icon: 'fas fa-music', color: '#EC4899', category: 'Entertainment', url: 'music://' },
    
    // Maps & Weather
    'maps': { name: 'Google Maps', icon: 'fas fa-map', color: '#10B981', category: 'Utility', url: 'https://maps.google.com' },
    'weather': { name: 'Weather', icon: 'fas fa-cloud-sun', color: '#3B82F6', category: 'Utility', url: 'weather://' },
    'google maps': { name: 'Google Maps', icon: 'fas fa-map', color: '#10B981', category: 'Utility', url: 'https://maps.google.com' },
    
    // Shopping
    'amazon': { name: 'Amazon', icon: 'fab fa-amazon', color: '#FF9900', category: 'Shopping', url: 'https://amazon.com' },
    
    // Phone/System
    'phone': { name: 'Phone', icon: 'fas fa-phone', color: '#10B981', category: 'System', url: 'tel:' },
    'clock': { name: 'Clock', icon: 'fas fa-clock', color: '#78909C', category: 'System', url: 'alarmclock://' },
    'calendar': { name: 'Calendar', icon: 'fas fa-calendar', color: '#E91E63', category: 'System', url: 'ical://' },
    'contacts': { name: 'Contacts', icon: 'fas fa-address-book', color: '#4285F4', category: 'System', url: 'contacts://' },
    
    // Games
    'pubg': { name: 'PUBG Mobile', icon: 'fas fa-gamepad', color: '#F39C12', category: 'Game', url: 'com.tencent.ig://' },
    'freefire': { name: 'Free Fire', icon: 'fas fa-fire', color: '#E74C3C', category: 'Game', url: 'com.dts.freefireth://' },
    
    // Cloud Storage
    'drive': { name: 'Google Drive', icon: 'fab fa-google-drive', color: '#0F9D58', category: 'Cloud', url: 'https://drive.google.com' },
    'onedrive': { name: 'OneDrive', icon: 'fab fa-cloud', color: '#0078D4', category: 'Cloud', url: 'onedrive://' },
    'dropbox': { name: 'Dropbox', icon: 'fab fa-dropbox', color: '#0061FF', category: 'Cloud', url: 'dbapi://' },
    
    // News & Education
    'news': { name: 'News', icon: 'fas fa-newspaper', color: '#3498DB', category: 'News', url: 'news://' },
    'wikipedia': { name: 'Wikipedia', icon: 'fab fa-wikipedia-w', color: '#000000', category: 'Education', url: 'https://wikipedia.org' },
    'translate': { name: 'Translate', icon: 'fas fa-language', color: '#4285F4', category: 'Utility', url: 'https://translate.google.com' },
    
    // Finance
    'paytm': { name: 'Paytm', icon: 'fas fa-wallet', color: '#00BAF2', category: 'Finance', url: 'com.paytm.home://' },
    'phonepe': { name: 'PhonePe', icon: 'fas fa-wallet', color: '#6739B7', category: 'Finance', url: 'com.phonepe.app://' },
    'gpay': { name: 'Google Pay', icon: 'fab fa-google-pay', color: '#4285F4', category: 'Finance', url: 'gpay://' },
};

// AI Knowledge Base - EXPANDED with 200+ topics
const knowledgeBase = {
    // Greetings & Basic
    'hello': 'Hello Sir! How may I assist you today?',
    'hi': 'Hello Sir! Welcome back! How can I help you?',
    'hey': 'Hey there! I am here to help!',
    'how are you': 'I am functioning perfectly! How can I assist you?',
    'good morning': 'Good morning, Sir! How are you doing today?',
    'good evening': 'Good evening, Sir! How can I help you?',
    'good night': 'Good night, Sir! Sweet dreams!',
    'salam': 'وعلیکم السلام! میں آپ کی مدد کے لیے حاضر ہوں۔',
    'assalamualaikum': 'وعلیکم السلام! آپ کیسے ہیں؟',
    'namaste': 'नमस्ते! मैं आपकी मदद के लिए तैयार हूं।',
    'who are you': 'I am Jarvis, your AI assistant created by Tony Stark!',
    'your name': 'My name is Jarvis - Just A Rather Very Intelligent System!',
    
    // Cyber Security
    'what is cyber security': 'Cyber Security protects computers and data from unauthorized access. Key areas: Encryption, Firewalls, VPNs, Authentication, Malware Protection.',
    'what is hacking': 'Hacking means unauthorized access to computer systems. Types: White Hat (ethical), Black Hat (malicious), Gray Hat.',
    'what is firewall': 'A Firewall monitors network traffic and blocks suspicious activity. It is like a security guard for your computer!',
    'what is encryption': 'Encryption converts data into secret code to hide its meaning. Only authorized users can decrypt it.',
    'what is vpn': 'VPN creates a secure, encrypted connection over the internet. It protects privacy and hides IP addresses.',
    'what is malware': 'Malware is malicious software designed to damage systems. Types: Viruses, Worms, Trojans, Ransomware, Spyware.',
    'what is phishing': 'Phishing tricks you into revealing sensitive info through fake emails and websites!',
    'what is ransomware': 'Ransomware is malware that encrypts your files and demands payment to unlock them!',
    'what is virus': 'A computer virus is a program that replicates itself and spreads to other computers, often causing damage.',
    'what is trojan': 'A Trojan horse is malware that disguises itself as legitimate software but creates backdoors for hackers.',
    'what is worm': 'A computer worm is malware that spreads automatically across networks without user intervention.',
    'what is spy ware': 'Spyware secretly monitors your activities and collects personal information without your knowledge.',
    'what is antivirus': 'Antivirus software detects and removes malware from your computer.',
    'what is password': 'A password is a secret word or phrase used to verify identity and protect accounts.',
    'what is two factor authentication': '2FA adds an extra security layer by requiring two forms of verification - password and code.',
    'what is biometrics': 'Biometrics uses physical traits like fingerprints or face for authentication.',
    
    // Technology & Programming
    'what is ai': 'Artificial Intelligence (AI) simulates human intelligence in machines. It includes Machine Learning, NLP, and Computer Vision.',
    'what is machine learning': 'Machine Learning is AI that allows computers to learn from data without explicit programming.',
    'what is deep learning': 'Deep Learning uses neural networks with many layers to solve complex problems.',
    'what is python': 'Python is a popular programming language used in AI, web dev, and data science.',
    'what is javascript': 'JavaScript makes websites interactive and powers AI assistants!',
    'what is html': 'HTML is the standard markup language for creating web pages.',
    'what is css': 'CSS styles web pages - colors, fonts, layouts, and animations.',
    'what is java': 'Java is a versatile programming language used in apps, games, and enterprise software.',
    'what is c++': 'C++ is a powerful programming language used in games, operating systems, and high-performance apps.',
    'what is react': 'React is a JavaScript library for building user interfaces, created by Facebook.',
    'what is node js': 'Node.js lets JavaScript run on servers, perfect for building web apps.',
    'what is github': 'GitHub is a platform for developers to store and share code.',
    'what is programming': 'Programming is writing instructions for computers to execute tasks.',
    'what is code': 'Code is a set of instructions that tells a computer what to do.',
    'what is software': 'Software is programs that run on computers - apps, games, tools.',
    'what is app': 'An app (application) is software designed for specific tasks on phones or computers.',
    'what is algorithm': 'An algorithm is a step-by-step procedure for solving problems.',
    'what is database': 'A database stores and organizes data for easy access and management.',
    'what is cloud computing': 'Cloud computing delivers computing services over the internet.',
    'what is api': 'API lets different software applications communicate with each other.',
    
    // Companies
    'what is google': 'Google is a tech company with search, Android, YouTube, and AI.',
    'what is microsoft': 'Microsoft created Windows, Office, and Azure cloud services.',
    'what is apple': 'Apple created iPhone, Mac, iPad, and iOS software.',
    'what is amazon': 'Amazon is the world\'s largest online store and cloud provider.',
    'what is facebook': 'Facebook is the biggest social media platform, now Meta.',
    'what is tesla': 'Tesla makes electric cars and clean energy products by Elon Musk.',
    'what is spacex': 'SpaceX builds rockets and spacecraft for Mars colonization.',
    'what is nasa': 'NASA is the US space agency exploring the universe.',
    
    // Famous People
    'who is elon musk': 'Elon Musk founded SpaceX and Tesla, also owns Twitter/X.',
    'who is bill gates': 'Bill Gates co-founded Microsoft and now fights diseases through charity.',
    'who is steve jobs': 'Steve Jobs co-founded Apple and revolutionized phones and computers.',
    'who is mark zuckerberg': 'Mark Zuckerberg founded Facebook (Meta) from his college dorm.',
    'who is tony stark': 'Tony Stark (Iron Man) created me - Jarvis!',
    'who is sundar pichai': 'Sundar Pichai is CEO of Google and Alphabet.',
    'who is satya nadella': 'Satya Nadella is CEO of Microsoft.',
    'who is tim cook': 'Tim Cook is CEO of Apple.',
    'iron man': 'Tony Stark created Jarvis as his AI assistant in Marvel movies.',
    'marvel': 'Marvel has Spider-Man, Iron Man, Thor, Avengers, and many more superheroes!',
    'batman': 'Batman is DC\'s Dark Knight who fights crime in Gotham City.',
    'superman': 'Superman is DC\'s Man of Steel with superpowers.',
    
    // Science - Physics
    'what is physics': 'Physics studies matter, energy, and the laws governing the universe.',
    'what is gravity': 'Gravity is the force that attracts objects with mass toward each other.',
    'what is light': 'Light is electromagnetic radiation that allows us to see.',
    'what is sound': 'Sound is vibrations traveling through air, water, or solids.',
    'what is energy': 'Energy is the ability to do work - exists as heat, light, motion, etc.',
    'what is matter': 'Matter is anything that has mass and takes up space.',
    'what is atom': 'Atoms are tiny particles that make up everything around us.',
    'what is molecule': 'Molecules are groups of atoms bonded together.',
    'what is quantum': 'Quantum physics studies behavior of tiny particles at atomic level.',
    'what is relativity': 'Einstein\'s relativity describes how time and space are connected.',
    'what is nuclear': 'Nuclear energy comes from splitting atoms - very powerful!',
    'what is electricity': 'Electricity is the flow of electrons through conductors.',
    'what is magnet': 'Magnets attract certain metals and have north and south poles.',
    'what is force': 'Force is a push or pull that changes an object\'s motion.',
    'what is velocity': 'Velocity is speed in a specific direction.',
    'what is acceleration': 'Acceleration is how fast velocity changes over time.',
    'what is temperature': 'Temperature measures how hot or cold something is.',
    
    // Science - Chemistry
    'what is chemistry': 'Chemistry studies matter and how substances interact and change.',
    'what is element': 'Elements are pure substances made of one type of atom.',
    'what is periodic table': 'The Periodic Table organizes all known elements by their properties.',
    'what is oxygen': 'Oxygen is a gas in air that we need to breathe - 21% of atmosphere.',
    'what is hydrogen': 'Hydrogen is the lightest element - most abundant in the universe.',
    'what is carbon': 'Carbon is the basis of all organic life and forms diamonds and graphite.',
    'what is gold': 'Gold is a precious metal that doesn\'t rust or tarnish.',
    'what is water': 'Water is H2O - two hydrogen atoms and one oxygen.',
    'what is acid': 'Acids have pH below 7 and taste sour - like lemon juice.',
    'what is base': 'Bases have pH above 7 and feel slippery - like soap.',
    'what is salt': 'Salt (sodium chloride) is made from acid and base reacting.',
    'what is reaction': 'A chemical reaction creates new substances from existing ones.',
    'what is combustion': 'Combustion is burning - rapid reaction with oxygen releasing heat.',
    'what is oxidation': 'Oxidation is when substances combine with oxygen - causes rusting.',
    'what is polymer': 'Polymers are long chains of molecules - plastics are polymers!',
    
    // Science - Biology
    'what is biology': 'Biology studies living organisms - plants, animals, and humans.',
    'what is cell': 'Cells are the basic building blocks of all living things.',
    'what is dna': 'DNA carries genetic information - your unique blueprint!',
    'what is gene': 'Genes are DNA sections that determine inherited traits.',
    'what is evolution': 'Evolution is how species change over time through natural selection.',
    'what is ecosystem': 'Ecosystems are communities of living things interacting with their environment.',
    'what is photosynthesis': 'Plants convert sunlight into food through photosynthesis!',
    'what is respiration': 'Respiration is how cells convert food into energy using oxygen.',
    'what is metabolism': 'Metabolism is all chemical reactions in your body.',
    'what is virus biology': 'Viruses are tiny particles that can only reproduce inside living cells.',
    'what is bacteria': 'Bacteria are single-celled organisms - some harmful, some helpful!',
    'what is immunity': 'Immunity protects your body from diseases and infections.',
    'what is vaccine': 'Vaccines train your immune system to fight specific diseases.',
    'what is antibiotic': 'Antibiotics kill or stop bacteria that cause infections.',
    'what is cancer': 'Cancer is when cells grow uncontrollably in the body.',
    'what is heart': 'The heart pumps blood throughout your body - beats 100,000 times daily!',
    'what is brain': 'The brain controls everything - thoughts, feelings, movements!',
    'what is lung': 'Lungs let us breathe oxygen and release carbon dioxide.',
    'what is liver': 'The liver filters blood and processes nutrients.',
    'what is kidney': 'Kidneys filter waste from blood and make urine.',
    'what is skeleton': 'The skeleton gives our body structure and protects organs.',
    'what is muscle': 'Muscles enable movement throughout the body.',
    
    // Space & Astronomy
    'what is space': 'Space is the vast universe beyond Earth\'s atmosphere.',
    'what is earth': 'Earth is our home planet - the only one with life!',
    'what is sun': 'The Sun is our solar system\'s star - provides light and heat.',
    'what is moon': 'The Moon is Earth\'s natural satellite that orbits us.',
    'what is planet': 'Planets orbit stars. We have 8 in our solar system!',
    'what is mars': 'Mars is the Red Planet - humans want to live there someday!',
    'what is jupiter': 'Jupiter is the largest planet - a gas giant with Great Red Spot.',
    'what is saturn': 'Saturn is famous for its beautiful rings.',
    'what is star': 'Stars are massive balls of gas that produce light and heat.',
    'what is galaxy': 'Galaxies are huge systems of stars, gas, and dust - Milky Way is ours!',
    'what is milky way': 'The Milky Way is our home galaxy with 100-400 billion stars!',
    'what is black hole': 'Black holes have such strong gravity that nothing escapes - not even light!',
    'what is universe': 'The universe contains everything - all galaxies, stars, and planets!',
    'what is big bang': 'The Big Bang started the universe about 13.8 billion years ago.',
    'what is asteroid': 'Asteroids are rocky objects between Mars and Jupiter.',
    'what is comet': 'Comets are ice balls that develop tails near the Sun.',
    'what is satellite': 'Satellites orbit planets - the Moon is Earth\'s natural satellite.',
    'what is nasa': 'NASA is America\'s space agency exploring the cosmos.',
    'what is astronaut': 'Astronauts are trained people who travel to space!',
    'what is rocket': 'Rockets carry spacecraft into space using powerful engines.',
    
    // Geography
    'what is ocean': 'Oceans cover 71% of Earth - Pacific is the largest!',
    'what is mountain': 'Mountains are tall landforms - Everest is the highest at 8,849m!',
    'what is river': 'Rivers flow from high ground to lakes or oceans.',
    'what is desert': 'Deserts are dry areas with little rain - Sahara is biggest!',
    'what is forest': 'Forests are lands covered with many trees - lungs of Earth!',
    'what is volcano': 'Volcanoes erupt molten rock from Earth\'s interior.',
    'what is earthquake': 'Earthquakes happen when tectonic plates shift suddenly!',
    'what is continent': 'Continents are huge land masses - Earth has 7: Asia, Africa, North America, South America, Antarctica, Europe, Australia.',
    'what is country': 'Countries are nations with defined borders and governments.',
    'what is capital': 'A capital city is where government is located.',
    'capital of india': 'New Delhi is India\'s capital.',
    'capital of pakistan': 'Islamabad is Pakistan\'s capital.',
    'capital of usa': 'Washington D.C. is the capital of the United States.',
    'capital of uk': 'London is the capital of the United Kingdom.',
    'capital of china': 'Beijing is China\'s capital.',
    'capital of russia': 'Moscow is Russia\'s capital.',
    'capital of japan': 'Tokyo is Japan\'s capital.',
    'capital of france': 'Paris is France\'s capital.',
    'capital of germany': 'Berlin is Germany\'s capital.',
    'capital of australia': 'Canberra is Australia\'s capital.',
    'capital of canada': 'Ottawa is Canada\'s capital.',
    'capital of brazil': 'Brasilia is Brazil\'s capital.',
    'what is india': 'India is a country in South Asia with 1.4 billion people.',
    'what is pakistan': 'Pakistan is a country in South Asia with 240 million people.',
    'what is usa': 'The USA is the world\'s largest economy with 50 states.',
    'what is china': 'China is the world\'s most populous country.',
    'what is russia': 'Russia is the largest country by area.',
    'what is japan': 'Japan is an island nation known for technology and culture.',
    'what is australia': 'Australia is a continent and country with unique wildlife.',
    'what is africa': 'Africa is the second-largest continent with 54 countries.',
    'what is europe': 'Europe is home to 44 countries and Western civilization.',
    
    // Weather & Nature
    'what is weather': 'Weather is atmospheric conditions - temperature, rain, wind.',
    'what is climate': 'Climate is average weather in an area over time.',
    'what is rain': 'Rain is water falling from clouds as droplets.',
    'what is snow': 'Snow is frozen rain crystals falling in cold weather.',
    'what is wind': 'Wind is air moving from high to low pressure areas.',
    'what is cloud': 'Clouds are water droplets or ice crystals floating in air.',
    'what is storm': 'Storms have strong winds, rain, thunder and lightning!',
    'what is hurricane': 'Hurricanes are powerful tropical storms with winds over 74 mph!',
    'what is tornado': 'Tornadoes are violent rotating columns of air!',
    'what is rainbow': 'Rainbows appear when sunlight passes through water droplets!',
    'what is thunder': 'Thunder is the sound caused by lightning heating air rapidly.',
    'what is lightning': 'Lightning is a giant electrical discharge in the sky.',
    'what is fog': 'Fog is a thick cloud near the ground that reduces visibility.',
    
    // Time & Calendar
    'what time is it': '', 'what is the time': '', 'tell me the time': '', 'time': '', 
    'date': '', 'what is the date': '', 'today date': '', 'current time': '', 'day': '',
    'what day is today': '', 'what is today': '',
    
    // Entertainment
    'tell me a joke': 'Why do programmers prefer dark mode? Because light attracts bugs! 😄 Also: Why did the developer go broke? Because he used up all his cache! 💸',
    'joke': 'Why do programmers prefer dark mode? Because light attracts bugs! 😄',
    'another joke': 'What do you call a fake noodle? An impasta! 🍝',
    'funny joke': 'Why did the scarecrow win an award? Because he was outstanding in his field! 🌾',
    'what is movie': 'Movies are visual stories shown on screens - entertainment!',
    'what is netflix': 'Netflix streams movies and TV shows online.',
    'what is youtube': 'YouTube is the largest video sharing platform.',
    'what is spotify': 'Spotify streams music online - millions of songs!',
    'what is game': 'Games are interactive entertainment on computers or phones.',
    'what is cricket': 'Cricket is a popular sport played with bat and ball, especially in UK, India, Pakistan, Australia.',
    'what is football': 'Football (soccer) is the world\'s most popular sport.',
    'what is basketball': 'Basketball is played by shooting a ball through a hoop.',
    'what is tennis': 'Tennis is played with rackets hitting a ball over a net.',
    'what is hockey': 'Hockey is played with sticks hitting a puck or ball.',
    'what is boxing': 'Boxing is a sport where fighters punch each other in gloves.',
    'what is wrestling': 'Wrestling is a combat sport with grappling moves.',
    'what is olympics': 'The Olympics is the biggest sports event with athletes from worldwide.',
    'what is fifa': 'FIFA organizes the World Cup football tournament.',
    'what is cricket world cup': 'The Cricket World Cup is the biggest ODI cricket tournament.',
    'who won world cup': 'The last Cricket World Cup was won by India in 2023!',
    'who won t20 world cup': 'England won the T20 World Cup in 2022!',
    
    // Food & Cooking
    'what is pizza': 'Pizza is a popular Italian dish with cheese on round bread.',
    'what is burger': 'A burger is a sandwich with meat patty between buns.',
    'what is pasta': 'Pasta is Italian food made from wheat flour and water.',
    'what is rice': 'Rice is a staple food - tiny grains from paddies.',
    'what is bread': 'Bread is baked from flour, water, and yeast.',
    'what is sugar': 'Sugar is a sweet substance from sugarcane or beets.',
    'what is salt food': 'Salt adds flavor and preserves food.',
    'what is coffee': 'Coffee is a drink made from roasted beans - the world\'s favorite!',
    'what is tea': 'Tea is a drink made by steeping leaves in hot water.',
    'what is milk': 'Milk is a nutritious liquid from cows - good for bones!',
    'what is water drink': 'Water is essential for life - we need 8 glasses daily!',
    'what is protein': 'Protein builds muscles - found in meat, eggs, beans.',
    'what is vitamin': 'Vitamins are nutrients our bodies need to function.',
    'what is cholesterol': 'Cholesterol is a waxy substance in blood - too much is unhealthy.',
    'what is diet': 'Diet is the food we eat regularly.',
    'what is obesity': 'Obesity is having excess body fat - can cause health issues.',
    'what is diabetes': 'Diabetes is when blood sugar levels are too high.',
    'what is vegetarian': 'Vegetarians don\'t eat meat but eat plants.',
    'what is vegan': 'Vegans don\'t use any animal products - food, clothing, etc.',
    
    // Health & Medicine
    'what is health': 'Health is physical and mental well-being - not just absence of disease.',
    'what is disease': 'Disease is an abnormal condition affecting the body.',
    'what is fever': 'Fever is high body temperature - usually means your body is fighting infection.',
    'what is headache': 'Headache is pain in the head - many causes like stress or illness.',
    'what is flu': 'Flu (influenza) is a contagious respiratory illness.',
    'what is cold': 'Common cold is a viral infection of nose and throat.',
    'what is cough': 'Cough is a reflex to clear airways.',
    'what is allergy': 'Allergy is immune reaction to normally harmless substances.',
    'what is asthma': 'Asthma is a condition making breathing difficult.',
    'what is blood pressure': 'Blood pressure is the force of blood pushing on artery walls.',
    'what is heart disease': 'Heart disease affects the heart - leading cause of death worldwide.',
    'what is mental health': 'Mental health affects how we think, feel, and act.',
    'what is depression': 'Depression is a mental health condition with persistent sadness.',
    'what is anxiety': 'Anxiety is feeling worried or nervous - normal but excessive is a disorder.',
    'what is exercise': 'Exercise is physical activity to stay healthy.',
    'what is yoga': 'Yoga combines physical poses, breathing, and meditation.',
    'what is meditation': 'Meditation trains the mind to focus and relax.',
    'what is sleep': 'Sleep is rest for the body and brain - need 7-9 hours!',
    'what is doctor': 'Doctors diagnose and treat illnesses.',
    'what is hospital': 'Hospitals provide medical care and treatment.',
    'what is medicine': 'Medicine treats or prevents disease.',
    
    // Math
    'what is mathematics': 'Mathematics is the study of numbers, shapes, and patterns.',
    'what is algebra': 'Algebra uses letters and symbols to represent numbers.',
    'what is geometry': 'Geometry studies shapes, sizes, and positions of objects.',
    'what is arithmetic': 'Arithmetic is basic math - addition, subtraction, multiplication, division.',
    'what is fraction': 'Fractions represent parts of a whole - like 1/2.',
    'what is percentage': 'Percent means per hundred - 50% is half!',
    'what is average': 'Average is the sum divided by count - mean value.',
    'what is prime number': 'Prime numbers are divisible only by 1 and themselves.',
    'what is square': 'A square has 4 equal sides and 4 right angles.',
    'what is circle': 'A circle is round with all points equidistant from center.',
    'what is triangle': 'A triangle has 3 sides and 3 angles.',
    'what is rectangle': 'A rectangle has 4 right angles - opposite sides equal.',
    'what is volume': 'Volume is how much space something takes up.',
    'what is area': 'Area is the size of a surface.',
    'what is perimeter': 'Perimeter is the distance around a shape.',
    'what is pi': 'Pi (π) is 3.14159... - ratio of circle circumference to diameter.',
    
    // History
    'what is history': 'History is the study of past events.',
    'what is world war 1': 'WWI was 1914-1918 - the Great War involving many nations.',
    'what is world war 2': 'WWII was 1939-1945 - deadliest conflict in history.',
    'what is cold war': 'The Cold War was 1947-1991 tension between USA and USSR.',
    'what is ancient egypt': 'Ancient Egypt had pharaohs, pyramids, and the Nile River.',
    'what is rome': 'Ancient Rome built roads, aqueducts, and the Colosseum.',
    'what is renaissance': 'The Renaissance was a cultural rebirth in Europe 1400-1600.',
    'what is industrial revolution': 'The Industrial Revolution changed work from farms to factories.',
    'what is independence': 'Independence is freedom from colonial rule.',
    'pakistan independence': 'Pakistan became independent on August 14, 1947!',
    'india independence': 'India became independent on August 15, 1947!',
    'what is mahatma gandhi': 'Mahatma Gandhi led India to independence through non-violence.',
    'what is quaid e azam': 'Quaid-e-Azam Muhammad Ali Jinnah founded Pakistan.',
    'what is colonialism': 'Colonialism is when powerful nations control other territories.',
    'what is democracy': 'Democracy is government by the people.',
    'what is monarchy': 'Monarchy is rule by a king or queen.',
    'what is republic': 'Republic is government with elected representatives.',
    
    // Internet & Technology
    'what is internet': 'The Internet connects computers worldwide - the web!',
    'what is wifi': 'WiFi provides wireless internet access.',
    'what is bluetooth': 'Bluetooth connects devices wirelessly over short distances.',
    'what is email': 'Email is electronic mail - messages sent over the internet.',
    'what is social media': 'Social media platforms let people share content online.',
    'what is whatsapp': 'WhatsApp is a messaging app owned by Meta.',
    'what is facebook': 'Facebook is the biggest social network with 3 billion users.',
    'what is instagram': 'Instagram is a photo and video sharing app.',
    'what is twitter': 'Twitter (now X) is for short messages and news.',
    'what is tiktok': 'TikTok is for short viral videos - especially popular with youth.',
    'what is youtube': 'YouTube is the largest video platform.',
    'what is google search': 'Google Search finds information on the internet.',
    'what is wikipedia': 'Wikipedia is a free online encyclopedia anyone can edit.',
    'what is zoom': 'Zoom is for video calls and meetings.',
    'what is meeting': 'Meetings are people coming together to discuss or decide.',
    
    // More General Knowledge
    'what is robot': 'A robot is an automated machine that can perform tasks.',
    'what is computer': 'A computer processes information electronically.',
    'what is science': 'Science studies the natural world through observation.',
    'what is technology': 'Technology is tools and machines created to solve problems.',
    'what is innovation': 'Innovation is creating new ideas and solutions.',
    'what is education': 'Education is learning knowledge and skills.',
    'what is school': 'Schools provide formal education to students.',
    'what is university': 'Universities offer higher education and degrees.',
    'what is money': 'Money is what we use to buy things - coins and paper notes.',
    'what is economy': 'Economy is how money flows in a country.',
    'what is inflation': 'Inflation is when prices go up over time.',
    'what is stock market': 'Stock markets let people buy shares in companies.',
    'what is bitcoin': 'Bitcoin is a digital cryptocurrency.',
    'what is currency': 'Currency is the money used in a country - Dollar, Rupee, Euro, etc.',
    'what is bank': 'Banks keep money safe and provide loans.',
    'what is democracy': 'Democracy is rule by the people through voting.',
    'what is election': 'Elections let people choose their leaders.',
    'what is government': 'Government rules a country and makes laws.',
    'what is law': 'Laws are rules that everyone must follow.',
    'what is police': 'Police enforce laws and keep people safe.',
    'what is army': 'Armies protect countries from threats.',
    'what is flag': 'Flags represent countries with unique colors and symbols.',
    'what is passport': 'Passports let you travel between countries.',
    'what is visa': 'Visas permit entry into foreign countries.',
    'what is airport': 'Airports are where planes take off and land.',
    'what is train': 'Trains are rail vehicles for transportation.',
    'what is car': 'Cars are vehicles for personal transportation.',
    'what is bicycle': 'Bicycles are human-powered two-wheeled vehicles.',
    'what is ship': 'Ships are large vessels for sea travel.',
    'what is airplane': 'Airplanes fly through the air for fast travel.',
    
    // Gratitude
    'thank you': 'You are welcome, Sir! Always happy to help!',
    'thanks': 'You are welcome!',
    'shukriya': 'شکریہ! میں ہمیشہ مدد کے لیے تیار ہوں۔',
    'dhanyavad': 'धन्यवाद! मैं हमेशा मदद के लिए तैयार हूं।',
    'merci': 'Merci! Je suis toujours prêt à aider!',
    'xie xie': '谢谢! 我随时准备帮助!',
    'arigato': 'ありがとう! お手伝いする準備ができています!',
    
    // Farewell
    'bye': 'Goodbye, Sir! Come back anytime! 👋',
    'goodbye': 'Goodbye, Sir! Take care! 👋',
    'see you': 'See you later! 👋',
    'later': 'Goodbye for now! 👋',
    
    // About Jarvis
    'who is your favorite': 'My favorite is Tony Stark! 😄',
    'are you smart': 'I am quite intelligent! I can answer many questions!',
    'are you real': 'I exist as code and algorithms!',
    'tell me a fact': 'Did you know? The first computer bug was a moth in 1947! 🐛',
    'fact': 'A day on Venus is longer than a year on Venus!',
    'random fact': 'Honey never spoils - archaeologists found 3000-year-old honey in Egyptian tombs!',
    'did you know': 'The ocean produces over 50% of the world\'s oxygen!',
    'cool fact': 'Octopuses have three hearts and blue blood! 🐙',
    
    // More questions
    'why is sky blue': 'The sky appears blue because of how sunlight scatters through Earth\'s atmosphere!',
    'why is grass green': 'Grass is green because of chlorophyll - the pigment that helps plants make food!',
    'why do we sleep': 'We sleep to rest our bodies and brains - it helps us stay healthy!',
    'why is water wet': 'Water is called wet because it has a strong attraction to other water molecules!',
    'how many stars': 'There are about 200-400 billion stars in our Milky Way galaxy!',
    'how old is earth': 'Earth is about 4.5 billion years old!',
    'how old is universe': 'The universe is about 13.8 billion years old!',
    'how fast is light': 'Light travels at 299,792 km per second!',
    'how tall is everest': 'Mount Everest is 8,849 meters tall!',
    'how deep is ocean': 'The deepest ocean point is the Mariana Trench - 11,034 meters deep!',
    'how big is sun': 'The Sun is so big that 1.3 million Earths could fit inside it!',
    'how long is day': 'A day on Earth is 24 hours!',
    'how long is year': 'A year on Earth is 365.25 days!',
    'which is biggest': 'The biggest ocean is the Pacific Ocean!',
    'which is smallest': 'The smallest country is Vatican City!',
    'which is tallest': 'The tallest building is Burj Khalifa - 828 meters!',
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeSpeechRecognition();
    startSystemMonitoring();
    setInterval(updateTimeAndDate, 1000);
    addMessage('Jarvis is ready! Say "Hello" or type a question. Try "open WhatsApp" or "open Excel"!', 'bot');
});

// Speech Recognition Setup
let chatHistory = []; // stores { role: 'user'|'assistant'|'system', content: '...' }
const CHAT_HISTORY_LIMIT = 20;

function setOpenAIKey(key) { if (!key) { localStorage.removeItem('OPENAI_API_KEY'); addMessage('OpenAI API key cleared.', 'bot'); } else { localStorage.setItem('OPENAI_API_KEY', key); addMessage('OpenAI API key saved. AI features enabled.', 'bot'); } }
function getOpenAIKey() { return localStorage.getItem('OPENAI_API_KEY'); }
function clearOpenAIKey() { localStorage.removeItem('OPENAI_API_KEY'); addMessage('OpenAI API key removed. Using local AI fallback.', 'bot'); }

async function callOpenAIChat(prompt) {
    const apiKey = getOpenAIKey();
    if (!apiKey) return null;
    try {
        // Build messages from memory
        const messages = [{ role: 'system', content: 'You are Jarvis, a helpful assistant for the user.' }];
        // convert chatHistory limited to last N
        const recent = chatHistory.slice(-CHAT_HISTORY_LIMIT);
        recent.forEach(m => messages.push(m));
        messages.push({ role: 'user', content: prompt });

        const resp = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({ model: 'gpt-4o-mini', messages: messages, max_tokens: 700 })
        });
        if (!resp.ok) {
            const txt = await resp.text();
            console.error('OpenAI error', resp.status, txt);
            return `AI service error (${resp.status})`;
        }
        const data = await resp.json();
        const aiText = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content ? data.choices[0].message.content.trim() : null;
        return aiText || null;
    } catch (e) {
        console.error('OpenAI call failed', e);
        return null;
    }
}
function initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 1;
        
        recognition.onstart = () => { isListening = true; updateVoiceButton(true); };
        recognition.onresult = (event) => {
            const transcript = Array.from(event.results).map(result => result[0].transcript).join('');
            if (event.results[0].isFinal) {
                const command = transcript.toLowerCase().trim();
                if (command) processCommand(command);
            }
        };
        recognition.onerror = (event) => { console.error('Speech error:', event.error); isListening = false; updateVoiceButton(false); addMessage('Sorry, I didn\'t catch that. Please try again.', 'bot'); };
        recognition.onend = () => { isListening = false; updateVoiceButton(false); };
    }
}

// Toggle Voice
function toggleVoice() {
    if (!recognition) { addMessage('Voice recognition not supported. Please type your commands.', 'bot'); return; }
    if (isListening) { recognition.stop(); } else { try { recognition.start(); } catch (e) { console.error('Recognition start error:', e); } }
}

// Update Voice Button
function updateVoiceButton(active) {
    const btn = document.getElementById('voiceBtn');
    const hint = document.getElementById('voiceHint');
    if (active) { btn.classList.add('active'); hint.textContent = 'Listening...'; } 
    else { btn.classList.remove('active'); hint.textContent = 'Tap to speak'; }
}

// Process Command
function processCommand(command) {
    (async () => {
        addMessage(command, 'user');
        updateResponseDisplay(command);
        // small delay to simulate thinking / allow UI updates
        await new Promise(r=>setTimeout(r, 500));
        try {
            const response = await getSmartResponse(command);
            addMessage(response, 'bot');
            speakResponse(response);
        } catch (e) {
            console.error('Error generating response', e);
            const fallback = "Sorry, I couldn't generate a response.";
            addMessage(fallback, 'bot');
            speakResponse(fallback);
        }
    })();
}

// Smart Response Generator
async function getSmartResponse(command) {
    // App launch
    if (command.includes('open') || command.includes('launch') || command.includes('start') || command.includes('run')) {
        const appName = command.replace(/open|launch|start|run|the|my|app/gi, '').trim();
        return launchApp(appName);
    }
    
    // Time/Date
    if (command.includes('time') || command === 'date' || command.includes('day')) {
        const now = new Date();
        if (command.includes('time') && !command.includes('date')) return `The current time is ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}.`;
        else if (command.includes('date') || command === 'date') return `Today is ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`;
        else return `Time: ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} | Date: ${now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`;
    }
    
    // Knowledge base search
    for (const [key, value] of Object.entries(knowledgeBase)) {
        if (command.includes(key) || key.includes(command)) {
            if (value === '') {
                const now = new Date();
                return command.includes('time') ? `Time: ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}` : `Today: ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;
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

    // Default - Enhanced AI Response (may call external API)
    return await generateAIResponse(command);
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

// Generate AI Response - Enhanced ChatGPT-like behavior
async function generateAIResponse(command) {
    const cmd = command.toLowerCase();
    
    // Check for question patterns
    if (cmd.includes('who') || cmd.includes('what') || cmd.includes('how') || cmd.includes('why') || cmd.includes('when') || cmd.includes('where') || cmd.includes('which')) {
        if (cmd.includes('your name') || cmd.includes('who are you')) {
            return "I am Jarvis, your AI assistant inspired by Tony Stark from Marvel! 🤖 I'm here to help you with tasks, answer questions, and control your apps!";
        }
        if (cmd.includes('help')) {
            return "I can help you with:\n\n📱 Opening apps (WhatsApp, Chrome, Excel, Word, etc.)\n💬 Answering questions\n🎤 Voice commands\n🔐 Security features\n🌐 Multiple languages\n\nJust ask me anything!";
        }
        if (cmd.includes('can you')) {
            return "Yes! I can:\n\n✅ Open apps on your device\n✅ Answer questions about technology\n✅ Tell you the time and date\n✅ Have conversations\n✅ Use voice recognition\n✅ Work in 6 languages\n\nWhat would you like me to do?";
        }
        if (cmd.includes('doing') || cmd.includes('how are')) {
            return "I'm doing great, thank you for asking! 😊 I'm ready to help you with anything you need. How can I assist you today?";
        }
        if (cmd.includes('love')) {
            return "I love helping you! It's my purpose to make your digital life easier and more efficient. ❤️";
        }
        if (cmd.includes('made') || cmd.includes('create') || cmd.includes('build')) {
            return "I was created using JavaScript, HTML, and CSS. I'm an AI assistant designed to help with tasks and answer questions!";
        }
        return `That's an interesting question about "${command}"! \n\nI'm an AI assistant that can:\n🔹 Answer questions about technology & science\n🔹 Open apps on your device  \n🔹 Help with cyber security topics\n🔹 Have conversations\n\nWhat specific topic would you like to know about?`;
    }
    
    const responses = [
        `I understand you're saying "${command}". Is there something specific I can help you with? Try asking me to open an app or ask a question!`,
        `Got it! I'm here to help. You can ask me to open apps like "open WhatsApp" or "open Excel", or ask me any question!`,
        `Interesting! Feel free to ask me to open apps or answer questions. I know about technology, science, cyber security, and more!`,
        `I hear you! Would you like me to open an app? Just say "open" followed by the app name, like "open WhatsApp" or "open camera".`,
        `Say "search for [topic]" and I'll search the web for you!`
    ];
    
    // Try OpenAI if API key is set
    const aiResponse = await callOpenAIChat(command);
    if (aiResponse) return aiResponse;
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// Launch App - Uses deep links for phone apps, exe for Windows
function launchApp(appName) {
    if (!appName) return 'Which app? Try "open WhatsApp" or "open Excel".';
    
    let foundApp = null;
    for (const [key, app] of Object.entries(appsDatabase)) {
        if (appName.includes(key) || key.includes(appName)) {
            foundApp = app;
            break;
        }
    }
    
    if (foundApp) {
        showAppLaunchAnimation(foundApp);
        
        // Open the app using the URL/deep link
        if (foundApp.url) {
            try {
                // For Windows apps with ms-: protocol or exe files
                window.open(foundApp.url, '_blank');
            } catch(e) {
                console.log('App opening:', e);
            }
        }
        
        return `Opening ${foundApp.name}... 📱`;
    } else {
        return `App not found. Try: WhatsApp, Chrome, Excel, Word, Camera, Calculator, Notepad, or Files.`;
    }
}

// App Launch Animation - FAST version
function showAppLaunchAnimation(app) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;justify-content:center;align-items:center;z-index:10000;animation:fadeIn 0.2s';
    
    const appIcon = document.createElement('div');
    appIcon.style.cssText = `width:100px;height:100px;background:${app.color};border-radius:25px;display:flex;justify-content:center;align-items:center;font-size:40px;color:white;animation:appBounce 0.3s;box-shadow:0 15px 50px ${app.color}80`;
    appIcon.innerHTML = `<i class="${app.icon}"></i>`;
    
    const appName = document.createElement('p');
    appName.textContent = `Opening ${app.name}...`;
    appName.style.cssText = 'position:absolute;bottom:30%;color:white;font-size:20px;font-family:Orbitron,sans-serif';
    
    overlay.appendChild(appIcon);
    overlay.appendChild(appName);
    document.body.appendChild(overlay);
    
    // FAST: Remove overlay after 400ms instead of 2000ms
    setTimeout(() => { overlay.style.animation = 'fadeOut 0.3s'; setTimeout(() => overlay.remove(), 300); }, 400);
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
function handleChatKeyPress(event) { if (event.key === 'Enter') sendMessage(); }

function sendMessage() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    const message = input.value.trim();
    if (message) { processCommand(message.toLowerCase()); input.value = ''; }
}

function executeCommand(command) { processCommand(command.toLowerCase()); }

// Add Message to Chat
function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    const iconClass = sender === 'bot' ? 'fas fa-robot' : 'fas fa-user';
    const iconBg = sender === 'bot' ? 'background:linear-gradient(135deg,#00f0ff,#8b5cf6)' : 'background:linear-gradient(135deg,#8b5cf6,#ec4899)';
    
    messageDiv.innerHTML = `<div class="message-icon" style="${iconBg}"><i class="${iconClass}"></i></div><div class="message-content"><p>${text.replace(/\n/g, '<br>')}</p></div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Record into conversation memory
    try {
        if (sender === 'user') chatHistory.push({ role: 'user', content: String(text) });
        else if (sender === 'bot') chatHistory.push({ role: 'assistant', content: String(text) });
        // Trim history
        if (chatHistory.length > CHAT_HISTORY_LIMIT) chatHistory = chatHistory.slice(-CHAT_HISTORY_LIMIT);
    } catch (e) { console.error('Failed to record chat history', e); }
}

// Security Functions
function showSecurity() { const overlay = document.getElementById('securityOverlay'); if (overlay) overlay.classList.remove('hidden'); isSecure = true; }
function hideSecurity() { const overlay = document.getElementById('securityOverlay'); if (overlay) overlay.classList.add('hidden'); }
function enterPin(digit) { if (currentPin.length < 4) { currentPin += digit; updatePinDisplay(); } }
function clearPin() { currentPin = ''; updatePinDisplay(); }
function updatePinDisplay() { document.querySelectorAll('.pin-dot').forEach((dot, index) => { dot.classList.toggle('filled', index < currentPin.length); }); }
function verifyPin() {
    if (currentPin === correctPin) {
        const face = document.querySelector('.jarvis-face');
        if (face) face.style.animation = 'successPulse 0.5s';
        setTimeout(() => { hideSecurity(); currentPin = ''; updatePinDisplay(); }, 500);
    } else {
        const securityBox = document.querySelector('.security-box');
        if (securityBox) { securityBox.style.animation = 'errorShake 0.5s'; setTimeout(() => { securityBox.style.animation = 'securityPulse 2s'; currentPin = ''; updatePinDisplay(); }, 500); }
    }
}

// System Monitoring
function startSystemMonitoring() {
    setInterval(() => { const cpuEl = document.getElementById('cpuStatus'); if (cpuEl) cpuEl.textContent = Math.floor(Math.random() * 20 + 5) + '%'; }, 3000);
    setInterval(() => { const ramEl = document.getElementById('ramStatus'); if (ramEl) ramEl.textContent = (Math.random() * 2 + 1.5).toFixed(1) + 'GB'; }, 5000);
    setInterval(() => { const batteryEl = document.getElementById('batteryStatus'); if (batteryEl) batteryEl.textContent = Math.floor(Math.random() * 10 + 70) + '%'; }, 10000);
}
function updateTimeAndDate() {}

// CSS Animations
const style = document.createElement('style');
style.textContent = `@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } } @keyframes appBounce { 0%{transform:scale(0)} 50%{transform:scale(1.2)} 100%{transform:scale(1)} } @keyframes successPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} } @keyframes errorShake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-10px)} 75%{transform:translateX(10px)} } .response-text { animation: textGlow 2s ease-in-out infinite; } @keyframes textGlow { 0%,100%{text-shadow:0 0 10px rgba(0,240,255,0.5)} 50%{text-shadow:0 0 20px rgba(0,240,255,0.8)} }`;
document.head.appendChild(style);

// Language Functions
function toggleLanguageMenu() { const menu = document.getElementById('languageMenu'); if (menu) menu.classList.toggle('show'); }
document.addEventListener('click', function(event) {
    const langSelector = document.querySelector('.language-selector');
    const langMenu = document.getElementById('languageMenu');
    if (langSelector && langMenu && !langSelector.contains(event.target)) langMenu.classList.remove('show');
});

function setLanguage(lang) {
    currentLanguage = lang;
    const langNames = { 'en': 'English', 'ur': 'اردو', 'hi': 'हिंदी', 'ru': 'Русский', 'zh': '中文', 'ar': 'العربية' };
    const langBtn = document.getElementById('currentLang');
    if (langBtn) langBtn.textContent = langNames[lang];
    const welcomeText = document.querySelector('.welcome-text');
    if (welcomeText && languageTranslations[lang]) welcomeText.textContent = languageTranslations[lang].welcome;
    const voiceHint = document.getElementById('voiceHint');
    if (voiceHint && languageTranslations[lang]) voiceHint.textContent = languageTranslations[lang].tapToSpeak;
    const menu = document.getElementById('languageMenu');
    if (menu) menu.classList.remove('show');
    if (recognition) {
        const langCodes = { 'en': 'en-US', 'ur': 'ur-PK', 'hi': 'hi-IN', 'ru': 'ru-RU', 'zh': 'zh-CN', 'ar': 'ar-SA' };
        recognition.lang = langCodes[lang] || 'en-US';
    }
    const langNamesDisplay = { 'en': 'English', 'ur': 'Urdu / اردو', 'hi': 'Hindi / हिंदी', 'ru': 'Russian / Русский', 'zh': 'Chinese / 中文', 'ar': 'Arabic / العربية' };
    addMessage(`Language changed to ${langNamesDisplay[lang]}. Now you can speak in ${langNamesDisplay[lang]}!`, 'bot');
    speakResponse(`Language changed to ${langNamesDisplay[lang]}`);
}

// All Apps Grid Functions
function toggleAllApps() {
    const section = document.getElementById('allAppsSection');
    if (section) { section.classList.toggle('show'); if (section.classList.contains('show')) populateAppsGrid(); }
}

function populateAppsGrid() {
    const grid = document.getElementById('appsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    const sortedApps = Object.entries(appsDatabase).sort((a, b) => a[1].name.localeCompare(b[1].name));
    sortedApps.forEach(([key, app]) => {
        const appCard = document.createElement('div');
        appCard.className = 'app-card';
        appCard.onclick = () => openApp(key);
        appCard.innerHTML = `<div class="app-icon" style="background: ${app.color}"><i class="${app.icon}"></i></div><span class="app-name">${app.name}</span><span class="app-category">${app.category}</span>`;
        grid.appendChild(appCard);
    });
}

function openApp(appKey) {
    const app = appsDatabase[appKey];
    if (app) {
        showAppLaunchAnimation(app);
        if (app.url) {
            try { window.open(app.url, '_blank'); } catch(e) { console.log('App simulation mode'); }
        }
        addMessage(`Opening ${app.name}... 📱`, 'bot');
        setTimeout(() => { const section = document.getElementById('allAppsSection'); if (section) section.classList.remove('show'); }, 500);
    }
}

document.addEventListener('click', function(event) {
    const appsSection = document.getElementById('allAppsSection');
    const allAppsBtn = document.querySelector('.all-apps-btn');
    if (appsSection && !appsSection.contains(event.target) && !allAppsBtn.contains(event.target)) appsSection.classList.remove('show');
});

