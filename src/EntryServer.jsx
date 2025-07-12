import { renderToString } from "react-dom/server";
import React from "react";
import SSRApp from "../SSRApp";
import SSRMeta from "./utils/SSRMeta";

export function render(url) {
  // Default meta data
  let metaData = {
    title: "Imperia Consulting | Premier Real Estate in Kenya",
    description: "Discover premium real estate opportunities in Kenya with Imperia Consulting. We specialize in residential, commercial, and investment properties.",
    keywords: "real estate Kenya, property Kenya, Nairobi property, buy house Kenya, Imperia Consulting, real estate agents Kenya",
    ogImage: "https://imperiagrouponline.com/ilogo.svg",
    ogUrl: `https://imperiagrouponline.com${url}`,
    canonicalUrl: `https://imperiagrouponline.com${url}`,
    ogType: "website",
    twitterCard: "summary_large_image",
    publishedAt: null,
    isBlogPost: false
  };

  // Customize meta data based on URL
  if (url.includes('/blog/')) {
    metaData.isBlogPost = true;
    metaData.ogType = 'article';
    // Extract slug for potential blog-specific data
    const slug = url.split('/blog/')[1];
    metaData.title = `Blog Post | Imperia Consulting`;
    metaData.description = "Read our latest insights on real estate in Kenya.";
  } else if (url.includes('/about')) {
    metaData.title = "About Us | Imperia Consulting Real Estate";
    metaData.description = "Learn about Imperia Consulting, Kenya's trusted real estate brand. We deliver luxury homes and high-yield property investments with flexible payment plans.";
    metaData.keywords = "about Imperia Consulting, real estate company Kenya, property developers Kenya, real estate agents Nairobi";
  } else if (url.includes('/properties')) {
    metaData.title = "Properties | Imperia Consulting Real Estate";
    metaData.description = "Browse our premium property listings in Kenya. Find residential, commercial, and investment properties with flexible payment plans in Nairobi and beyond.";
    metaData.keywords = "properties for sale Kenya, real estate listings Kenya, houses for sale Nairobi, commercial property Kenya, investment properties";
  } else if (url.includes('/contact')) {
    metaData.title = "Contact Us | Imperia Consulting Real Estate";
    metaData.description = "Get in touch with Imperia Consulting for all your real estate needs in Kenya. Contact our expert team for property consultation and investment advice.";
    metaData.keywords = "contact Imperia Consulting, real estate consultation Kenya, property advice Kenya, real estate agents contact";
  } else if (url.includes('/blogs')) {
    metaData.title = "Real Estate Blog | Imperia Consulting";
    metaData.description = "Read the latest insights, tips, and news about real estate in Kenya. Expert advice on property investment, market trends, and buying guides.";
    metaData.keywords = "real estate blog Kenya, property investment tips, Kenya real estate news, property market trends, real estate advice";
  }

  try {
    const html = renderToString(
      <React.StrictMode>
        <SSRApp url={url} />
      </React.StrictMode>
    );
    
    const metaHtml = renderToString(<SSRMeta metaData={metaData} />);
    
    return { html, metaHtml, metaData };
  } catch (error) {
    console.error('SSR Error:', error);
    const fallbackMetaHtml = renderToString(<SSRMeta metaData={metaData} />);
    return { 
      html: '<div id="root-ssr-error">Loading...</div>', 
      metaHtml: fallbackMetaHtml,
      metaData 
    };
  }
}
