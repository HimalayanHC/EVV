const submitFormData = () => {
  const emailAddress = 'himalayanHc@gmail.com';
  const formData = new FormData(document.querySelector('form'));
  const dataToEmail = {};
  const excludeKeys = ['consumerConsent', 'employeeConsent'];
  for (const [key, value] of formData.entries()) {
    if (excludeKeys.includes(key)) continue;
    if (dataToEmail.hasOwnProperty(key)) {
      dataToEmail[key] = `${dataToEmail[key]}, ${value}`;
    } else {
      dataToEmail[key] = value;
    }
  }
  const subject = `Missed EVV - ${dataToEmail.consumerName}/${dataToEmail.employeeName}`;
  // Send an email
  sendMail(
    `mailto:${emailAddress}?subject=` +
      encodeURIComponent(subject) +
      '&body=' +
      encodeURIComponent(dataToEmail),
  );

  document.getElementById('submitData').setAttribute('disabled', true);
};

const sendMail = (payload) => {
  document.location.href = payload;
};

const showReasonText = () => {
  const formData = new FormData(document.querySelector('form'));
  const missedType = formData.get('missedType');
  const cl =
    missedType === 'Other Reason'
      ? 'flex flex-wrap -mx-3 mb-6'
      : 'flex flex-wrap -mx-3 mb-6 hidden';
  document.getElementById('otherReasonsTextareaDiv').setAttribute('class', cl);
};

const enableSubmitButton = () => {
  const formData = new FormData(document.querySelector('form'));
  const consumerConsent = formData.get('consumerConsent');
  const employeeConsent = formData.get('employeeConsent');
  // check if other fields are valid
  if (consumerConsent && employeeConsent) {
    document.getElementById('submitData').removeAttribute('disabled');
  }
};
