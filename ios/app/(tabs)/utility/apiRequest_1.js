const apiRequest = async (endpoint, method = "GET", body = null, token) => {
    const BASE_URL = "https://eksamaj.com/bader_preprod"; // Replace with your server URL
  
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: {
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzgzLCJpYXQiOjE3MzUwMzcxNDAsImV4cCI6MTczNzYyOTE0MH0.Ehf-p7GkRDVN5tugQdtB2XoKWVdfKUiteutryrlPfYw`,
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
      });

      console.log(response)

  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    

      return await response.json();
    } catch (error) {
      console.error("API request error:", error);
      throw error;
    }
  };
  export default apiRequest;
  