import { motion, type Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container } from '@/components/common';
import { fadeInUp, fadeInLeft, fadeInRight, viewportSettings } from '@/lib/animations';
import { useState } from 'react';
import { usePublishedBlogPosts } from '@/contexts/CmsContext';
import { getImage } from '@/lib/cmsStore';

// Stagger container for header
const blogHeaderVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const blogHeaderItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 14 },
  },
};

// Blog images (fallbacks for default posts)
import blogFeatured from '@/assets/blog/blog-featured.jpg';
import blogAbidjan from '@/assets/blog/blog-abidjan.jpg';
import blogCotedivoire from '@/assets/blog/blog-cotedivoire.jpg';

const defaultImages: Record<string, string> = { '1': blogFeatured, '2': blogAbidjan, '3': blogCotedivoire };
function getBlogCoverImage(postId: string): string {
  return getImage(`blog_cover_${postId}`) || defaultImages[postId] || blogFeatured;
}

// Small Blog Card Component (for the two bottom posts)
function SmallBlogCard({ 
  image, 
  date, 
  title, 
  excerpt 
}: { 
  image: string; 
  date: string; 
  title: string; 
  excerpt: string;
}) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -10, 
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        backgroundColor: 'var(--color-bg-primary, #1F2937)',
        borderRadius: '8px',
        width: '537px',
        height: '365px',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      <div
        style={{
          width: '266px',
          height: '365px',
          borderRadius: '20px',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <motion.img
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '24px 24px 24px 0',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        {/* Date */}
        <span
          style={{
            color: 'var(--color-text-primary, #FFFFFF)',
            fontFamily: '"Roboto", sans-serif',
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '24px',
          }}
        >
          {date}
        </span>

        {/* Title & Excerpt */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3
            style={{
              color: 'var(--color-text-primary, #FFFFFF)',
              fontFamily: '"Roboto", sans-serif',
              fontSize: '20px',
              fontWeight: 600,
              lineHeight: '28px',
            }}
          >
            {title}
          </h3>
          <p
            style={{
              color: 'var(--color-text-primary, #FFFFFF)',
              fontFamily: '"Inter", sans-serif',
              fontSize: '16px',
              fontWeight: 300,
              lineHeight: '24px',
            }}
          >
            {excerpt}
          </p>
        </div>

        {/* Read More */}
        <motion.a
          href="#"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            color: 'var(--color-text-primary, #FFFFFF)',
            fontFamily: '"Roboto", sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            textDecoration: 'none',
            padding: '10px 0',
          }}
        >
          {t('blog.readMore')}
          <motion.svg 
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.2 }}
            width="24" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.svg>
        </motion.a>
      </div>
    </motion.div>
  );
}

export function Blog() {
  const { t, i18n } = useTranslation();
  const publishedPosts = usePublishedBlogPosts();
  const lang = i18n.language === 'fr' ? 'fr' : 'en';

  const featured = publishedPosts.find((p) => p.isFeatured) || publishedPosts[0];
  const otherPosts = publishedPosts.filter((p) => p.id !== featured?.id).slice(0, 2);

  return (
    <section
      id="blog"
      style={{
        backgroundColor: 'var(--color-bg-hero, #263140)',
        width: '100%',
        paddingTop: '150px',
        paddingBottom: '80px',
      }}
    >
      <Container>
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={blogHeaderVariants}
          style={{
            textAlign: 'center',
            marginBottom: '16px',
          }}
        >
          {/* Title */}
          <motion.h2
            variants={blogHeaderItem}
            style={{
              fontFamily: '"Roboto", sans-serif',
              fontSize: '32px',
              fontWeight: 700,
              lineHeight: '40px',
              marginBottom: '16px',
            }}
          >
            <span style={{ color: 'var(--color-primary, #01A532)' }}>OUTAI</span>
            <span style={{ color: 'var(--color-text-primary, #FFFFFF)' }}> {t('blog.sectionTitle').replace('OUTAI ', '')}</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={blogHeaderItem}
            style={{
              color: 'var(--color-text-primary, #FFFFFF)',
              fontFamily: '"Inter", sans-serif',
              fontSize: '16px',
              fontWeight: 300,
              lineHeight: '24px',
              maxWidth: '751px',
              margin: '0 auto',
            }}
          >
            {t('blog.sectionDescription')}
          </motion.p>
        </motion.div>

        {/* Featured Blog Post */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
          whileHover={{ 
            y: -8, 
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: '104px',
            marginBottom: '60px',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--color-bg-primary, #1F2937)',
              borderRadius: '8px',
              overflow: 'hidden',
              maxWidth: '1120px',
              margin: '0 auto',
            }}
          >
            {/* Featured Image */}
            <div
              style={{
                width: '100%',
                height: '330px',
                borderRadius: '20px',
                overflow: 'hidden',
              }}
            >
              <motion.img
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                src={featured ? getBlogCoverImage(featured.id) : blogFeatured}
                alt={featured ? (lang === 'fr' ? featured.titleFr : featured.titleEn) : ''}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Content */}
            <div style={{ padding: '0 24px 24px' }}>
              {/* Date */}
              <div style={{ padding: '24px 0 0' }}>
                <span
                  style={{
                    color: 'var(--color-text-secondary, #9CA3AF)',
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '24px',
                  }}
                >
                  {featured?.publishedAt || ''}
                </span>
              </div>

              {/* Title & Excerpt */}
              <div style={{ marginTop: '20px' }}>
                <h3
                  style={{
                    color: 'var(--color-text-primary, #FFFFFF)',
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    lineHeight: '24px',
                    marginBottom: '12px',
                  }}
                >
                  {featured ? (lang === 'fr' ? featured.titleFr : featured.titleEn) : t('blog.featured.title')}
                </h3>
                <p
                  style={{
                    color: 'var(--color-text-primary, #FFFFFF)',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '16px',
                    fontWeight: 300,
                    lineHeight: '24px',
                  }}
                >
                  {featured ? (lang === 'fr' ? featured.excerptFr : featured.excerptEn) : t('blog.featured.excerpt')}
                </p>
              </div>

              {/* Read More — animated to match SmallBlogCard */}
              <motion.a
                href="#"
                whileHover={{ x: 5, color: 'var(--color-primary-start, #7AC90E)' }}
                transition={{ duration: 0.2 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  color: 'var(--color-text-primary, #FFFFFF)',
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: '12px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  marginTop: '20px',
                  padding: '10px 0',
                }}
              >
                {t('blog.readMore')}
                <motion.svg 
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  width="24" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Two Blog Posts Row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
          style={{
            display: 'flex',
            gap: '47px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {otherPosts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={index === 0 ? fadeInLeft : fadeInRight}
            >
              <SmallBlogCard
                image={getBlogCoverImage(post.id)}
                date={post.publishedAt}
                title={lang === 'fr' ? post.titleFr : post.titleEn}
                excerpt={lang === 'fr' ? post.excerptFr : post.excerptEn}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
