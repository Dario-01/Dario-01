document.addEventListener('DOMContentLoaded', () => {
  // Generate a unique ID for the user
  const uniqueId = generateUniqueId()

  // Set the runtime, version and API key for the Voiceflow Dialog API
  const voiceflowRuntime = 'general-runtime.voiceflow.com'
  const voiceflowVersionID = 
    document.getElementById('vfassistant').getAttribute('data-version') || 
    'production'
  const voiceflowAPIKey = 'VF.DM.679a4750bc56e6ab061df94d.qH6JA0gYFD4ewspP'

  let audio = new Audio()
  const wave = document.getElementById('wave')
  const input = document.getElementById('user-input')
  const responseContainer = document.getElementById('response-container')
  const inputPlaceholder = document.getElementById('input-placeholder')
  const inputFieldContainer = document.getElementById('input-container')

  var instance = new SiriWave({
    container: document.getElementById('wave'),
    width: 300,
    height: 120,
    autostart: false,
    curveDefinition: [
      {
        attenuation: -2,
        lineWidth: 0.25,
        opacity: 0.1,
      },
      {
        attenuation: -6,
        lineWidth: 0.15,
        opacity: 0.2,
      },
      {
        attenuation: 4,
        lineWidth: 0.05,
        opacity: 0.4,
      },
      {
        attenuation: 2,
        lineWidth: 0.15,
        opacity: 0.6,
      },
      {
        attenuation: 1,
        lineWidth: 0.2,
        opacity: 0.9,
      },
    ],
  })

  // Rest of the code remains the same as in your original script
  // ... (paste the entire original script here)
})

// Function to generate a unique ID for the user
function generateUniqueId() {
  const randomStr = Math.random().toString(36).substring(2, 8)
  const dateTimeStr = new Date().toISOString()
  const dateTimeStrWithoutSeparators = dateTimeStr
    .replace(/[-:]/g, '')
    .replace(/\.\d+/g, '')
  const uniqueId = randomStr + dateTimeStrWithoutSeparators
  return uniqueId
}
