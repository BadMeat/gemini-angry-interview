import { GoogleGenAI } from '@google/genai'
import multer from 'multer'

export const GEMINI_MODEL = "gemini-2.5-flash"
export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
export const upload = multer()