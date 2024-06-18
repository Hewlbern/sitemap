# Next.js and FastAPI Project

This project is a web application built with a Next.js frontend and a FastAPI backend. The frontend allows users to create, read, update, and delete issues. The backend serves as an API server that handles these operations.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Frontend Setup (Next.js)](#frontend-setup-nextjs)
- [Backend Setup (FastAPI)](#backend-setup-fastapi)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Python](https://www.python.org/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) and npm
- [Python](https://www.python.org/) and pip

## Frontend Setup (Next.js)

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Create a `.env.local` file in the `frontend` directory and add your environment variables if necessary:
    ```plaintext
    NEXT_PUBLIC_API_URL=http://localhost:8000
    ```

5. Run the development server:
    ```bash
    npm run dev
    ```

   The frontend should now be running on [http://localhost:3000](http://localhost:3000).

## Backend Setup (FastAPI)

1. Navigate to the `backend` directory:
    ```bash
    cd be
    ```

2. Create and activate a virtual environment:
    ```bash
    poetry run uvicorn main:app --reload


   The backend should now be running on [http://localhost:8000](http://localhost:8000).

## Running the Project

To run the entire project, ensure both the frontend and backend servers are running:

1. Start the Next.js frontend:
    ```bash
    cd frontend
    npm run dev
    ```


   Now you can access the application at [http://localhost:3000](http://localhost:3000), and it will communicate with the FastAPI backend at [http://localhost:8000](http://localhost:8000).

## API Endpoints

The FastAPI server exposes the following endpoints:

- `POST /issues/`: Create a new issue.
- `GET /issues/`: Retrieve all issues.
- `GET /issues/{issue_id}`: Retrieve a specific issue by ID.
- `PUT /issues/{issue_id}`: Update a specific issue by ID.
- `DELETE /issues/{issue_id}`: Delete a specific issue by ID.



## Example `curl` Commands

1. **Create Issue**:
   ```bash
   curl -X POST http://localhost:8000/issues/ \
   -H "Content-Type: application/json" \
   -d '{"title": "New Issue", "description": "Description of the new issue"}'


2.	Read All Issues:

```curl -X GET http://localhost:8000/issues/```


	3.	Read Specific Issue:

    curl -X GET http://localhost:8000/issues/1

	4.	Update Issue:



    curl -X PUT http://localhost:8000/issues/1 \
-H "Content-Type: application/json" \
-d '{"title": "Updated Issue Title", "description": "Updated description of the issue"}'


	5.	Delete Issue:

    curl -X DELETE http://localhost:8000/issues/1

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.