
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, specify your frontend domain here
    allow_methods=["*"],
    allow_headers=["*"],
)


RESUME_FILE = "resume.json"

class EnhanceRequest(BaseModel):
    section: str
    content: str

class ResumeData(BaseModel):
    name: str
    email: str
    education: list
    experience: list
    projects: list



@app.post("/ai-enhance")
def ai_enhance(request: EnhanceRequest):
    """
    Mock AI enhancement endpoint.
    Returns improved text by simply appending '(Enhanced by AI)'.
    """
    improved = request.content + " (Enhanced by AI)"
    return {"improved_content": improved}


@app.post("/save-resume")
def save_resume(resume: ResumeData):
    """
    Save resume JSON to a file (resume.json).
    """
    with open(RESUME_FILE, "w") as f:
        json.dump(resume.dict(), f, indent=2)
    return {"message": "Resume saved successfully." ,
              "resume": resume.dict() }


@app.get("/download-resume")
def download_resume():
    """
    Return the saved resume JSON if it exists.
    """
    if os.path.exists(RESUME_FILE):
        with open(RESUME_FILE) as f:
            resume_data = json.load(f)
        return resume_data
    else:
        return {"error": "No resume found."}
