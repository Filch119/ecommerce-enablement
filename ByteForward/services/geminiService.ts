
import { GoogleGenAI, Type } from "@google/genai";
import type { SeoSuggestion } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A catchy, SEO-friendly product title, under 80 characters.",
    },
    description: {
      type: Type.STRING,
      description: "A persuasive, well-structured product description highlighting key benefits. Use markdown for formatting like bolding (**text**) and bullet points (- item).",
    },
  },
  required: ["title", "description"],
};


export const generateSeoContent = async (
  productName: string,
  productCategory: string,
  keywords: string
): Promise<SeoSuggestion> => {
    if (!process.env.API_KEY) {
        throw new Error("API key is not configured.");
    }
  
    const prompt = `
    You are an expert e-commerce SEO copywriter. Your task is to generate a compelling product title and description for an online listing.

    Product Name: "${productName}"
    Category: "${productCategory}"
    Keywords: "${keywords}"

    Generate a JSON object that strictly follows the provided schema.
    - The "title" should be SEO-friendly, catchy, and under 80 characters.
    - The "description" should be persuasive, detailed, and structured with markdown for bullet points or bold text to highlight key features and benefits for the customer.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    // In case the model returns a markdown code block
    const cleanedJsonText = jsonText.replace(/^```json\s*|```$/g, '');
    const parsedJson = JSON.parse(cleanedJsonText);

    if (parsedJson.title && parsedJson.description) {
      return parsedJson as SeoSuggestion;
    } else {
      throw new Error("Invalid JSON structure received from API.");
    }
  } catch (error) {
    console.error("Error generating SEO content:", error);
    throw new Error("Failed to generate AI content. Please try again.");
  }
};
