import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client
const apiKey = import.meta.env?.VITE_GEMINI_API_KEY || "AIzaSyBKVaQqauTQwHJzJp3b8pnDHEvn8Pu-Qq4";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Generate chart from file data and user prompt
 * @param {Object} fileData - Parsed file data
 * @param {string} prompt - User prompt
 * @returns {Object} Chart specification and response
 */
export const generateChartFromFileAndPrompt = async (fileData, prompt) => {
  try {
    const chartPrompt = `Based on this data and user request: "${prompt}", create a chart specification. 
    Data: ${JSON.stringify(fileData).slice(0, 1000)}...
    
    Please respond with a JSON object containing:
    - chartSpec: Chart.js configuration object
    - response: Human-readable explanation
    - fieldsUsed: Array of field names used`;

    const result = await model.generateContent(chartPrompt);
    const responseText = result?.response?.text?.() || "No response generated";
    
    try {
      // Try to parse as JSON first
      const parsedResponse = JSON.parse(responseText);
      return parsedResponse;
    } catch {
      // If not JSON, return a structured response
      return {
        chartSpec: null,
        response: responseText,
        fieldsUsed: []
      };
    }
  } catch (error) {
    console.error("AI Service Error:", error);
    return {
      chartSpec: null,
      response: "Error generating chart. Please try again.",
      fieldsUsed: []
    };
  }
};
