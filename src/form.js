import { startLoading, loadingMessage, stopLoading } from "./loading.js"
import { renderText } from "./render.js"
import { transcribeAudio } from "./transcribe.js"
import { getVideoId, loadVideo } from "./youtube-api.js"
import axios from "axios"
const form = document.querySelector('#form')

form.addEventListener('submit', async (e)=> {
    e.preventDefault()

    try {
        loadingMessage('Starting App')
        startLoading()
        const formData = new FormData(form)
        const url = formData.get('url')
        await loadVideo(url)
        loadingMessage('Downloading and transcription')
        await axios.get('http://localhost:3334/audio?v=' + getVideoId(url))
        const data = await transcribeAudio()
        renderText(data)
    } catch (error) {
        console.log('[SUBMIT_ERROR]', error)
    }finally {
        stopLoading()
    }
})