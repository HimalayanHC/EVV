import 'https://deno.land/x/dotenv/load.ts';
import { SmtpClient } from 'https://deno.land/x/smtp/mod.ts';
const { SEND_EMAIL, PWD, RECV_EMAIL } = Deno.env.toObject();

const getSmtpClient = async () => {
  const client = new SmtpClient();

  const connectConfig: any = {
    hostname: 'smtp.gmail.com',
    port: 465,
    username: SEND_EMAIL,
    password: PWD,
  };
  await client.connectTLS(connectConfig);
  return client;
};

const sendEmail = async (payload: {
  consumerName: string;
  employeeName: string;
}) => {
  const subject = `Missed EVV - ${payload.consumerName}/${payload.employeeName}`;

  // Use google gmail api to send email
  const gClient = await getSmtpClient();
  await gClient.send({
    from: SEND_EMAIL,
    to: RECV_EMAIL,
    content: JSON.stringify(payload),
    subject,
  });
  await gClient.close();
};

export { sendEmail };
