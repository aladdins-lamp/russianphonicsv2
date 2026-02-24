
import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// 使用全局缓存，缓存 ArrayBuffer（原始音頻檔案 bytes）
const globalAudioCache = new Map<string, ArrayBuffer>();

export const generateSpeech = async (text: string, slow: boolean = false): Promise<ArrayBuffer | null> => {
  if (!text || text.trim() === '') return null;

  const cacheKey = `${slow ? 'slow:' : 'normal:'}${text}`;
  if (globalAudioCache.has(cacheKey)) {
    return globalAudioCache.get(cacheKey)!;
  }

  try {
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
      const bytes = base64ToUint8Array(part.inlineData.data);
      globalAudioCache.set(cacheKey, bytes.buffer);
      return bytes.buffer;
    }

    console.warn("TTS 模型未返回有效音频。");
    return null;
  } catch (error) {
    console.error("TTS 调用失败:", text, error);
    return null;
  }
};

function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * 解碼 arbitrary encoded audio bytes（例如 mp3/ogg/wav）為 AudioBuffer
 * 使用瀏覽器內建的 decodeAudioData（能處理壓縮格式），而非手動視作 PCM
 */
export async function decodeAudioData(
  data: ArrayBuffer | Uint8Array,
  ctx: AudioContext
): Promise<AudioBuffer> {
  const arrayBuffer = data instanceof Uint8Array ? data.buffer : data;
  // slice 一份副本，避免某些實現修改原始 buffer
  const copy = arrayBuffer.slice(0);
  return await ctx.decodeAudioData(copy);
}
