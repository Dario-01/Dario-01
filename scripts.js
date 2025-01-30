document.addEventListener('DOMContentLoaded', () => {
  function getElement(id) {
    return document.getElementById(id) || console.error(`Element #${id} not found`);
  }

  const uniqueId = generateUniqueId();
  const voiceflowRuntime = 'general-runtime.voiceflow.com';
  const voiceflowVersionID = getElement('vfassistant')?.getAttribute('data-version') || 'production';
  const voiceflowAPIKey = 'Bearer VF.DM.679a4750bc56e6ab061df94d.qH6JA0gYFD4ewspP';

  let audio = new Audio();
  const wave = getElement('wave');
  const input = getElement('user-input');
  const responseContainer = getElement('response-container');
  const inputPlaceholder = getElement('input-placeholder');
  const inputFieldContainer = getElement('input-container');
  const background = getElement('background');
  const credits = getElement('credits');
  
  if (!input || !responseContainer || !wave || !inputFieldContainer) return;

  const instance = new SiriWave({
    container: wave,
    width: 300,
    height: 120,
    autostart: false,
  });

  inputFieldContainer.addEventListener('click', () => input.focus());

  setTimeout(() => inputPlaceholder?.style && (inputPlaceholder.style.animation = 'fadeIn 0.5s forwards'), 3000);
  input.addEventListener('click', () => {
    if (!inputPlaceholder?.classList.contains('hidden')) {
      inputPlaceholder.style.animation = 'fadeOut 0.5s forwards';
      setTimeout(() => inputPlaceholder?.classList.add('hidden'), 500);
    }
  });

  function getRandomImage() {
    const imagesList = [
      'pawel-czerwinski-SVVCP23JFyg-unsplash.jpg',
      'pawel-czerwinski-vI5XwPbGvmY-unsplash.jpg',
    ];
    return imagesList[Math.floor(Math.random() * imagesList.length)];
  }

  background.style.backgroundImage = `url('./images/${getRandomImage()}')`;
  background.style.opacity = '1';

  credits.innerHTML = 'Photo by <a href="https://unsplash.com/@pawel_czerwinski">Pawel Czerwinski</a>';
  credits.style.opacity = '0.6';

  input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && input.value.trim()) {
      input.disabled = true;
      input.classList.add('fade-out');
      responseContainer.style.opacity = '0';
      audio?.pause();
      interact(input.value.trim());
    }
  });

  async function interact(userInput) {
    let body = {
      config: { tts: true, stripSSML: true },
      action: { type: userInput === '#launch#' ? 'launch' : 'text', payload: userInput },
    };

    try {
      const response = await fetch(`https://${voiceflowRuntime}/state/user/${uniqueId}/interact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: voiceflowAPIKey,
          versionID: voiceflowVersionID,
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      displayResponse(data);
    } catch (error) {
      console.error('Error fetching from Voiceflow:', error);
      displayResponse(null);
    }
  }

  function displayResponse(response) {
    responseContainer.innerHTML = '';
    response?.forEach((item) => {
      const textElement = document.createElement('p');
      textElement.textContent = item.payload?.message || 'Error processing response';
      responseContainer.appendChild(textElement);
    });
    responseContainer.style.opacity = '1';
    input.disabled = false;
    input.value = '';
    input.classList.remove('fade-out');
    input.focus();
  }
});

function generateUniqueId() {
  return Math.random().toString(36).substring(2, 8) + Date.now().toString(36);
}
