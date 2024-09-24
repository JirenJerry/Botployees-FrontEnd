// MUI Imports
import Typography from '@mui/material/Typography'

const TermsOfService = () => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col justify-center items-center gap-2'>
        <Typography variant='h4'>Terms of Service</Typography>
        <Typography variant='body2'>Last updated: September 22, 2024</Typography>
      </div>
      
      <Typography>
        Welcome to Botployment! These Terms of Service govern your access to and use of our platform, including our integration with WhatsApp Business and the AI-powered chatbot services we offer. By using our services, you agree to comply with these terms and conditions.
      </Typography>

      <Typography variant='h5'>1. Overview</Typography>
      <Typography>
        Botployment provides an AI-driven chatbot for businesses using WhatsApp Business accounts. Our platform helps you manage customer interactions through WhatsApp, automate responses, and schedule meetings.
      </Typography>

      <Typography variant='h5'>2. Facebook App Authorization</Typography>
      <Typography>
        To integrate with WhatsApp Business through Botployment, you must authorize our Facebook app. By doing so, you allow us to access your Facebook and WhatsApp Business account information for the purpose of facilitating chat management, message automation, and meeting scheduling.
      </Typography>
      <Typography>
        You can authorize our app by logging in using your Facebook account. Once authorized, our system will be able to interact with your WhatsApp Business settings, read and respond to chats, and manage business-related actions.
      </Typography>
      
      <Typography variant='h5'>3. Account Management</Typography>
      <Typography>
        You are responsible for maintaining the confidentiality of your WhatsApp Business account credentials and any actions performed through your account. Botployment is not liable for unauthorized access to your account resulting from a failure to secure your login details.
      </Typography>

      <Typography variant='h5'>4. Data Collection and Use</Typography>
      <Typography>
        By authorizing our app, you consent to the collection and use of the following information:
      </Typography>
      <ul className='list-disc pl-6'>
        <li><Typography><strong>WhatsApp Business Account Information:</strong> This includes your business name, profile, and messaging data necessary for providing our services.</Typography></li>
        <li><Typography><strong>Facebook Account Information:</strong> We collect basic information such as your name and email as required by Facebook`&rsquo;` API to establish a secure connection.</Typography></li>
        <li><Typography><strong>Usage Data:</strong> Data about your interactions with the app, such as login times, chat history, and automated responses, to improve service functionality.</Typography></li>
      </ul>

      <Typography>
        Botployment does not store or use your customers personal information except for the purpose of facilitating AI-driven conversations. All data is processed in compliance with applicable data protection laws.
      </Typography>

      <Typography variant='h5'>5. Service Responsibilities</Typography>
      <Typography>
        Botployment provides AI-powered responses to your clients through WhatsApp. However, the service relies on third-party platforms like Facebook and WhatsApp, and we cannot guarantee their availability or performance at all times.
      </Typography>

      <Typography variant='h5'>6. Termination</Typography>
      <Typography>
        You can terminate your use of Botployment at any time by revoking access to the Facebook app through your Facebook account settings. Upon revocation, you will lose access to the WhatsApp Business integration and the AI-powered chatbot services.
      </Typography>

      <Typography variant='h5'>7. Limitation of Liability</Typography>
      <Typography>
        Botployment shall not be held responsible for any direct, indirect, or consequential damages that result from the use of our platform, including but not limited to the loss of business, data, or profits.
      </Typography>

      <Typography variant='h5'>8. Changes to the Terms</Typography>
      <Typography>
        We may update these Terms of Service from time to time. Any changes will be effective immediately upon posting on our website. We encourage you to review this page periodically for any updates.
      </Typography>

      <Typography variant='h5'>9. Contact Us</Typography>
      <Typography>
        If you have any questions about these Terms of Service, please contact us at <a href="mailto:support@botployment.com">support@botployment.com</a>.
      </Typography>

      <Typography variant='body2'>Botployment, S.A., 200 meters north of the Sarchí bridge, Costa Rica.</Typography>
    </div>
  )
}

export default TermsOfService
