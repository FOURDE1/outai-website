import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container } from '@/components/common';
import { fadeInUp, fadeInLeft, fadeInRight, viewportSettings } from '@/lib/animations';

// Blog images
import blogFeatured from '@/assets/blog/blog-featured.jpg';
import blogAbidjan from '@/assets/blog/blog-abidjan.jpg';
import blogCotedivoire from '@/assets/blog/blog-cotedivoire.jpg';

// Blog post data
const blogPosts = {
  featured: {
    id: 'featured',
    date: 'May, 31 2025',
    title: 'Top 5 reasons why to choose OUTAI for your next journey!',
    excerpt: 'Discover Why OUTAI is Your Premier Choice for Luxury and Convenience!',
    image: blogFeatured,
  },
  posts: [
    {
      id: 'abidjan',
      date: 'May, 31 2025',
      title: 'Discover Abidjan with OUTAI... Your prime Taxi service',
      excerpt: 'Explore South Africa Like Never Before with OUTAI – Your Trusted Travel Partner!',
      image: blogAbidjan,
    },
    {
      id: 'cotedivoire',
      date: 'May, 31 2025',
      title: "Discover Cote D'ivoire with OUTAI... Your prime Taxi service",
      excerpt: 'Explore Assinie Like Never Before with Outai – Your Trusted Travel Partner!',
      image: blogCotedivoire,
    },
  ],
};

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

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        backgroundColor: '#1F2937',
        borderRadius: '8px',
        width: '537px',
        height: '365px',
        overflow: 'hidden',
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
        <img
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
            color: '#FFFFFF',
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
              color: '#FFFFFF',
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
              color: '#FFFFFF',
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
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            color: '#FFFFFF',
            fontFamily: '"Roboto", sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            textDecoration: 'none',
            padding: '10px 0',
          }}
        >
          {t('blog.readMore')}
          <svg width="24" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

export function Blog() {
  const { t } = useTranslation();

  return (
    <section
      id="blog"
      style={{
        backgroundColor: '#263140',
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
          variants={fadeInUp}
          style={{
            textAlign: 'center',
            marginBottom: '16px',
          }}
        >
          {/* Title */}
          <h2
            style={{
              fontFamily: '"Roboto", sans-serif',
              fontSize: '32px',
              fontWeight: 700,
              lineHeight: '40px',
              marginBottom: '16px',
            }}
          >
            <span style={{ color: '#01A532' }}>OUTAI</span>
            <span style={{ color: '#FFFFFF' }}> Blog</span>
          </h2>

          {/* Description */}
          <p
            style={{
              color: '#FFFFFF',
              fontFamily: '"Inter", sans-serif',
              fontSize: '16px',
              fontWeight: 300,
              lineHeight: '24px',
              maxWidth: '751px',
              margin: '0 auto',
            }}
          >
            {t('blog.sectionDescription')}
          </p>
        </motion.div>

        {/* Featured Blog Post */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeInUp}
          style={{
            marginTop: '104px',
            marginBottom: '60px',
          }}
        >
          <div
            style={{
              backgroundColor: '#1F2937',
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
              <img
                src={blogPosts.featured.image}
                alt={blogPosts.featured.title}
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
                    color: '#333333',
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '24px',
                  }}
                >
                  {blogPosts.featured.date}
                </span>
              </div>

              {/* Title & Excerpt */}
              <div style={{ marginTop: '20px' }}>
                <h3
                  style={{
                    color: '#FFFFFF',
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    lineHeight: '24px',
                    marginBottom: '12px',
                  }}
                >
                  {blogPosts.featured.title}
                </h3>
                <p
                  style={{
                    color: '#FFFFFF',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '16px',
                    fontWeight: 300,
                    lineHeight: '24px',
                  }}
                >
                  {blogPosts.featured.excerpt}
                </p>
              </div>

              {/* Read More */}
              <a
                href="#"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  color: '#FFFFFF',
                  fontFamily: '"Roboto", sans-serif',
                  fontSize: '12px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  marginTop: '20px',
                  padding: '10px 0',
                }}
              >
                {t('blog.readMore')}
                <svg width="24" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
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
          {blogPosts.posts.map((post) => (
            <motion.div
              key={post.id}
              variants={post.id === 'abidjan' ? fadeInLeft : fadeInRight}
            >
              <SmallBlogCard
                image={post.image}
                date={post.date}
                title={post.title}
                excerpt={post.excerpt}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
