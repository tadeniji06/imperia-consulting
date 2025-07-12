
const SSRMeta = ({ metaData }) => {
  const {
    title,
    description,
    keywords,
    ogImage,
    ogUrl,
    canonicalUrl,
    ogType,
    twitterCard,
    publishedAt,
    isBlogPost
  } = metaData;

  const siteUrl = "https://imperiagrouponline.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": isBlogPost ? "BlogPosting" : "RealEstateAgent",
    name: "Imperia Consulting",
    url: siteUrl,
    ...(isBlogPost
      ? {
          headline: title,
          description: description,
          datePublished: publishedAt || new Date().toISOString(),
          dateModified: publishedAt || new Date().toISOString(),
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": ogUrl,
          },
        }
      : {
          image: ogImage,
          description: description,
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

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Imperia Consulting" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Imperia Consulting" />
      <meta property="og:locale" content="en_KE" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Geo */}
      <meta name="geo.region" content="KE" />
      <meta name="geo.placename" content="Nairobi" />
      <meta name="geo.position" content="1.2921;36.8219" />
      <meta name="ICBM" content="1.2921;36.8219" />

      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </>
  );
};

export default SSRMeta;
