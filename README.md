📌 Quizzly - Interactive Quiz Platform
🚀 Quizzly is a fun and interactive quiz platform where users can attempt quizzes, get instant feedback, and track their progress. It supports multiple question formats, a leaderboard, and multiple attempts to improve scores over time.

🔗 Live Demo: [Coming Soon]
🔗 Backend Hosted on Railway: [Coming Soon]
🔗 Frontend Hosted on Netlify/Vercel: (https://quizzlyfun.netlify.app/)

⚡ Tech Stack

Frontend:
⚛ React.js (UI Framework)
🎨 Bootstrap (Styling)
🌐 Axios (API Calls)

Backend:
🚀 Node.js + Express.js (Server)
🛢 MongoDB (Atlas) (Database)
🔄 Mongoose (ODM for MongoDB)


Deployment:

☁ Backend: Railway
☁ Frontend: Netlify/Vercel


✨ Features & Functionality

✅ 1. Interactive Quiz UI → Supports multiple-choice (MCQ) & text-input questions.
✅ 2. Timer-Based Questions → Users get 30 seconds per question, with a progress bar indicator.
✅ 3. Multiple Attempts → Users can re-attempt quizzes & see their best scores.
✅ 4. Leaderboard → Tracks username, score, time taken & date for each attempt.
✅ 5. Backend API Integration → Stores quiz data & user attempts in MongoDB.
✅ 6. Animated Transitions → Smooth transitions between questions & countdown before quiz starts.


📂 Project Structure
bash
Copy
Edit
/Quizzly
│── /frontend        # React Frontend  
│   ├── /src  
│   │   ├── /components  
│   │   ├── /pages  
│   │   ├── /utils  
│   │   ├── App.js  
│   │   ├── index.js  
│   │   └── config.js  
│   ├── package.json  
│   └── README.md  
│  
│── /backend         # Node.js & Express Backend  
│   ├── /routes  
│   ├── /models  
│   ├── server.js  
│   ├── package.json  
│   ├── .env  
│   ├── README.md  
│   └── config.js  
│  
└── README.md        # Main README  


🛠️ Setup & Installation

1️⃣ Clone the Repository
sh
Copy
Edit
git clone https://github.com/your-username/Quizzly.git
cd Quizzly
2️⃣ Install Dependencies
Backend (Node.js & Express)
sh
Copy
Edit
cd backend
npm install
Frontend (React)
sh
Copy
Edit
cd frontend
npm install
3️⃣ Set Up Environment Variables
Create a .env file in the /backend folder and add:
env
Copy
Edit
MONGO_URI = your-mongodb-connection-string
PORT = 5000
4️⃣ Run the Project
Start Backend (Node.js)
sh
Copy
Edit
npm run dev  # Uses nodemon for auto-restart
Start Frontend (React)
sh
Copy
Edit
npm start


🌍 Deployment

1️⃣ Backend on Railway
Host the backend on Railway while keeping MongoDB Atlas.
Set PORT and MONGO_URI as environment variables.

2️⃣ Frontend on Netlify
Connect frontend repo to Netlify.
Update API_URL in frontend/config.js to use Railway's backend.
🎯 Future Plans & Goals
📌 1. Add User Authentication → Login/signup feature with JWT.
📌 2. Add Quiz Categories & Difficulty Levels.
📌 3. Add Image-Based Questions → Support for visual quizzes.
📌 4. AI-Based Quiz Generation → Auto-generate questions using GPT API.
📌 5. Better UI Enhancements → Improve design, animations, and accessibility.


🚀 Quizzly - Making Learning Fun!
This project started as a simple frontend quiz app, but has evolved into a full-stack interactive quiz platform. With upcoming features and improvements, Quizzly aims to be a great tool for both learning & fun! 😊

