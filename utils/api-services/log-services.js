import ApiService from './base'

export const getLog = async ({ size, page, time_start, time_end, search }) => {
  try {
    const result = await ApiService.get("/logs/",
      {
        params: {
          size,
          page,
          time_start,
          time_end,
          search
        }
      });
    return result.data
  } catch (error) {
    throw error;
  }
}