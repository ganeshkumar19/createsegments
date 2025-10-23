import axios from "axios";

// Replace with your Webhook URL (with proxy if needed)
const WEBHOOK_URL = "http://localhost:8080/https://webhook.site/a4fc3bb4-99ef-4d24-be5d-e7cf36b22fb3";

export const saveSegment = async (segmentData: {
  segment_name: string;
  schema: { [key: string]: string }[];
}) => {
  try {
    const response = await axios.post(WEBHOOK_URL, segmentData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error saving segment:", error);
    throw error;
  }
};