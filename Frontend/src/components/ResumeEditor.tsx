

import { useEffect, useState } from "react";
import { motion } from 'motion/react'
import { DropDown } from "./DropDown";
import { useGlobalState } from "../context/Parsecontent";
import axios from "axios";
import Loader from "./loader";
import { ResumeTemplate } from "./ResumeTemplate";

export default function ResumeEditor() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [education, setEducation] = useState([{ degree: "", institute: "", startdate: "", enddate: "" }]);
  const [experience, setExperience] = useState([{ role: "", company: "", duration: "", description: "" }]);
  const [projects, setProjects] = useState([{ title: "", description: "" }]);
  const [selected, setSelected] = useState<string>("")
  const { parsedData } = useGlobalState()
  const [loading, setLoading] = useState(false)
  const [showresume, setShowresume] = useState(false)



  useEffect(() => {
    if (parsedData) {
      setName(parsedData.name),
        setEmail(parsedData.email),
        setEducation(parsedData.education),
        setExperience(parsedData.experience),
        setProjects(parsedData.projects)
    }
    if (parsedData == null) {
      setName(""),
        setEmail(""),
        setEducation([{ degree: "", institute: "", startdate: "", enddate: "" }]),
        setExperience([{ role: "", company: "", duration: "", description: "" }]),
        setProjects([{ title: "", description: "" }])
    }

  }, [parsedData])


  const onEnhance = () => {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);
};

  const handleDownloadResumeJson = async () => {
  try {
    setLoading(true);
    const apiurl = import.meta.env.VITE_BACKEND_URL;

    const response = await axios.get(`${apiurl}/download-resume`);

    if (response.status === 200) {
      const data = response.data;

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });

  
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "resume.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setLoading(false);
    }
  } catch (error) {
    setLoading(false);
    console.error("Error downloading resume:", error);
    alert("Failed to download resume.");
  }
};


  const handleSubmit = async (e: any) => {
    try {
      setLoading(true)
      e.preventDefault();
      const apiurl = import.meta.env.VITE_BACKEND_URL
      const Info = {
        name,
        email,
        education,
        experience,
        projects,
      };

      const response = await axios.post(`${apiurl}/save-resume`, Info)

      if (response.status == 200) {
        setTimeout(() => {
          setLoading(false)
          alert("resume created")
          setShowresume(true);
        }, 2000);
      }
    } catch (e) {
      setLoading(false)
    }
  };

  return (
    <>

      {showresume ? <div className=" relative bg-neutral-100 mx-auto p-6 space-y-6 rounded-lg mb-10 pb-20">
        <div className="absolute top-0  right-6 text-neutral-400 font-semibold text-2xl hover:text-neutral-900 transition-colors duration-200" onClick={()=>{
          setShowresume(false)
        }}>
        <button>x</button>
        </div>

        <div className="flex items-baseline justify-between gap-6 mr-14 ml-14">

        <div className="text-neutral-900 font-medium text-2xl">
          Your updated Resume
        </div>
        <button
  onClick={handleDownloadResumeJson}
  className=" bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 cursor-pointer transition-colors duration-300"
>
  Download Resume JSON
</button>
</div>
      <ResumeTemplate
  name={name}
  email={email}
  education={education.map((edu) => ({
    degree: edu.degree,
    institute: edu.institute,
    startdate: edu.startdate,
    enddate: edu.enddate,
  }))}
  experience={experience.map((exp) => ({
    role: exp.role,
    company: exp.company,
    duration: exp.duration,
    description: exp.description,
  }))}
  projects={projects.map((proj) => ({
    title: proj.title,
    description: proj.description,
  }))}
/>
        </div> : <form onSubmit={handleSubmit} className=" bg-neutral-100 mx-auto p-6 space-y-6 rounded-lg mb-10">
        {loading && <div className=" fixed inset-0  w-screen h-screen bg-neutral-900 opacity-80 z-20 flex justify-center items-center transition-all duration-200">
          <div className="w-md h-[150px] bg-neutral-100 flex flex-col justify-center items-center rounded-lg z-30">
            <Loader />
            <div className="text-neutral-950 text-lg mt-4">PLease wait while we complete your request</div>
          </div>
        </div>}

        <div className=" text-neutral-900 text-2xl font-medium">Resume Form</div>

        <div className="flex flex-col items-start gap-8 w-full">

          <div className="w-full">
            <label className="text-neutral-900 text-lg">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="border-2 p-[6.5px] rounded-lg border-neutral-400 w-full px-2 outline-none focus:border-neutral-500  transition-all duration-300 text-neutral-900 mt-2" placeholder="Enter your name" required />
          </div>

          <div className="w-full">
            <label className="text-neutral-900 text-lg">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="border-2 border-neutral-400 outline-none focus:border-neutral-500 rounded-lg p-[6.5px] w-full text-neutral-900 mt-2 transition-all px-2 duration-300 " placeholder="Enter your email" required />
          </div>

        </div>

        <div className="border-[1px] border-neutral-300"></div>

        {/* Work Experience Section */}
        <div>
          <h2 className="text-lg text-neutral-900">Work Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="space-y-2 py-4 rounded ">

              <div className="flex gap-8">

                <input
                  placeholder="Role"
                  value={exp.role}
                  onChange={(e) => {
                    const newExp = [...experience];
                    newExp[index].role = e.target.value;
                    setExperience(newExp);
                  }}
                  className="border-2  border-neutral-400 rounded-lg p-[6.5px] w-full text-neutral-900 outline-none focus:border-neutral-500 px-2 transition-all duration-300 "
                />
                <input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => {
                    const newExp = [...experience];
                    newExp[index].company = e.target.value;
                    setExperience(newExp);
                  }}
                  className="border-2  border-neutral-400 rounded-lg p-[6.5px] w-full text-neutral-900 outline-none focus:border-neutral-500 px-2 transition-all duration-300 "
                />
              </div>

              <input
                placeholder="Duration"
                value={exp.duration}
                onChange={(e) => {
                  const newExp = [...experience];
                  newExp[index].duration = e.target.value;
                  setExperience(newExp);
                }}
                className="border-2 mt-4 border-neutral-400 rounded-lg p-[6.5px] w-full text-neutral-900 outline-none focus:border-neutral-500 px-2 transition-all duration-300 "
              />
              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) => {
                  const newExp = [...experience];
                  newExp[index].description = e.target.value;
                  setExperience(newExp);
                }}
                className="border-2 mt-4 border-neutral-400 rounded-lg h-32 p-2 w-full text-neutral-900 outline-none focus:border-neutral-500 px-2 transition-all duration-300 "
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setExperience([...experience, { role: "", company: "", duration: "", description: "" }])}
            className="bg-blue-600 text-neutral-100 px-3 py-1 rounded cursor-pointer hover:opacity-80 transition-opacity duration-200"
          >
            + Add Experience
          </button>
             <button
        type="button"
        onClick={() => {
          if (experience.length > 1) {
            setExperience(experience.slice(0, -1));
          }
        }}
        className="bg-red-600 text-neutral-100 px-3 py-1 rounded cursor-pointer hover:opacity-80 transition-opacity duration-200 ml-5"
      >
        - Remove Experience
      </button>

      
      <button
        type="button"
        onClick={() => {
          onEnhance()
        }}
        className="bg-purple-600 text-neutral-100 px-3 py-1 rounded cursor-pointer hover:opacity-80 transition-opacity duration-200 ml-5"
      >
        Enhance with AI
      </button>
        </div>
        <div className="border-[1px] border-neutral-300"></div>

        {/* Education Section */}


        <div className="">
          <h2 className="text-lg text-neutral-900">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="space-y-2 py-4 rounded mb-2">
              <div
                onChange={(e) => {
                  const newEdu = [...education];
                  newEdu[index].degree = selected;
                  setEducation(newEdu);
                }}
              >
                <DropDown options={["B.Tech", "BCA", "B.Com", "B.Sc", "BA", "BBA",
                  "MBA", "MCA", "M.Tech", "M.Com", "PhD"]} selected={selected} setSelected={setSelected} placeholder="Degree" />
              </div>

              <input
                placeholder="Institute"
                value={edu.institute}
                onChange={(e) => {
                  const newEdu = [...education];
                  newEdu[index].institute = e.target.value;
                  setEducation(newEdu);
                }}
                className="border-2 border-neutral-400 rounded-lg p-[6.5px] w-full text-neutral-900 outline-none focus:border-neutral-500 px-2 transition-all duration-300  mt-4"
              />
              <div className="flex justify-start items-center gap-5">


                <input
                  placeholder="Start Date"
                  value={edu.startdate}
                  onChange={(e) => {
                    const newEdu = [...education];
                    newEdu[index].startdate = e.target.value;
                    setEducation(newEdu);
                  }}
                  className="border-2 mt-4 border-neutral-400 rounded-lg p-[6.5px] w-2/3 text-neutral-900 outline-none focus:border-neutral-500 px-2 transition-all duration-300  "
                />



                <input
                  placeholder="End Date"
                  value={edu.enddate}
                  onChange={(e) => {
                    const newEdu = [...education];
                    newEdu[index].enddate = e.target.value;
                    setEducation(newEdu);
                  }}
                  className="border-2 mt-3 border-neutral-400 rounded-lg p-[6.5px] w-2/3 text-neutral-900 outline-none focus:border-neutral-500 px-2 transition-all duration-300  "
                />

              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setEducation([...education, { degree: "", institute: "", startdate: "", enddate: "" }])}
            className="bg-blue-600 text-neutral-100 px-3 py-1 rounded cursor-pointer hover:opacity-80 transition-opacity duration-200"
          >
            + Add Education
          </button>
          <button
        type="button"
        onClick={() => {
          if (education.length > 1) {
            setEducation(education.slice(0, -1));
          }
        }}
        className="bg-red-600 text-neutral-100 px-3 py-1 rounded cursor-pointer hover:opacity-80 transition-opacity duration-200 ml-5"
      >
        - Remove Education
      </button>
        </div>
        <div className="border-[1px] border-neutral-300"></div>

        {/* Projects Section */}
        <div>
          <h2 className="text-lg text-neutral-900">Projects</h2>
          {projects.map((proj, index) => (
            <div key={index} className="space-y-2 py-4 mb-2">
              <input
                placeholder="Title"
                value={proj.title}
                onChange={(e) => {
                  const newProj = [...projects];
                  newProj[index].title = e.target.value;
                  setProjects(newProj);
                }}
                className="border-2  border-neutral-400 rounded-lg p-[6.5px] w-full text-neutral-900 outline-none focus:border-neutral-500 px-2 transition-all duration-300"
              />
              <textarea
                placeholder="Description"
                value={proj.description}
                onChange={(e) => {
                  const newProj = [...projects];
                  newProj[index].description = e.target.value;
                  setProjects(newProj);
                }}
                className="border-2 mt-4 border-neutral-400 rounded-lg h-32 p-2 w-full text-neutral-900 outline-none focus:border-neutral-500 px-2 transition-all duration-300"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setProjects([...projects, { title: "", description: "" }])}
            className="bg-blue-600 text-neutral-100 px-3 py-1 rounded cursor-pointer hover:opacity-80 transition-opacity duration-200"
          >
            + Add Project
          </button>
             <button
        type="button"
        onClick={() => {
          if (projects.length > 1) {
            setProjects(projects.slice(0, -1));
          }
        }}
        className="bg-red-600 text-neutral-100 px-3 py-1 rounded cursor-pointer hover:opacity-80 transition-opacity duration-200 ml-5"
      >
        - Remove Project
      </button>

            <button
        type="button"
        onClick={() => {
          onEnhance()
        }}
        className="bg-purple-600 text-neutral-100 px-3 py-1 rounded cursor-pointer hover:opacity-80 transition-opacity duration-200 ml-5"
      >
        Enhance with AI
      </button>
        </div>
        <div className="border-[1px] border-neutral-300"></div>
        <div className="flex justify-center items-center">
          <button type="submit" className="bg-teal-600  text-neutral-100  px-10 py-2 rounded cursor-pointer hover:opacity-80 transition-opacity duration-200">
            Create Resume
          </button>
        </div>
      </form>}


    </>
  );
}
