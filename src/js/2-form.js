import '../css/2-form.css';

const FEEDBACK_FORM_LS_KEY = 'feedback-form-state';

const feedbackFormRef = document.querySelector('.feedback-form');

const DEFAULT_FORM_DATA = { email: '', message: '' };

let formData = initializeFormData(DEFAULT_FORM_DATA, FEEDBACK_FORM_LS_KEY);

initializeFormTextFields(feedbackFormRef, formData);

feedbackFormRef.addEventListener('input', e => {
  const { name, value } = e.target;
  formData[name] = value;
  window.localStorage.setItem(FEEDBACK_FORM_LS_KEY, JSON.stringify(formData));
});

feedbackFormRef.addEventListener('submit', e => {
  e.preventDefault();
  const { email, message } = formData;
  const userEmail = email.trim();
  const userMessage = message.trim();

  if (!userEmail || !userMessage) {
    alert('Fill please all fields');
    return;
  }

  console.log({ email: userEmail, message: userMessage });

  e.currentTarget.reset();
  window.localStorage.removeItem(FEEDBACK_FORM_LS_KEY);
  formData = { ...DEFAULT_FORM_DATA };
});

function initializeFormData(defaultFormData, lsKey) {
  const initFormData = { ...defaultFormData };

  try {
    const savedData = window.localStorage.getItem(lsKey);

    if (!savedData) return initFormData;
    const parsedData = JSON.parse(savedData);

    for (const key of Object.keys(initFormData)) {
      const value = parsedData[key];
      if (!value) continue;
      initFormData[key] = value;
    }

    return initFormData;
  } catch (error) {
    window.localStorage.removeItem(lsKey);
    return { ...defaultFormData };
  }
}

function initializeFormTextFields(formRef, initFormData) {
  for (const [key, value] of Object.entries(initFormData)) {
    const elRef = formRef.querySelector(`[name="${key}"]`);
    if (!elRef) return;
    if (elRef.nodeName !== 'TEXTAREA' && elRef.nodeName !== 'INPUT') return;
    elRef.value = value;
  }
}
