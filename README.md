# Azure OCR Text Recognition App

This project demonstrates an Optical Character Recognition (OCR) application using Azure Computer Vision's Read API. It allows users to provide image URLs to recognize printed and handwritten text. The project consists of a Node.js backend and a React frontend, deployed via Vercel and Render.

## Features

- Recognize printed or handwritten text from URLs using Azure Computer Vision.
- Provide image URLs for text recognition.
- Displays recognized text on the frontend.
- Supports both backend CORS and frontend Axios requests.

## Technologies Used

### Frontend:
- React
- Axios for HTTP requests
- Bootstrap for styling

### Backend:
- Node.js
- Express.js
- Azure Computer Vision API
- CORS for handling cross-origin requests

### Deployment:
- Vercel for frontend deployment
- Render for backend deployment

---

## Prerequisites

1. **Azure Cognitive Services API Key**: You need an Azure subscription and a Computer Vision resource. You can get your key and endpoint from the Azure portal.
2. **Node.js**: Ensure that you have Node.js installed.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/azure-ocr-text-recognition.git
cd Azure-AI-Project
```

### 2. Install Dependencies

- For Backend:
```bash
cd Backend
npm install
```

- For Frontend:
```bash
cd Frontend
npm install
```

## Backend Setup

### 1. Create a .env file in the backend directory to store your Azure Computer Vision credentials.
```makefile
VISION_KEY=your_azure_computer_vision_key
VISION_ENDPOINT=your_azure_computer_vision_endpoint
PORT=5000
```

### 2. Run the Backend
```bash
node index.js
```
The backend will run at http://localhost:5000.

## Frontend Setup
The frontend is built with React and Axios to send requests to the backend.

### 1. Update API Endpoints
In frontend/src/App.js, update the URLs to point to your backend's API endpoints.
For local testing, make sure the API URLs look like this:
```bash
'http://localhost:5000/api/recognize-text'
```

### 2. Run the Frontend
To run the frontend locally, execute the following commands in the frontend directory:
```bash
npm start
```
The frontend will run at http://localhost:5173.

## Usage

- Open the frontend application in your browser.
- Enter an image URL or upload an image file.
- Click the "Recognize Text" button.
- The recognized text will be displayed below the form once the request is processed.

