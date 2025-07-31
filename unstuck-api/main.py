from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services.pdf_reader import extract_text_from_pdf
from services.quiz_generator import generate_quiz_from_text

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate-quiz/")
async def generate_quiz(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="The file must be a PDF.")
    
    contents = await file.read()
    text = extract_text_from_pdf(contents)

    if not text.strip():
        raise HTTPException(status_code=400, detail="Unable to extract text from the PDF.")

    quiz = generate_quiz_from_text(text)

    if not quiz:
        raise HTTPException(status_code=500, detail="Failed to generate questions with OpenAI.")
    
    return {"questions": quiz, "quizId": "random-uuid"}
