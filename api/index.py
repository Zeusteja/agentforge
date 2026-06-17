from fastapi import FastAPI
from pydantic import BaseModel
from agentforge.pipeline.orchestrator import Pipeline

app = FastAPI()

class SprintRequest(BaseModel):
    title: str
    description: str

@app.get("/")
def health():
    return {"status": "ok"}

@app.post("/chat")
def run_sprint(req: SprintRequest):
    pipeline = Pipeline(verbose=False)

    outputs = pipeline.run(
        title=req.title,
        description=req.description
    )

    return {
        "outputs": [
            {
                "role": o.role.value,
                "summary": o.summary,
                "approved": o.approved
            }
            for o in outputs
        ]
    }
