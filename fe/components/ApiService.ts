// apiService.ts
const API_URL = "http://127.0.0.1:8000/issues";

export interface Issue {
  id: number;
  title: string;
  description: string;
}

export const fetchIssues = async (): Promise<Issue[]> => {
  const response = await fetch(`${API_URL}/`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export const createIssue = async (issue: Omit<Issue, "id">): Promise<Issue> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(issue),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

export const updateIssue = async (id: number, issue: Partial<Issue>): Promise<Issue> => {
    const url = `http://127.0.0.1:8000/issues/${id}`;
  
    const payload = JSON.stringify({
      title: issue.title,
      description: issue.description,
    });
    console.log("Sending PUT request with payload:", payload);
  
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Failed to update issue:", errorResponse.detail);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    const updatedIssue = await response.json();
    console.log("Updated Issue:", updatedIssue);
    return updatedIssue;
  };

  
export const deleteIssue = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};
