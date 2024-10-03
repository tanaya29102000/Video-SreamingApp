import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './UploadVideo.css';

const UploadVideo = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const onClickHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('video', selectedFiles[i]);
    }
    formData.append('title', title);
    formData.append('author', author);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const url = 'http://localhost:5000/api/upload-video';
      const response = await axios.post(url, formData, config);

      // SweetAlert success message
      Swal.fire({
        title: 'Success!',
        text: 'Video uploaded successfully!',
        icon: 'success',
        confirmButtonText: 'Okay',
      });

      // Reset form inputs
      setTitle('');
      setAuthor('');
      setSelectedFiles([]);

      console.log('Upload successful:', response.data);
    } catch (err) {
      console.log('Error uploading video:', err.response);

      // SweetAlert error message
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue uploading your video.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  return (
    <div className="card">
      <h1 className="card-title">Upload Video</h1>
      <form className="card-form">
        <div className="form-group">
          <label>Video Title -</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="card-input"
          />
        </div>
        <div className="form-group">
          <label>Author-</label>
          <input 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            className="card-input"
          />
        </div>
        <div className="form-group">
          <label>Video File</label>
          <input 
            type="file" 
            multiple 
            onChange={onFileChange} 
            className="card-input"
          />
        </div>
        <button onClick={onClickHandler} className="card-button">Upload Video</button>
      </form>
    </div>
  );
};

export default UploadVideo;
