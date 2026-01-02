import { GoogleGenAI, Type, Schema } from "@google/genai";
import { SimulationState, SymbionModule, GeminiAnalysis } from "../types";

const parseGeminiResponse = (text: string): GeminiAnalysis => {
  try {
    // Remove code blocks if present
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText) as GeminiAnalysis;
  } catch (e) {
    console.error("Failed to parse Gemini JSON", e);
    return {
      interpretation: "Interference detected in the quantum field. Unable to decode.",
      harmonicState: "Unknown",
      suggestedFocus: "Recalibrate sensors."
    };
  }
};

export const analyzeResonance = async (
  state: SimulationState, 
  activeModule: SymbionModule
): Promise<GeminiAnalysis> => {
  
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return {
      interpretation: "API Key missing. Cannot access the Grimoire Vibratoire.",
      harmonicState: "Disconnected",
      suggestedFocus: "Check configuration."
    };
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are the AI interface for the SymbiΩn Multiverse Lab.
    Analyze the current vibratory state of the fractal spiral.
    
    Current Module: ${activeModule.name} (${activeModule.functionDescription})
    Perfect Number Resonance: ${activeModule.perfectNumber}
    
    Simulation Parameters:
    - Phi Factor: ${state.phi}
    - Total S (Modulation): ${state.sTotal}
    - Qubits: ${state.qubits}
    - Coupling (J): ${state.coupling}
    - Decoherence: ${state.decoherence}

    Provide a "Techno-poetic" interpretation of this state. Be mystical yet scientific.
    
    Return ONLY a JSON object with this schema:
    {
      "interpretation": "A short paragraph (max 50 words) describing the energetic feeling.",
      "harmonicState": "A 1-3 word status (e.g., 'Resonant', 'Chaotic', 'Divine Alignment')",
      "suggestedFocus": "A short advice (max 10 words) for the operator."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                interpretation: { type: Type.STRING },
                harmonicState: { type: Type.STRING },
                suggestedFocus: { type: Type.STRING }
            }
        }
      }
    });

    if (response.text) {
        return parseGeminiResponse(response.text);
    }
    throw new Error("No text response");

  } catch (error) {
    console.error("Gemini API Error:", error);
     return {
      interpretation: "The signal is too weak. The void does not answer.",
      harmonicState: "Silence",
      suggestedFocus: "Increase amplitude."
    };
  }
};