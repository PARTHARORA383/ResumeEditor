
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './Pages/Home'
import { Navbar } from './components/Navbar'
import { ResumeTemplate } from './components/ResumeTemplate'
function App() {



  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route
            path="/resume"
            element={<ResumeTemplate
              name="Parth Arora"
              email="Partharora@gmail.com"
              education={[
                {
                  degree: "Bachelor of technology",
                  institute: "Indian Institute of Engineering and Technology",
                  startdate: "2019",
                  enddate: "2023",
                },
              ]}
              experience={[
                {
                  role: "Developer",
                  company: "Geet Hosiery",
                  duration: "2 years",
                  description:
                    "Worked extensively on designing and deploying AI agents to automate operational workflows such as inventory prediction and sales forecasting. Built REST APIs using Node.js and Express to integrate AI models with existing ERP systems. Leveraged Python for data preprocessing and model development using libraries like scikit-learn and TensorFlow. Also collaborated with frontend teams to integrate AI outputs into React dashboards for business insights.",
                },
              ]}
              projects={[
                {
                  title: "AI-Powered Inventory Management System",
                  description:
                    "Developed a full-stack inventory management application using React.js for the frontend and Node.js with Express for backend APIs. Integrated TensorFlow-based predictive models to forecast stock requirements, reducing overstocking by 30%. Implemented JWT authentication for secure access and used MongoDB as the primary database for storing inventory and transaction records. Deployed the application on AWS EC2 with Nginx as a reverse proxy for scalable and reliable access by the team.",
                },
              ]}
            />
            }
          />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
