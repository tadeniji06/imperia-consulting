import React, {
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

const MetaContext = createContext();

export const useMeta = () => {
	const context = useContext(MetaContext);
	if (!context) {
		throw new Error("useMeta must be used within a MetaProvider");
	}
	return context;
};

export const MetaProvider = ({ children }) => {
	const [metaData, setMetaData] = useState({
		title: "Imperia Consulting | Premier Real Estate in Kenya",
		description:
			"Discover premium real estate opportunities in Kenya with Imperia Consulting.",
		keywords: "real estate Kenya, property Kenya, Nairobi property",
		ogImage: "https://imperiagrouponline.com/ilogo.svg",
		ogUrl: "https://imperiagrouponline.com",
		canonicalUrl: "https://imperiagrouponline.com",
		ogType: "website",
		twitterCard: "summary_large_image",
		publishedAt: null,
		isBlogPost: false,
	});

	const updateMeta = (newMetaData) => {
		setMetaData((prev) => ({ ...prev, ...newMetaData }));
	};

	// Only update document in browser environment
	useEffect(() => {
		if (typeof window !== "undefined") {
			// Update document title
			document.title = metaData.title;

			// Update meta tags
			const updateMetaTag = (name, content, property = false) => {
				const selector = property
					? `meta[property="${name}"]`
					: `meta[name="${name}"]`;
				let meta = document.querySelector(selector);
				if (!meta) {
					meta = document.createElement("meta");
					if (property) {
						meta.setAttribute("property", name);
					} else {
						meta.setAttribute("name", name);
					}
					document.head.appendChild(meta);
				}
				meta.setAttribute("content", content);
			};

			// Update canonical link
			const updateCanonical = (url) => {
				let canonical = document.querySelector(
					'link[rel="canonical"]'
				);
				if (!canonical) {
					canonical = document.createElement("link");
					canonical.setAttribute("rel", "canonical");
					document.head.appendChild(canonical);
				}
				canonical.setAttribute("href", url);
			};

			// Update all meta tags
			updateMetaTag("description", metaData.description);
			updateMetaTag("keywords", metaData.keywords);
			updateMetaTag("og:title", metaData.title, true);
			updateMetaTag("og:description", metaData.description, true);
			updateMetaTag("og:image", metaData.ogImage, true);
			updateMetaTag("og:url", metaData.ogUrl, true);
			updateMetaTag("og:type", metaData.ogType, true);
			updateMetaTag("twitter:title", metaData.title);
			updateMetaTag("twitter:description", metaData.description);
			updateMetaTag("twitter:image", metaData.ogImage);
			updateMetaTag("twitter:card", metaData.twitterCard);
			updateCanonical(metaData.canonicalUrl);

			// Add structured data for blog posts
			if (metaData.isBlogPost && metaData.publishedAt) {
				let structuredData = document.querySelector(
					'script[type="application/ld+json"]'
				);
				if (!structuredData) {
					structuredData = document.createElement("script");
					structuredData.setAttribute("type", "application/ld+json");
					document.head.appendChild(structuredData);
				}

				const schema = {
					"@context": "https://schema.org",
					"@type": "BlogPosting",
					headline: metaData.title,
					description: metaData.description,
					image: metaData.ogImage,
					datePublished: metaData.publishedAt,
					dateModified: metaData.publishedAt,
					author: {
						"@type": "Organization",
						name: "Imperia Consulting",
					},
					publisher: {
						"@type": "Organization",
						name: "Imperia Consulting",
						logo: {
							"@type": "ImageObject",
							url: "https://imperiagrouponline.com/ilogo.svg",
						},
					},
					mainEntityOfPage: {
						"@type": "WebPage",
						"@id": metaData.canonicalUrl,
					},
				};

				structuredData.textContent = JSON.stringify(schema);
			}
		}
	}, [metaData]);

	return (
		<MetaContext.Provider value={{ metaData, updateMeta }}>
			{children}
		</MetaContext.Provider>
	);
};
