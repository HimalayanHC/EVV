import { sendEmail as sendEmailWithMailChimp } from './mailClients/MailChimpClient.ts';

const sendEmail = async (payload: {
  consumerName: string;
  employeeName: string;
}) => {
  try {
    const subject = `Missed EVV - ${payload.consumerName}/${payload.employeeName}`;
    return sendEmailWithMailChimp(subject, JSON.stringify(payload));
  } catch (err) {
    console.log(err);
  }
};

export { sendEmail };
