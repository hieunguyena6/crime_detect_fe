import axios from 'axios';
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

export const getAllUsers = async ({ page, size }) => {
  try {
    const result = await ApiService.get("/users/", {
      params: {
        page,
        size
      }
    });
    return result.data
  } catch (error) {
    throw error;
  }
}

