import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container } from '@/components/common';
import { fadeInLeft, fadeInRight, viewportSettings } from '@/lib/animations';
import { isValidEmail } from '@/lib/utils';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Show success message
    toast.success(t('contact.successMessage'), {
      duration: 5000,
      style: {
        background: '#1F2937',
        color: '#FFFFFF',
        border: '1px solid #374151',
      },
    });

    // Reset form
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section
      id="contact"
      style={{
        backgroundColor: '#1F2937',
        width: '100%',
        paddingTop: '50px',
        paddingBottom: '80px',
      }}
    >
      <Container>
        <div
          style={{
            display: 'flex',
            gap: '100px',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          {/* Left Column - Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeInLeft}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '54px',
              width: '604px',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <h2
                style={{
                  color: '#FFFFFF',
                  fontFamily: '"Sulphur Point", sans-serif',
                  fontSize: '32px',
                  fontWeight: 700,
                  lineHeight: '40px',
                }}
              >
                Reach Out to OUTAI,
                <br />
                We're Here to Help!
              </h2>
              <p
                style={{
                  color: '#FFFFFF',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '16px',
                  fontWeight: 300,
                  lineHeight: '20px',
                  maxWidth: '468px',
                }}
              >
                Got a question or need assistance? Contact us for quick, helpful
                support from the OUTAI team. We're just a message away!
              </p>
            </div>

            {/* Our Office */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3
                style={{
                  color: '#FFFFFF',
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: '20px',
                  fontWeight: 700,
                  lineHeight: '24px',
                }}
              >
                Our Office
              </h3>
              
              {/* Office Image / Map */}
              <div
                style={{
                  width: '600px',
                  height: '300px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.5433!2d-3.9942!3d5.3324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMTknNTYuNiJOIDPCsDU5JzM5LjEiVw!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s"
                  width="600"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="OUTAI Office Location"
                />
              </div>
            </div>

            {/* Location & Contact Info */}
            <div style={{ display: 'flex', gap: '100px' }}>
              {/* Location */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h4
                  style={{
                    color: '#FFFFFF',
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    lineHeight: '24px',
                  }}
                >
                  Location
                </h4>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <LocationIcon />
                  <p
                    style={{
                      color: '#FFFFFF',
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '12px',
                      fontWeight: 400,
                      lineHeight: '24px',
                    }}
                  >
                    Boulevard de Marseille, Zone 4C, Marcory,
                    <br />
                    Abidjan, Côte d'Ivoire
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h4
                  style={{
                    color: '#FFFFFF',
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    lineHeight: '24px',
                  }}
                >
                  Contact info
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* Email */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <EmailIcon />
                    <a
                      href="mailto:Customercare@outai.com"
                      style={{
                        color: '#007EFF',
                        fontFamily: '"Inter", sans-serif',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '24px',
                        textDecoration: 'none',
                      }}
                    >
                      Customercare@outai.com
                    </a>
                  </div>
                  
                  {/* Phone */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <PhoneIcon />
                    <span
                      style={{
                        color: '#FFFFFF',
                        fontFamily: '"Inter", sans-serif',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '24px',
                      }}
                    >
                      +27 16 1538525
                    </span>
                  </div>
                  
                  {/* Hours */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <CalendarIcon />
                    <span
                      style={{
                        color: '#FFFFFF',
                        fontFamily: '"Inter", sans-serif',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '24px',
                      }}
                    >
                      Sat - Thu: 7am - 4:30pm
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeInRight}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '64px',
              width: '368px',
              marginTop: '100px',
            }}
          >
            {/* Form Header */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                alignItems: 'center',
              }}
            >
              <h3
                style={{
                  color: '#FFFFFF',
                  fontFamily: '"Sulphur Point", sans-serif',
                  fontSize: '32px',
                  fontWeight: 700,
                  lineHeight: '24px',
                  textAlign: 'center',
                }}
              >
                Contact Us
              </h3>
              <p
                style={{
                  color: '#FFFFFF',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '14px',
                  fontWeight: 300,
                  lineHeight: '20px',
                  textAlign: 'center',
                  maxWidth: '276px',
                }}
              >
                If you have any queries, please fill out the form below. We're
                here to assist you.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Name Input */}
                <div
                  style={{
                    backgroundColor: '#25303F',
                    border: '1px solid #6B7280',
                    borderRadius: '4px',
                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '12px',
                  }}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#FFFFFF',
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '20px',
                      width: '100%',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Email Input */}
                <div
                  style={{
                    backgroundColor: '#25303F',
                    border: '1px solid #6B7280',
                    borderRadius: '4px',
                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '12px',
                  }}
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter a valid email address"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#FFFFFF',
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '20px',
                      width: '100%',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Message Textarea */}
                <div
                  style={{
                    backgroundColor: '#25303F',
                    border: '1px solid #6B7280',
                    borderRadius: '4px',
                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                    height: '100px',
                    padding: '8px 12px',
                    position: 'relative',
                  }}
                >
                  <textarea
                    name="message"
                    placeholder="Write a message..."
                    value={formData.message}
                    onChange={handleChange}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#FFFFFF',
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: '20px',
                      width: '100%',
                      height: '80px',
                      resize: 'none',
                      outline: 'none',
                    }}
                  />
                  {/* Resize Handle */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '8px',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M12 2L2 12M12 6L6 12M12 10L10 12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: '#01A532',
                  border: '1px solid #01A532',
                  borderRadius: '12px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                <span
                  style={{
                    color: '#FFFFFF',
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '24px',
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// Icons
function LocationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 10.625C11.3807 10.625 12.5 9.50571 12.5 8.125C12.5 6.74429 11.3807 5.625 10 5.625C8.61929 5.625 7.5 6.74429 7.5 8.125C7.5 9.50571 8.61929 10.625 10 10.625Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 17.5C13.75 14.375 17.5 11.0068 17.5 8.125C17.5 3.95304 14.1421 0.625 10 0.625C5.85786 0.625 2.5 3.95304 2.5 8.125C2.5 11.0068 6.25 14.375 10 17.5Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M2.5 5.83333L9.0755 10.5962C9.63533 10.9819 10.3647 10.9819 10.9245 10.5962L17.5 5.83333M4.16667 15.8333H15.8333C16.7538 15.8333 17.5 15.0871 17.5 14.1667V5.83333C17.5 4.91286 16.7538 4.16667 15.8333 4.16667H4.16667C3.24619 4.16667 2.5 4.91286 2.5 5.83333V14.1667C2.5 15.0871 3.24619 15.8333 4.16667 15.8333Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M2.5 4.16667C2.5 3.24619 3.24619 2.5 4.16667 2.5H6.89298C7.25429 2.5 7.57458 2.73198 7.68998 3.07533L8.93589 6.81343C9.06761 7.20883 8.91254 7.64439 8.55836 7.88067L7.06173 8.87867C7.96368 10.9002 9.59983 12.5363 11.6213 13.4383L12.6193 11.9416C12.8556 11.5875 13.2912 11.4324 13.6866 11.5641L17.4247 12.81C17.768 12.9254 18 13.2457 18 13.607V16.3333C18 17.2538 17.2538 18 16.3333 18H15.8333C8.46954 18 2.5 12.0305 2.5 4.66667V4.16667Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M6.66667 1.66667V4.16667M13.3333 1.66667V4.16667M2.5 7.5H17.5M4.16667 3.33333H15.8333C16.7538 3.33333 17.5 4.07953 17.5 5V16.6667C17.5 17.5871 16.7538 18.3333 15.8333 18.3333H4.16667C3.24619 18.3333 2.5 17.5871 2.5 16.6667V5C2.5 4.07953 3.24619 3.33333 4.16667 3.33333Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
