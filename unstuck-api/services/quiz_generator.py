import os
from openai import OpenAI
from dotenv import load_dotenv
import json

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_quiz_from_text(text: str) -> list:
    prompt = (
        "All output must be written in English.\n\n"
        "Based on the following content, generate exactly 10 multiple-choice questions. "
        "Each question must have 4 options (A, B, C, D), with only one correct answer. "
        "Format the result as a JSON array with the structure:\n\n"
        "[\n"
        "  {\n"
        "    \"question\": \"...\",\n"
        "    \"options\": [\"...\", \"...\", \"...\", \"...\"],\n"
        "    \"answer_index\": 1\n"
        "  },\n"
        "  ...\n"
        "]\n\n"
        f"Base content:\n{text}"
    )

    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )
        content = response.choices[0].message.content.strip()
        # print("OpenAI Response:", repr(content))
        
        if content.startswith("```json"):
            content = content.removeprefix("```json").removesuffix("```").strip()
        elif content.startswith("```"):
            content = content.removeprefix("```").removesuffix("```").strip()

        quiz = json.loads(content)
        
        return quiz
    except Exception as e:
        print("❌ Generate Quiz Error:", e)
        quiz = []
        return []
