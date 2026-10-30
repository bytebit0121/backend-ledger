const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend-ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegistrationEmail(userEmail,name){
    const subject="welcome to backend ledger"
    const text=`Hello ${name}! welcome to backend ledger`;
    const html= `<h1>Hello ${name}! welcome to backend ledger</h1>`;
    await sendEmail(userEmail,subject,text,html)
    
}

async function sendTransactionEmail(userEmail,name,amount,toAccount){
    const subject="transaction completed"
    const text=`Hello ${name}! your transaction of ${amount} to ${toAccount} has been completed`;
    const html= `<h1>Hello ${name}! your transaction of ${amount} to ${toAccount} has been completed</h1>`;
    await sendEmail(userEmail,subject,text,html)
}

async function sendTransactionFailedEmail(userEmail,name,amount,toAccount){
   const subject="transaction failed"
   const text=`Hello ${name}! your transaction of ${amount} to ${toAccount} has failed`;
   const html= `<h1>Hello ${name}! your transaction of ${amount} to ${toAccount} has failed</h1>`;
  await sendEmail(userEmail,subject,text,html)
}


module.exports = {sendRegistrationEmail,sendTransactionEmail,sendTransactionFailedEmail};
