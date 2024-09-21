export const heartRateFileUpload = async (data) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_API_KEY;

  const formData = new FormData();
  formData.append("foo", "bar");
  formData.append("file", data);
  const result = await fetch(`${apiUrl}users/uploadDocs`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "X-API-KEY": apiKey,
    },
  });
  const response = await result?.json();
  if (response?.code === 200) {
    await uploadBuckets(response?.data?.s3_signed_url);
    return response?.data;
  }
};

export const uploadBuckets = async (data) => {
  const apiKey = process.env.REACT_APP_API_KEY;

  const result = await fetch(`${data}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "X-API-KEY": apiKey,
    },
  });
  const response = await result?.json();
  if (response?.code === 200) {
    return response?.data;
  }
};

export const getImageUrl = async (data) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
  const result = await fetch(`${apiUrl}get-document-url?path=${data}`, {
    method: "Get",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "X-API-KEY": apiKey,
    },
  });
  const response = await result?.json();
  if (response?.code === 200) {
    return response?.data?.url;
  }
};
