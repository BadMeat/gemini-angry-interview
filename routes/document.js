import { Router } from 'express'
import { ai, GEMINI_MODEL, upload, BASE_GEN_CONFIG, SYSTEM_INSTRUCTION } from '../lib/gemini.js'

const router = Router()

router.post('/api/upload-cv', upload.single('cv'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'File CV harus diupload!' })
    }

    const base64Data = req.file.buffer.toString('base64')

    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            config: {
                ...BASE_GEN_CONFIG,
                systemInstruction: SYSTEM_INSTRUCTION,
            },
            contents: [{
                role: 'user',
                parts: [
                    { inlineData: { data: base64Data, mimeType: req.file.mimetype } },
                    { text: 'Ini adalah CV kandidat yang melamar posisi di perusahaan kami. Baca dan analisis CV ini, lalu sambut kandidat dan langsung tanyakan pertanyaan interview pertama yang relevan dengan profil dan pengalaman yang tertera di CV.' }
                ]
            }]
        })

        res.status(200).json({ result: response.text })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router
