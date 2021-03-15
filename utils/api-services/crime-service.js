import ApiService from './base'

export const createCrime = async (data) => {
  try {
    const result = await ApiService.post("/crimes/", data);
    return result.data
  } catch (error) {
    throw error;
  }
}

export const checkCrime = async (data) => {
  try {
    const result = await ApiService.post("/crimes/check", data);
    return result.data
  } catch (error) {
    throw error;
  }
}

export const getAllCrime = async ({ page, size, searchValue }) => {
  try {
    const result = await ApiService.get("/crimes/", {
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

export const deleteCrime = async (id) => {
  try {
    const result = await ApiService.delete("/crimes/" + id);
    return result.data
  } catch (error) {
    throw error;
  }
}

export const getCrime = async (id) => {
  try {
    const result = await ApiService.get("/crimes/" + id);
    return result.data
  } catch (error) {
    throw error;
  }
}