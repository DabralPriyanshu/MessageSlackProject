import { transport } from "../config/mailConfig.js";
import mailQueue from "../queues/mailQueue.js";
mailQueue.process(async (job) => {
  const emailData = job.data;
  console.log("Process email for ", emailData);
  try {
    const response = await transport.sendMail(emailData);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
});
