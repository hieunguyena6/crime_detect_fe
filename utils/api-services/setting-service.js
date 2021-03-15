import ApiService from './base'

export const createOrUpdateSetting = async (percent) => {
  try {
    const result = await ApiService.post("/settings", { percent });
    return result.data
  } catch (error) {
    throw error;
  }
}

export const getSetting = async () => {
  try {
    const result = await ApiService.get("/settings");
    return result.data
  } catch (error) {
    throw error;
  }
}