const url = 'https://gnomic7-himalayanhc.deno.dev/hhc';

const toggleSubmitBtn = (disabled = false) => {
  const submitBtn = document.getElementById('submitData');
  if (disabled) {
    submitBtn.setAttribute('disabled', true);
    submitBtn.setAttribute(
      'class',
      'inline-block w-full px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out',
    );
  } else {
    submitBtn.removeAttribute('disabled');
    submitBtn.setAttribute(
      'class',
      'mb-2 w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out',
    );
  }
};
const submitFormData = async (e) => {
  e.preventDefault();
  e.stopPropagation();
  const formData = new FormData(document.querySelector('form'));
  const dataToEmail = {};
  for (const [key, value] of formData.entries()) {
    if (dataToEmail.hasOwnProperty(key)) {
      dataToEmail[key] = `${dataToEmail[key]}, ${value}`;
    } else {
      dataToEmail[key] = value;
    }
  }
  toggleSubmitBtn(true);
  await submitForm(dataToEmail);
};

const submitForm = async (payload) => {
  try {
    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify(payload),
    });
    const { ok, statusText, body, status } = response;
    const mainContentEl = document.getElementById('mainContentSection');
    const serverRespSection = document.getElementById('serverResponseSection');
    const commonSectionClass =
      'flex flex-col content-center text-gray-700 text-center p-4';
    mainContentEl.setAttribute('class', 'flex-col content-center hidden');
    if (!ok || status !== 200) {
      const err = await response.blob();
      serverRespSection.setAttribute(
        'class',
        'bg-red-200 text-center lg:text-left',
      );

      document
        .getElementById('serverMessageSection')
        .setAttribute('class', 'hidden');
      document
        .getElementById('serverErrorSection')
        .setAttribute('class', commonSectionClass);

      document.getElementById('serverErrorContent').innerHTML = err;
      return;
    }
    serverRespSection.setAttribute('class', commonSectionClass);
    document
      .getElementById('serverErrorSection')
      .setAttribute('class', 'hidden');
    setTimeout(() => {
      window.location.reload(true);
    }, 5000);
  } catch (err) {
    alert('Something went wrong!');
    window.location.reload(true);
  }
};

const showReasonText = () => {
  const formData = new FormData(document.querySelector('form'));
  const missedevent = formData.get('missedevent');
  const cl =
    missedevent === 'OtherEvent'
      ? 'flex flex-wrap -mx-3 mb-6'
      : 'flex flex-wrap -mx-3 mb-6 hidden';
  document.getElementById('otherReasonsTextareaDiv').setAttribute('class', cl);
};

const enableSubmitButton = () => {
  const formData = new FormData(document.querySelector('form'));
  const consumerConsent = formData.get('consumeragree');
  const employeeConsent = formData.get('employeeagree');
  // check if other fields are valid
  if (consumerConsent && employeeConsent) {
    toggleSubmitBtn(false);
  } else {
    toggleSubmitBtn(true);
  }
};
const evvForm = document.getElementById('evvForm');
evvForm.addEventListener('submit', submitFormData);
