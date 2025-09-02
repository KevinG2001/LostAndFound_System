const useUser = (resource: string, endpoint: string) => {
  const request = async (
    bodyData?: Record<string, any>,
    method: string = "GET"
  ) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${resource}/${endpoint}`,
        {
          method,
          headers: { "Content-Type": "application/json" },
          body: bodyData ? JSON.stringify(bodyData) : undefined,
        }
      );

      if (!response.ok) {
        let errMessage = "Request failed";
        try {
          const errData = await response.json();
          errMessage = errData.message || errMessage;
        } catch {}
        throw new Error(errMessage);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${resource}/${endpoint}:`, error);
      throw error;
    }
  };

  const loginUser = async (username: string, password: string) => {
    return await request({ username, password }, "POST");
  };

  return { loginUser, request };
};

export default useUser;
