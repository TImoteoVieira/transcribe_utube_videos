import { pipeline } from "@xenova/transformers";
import { loadingMessage } from "./loading.js";

let data = null;

export async function transcribeAudio(){
    const options = {
        chunk_length_s: 30,
        stride_length_s: 5,
        language: 'portuguese',
        task: 'transcribe',
        return_timestamps: true
    }
    try {
        console.time()
        loadingMessage('Loading transcription from audio')
        console.log('START_TRANSCRIBE')

        const transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny')
        data = await transcriber('../audio.mp3', options)
    } catch (error) {
        console.log('ERROR_TRANSCRIBE', error)
        throw new Error(error)
    }finally{
        console.timeEnd()
        loadingMessage('Transcription finished')
        console.log('STOP_TRANSCRIBE')
        return data
    }

}