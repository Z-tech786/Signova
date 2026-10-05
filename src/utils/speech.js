let voices = []
const loadVoices = () => { voices = window.speechSynthesis?.getVoices() || [] }
if (typeof window !== 'undefined' && window.speechSynthesis) {
  loadVoices()
  window.speechSynthesis.onvoiceschanged = loadVoices
}

export const speak = (text) => {
  if (typeof window === 'undefined' || !window.speechSynthesis || localStorage.getItem('signova_tts') === 'off') return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.rate = 0.95
  utter.pitch = 1
  const v = voices.find((v) => v.lang.startsWith('en'))
  if (v) utter.voice = v
  window.speechSynthesis.speak(utter)
}

export const stopSpeaking = () => window.speechSynthesis?.cancel()
