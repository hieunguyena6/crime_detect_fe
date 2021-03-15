import ApiService from './base'

export const createLog = async ({ percent, id, time }) => {
  try {
    const result = await ApiService.post("/settings", {
      percent, id, time
    });
    return result.data
  } catch (error) {
    throw error;
  }
}

export const getLog = async ({ size, page, time_start, time_end, search }) => {
  try {
    const result = await ApiService.get("/logs", {
      size,
      page,
      time_start,
      time_end,
      search
    });
    return result.data
  } catch (error) {
    throw error;
  }
}