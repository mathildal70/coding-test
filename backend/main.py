from fastapi import FastAPI, Request, Query
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
import logging 
import response_schema

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or restrict to ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# get status code to shown error code and error message to identify type of error
logger = logging.getLogger("uvicorn.error")

# Load dummy data
with open("dummyData.json", "r") as f:
    DUMMY_DATA = json.load(f)

# handling if internal service error occurred
@app.exception_handler(Exception)
async def internal_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error: {exc}")
    return JSONResponse(
        status_code=500,
        content=response_schema.E001()
    )

# get data dummy json (sales dashboard)
@app.get("/api/data")
def get_data(request: Request):
    params = request.query_params
    sales_reps = DUMMY_DATA.get("salesReps", [])
    filtered = []

    for rep in sales_reps:
        match = True

        # Filter by 'id'
        if "id" in params:
            try:
                if int(params["id"]) != rep["id"]:
                    match = False
            except ValueError:
                match = False

        # Filter by 'name'
        if "name" in params:
            search_val = params["name"].lower()
            if search_val not in rep["name"].lower():
                match = False

        # Filter by 'role'
        if "role" in params:
            search_val = params["role"].lower()
            if search_val not in rep["role"].lower():
                match = False

        # Filter by 'region'
        if "region" in params:
            search_val = params["region"].lower()
            if search_val not in rep["region"].lower():
                match = False

        # Filter by 'deal_client'
        if "deal_client" in params:
            search_val = params["deal_client"].lower()
            client_match = any(
                search_val in deal["client"].lower()
                for deal in rep.get("deals", [])
            )
            if not client_match:
                match = False
                
        # Filter by 'deal_status'
        if "deal_status" in params:
            search_val = params["deal_status"].lower()
            status_match = any(
                search_val in deal["status"].lower()
                for deal in rep.get("deals", [])
            )
            if not status_match:
                match = False

        # Filter by 'client_name'
        if "client_name" in params:
            search_val = params["client_name"].lower()
            status_match = any(
                search_val in client["name"].lower()
                for client in rep.get("clients", [])
            )
            if not status_match:
                match = False

        # Filter by 'client_industry'
        if "client_industry" in params:
            search_val = params["client_industry"].lower()
            status_match = any(
                search_val in client["industry"].lower()
                for client in rep.get("clients", [])
            )
            if not status_match:
                match = False

        if match:
            filtered.append(rep)
    
    # handling data if data is not found
    if not filtered:
        return JSONResponse(
            status_code=404,
            content=response_schema.S002()
    )

    # handling for success in filtering data and get the data
    return JSONResponse(status_code=200, content=response_schema.S001(filtered))

@app.post("/api/ai")
async def ai_endpoint(request: Request):
    """
    Accepts a user question and returns a placeholder AI response.
    (Optionally integrate a real AI model or external service here.)
    """
    body = await request.json()
    user_question = body.get("question", "")
    
    # Placeholder logic: echo the question or generate a simple response
    # Replace with real AI logic as desired (e.g., call to an LLM).
    return {"answer": f"This is a placeholder answer to your question: {user_question}"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
