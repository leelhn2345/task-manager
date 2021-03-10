import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email: string, name: string): void => {
  sgMail.send({
    to: email,
    from: "leelhn_95@hotmail.com",
    subject: "thanks for joining in",
    text: `Welcome to the app ${name}. Let me know how you get along with the app.`,
  });
};

const sendCancelationEmail = (email: string, name: string): void => {
  sgMail.send({
    to: email,
    from: "leelhn_95@hotmail.com",
    subject: "Sorry to see you go!",
    text: `Goodbye ${name}. I hope to see you back sometime soon.`,
  });
};

export { sendWelcomeEmail, sendCancelationEmail };
