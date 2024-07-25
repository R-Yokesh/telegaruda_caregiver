import { useState, useEffect } from 'react';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, options) => {
    setLoading(true);
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const get = async (url) => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    return await fetchData(url, options);
  };

  const post = async (url, body) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(body),
    };
    return await fetchData(url, options);
  };

  // Implement other HTTP methods (PATCH, DELETE) similarly

  return {
    loading,
    error,
    get,
    post,
    // Add methods for PATCH and DELETE
  };
};

export default useApi;
