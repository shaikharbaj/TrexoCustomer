'use client';
import { PageHead } from "../partials/public-header";
import ContactUsForm from './contact-us-form';

interface IContactUsPageProps { }

const ContactUsPage: React.FC<IContactUsPageProps> = () => {
  return (
    <>
    <PageHead title="Contact Us" />
    <ContactUsForm />
    </>
  );
};

export default ContactUsPage;