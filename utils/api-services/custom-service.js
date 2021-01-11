import ApiService from './base'

export const createCustom = async (data) => {
  try {
    const result = await ApiService.post("/customs/", data);
    return result.data
  } catch (error) {
    throw error;
  }
}

export const getAllCustom = async ({ page, size, searchValue }) => {
  try {
    const result = await ApiService.get("/customs/", {
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

export const deleteCustom = async (id) => {
  try {
    const result = await ApiService.delete("/customs/" + id);
    return result.data
  } catch (error) {
    throw error;
  }
}