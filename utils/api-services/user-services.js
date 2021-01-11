import ApiService from './base'

export const login = async ({ user_name, password }) => {
  try {
    const result = await ApiService.post("/users/login", {
      user_name,
      password
    });
    return result.data
  } catch (error) {
    throw error;
  }
}

export const getAllUsers = async ({ page, size, searchValue }) => {
  try {
    const result = await ApiService.get("/users/", {
      params: {
        page,
        size,
        s: searchValue
      }
    });
    return result.data
  } catch (error) {
    throw error;
  }
}

export const createUser = async (data) => {
  try {
    const result = await ApiService.post("/users/", data);
    return result.data
  } catch (error) {
    throw error;
  }
}

export const editUser = async (user_id, data) => {
  try {
    const result = await ApiService.put("/users/" + user_id, data);
    return result.data
  } catch (error) {
    throw error;
  }
}