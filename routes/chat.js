import { Router } from 'express'
import { ai, GEMINI_MODEL, BASE_GEN_CONFIG, SYSTEM_INSTRUCTION } from '../lib/gemini.js'

const router = Router()

router.post('/api/chat', async (req, res) => {
    const { conversation } = req.body
    try {
        if (!Array.isArray(conversation)) throw new Error("Messages must be an array!!")
        const contents = conversation.map(({ role, text }) => ({
            role,
            parts: [{ text }]
        }))

        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents,
            config: {
                ...BASE_GEN_CONFIG,
                systemInstruction: SYSTEM_INSTRUCTION,
            }
        })
        res.status(200).json({ result: response.text })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router