import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecognizedText('');

    try {
      let response;
      if (file) {
        // Handle file upload
        let formData = new FormData();
        formData.append('image', file);

        response = await axios.post('https://azure-ai-project.vercel.app/api/recognize-text', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else if (imageUrl) {
        // Handle image URL
        response = await axios.post('https://azure-ai-project.vercel.app/api/recognize-text', {
          imageUrl: imageUrl,
        });
      } else {
        throw new Error('Please provide either a file or an image URL.');
      }

      setRecognizedText(response.data.text);

    } catch (error) {
      setError('Error recognizing text. Please try again.');
      console.error('Error recognizing text:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="heading m-2 text-center">
        <h1 className='head'>Azure OCR Text Recognition</h1>
        <h4 className='subhead'>Made by Akshat Trivedi 👀</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='label'>Upload Image or Enter Image URL</label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={handleUrlChange}
          />
          <input
            type="file"
            className="form-control mb-3"
            onChange={handleFileChange}
          />
        </div>
        <div className='button'>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Processing...' : 'Recognize Text'}
          </button>
        </div>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {recognizedText && (
        <div className="text mt-4">
          <h3>Recognized Text:</h3>
          <p>{recognizedText}</p>
        </div>
      )}
    </div>
  );
}

export default App;
