const useUser = (resource: string, endpoint: string) => {
  const request = async (
    bodyData?: Record<string, any>,
    method: string = "GET"
  ) => {
    console.log(
      `Sending ${method} request to: ${
        import.meta.env.VITE_API_URL
      }/${resource}/${endpoint}`
    );
    console.log("Request body:", bodyData);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/${resource}/${endpoint}`,
      {
        method,
        headers: { "Content-Type": "application/json" },
        body: bodyData ? JSON.stringify(bodyData) : undefined,
      }
    );

    console.log("Response status:", response.status);
    console.log("Response ok?", response.ok);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error("Error response data:", errData);
      throw new Error(errData.message || "Request failed");
    }

    const data = await response.json();
    console.log("Response data:", data);
    return data;
  };

  const loginUser = async (username: string, password: string) => {
    console.log("Calling loginUser with:", { username, password });
    return request({ username, password }, "POST");
  };

  return { loginUser, request };
};

export default useUser;
