import React from "react";

type EducationType = {
  degree: string;
  institute: string;
  startdate: string;
  enddate: string;
};

type ExperienceType = {
  role: string;
  company: string;
  duration: string;
  description: string;
};

type ProjectType = {
  title: string;
  description: string;
};

type ResumeProps = {
  name?: string;
  email: string;
  education: EducationType[];
  experience: ExperienceType[];
  projects: ProjectType[];
};

export const ResumeTemplate: React.FC<ResumeProps> = ({
  name,
  email,
  education,
  experience,
  projects,
}) => {
  return (
    <div className="max-w-3xl mx-auto p-10 bg-white text-neutral-900 font-sans ">
      <h1 className="text-3xl font-bold border-b-2 border-neutral-400 pb-2 mb-4">
        {name}
      </h1>
      <p className="text-md text-neutral-700 mb-6">{email}</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-neutral-300 mb-2">
          Education
        </h2>
        {education.map((edu, index) => (
          <div key={index} className="mb-2 flex items-center justify-between ">
            
            <div>
            <p className="font-medium">
              {edu.institute} 
            </p>
            <p className="">
              {edu.degree} 
            </p>
            </div>
            <p className="font-medium">
              {edu.startdate} - {edu.enddate}
            </p>

            
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-neutral-300 mb-2">
          Experience
        </h2>
        {experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <p className="font-medium">
              {exp.role} at {exp.company} ({exp.duration})
            </p>
            <p className="text-sm text-neutral-700 mt-1 whitespace-pre-line">
              {exp.description}
            </p>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-neutral-300 mb-2">
          Projects
        </h2>
        {projects.map((proj, index) => (
          <div key={index} className="mb-4">
            <p className="font-medium">{proj.title}</p>
            <p className="text-sm text-neutral-700 mt-1 whitespace-pre-line">
              {proj.description}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};
