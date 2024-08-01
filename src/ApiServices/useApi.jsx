import { useState, useCallback, useRef } from "react";

const useApi = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_API_KEY;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cache = useRef({});

  const fetchData = useCallback(
    async (url, options) => {
      setLoading(true);
      if (cache.current[url]) {
        setLoading(false);
        return cache.current[url];
      }

      try {
        const response = await fetch(apiUrl + url, options);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        const data = await response.json();
        cache.current[url] = data;
        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        setError(`Error: ${error.message}`);
        throw error;
      }
    },
    [apiUrl]
  );

  const get = useCallback(
    async (url) => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "X-API-KEY": apiKey,
        },
      };
      return await fetchData(url, options);
    },
    [fetchData, apiKey]
  );

  const post = useCallback(
    async (url, body) => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      };
      return await fetchData(url, options);
    },
    [fetchData]
  );

  const patch = useCallback(
    async (url, body) => {
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      };
      return await fetchData(url, options);
    },
    [fetchData]
  );

  const del = useCallback(
    async (url) => {
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      return await fetchData(url, options);
    },
    [fetchData]
  );
  return {
    loading,
    error,
    get,
    post,
    patch,
    del,
  };
};

export default useApi;
