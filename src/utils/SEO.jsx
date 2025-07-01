import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

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
  const siteUrl = "https://imperiagrouponline.com";
  const defaultTitle = "Imperia Consulting | Premier Real Estate in Kenya";
  const defaultDescription =
    "Discover premium real estate opportunities in Kenya with Imperia Consulting. We specialize in residential, commercial, and investment properties.";
  const defaultKeywords =
    "real estate Kenya, property Kenya, Nairobi property, buy house Kenya, Imperia Consulting, real estate agents Kenya";
  const defaultOgImage = `${siteUrl}/ilogo.svg`; 
  const geoRegion = "KE";
  const geoPosition = "1.2921;36.8219"; // Nairobi GPS

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalOgImage = ogImage || defaultOgImage;
  const finalOgUrl = ogUrl || siteUrl;
  const finalCanonicalUrl = canonicalUrl || siteUrl;

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
            telephone: "+254700000000",
            contactType: "customer service",
          },
        }),
  };

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="Imperia Consulting" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:url" content={finalOgUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Imperia Consulting" />
      <meta property="og:locale" content="en_KE" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />

      {/* Geo */}
      <meta name="geo.region" content={geoRegion} />
      <meta name="geo.placename" content="Nairobi" />
      <meta name="geo.position" content={geoPosition} />
      <meta name="ICBM" content={geoPosition} />

      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  ogImage: PropTypes.string,
  ogUrl: PropTypes.string,
  canonicalUrl: PropTypes.string,
  ogType: PropTypes.string,
  twitterCard: PropTypes.string,
  publishedAt: PropTypes.string,
  isBlogPost: PropTypes.bool,
};

export default SEO;
