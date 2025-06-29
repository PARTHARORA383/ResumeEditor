import { useState } from "react"
import { FaArrowUp } from "react-icons/fa";
import { motion } from 'motion/react'
import { useGlobalState } from "../context/Parsecontent";



export function ResumeUpload() {
  const [dragOver, setDragOver] = useState(false)
  const [loading, setLoading] = useState(false);
  const [selectedfile, setSelectedfile] = useState<File | null>(null);
  const [error, setError] = useState<true | false>(false)
  const { setParsedData } = useGlobalState()


  const mockParsedData = {
   
  "name": "Parth Arora",
  "email": "parth@example.com",
  "education": [
    {
      "degree": "B.Tech",
      "institute": "Indian Institute of Engineering and Technology",
      "startdate": "2019",
      "enddate": "2023"
    },
    {
      "degree": "Higher Secondary Education",
      "institute": "Delhi Public School",
      "startdate": "2017",
      "enddate": "2019"
    }
  ],
  "experience": [
    {
      "role": "Developer",
      "company": "Geet Hosiery",
      "duration": "2 years",
      "description": "Worked extensively on designing and deploying AI agents to automate operational workflows such as inventory prediction and sales forecasting. Built REST APIs using Node.js and Express to integrate AI models with existing ERP systems. Leveraged Python for data preprocessing and model development using libraries like scikit-learn and TensorFlow. Also collaborated with frontend teams to integrate AI outputs into React dashboards for business insights."
    }
  ],
  "projects": [
    {
      "title": "AI-Powered Inventory Management System",
      "description": "Developed a full-stack inventory management application using React.js for the frontend and Node.js with Express for backend APIs. Integrated TensorFlow-based predictive models to forecast stock requirements, reducing overstocking by 30%. Implemented JWT authentication for secure access and used MongoDB as the primary database for storing inventory and transaction records. Deployed the application on AWS EC2 with Nginx as a reverse proxy for scalable and reliable access by the team."
    },
    {
      "title": "Smart Sales Forecasting Dashboard",
      "description": "Built an interactive sales forecasting dashboard using React.js and Chart.js for data visualization, integrated with a backend powered by Flask and scikit-learn regression models to predict future sales trends. Enabled business managers to filter predictions by product category and region, resulting in a 15% increase in forecasting accuracy for monthly planning. Deployed the solution on Heroku with environment variables for secure model endpoints."
    }
  ]


  }


  const handledrop = (e: any) => {
    setParsedData(null)
    setLoading(true)
    setSelectedfile(null)
    e.preventDefault();

    let file
    if (e.dataTransfer){
      file = e.dataTransfer.files[0];

      
    } else if (e.target.files) {
      setDragOver(true)
      file = e.target.files[0];
    
    }

    if (file && file.type === "application/pdf") {
      setSelectedfile(file)
      setTimeout(() => {
      setLoading(false)
       setParsedData(mockParsedData)
    }, 1500)
    }
    else {
      setTimeout(() => {
        setLoading(false)
        setError(true)
    }, 1500)
    }

  }

  return <div>
    <div className="bg-neutral-100  w-[500px] rounded-lg p-6">
      <div className="text-neutral-950  text-xl font-medium text-start">Upload File</div>
      <div
        onDragOver={(e) => {
          setDragOver(true)
          e.preventDefault()
        }}
        onDragLeave={() => {
          setDragOver(false)
        }}
        onDrop={handledrop}
        className={` mt-8 p-10 py-16 rounded-md text-center cursor-pointer  ${dragOver ? "bg-gradient-to-b from-blue-50 to-blue-100 transition-all duration-300 border-2 text-neutral-300 border-dashed border-blue-500 " : "border-2 border-neutral-400 border-dashed transition-all duration-300 "}`}>
        {loading ? <div className="flex  flex-col justify-center items-center  ">

          <motion.div className="relative w-10 h-10 rounded-full border-[3px] border-blue-500 border-t-transparent animate-spin">
          </motion.div>

          <div className="text-neutral-900 text-md mt-3 mb-6"> Uploading your file</div>


        </div> : selectedfile ? <div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-neutral-700 font-medium text-lg mt-3">{selectedfile.name}</p>
          </div>
        </div>

          : <div className="flex flex-col items-center justify-center">
            <div className="text-xl  border-2 p-2 bg-blue-500 border-neutral-300 rounded-full "><FaArrowUp /></div>
            <p className="text-neutral-700 font-medium text-lg mt-3 ">Select a .pdf file to upload</p>
            <span className="text-neutral-400 font-medium ">or drag and drop file here</span>
            {error && <div className="text-red-500 font-medium ">
              Please upload a .pdf file
            </div>}
          </div>}

      </div>

      <div className="mt-8  mb-4 flex items-center justify-center rounded-md ">
        <div className="min-w-3xs max-w-3xs rounded-md bg-blue-600 py-1.5  transition-colors duration-300 hover:bg-blue-500 relative">

          <button className="w-full ">Browse
          </button>
          <input type="file" onChange={handledrop}
            placeholder="" className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer " />
        </div>


      </div>

    </div>
  </div>
}