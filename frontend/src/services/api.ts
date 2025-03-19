const API_BASE_URL = "http://127.0.0.1:5000/api";

export const fetchMissingPersons = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/missing-persons`);
    return await response.json();

    console.log(await response.json());
    
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
    const response = await fetch(`${API_BASE_URL}/missing-persons`, {
      method: "POST",
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding missing person:", error);
    return null;
  }
};

export const matchFace = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/face_match`, {
      method: "POST",
      body: formData,
    });

    return await response.json();
  } catch (error) {
    console.error("Error matching face:", error);
    return null;
  }
};

const API_AUTH_URL = `${API_BASE_URL}/auth`;

export const signup = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${API_AUTH_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return await response.json();
  } catch (error) {
    console.error("Signup error:", error);
    return null;
  }
};

export const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await fetch(`${API_AUTH_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};