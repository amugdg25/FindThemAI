const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchMissingPersons = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/missing-persons`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching missing persons:", error);
    return [];
  }
};

export const fetchMissingPersonById = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/missing-persons/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching missing person:", error);
    return null;
  }
};

export const addMissingPerson = async (formData: FormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/create-missing-person`, {
      method: "POST",
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding missing person:", error);
    return null;
  }
};

export const deleteMissingPerson = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/missing-persons/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete person: ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting missing person:", error);
    return { success: false, error: "An error occurred while deleting." };
  }
};

export const matchFace = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${API_BASE_URL}/found-person`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error matching face:", error);
    return { error: "An error occurred while processing the request." };
  }
};


const API_AUTH_URL = API_BASE_URL;

export const signup = async (userData: { username: string; password: string }) => {
  try {
    const response = await fetch(`${API_AUTH_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(userData),
    });

    return await response.json();
  } catch (error) {
    console.error("Signup error:", error);
    return null;
  }
};

export const login = async (credentials: { username: string; password: string }) => {
  try {
    const response = await fetch(`${API_AUTH_URL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(credentials),
    });

    const data = await response.json();
    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
    }
    return data;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};