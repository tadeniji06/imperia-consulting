import { useEffect } from 'react';
// import { useMeta } from './MetaProvider';

const SEO = ({
  title,
  description,
  keywords,
  ogImage,
  ogUrl,
  canonicalUrl,
  ogType = "website",
  twitterCard = "summary_large_image",
  publishedAt,
  isBlogPost = false,
}) => {
  // const { updateMeta } = useMeta();

  const siteUrl = "https://imperiagrouponline.com";
  const defaultTitle = "Imperia Consulting | Premier Real Estate in Kenya";
  const defaultDescription =
    "Discover premium real estate opportunities in Kenya with Imperia Consulting. We specialize in residential, commercial, and investment properties.";
  const defaultKeywords =
    "real estate Kenya, property Kenya, Nairobi property, buy house Kenya, Imperia Consulting, real estate agents Kenya";
  const defaultOgImage = `${siteUrl}/ilogo.svg`;

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalOgImage = ogImage || defaultOgImage;
  const finalOgUrl = ogUrl || siteUrl;
  const finalCanonicalUrl = canonicalUrl || siteUrl;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Update meta tags
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update link tags
    const updateLinkTag = (rel, href) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Basic meta tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);
    updateMetaTag('author', 'Imperia Consulting');
    updateMetaTag('robots', 'index, follow');

    // Open Graph tags
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:image', finalOgImage, true);
    updateMetaTag('og:url', finalOgUrl, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:site_name', 'Imperia Consulting', true);
    updateMetaTag('og:locale', 'en_KE', true);

    // Twitter tags
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', finalOgImage);

    // Geo tags
    updateMetaTag('geo.region', 'KE');
    updateMetaTag('geo.placename', 'Nairobi');
    updateMetaTag('geo.position', '1.2921;36.8219');
    updateMetaTag('ICBM', '1.2921;36.8219');

    // Canonical URL
    updateLinkTag('canonical', finalCanonicalUrl);

    // Schema.org structured data
    const schema = {
      "@context": "https://schema.org",
      "@type": isBlogPost ? "BlogPosting" : "RealEstateAgent",
      name: "Imperia Consulting",
      url: siteUrl,
      ...(isBlogPost
        ? {
            headline: finalTitle,
            description: finalDescription,
            datePublished: publishedAt || new Date().toISOString(),
            dateModified: publishedAt || new Date().toISOString(),
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": finalOgUrl,
            },
          }
        : {
            image: finalOgImage,
            description: finalDescription,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Nairobi",
              addressCountry: "Kenya",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+254116071190",
              contactType: "customer service",
            },
          }),
    };

    // Update or create schema script
    let schemaScript = document.querySelector('script[type="application/ld+json"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(schema);

    // Update context for SSR
    // updateMeta({
    //   title: finalTitle,
    //   description: finalDescription,
    //   keywords: finalKeywords,
    //   ogImage: finalOgImage,
    //   ogUrl: finalOgUrl,
    //   canonicalUrl: finalCanonicalUrl,
    //   ogType,
    //   twitterCard,
    //   publishedAt,
    //   isBlogPost
    // });

  }, [title, description, keywords, ogImage, ogUrl, canonicalUrl, ogType, twitterCard, publishedAt, isBlogPost]);

  return null; 
};

export default SEO;
