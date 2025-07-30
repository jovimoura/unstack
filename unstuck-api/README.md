# 📚 Unstuck - Quiz Generator API

This is a simple REST API built with **FastAPI** that accepts a PDF file, extracts its content, and uses **OpenAI** to generate a quiz. The quiz consists of 10 multiple-choice questions (MCQs), each with four options, where only one is correct.

## 🚀 Features

- ✅ Upload a `.pdf` file
- ✅ Extract text content from the PDF
- ✅ Send the text to OpenAI to generate 10 multiple-choice questions
- ✅ Return a JSON response with questions and options
- ✅ CORS enabled for frontend communication (e.g., with a Next.js app)

---

## 🛠 Tech Stack

- **FastAPI** – Python web framework
- **OpenAI API** – For generating quiz content
- **PyMuPDF (fitz)** – For reading and extracting text from PDFs
- **Uvicorn** – ASGI server to run FastAPI
- **CORS Middleware** – Allow frontend requests from different origins

---

## 🧠 Example Response

```json
{
  "questions": [
    {
      "question": "What is the primary focus of John Moura's applications?",
      "options": [
        "Mobile gaming apps",
        "Scalable web applications",
        "Cybersecurity software",
        "E-commerce platforms"
      ],
      "answer_index": 1
    },
    ...
  ]
}
```

📦 Installation & Running Locally

1. Clone the repository
````bash
git clone https://github.com/your-username/quiz-generator-api.git
cd quiz-generator-api
````

2. Create a virtual environment (optional but recommended)
````bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
````

3. Install dependencies
````bash
pip install -r requirements.txt
# If you don't have a requirements.txt, manually install:
pip install fastapi uvicorn python-multipart python-dotenv PyMuPDF openai
````

4. Set your OpenAI API key
````bash
# Create a .env file in the root folder:
OPENAI_API_KEY=your_openai_key_here
````

5. Run the API
````bash
uvicorn main:app --reload
#The API will be available at:
http://localhost:8000
````

📬 Endpoint
````bash
# POST /generate-quiz/
Upload a PDF and receive quiz questions.

Request
Content-Type: multipart/form-data

Field: file (PDF)
````

🧩 Project Structure

bash
Copiar
Editar
.
├── main.py
├── services/
│   ├── pdf_reader.py
│   └── quiz_generator.py
├── .env
├── requirements.txt
└── README.md

📝 License
MIT License.

👨‍💻 Author
Created by John Moura