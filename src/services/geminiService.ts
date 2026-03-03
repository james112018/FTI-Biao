// import { GoogleGenAI } from "@google/genai";

let aiInstance: any = null;

export const getGeminiAI = () => {
  if (!aiInstance) {
    // aiInstance = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
  }
  return aiInstance;
};

export const generateContent = async (prompt: string) => {
  try {
    // const ai = getGeminiAI();
    // const response = await ai.models.generateContent({
    //   model: "gemini-3-flash-preview",
    //   contents: prompt,
    // });
    // return response.text;
    return "Mock response";
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
