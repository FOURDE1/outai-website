import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/layout';
import { Container } from '@/components/common';
import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  viewportSettings,
} from '@/lib/animations';
import toast from 'react-hot-toast';

interface B2BFormData {
  pickup: string;
  destination: string;
  expectedTime: string;
  itemsDescription: string;
}

interface B2BFormErrors {
  pickup?: string;
  destination?: string;
  expectedTime?: string;
  itemsDescription?: string;
}

export default function LastMileB2B() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<B2BFormData>({
    pickup: '',
    destination: '',
    expectedTime: '',
    itemsDescription: '',
  });
  const [errors, setErrors] = useState<B2BFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: B2BFormErrors = {};

    if (!formData.pickup.trim()) {
      newErrors.pickup = t('errors.required');
    }
    if (!formData.destination.trim()) {
      newErrors.destination = t('errors.required');
    }
    if (!formData.expectedTime.trim()) {
      newErrors.expectedTime = t('errors.required');
    }
    if (!formData.itemsDescription.trim()) {
      newErrors.itemsDescription = t('errors.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success(t('lastMileB2B.successMessage'), {
      duration: 5000,
      style: {
        background: 'var(--color-bg-primary, #1F2937)',
        color: 'var(--color-text-primary, #FFFFFF)',
        border: '1px solid var(--color-bg-card, #374151)',
      },
    });

    setFormData({ pickup: '', destination: '', expectedTime: '', itemsDescription: '' });
    setErrors({});
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof B2BFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  /* Shared styles matching Figma exactly */
  const labelStyle: React.CSSProperties = {
    color: 'var(--color-text-primary, #FFFFFF)',
    fontFamily: '"Inter", sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px',
  };

  const inputBoxBase: React.CSSProperties = {
    backgroundColor: 'var(--color-bg-hero, #263140)',
    borderRadius: '4px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '12px',
    paddingRight: '12px',
  };

  const inputInner: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: 'var(--color-text-primary, #FFFFFF)',
    fontFamily: '"Inter", sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    width: '100%',
    outline: 'none',
  };

  const inputBox = (hasErr: boolean): React.CSSProperties => ({
    ...inputBoxBase,
    border: hasErr ? '1.5px solid #EF4444' : '1px solid var(--color-bg-card-border, #4B5563)',
  });

  return (
    <Layout>
      <section
        style={{
          backgroundColor: 'var(--color-bg-hero, #263140)',
          width: '100%',
          minHeight: '100vh',
          paddingTop: '140px',
          paddingBottom: '100px',
        }}
      >
        <Container>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '80px',
            }}
            className="flex-col lg:flex-row"
          >
            {/* ===== LEFT — Title + Description + Tagline ===== */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={fadeInLeft}
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: '1 1 0%',
                maxWidth: '500px',
              }}
              className="w-full lg:max-w-[500px] items-center lg:items-start text-center lg:text-left"
            >
              {/* Heading */}
              <motion.h1
                variants={fadeInUp}
                style={{
                  color: 'var(--color-text-primary, #FFFFFF)',
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: '48px',
                  fontWeight: 700,
                  lineHeight: '56px',
                  marginBottom: '36px',
                }}
                className="!text-[32px] !leading-[40px] sm:!text-[40px] sm:!leading-[48px] lg:!text-[48px] lg:!leading-[56px] !mb-6 sm:!mb-8 lg:!mb-9"
              >
                {t('lastMileB2B.pageTitle')}
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeInUp}
                style={{
                  color: 'var(--color-text-secondary, #D1D5DB)',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '18px',
                  fontWeight: 400,
                  lineHeight: '32px',
                  marginBottom: '48px',
                }}
                className="!text-[14px] !leading-[24px] sm:!text-[16px] sm:!leading-[28px] lg:!text-[18px] lg:!leading-[32px] !mb-8 sm:!mb-10 lg:!mb-12"
              >
                {t('lastMileB2B.description')}
              </motion.p>

              {/* Tagline — white bold (matches screenshot) */}
              <motion.p
                variants={fadeInUp}
                style={{
                  color: 'var(--color-text-primary, #FFFFFF)',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '18px',
                  fontWeight: 700,
                  lineHeight: '28px',
                }}
                className="!text-[14px] sm:!text-[16px] lg:!text-[18px]"
              >
                {t('lastMileB2B.tagline')}
              </motion.p>
            </motion.div>

            {/* ===== RIGHT — Form Card ===== */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={fadeInRight}
              style={{
                backgroundColor: 'var(--color-bg-primary, #1F2937)',
                borderRadius: '12px',
                padding: '28px 24px 32px',
                width: '100%',
                maxWidth: '400px',
              }}
              className="w-full lg:max-w-[400px] !p-5 sm:!p-6 lg:!px-6 lg:!py-7 self-center lg:self-start"
            >
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px',
                }}
              >
                {/* Pick up */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>{t('lastMileB2B.pickup')}</label>
                  <div
                    style={{
                      ...inputBox(!!errors.pickup),
                      paddingRight: '38px',
                      position: 'relative',
                    }}
                  >
                    <input
                      type="text"
                      name="pickup"
                      placeholder={t('lastMileB2B.pickupPlaceholder')}
                      value={formData.pickup}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.pickup}
                      style={inputInner}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <ClockIcon />
                    </div>
                  </div>
                  {errors.pickup && <ErrorMsg>{errors.pickup}</ErrorMsg>}
                </div>

                {/* Destination */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>{t('lastMileB2B.destination')}</label>
                  <div style={inputBox(!!errors.destination)}>
                    <input
                      type="text"
                      name="destination"
                      placeholder={t('lastMileB2B.destinationPlaceholder')}
                      value={formData.destination}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.destination}
                      style={inputInner}
                    />
                  </div>
                  {errors.destination && <ErrorMsg>{errors.destination}</ErrorMsg>}
                </div>

                {/* Expected time to deliver */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>{t('lastMileB2B.expectedTime')}</label>
                  <div style={inputBox(!!errors.expectedTime)}>
                    <input
                      type="text"
                      name="expectedTime"
                      placeholder={t('lastMileB2B.expectedTimePlaceholder')}
                      value={formData.expectedTime}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.expectedTime}
                      style={inputInner}
                    />
                  </div>
                  {errors.expectedTime && <ErrorMsg>{errors.expectedTime}</ErrorMsg>}
                </div>

                {/* Items Description */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>{t('lastMileB2B.itemsDescription')}</label>
                  <div
                    style={{
                      backgroundColor: 'var(--color-bg-hero, #263140)',
                      border: errors.itemsDescription
                        ? '1.5px solid #EF4444'
                        : '1px solid var(--color-bg-card-border, #4B5563)',
                      borderRadius: '4px',
                      padding: '8px 12px',
                      position: 'relative',
                    }}
                  >
                    <textarea
                      name="itemsDescription"
                      placeholder={t('lastMileB2B.itemsDescriptionPlaceholder')}
                      value={formData.itemsDescription}
                      onChange={handleChange}
                      rows={4}
                      aria-required="true"
                      aria-invalid={!!errors.itemsDescription}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-text-primary, #FFFFFF)',
                        fontFamily: '"Inter", sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '20px',
                        width: '100%',
                        resize: 'vertical',
                        outline: 'none',
                        minHeight: '80px',
                      }}
                    />
                    {/* Resize handle */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '6px',
                        right: '6px',
                        opacity: 0.35,
                        pointerEvents: 'none',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M10 2L2 10M10 6L6 10M10 9L9 10" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                  {errors.itemsDescription && <ErrorMsg>{errors.itemsDescription}</ErrorMsg>}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 8px 24px rgba(1, 165, 50, 0.35)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    backgroundColor: 'var(--color-primary, #01A532)',
                    border: 'none',
                    borderRadius: '8px',
                    height: '42px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.7 : 1,
                    marginTop: '4px',
                  }}
                >
                  <span
                    style={{
                      color: 'var(--color-text-primary, #FFFFFF)',
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '15px',
                      fontWeight: 600,
                      lineHeight: '22px',
                    }}
                  >
                    {isSubmitting ? t('lastMileB2B.submitting') : t('lastMileB2B.submit')}
                  </span>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}

/* ============ Helper Components ============ */

function ErrorMsg({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        color: '#EF4444',
        fontSize: '12px',
        fontFamily: '"Inter", sans-serif',
      }}
    >
      {children}
    </span>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="7.5" stroke="#9CA3AF" strokeWidth="1.5" />
      <path d="M10 6V10L13 11.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
