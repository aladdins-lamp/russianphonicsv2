
import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// 使用全局缓存，区分语速
const globalAudioCache = new Map<string, Uint8Array>();

export const generateSpeech = async (text: string, slow: boolean = false): Promise<Uint8Array | null> => {
  if (!text || text.trim() === '') return null;
  
  const cacheKey = `${slow ? 'slow:' : 'normal:'}${text}`;
  if (globalAudioCache.has(cacheKey)) {
    return globalAudioCache.get(cacheKey)!;
  }

  try {
    // 明确语速指令
    const prompt = slow 
      ? `请用非常缓慢、每个音节都极度清晰的速度朗读这个俄语：${text}`
      : `请用标准语速清晰地朗读这个俄语单词或字母：${text}`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, 
          },
        },
      },
    });

    const part = response.candidates?.[0]?.content?.parts?.[0];
    
    if (part?.inlineData?.data) {
      const audioData = decodeBase64ToUint8Array(part.inlineData.data);
      globalAudioCache.set(cacheKey, audioData);
      return audioData;
    }
    
    console.warn("TTS 模型未返回有效音频。");
    return null;
  } catch (error) {
    console.error("TTS 调用失败:", text, error);
    return null;
  }
};

function decodeBase64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
