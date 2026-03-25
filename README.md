# LeafVision 🌿

LeafVision is an AI-powered web application designed to help farmers and agricultural enthusiasts detect plant diseases in tomato leaves using advanced machine learning models. The platform provides accurate disease identification, treatment recommendations, and a community-driven knowledge base to support sustainable farming practices.

## 🚀 Features

- **Disease Detection**: Upload tomato leaf images and get instant disease predictions using multiple AI models
- **Multiple AI Models**: Choose from ResNet-50, EfficientNet-B0, DenseNet-121, and MobileNetV2
- **User Authentication**: Secure registration and login system
- **Community Sharing**: Share predictions and learn from other users' experiences
- **AI Chatbot**: Get agricultural advice and recommendations through our AgriBot
- **Treatment Remedies**: Access detailed treatment information for detected diseases
- **Dashboard**: View your prediction history and manage your profile
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS3** - Custom styling with responsive design

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **Multer** - Middleware for handling file uploads
- **bcryptjs** - Password hashing

### AI & ML
- **Python** - Machine learning implementation
- **PyTorch** - Deep learning framework
- **Google Generative AI** - For chatbot functionality

## 📁 Project Structure

```
LeafVision/
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vite.config.js
├── backend/
│   ├── densenet121.pt
│   ├── efficientnet_b0.pt
│   ├── mobilenetv2_100.pt
│   ├── package-lock.json
│   ├── package.json
│   ├── predict.py
│   ├── remedies.json
│   ├── resnet50.pt
│   ├── server.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── chatbotController.js
│   │   └── predictionController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Prediction.js
│   │   └── User.js
│   ├── routes/
│   │   ├── botRoute.js
│   │   └── predictionRoutes.js
│   ├── uploads/
│   │   ├── [uploaded images]
│   └── utils/
│       └── predictMock.js
├── public/
│   └── image.png
└── src/
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── assets/
    │   ├── leaf.jpeg
    │   ├── logo.png
    │   └── react.svg
    ├── components/
    │   ├── CTA.jsx
    │   ├── Features.jsx
    │   ├── Footer.jsx
    │   ├── Hero.jsx
    │   ├── HowItWorks.jsx
    │   └── Navbar.jsx
    ├── pages/
    │   ├── AgriBot.jsx
    │   ├── community.jsx
    │   ├── Dashboard.jsx
    │   ├── DetectDisease.jsx
    │   ├── Home.jsx
    │   ├── Profile.jsx
    │   ├── Register.jsx
    │   └── SignIn.jsx
    ├── styles/
    │   ├── bot.css
    │   ├── community.css
    │   ├── cta.css
    │   ├── dashboard.css
    │   ├── detect.css
    │   ├── features.css
    │   ├── footer.css
    │   ├── hero.css
    │   ├── howitworks.css
    │   ├── navbar.css
    │   ├── profile.css
    │   ├── register.css
    │   └── signin.css
    └── utils/
        └── api.js
```

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn** package manager

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/Leafvision.git
cd Leafvision
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_AI_API_KEY=your_google_ai_api_key
PORT=5000
```

### 4. AI Models Setup
The AI models are pre-trained and stored in the `backend/` directory:
- `resnet50.pt`
- `efficientnet_b0.pt`
- `densenet121.pt`
- `mobilenetv2_100.pt`

### 5. Start the Backend Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🚀 Usage

### Development Workflow

1. **Start the Backend Server** (from `backend/` directory):
   ```bash
   npm run dev
   ```

2. **Start the Frontend** (from root directory):
   ```bash
   npm run dev
   ```

3. **Access the Application**:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

### Production Build

```bash
# Build the frontend
npm run build

# Preview the build
npm run preview
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Predictions
- `POST /api/predictions/upload` - Upload image and get prediction
- `GET /api/predictions/user/:userId` - Get user's predictions
- `GET /api/predictions/shared` - Get all shared predictions
- `POST /api/predictions/comment/:id` - Add comment to prediction

### Chatbot
- `POST /api/bot/chat` - Send message to AgriBot

## 🔄 Workflow Design

### User Journey

1. **Landing Page**: User visits the home page and learns about LeafVision's features
2. **Authentication**: User registers or signs in to access full functionality
3. **Disease Detection**:
   - Upload tomato leaf image
   - Select preferred AI model
   - Choose whether to share prediction publicly
   - Receive instant disease prediction with confidence score
4. **Results & Remedies**: View detailed results and treatment recommendations
5. **Community Interaction**: Browse shared predictions and learn from others
6. **Dashboard**: Access personal prediction history and profile management
7. **AI Assistance**: Consult AgriBot for additional agricultural advice

### System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │  Express Backend │   │     MongoDB     │
│                 │◄──►│                 │◄──►│                 │
│ - User Interface│    │ - REST API      │    │ - Users         │
│ - Routing       │    │ - Authentication│    │ - Predictions   │
│ - API Calls     │    │ - File Upload   │    │ - Comments      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   AI Services   │
                    │                 │
                    │ - Python Models │
                    │ - PyTorch       │
                    │ - Google AI     │
                    └─────────────────┘
```

### Data Flow

1. **Image Upload**: User uploads image → Frontend → Backend → File storage
2. **Prediction Request**: Backend calls Python script → AI model processes image → Returns prediction
3. **Result Storage**: Prediction saved to MongoDB with user association
4. **Community Sharing**: Shared predictions made publicly accessible
5. **Chatbot Interaction**: User query → Google AI API → Response generation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## 👥 Authors

- **Abhishek Bahuguna** - *Initial work* - [Your GitHub](https://github.com/Abhishek980-tech\)

## 🙏 Acknowledgments

- Plant disease dataset providers
- PyTorch and Google AI communities
- Open source contributors

## 📞 Support

For support, email support@Leafvision.com or join our Discord community.

---

**Made with ❤️ for farmers worldwide**
