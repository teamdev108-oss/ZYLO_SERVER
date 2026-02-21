import { response } from "express";

const sendResponse = (status, message, data) => {
  return response.status(status).json({
    message,
    error: status === 400 ? "true" : "false",
    data: data || [],
  });
};

export default sendResponse;
