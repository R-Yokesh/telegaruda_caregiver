import React, { useState } from 'react';

const ProfileUpdate = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the image upload here
    const formData = new FormData();
    formData.append('profileImage', image);
    
    // Example upload code
    /*
    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
    */
  };

  return (
    <div>
      <h1>Profile Update</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="profileImage">
            {imagePreview ? (
              <img src={imagePreview} alt="Profile Preview" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            ) : (
              'Click to upload profile picture'
            )}
          </label>
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            capture="environment"  // This should open the camera on most devices
            style={{ display: 'none' }} // Hide the actual input
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
