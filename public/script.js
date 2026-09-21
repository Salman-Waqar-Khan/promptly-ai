const form = document.querySelector('#prompt-form');
const promptInput = document.querySelector('#prompt');
const button = document.querySelector('#generate-button');
const errorMessage = document.querySelector('#error-message');
const resultPanel = document.querySelector('#result-panel');
const result = document.querySelector('#result');
const count = document.querySelector('#character-count');
const copyButton = document.querySelector('#copy-button');

promptInput.addEventListener('input', () => {
  count.textContent = `${promptInput.value.length} / 2000`;
  if (promptInput.value.trim()) errorMessage.hidden = true;
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const prompt = promptInput.value.trim();

  if (!prompt) {
    errorMessage.textContent = 'অনুগ্রহ করে একটি prompt লিখুন।';
    errorMessage.hidden = false;
    promptInput.focus();
    return;
  }

  errorMessage.hidden = true;
  resultPanel.hidden = false;
  result.textContent = 'AI আপনার জন্য উত্তর তৈরি করছে...';
  button.disabled = true;
  button.classList.add('loading');
  button.querySelector('.button-text').textContent = 'তৈরি হচ্ছে...';

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'কিছু একটা সমস্যা হয়েছে।');
    result.textContent = data.result;
  } catch (error) {
    resultPanel.hidden = true;
    errorMessage.textContent = error.message;
    errorMessage.hidden = false;
  } finally {
    button.disabled = false;
    button.classList.remove('loading');
    button.querySelector('.button-text').textContent = 'Generate করুন';
  }
});

copyButton.addEventListener('click', async () => {
  await navigator.clipboard.writeText(result.textContent);
  copyButton.textContent = 'কপি করা হয়েছে!';
  setTimeout(() => { copyButton.textContent = 'উত্তর কপি করুন'; }, 1800);
});
