from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from typing import Optional

app = FastAPI()

# Add CORS middleware to allow requests from any domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Define a Pydantic model for the Issue
class Issue(BaseModel):
    id: Optional[int] = None
    title: str
    description: str

# Hardcoded data for demonstration
issues = [
    Issue(id=1, title="Issue One", description="Description of issue one"),
    Issue(id=2, title="Issue Two", description="Description of issue two")
]

def get_next_issue_id():
    if issues:
        return max(issue.id for issue in issues if issue.id is not None) + 1
    return 1

@app.post("/issues/")
def create_issue(issue: Issue):
    issue.id = get_next_issue_id()  # Always generate a new unique ID
    issues.append(issue)
    print(f"Created Issue: {issue}")
    return {"message": "Issue created successfully", "issue": issue}

@app.get("/issues/")
def read_all_issues():
    return issues

@app.get("/issues/{issue_id}")
def read_issue(issue_id: int):
    for issue in issues:
        if issue.id == issue_id:
            return issue
    raise HTTPException(status_code=404, detail="Issue not found")

@app.put("/issues/{issue_id}")
def update_issue(issue_id: int, updated_issue: Issue):
    print(f"Received Update: {updated_issue}")
    for idx, issue in enumerate(issues):
        if issue.id == issue_id:
            # Ensure the ID stays the same
            issues[idx].title = updated_issue.title
            issues[idx].description = updated_issue.description
            print(f"Updated Issue: {issues[idx]}")
            return {"message": "Issue updated successfully", "issue": issues[idx]}
    raise HTTPException(status_code=404, detail="Issue not found")

@app.delete("/issues/{issue_id}")
def delete_issue(issue_id: int):
    for idx, issue in enumerate(issues):
        if issue.id == issue_id:
            deleted_issue = issues.pop(idx)
            print(f"Deleted Issue: {deleted_issue}")
            return {"message": "Issue deleted successfully"}
    raise HTTPException(status_code=404, detail="Issue not found")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)