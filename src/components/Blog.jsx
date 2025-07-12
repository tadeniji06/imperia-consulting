import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { PortableText } from "@portabletext/react";
// import { useMeta } from "../utils/MetaProvider";
import {
	getBlogPost,
	getRelatedPosts,
	urlFor,
} from "../utils/sanity";
import SEO from "../utils/SEO";

const Blog = () => {
	const { slug } = useParams();
	const navigate = useNavigate();
	// const { updateMeta } = useMeta();
	const [post, setPost] = useState(null);
	const [relatedPosts, setRelatedPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [readingProgress, setReadingProgress] = useState(0);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				setLoading(true);
				setError(null);
				const fetchedPost = await getBlogPost(slug);
				if (!fetchedPost) {
					setError("Post not found");
					return;
				}
				setPost(fetchedPost);

				// Update meta tags when post is loaded
				const siteUrl = "https://imperiagrouponline.com";
				const postUrl = `${siteUrl}/blog/${fetchedPost.slug.current}`;
				const postImage = fetchedPost.mainImage
					? urlFor(fetchedPost.mainImage)
							.width(1200)
							.height(630)
							.url()
					: `${siteUrl}/ilogo.svg`;

				// updateMeta({
				// 	title: `${fetchedPost.title} | Imperia Consulting Blog`,
				// 	description:
				// 		fetchedPost.excerpt ||
				// 		fetchedPost.description ||
				// 		`Read about ${fetchedPost.title} on Imperia Consulting's real estate blog.`,
				// 	keywords: `${
				// 		fetchedPost.title
				// 	}, real estate Kenya, property investment, ${fetchedPost.categories
				// 		?.map((cat) => cat.title)
				// 		.join(", ")}`,
				// 	ogImage: postImage,
				// 	ogUrl: postUrl,
				// 	canonicalUrl: postUrl,
				// 	ogType: "article",
				// 	twitterCard: "summary_large_image",
				// 	publishedAt: fetchedPost.publishedAt,
				// 	isBlogPost: true,
				// });

				// Fetch related posts
				const related = await getRelatedPosts(
					fetchedPost.categories,
					fetchedPost._id,
					3
				);
				setRelatedPosts(related);
			} catch (err) {
				console.error("Error fetching post:", err);
				setError("Failed to load post");
			} finally {
				setLoading(false);
			}
		};

		if (slug) {
			fetchPost();
		}
	}, [slug]);

	// Reading progress tracker
	useEffect(() => {
		const handleScroll = () => {
			const article = document.querySelector(".article-content");
			if (!article) return;

			const articleTop = article.offsetTop;
			const articleHeight = article.offsetHeight;
			const windowHeight = window.innerHeight;
			const scrollTop = window.scrollY;

			const articleStart = articleTop - windowHeight / 2;
			const articleEnd =
				articleTop + articleHeight - windowHeight / 2;

			if (scrollTop < articleStart) {
				setReadingProgress(0);
			} else if (scrollTop > articleEnd) {
				setReadingProgress(100);
			} else {
				const progress =
					((scrollTop - articleStart) / (articleEnd - articleStart)) *
					100;
				setReadingProgress(Math.max(0, Math.min(100, progress)));
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [post]);

	// Portable Text components for rich content rendering
	const portableTextComponents = {
		types: {
			image: ({ value }) => (
				<div className='my-8'>
					<img
						src={urlFor(value).width(800).url()}
						alt={value.alt || "Blog image"}
						className='w-full rounded-xl shadow-lg'
						loading='lazy'
					/>
					{value.caption && (
						<p className='text-sm text-gray-600 text-center mt-2 italic'>
							{value.caption}
						</p>
					)}
				</div>
			),
		},
		block: {
			h1: ({ children }) => (
				<h1 className='text-3xl md:text-4xl font-bold text-gray-900 mt-8 mb-4'>
					{children}
				</h1>
			),
			h2: ({ children }) => (
				<h2 className='text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4'>
					{children}
				</h2>
			),
			h3: ({ children }) => (
				<h3 className='text-xl md:text-2xl font-semibold text-gray-900 mt-6 mb-3'>
					{children}
				</h3>
			),
			normal: ({ children }) => (
				<p className='text-lg leading-relaxed text-gray-700 mb-6'>
					{children}
				</p>
			),
			blockquote: ({ children }) => (
				<blockquote className='border-l-4 border-primary-red pl-6 my-8 italic text-xl text-gray-600 bg-gray-50 py-4 rounded-r-lg'>
					{children}
				</blockquote>
			),
		},
		list: {
			bullet: ({ children }) => (
				<ul className='list-disc list-inside space-y-2 mb-6 text-gray-700'>
					{children}
				</ul>
			),
			number: ({ children }) => (
				<ol className='list-decimal list-inside space-y-2 mb-6 text-gray-700'>
					{children}
				</ol>
			),
		},
		marks: {
			link: ({ children, value }) => (
				<a
					href={value.href}
					target='_blank'
					rel='noopener noreferrer'
					className='text-primary-red hover:underline font-medium'
				>
					{children}
				</a>
			),
			strong: ({ children }) => (
				<strong className='font-bold text-gray-900'>
					{children}
				</strong>
			),
		},
	};

	if (loading) {
		return (
			<div className='min-h-screen bg-gray-50'>
				{/* Loading skeleton */}
				<div className='animate-pulse'>
					<div className='h-96 bg-gray-300'></div>
					<div className='max-w-4xl mx-auto px-4 py-8'>
						<div className='h-8 bg-gray-300 rounded mb-4'></div>
						<div className='h-4 bg-gray-300 rounded mb-2'></div>
						<div className='h-4 bg-gray-300 rounded mb-8 w-3/4'></div>
						<div className='space-y-4'>
							{[...Array(8)].map((_, i) => (
								<div
									key={i}
									className='h-4 bg-gray-300 rounded'
								></div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (error || !post) {
		return (
			<div className='min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-center'>
					<Icon
						icon='heroicons:exclamation-triangle'
						className='w-24 h-24 text-gray-400 mx-auto mb-6'
					/>
					<h1 className='text-3xl font-bold text-gray-900 mb-4'>
						{error === "Post not found"
							? "Article Not Found"
							: "Something Went Wrong"}
					</h1>
					<p className='text-gray-600 mb-8'>
						{error === "Post not found"
							? "The article you're looking for doesn't exist or has been moved."
							: "We encountered an error while loading this article."}
					</p>
					<div className='space-x-4'>
						<button
							onClick={() => navigate(-1)}
							className='px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-300'
						>
							Go Back
						</button>
						<Link
							to='/blogs'
							className='px-6 py-3 bg-primary-red text-white rounded-xl hover:bg-red-700 transition-all duration-300'
						>
							Browse Articles
						</Link>
					</div>
				</div>
			</div>
		);
	}

	const siteUrl = "https://imperiagrouponline.com";
	const postUrl = `${siteUrl}/blog/${post.slug.current}`;
	const postImage = post.mainImage
		? urlFor(post.mainImage).width(1200).height(630).url()
		: `${siteUrl}/ilogo.svg`;

	return (
		<>
			<SEO
				title={`${post.title} | Imperia Consulting Blog`}
				description={
					post.excerpt ||
					post.description ||
					`Read about ${post.title} on Imperia Consulting's real estate blog.`
				}
				keywords={`${
					post.title
				}, real estate Kenya, property investment, ${post.categories
					?.map((cat) => cat.title)
					.join(", ")}`}
				ogImage={postImage}
				ogUrl={postUrl}
				canonicalUrl={postUrl}
				ogType='article'
				twitterCard='summary_large_image'
				publishedAt={post.publishedAt}
				isBlogPost={true}
			/>

			<div className='min-h-screen bg-gray-50'>
				{/* Reading Progress Bar */}
				<div className='fixed top-0 left-0 w-full h-1 bg-gray-200 z-50'>
					<div
						className='h-full bg-primary-red transition-all duration-150 ease-out'
						style={{ width: `${readingProgress}%` }}
					/>
				</div>

				{/* Hero Section */}
				<div className='relative h-96 md:h-[500px] overflow-hidden'>
					{post.mainImage && (
						<img
							src={urlFor(post.mainImage)
								.width(1200)
								.height(600)
								.url()}
							alt={post.title}
							className='w-full h-full object-cover'
						/>
					)}
					<div className='absolute inset-0 bg-black bg-opacity-50' />
					<div className='absolute inset-0 flex items-center justify-center'>
						<div className='text-center text-white max-w-4xl px-4'>
							<div className='flex flex-wrap justify-center gap-2 mb-4'>
								{post.categories?.map((category) => (
									<span
										key={category._id}
										className='px-3 py-1 bg-primary-red text-white text-sm rounded-full'
									>
										{category.title}
									</span>
								))}
							</div>
							<h1 className='text-3xl md:text-5xl font-bold mb-4 leading-tight'>
								{post.title}
							</h1>
							<div className='flex items-center justify-center space-x-6 text-sm md:text-base'>
								<div className='flex items-center space-x-2'>
									<Icon icon='heroicons:user' className='w-5 h-5' />
									<span>
										{post.author?.name || "Imperia Consulting"}
									</span>
								</div>
								<div className='flex items-center space-x-2'>
									<Icon
										icon='heroicons:calendar'
										className='w-5 h-5'
									/>
									<span>
										{new Date(post.publishedAt).toLocaleDateString(
											"en-US",
											{
												year: "numeric",
												month: "long",
												day: "numeric",
											}
										)}
									</span>
								</div>
								<div className='flex items-center space-x-2'>
									<Icon icon='heroicons:clock' className='w-5 h-5' />
									<span>
										{post.estimatedReadingTime || "5"} min read
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Article Content */}
				<div className='max-w-4xl mx-auto px-4 py-12'>
					<div className='bg-white rounded-2xl shadow-lg p-8 md:p-12'>
						{/* Article excerpt */}
						{post.excerpt && (
							<div className='text-xl text-gray-600 leading-relaxed mb-8 p-6 bg-gray-50 rounded-xl border-l-4 border-primary-red'>
								{post.excerpt}
							</div>
						)}

						{/* Article body */}
						<div className='article-content prose prose-lg max-w-none'>
							<PortableText
								value={post.body}
								components={portableTextComponents}
							/>
						</div>

						{/* Tags */}
						{post.tags && post.tags.length > 0 && (
							<div className='mt-12 pt-8 border-t border-gray-200'>
								<h3 className='text-lg font-semibold text-gray-900 mb-4'>
									Tags
								</h3>
								<div className='flex flex-wrap gap-2'>
									{post.tags.map((tag, index) => (
										<span
											key={index}
											className='px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors'
										>
											#{tag}
										</span>
									))}
								</div>
							</div>
						)}

						{/* Share buttons */}
						<div className='mt-8 pt-8 border-t border-gray-200'>
							<h3 className='text-lg font-semibold text-gray-900 mb-4'>
								Share this article
							</h3>
							<div className='flex space-x-4'>
								<a
									href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
										postUrl
									)}&text=${encodeURIComponent(post.title)}`}
									target='_blank'
									rel='noopener noreferrer'
									className='flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
								>
									<Icon icon='pajamas:twitter' className='w-5 h-5' />
									<span>Twitter</span>
								</a>
								<a
									href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
										postUrl
									)}`}
									target='_blank'
									rel='noopener noreferrer'
									className='flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
								>
									<Icon
										icon='ic:baseline-facebook'
										className='w-5 h-5'
									/>
									<span>Facebook</span>
								</a>
								<a
									href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
										postUrl
									)}`}
									target='_blank'
									rel='noopener noreferrer'
									className='flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors'
								>
									<Icon icon='mdi:linkedin' className='w-5 h-5' />
									<span>LinkedIn</span>
								</a>
								<button
									onClick={() => {
										navigator.clipboard.writeText(postUrl);
										// You could add a toast notification here
									}}
									className='flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors'
								>
									<Icon
										icon='heroicons:clipboard'
										className='w-5 h-5'
									/>

									<span>Copy Link</span>
								</button>
							</div>
						</div>
					</div>

					{/* Related Posts */}
					{relatedPosts.length > 0 && (
						<div className='mt-16'>
							<h2 className='text-3xl font-bold text-gray-900 mb-8'>
								Related Articles
							</h2>
							<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
								{relatedPosts.map((relatedPost) => (
									<Link
										key={relatedPost._id}
										to={`/blog/${relatedPost.slug.current}`}
										className='group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
									>
										{relatedPost.mainImage && (
											<div className='aspect-video overflow-hidden'>
												<img
													src={urlFor(relatedPost.mainImage)
														.width(400)
														.height(250)
														.url()}
													alt={relatedPost.title}
													className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
												/>
											</div>
										)}
										<div className='p-6'>
											<div className='flex flex-wrap gap-2 mb-3'>
												{relatedPost.categories
													?.slice(0, 2)
													.map((category) => (
														<span
															key={category._id}
															className='px-2 py-1 bg-primary-red/10 text-primary-red text-xs rounded-full'
														>
															{category.title}
														</span>
													))}
											</div>
											<h3 className='text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-red transition-colors line-clamp-2'>
												{relatedPost.title}
											</h3>
											{relatedPost.excerpt && (
												<p className='text-gray-600 text-sm line-clamp-3 mb-4'>
													{relatedPost.excerpt}
												</p>
											)}
											<div className='flex items-center justify-between text-sm text-gray-500'>
												<span>
													{new Date(
														relatedPost.publishedAt
													).toLocaleDateString("en-US", {
														month: "short",
														day: "numeric",
														year: "numeric",
													})}
												</span>
												<span className='flex items-center space-x-1'>
													<Icon
														icon='heroicons:arrow-right'
														className='w-4 h-4'
													/>
													<span>Read more</span>
												</span>
											</div>
										</div>
									</Link>
								))}
							</div>
						</div>
					)}

					{/* Navigation */}
					<div className='mt-16 flex justify-between items-center'>
						<button
							onClick={() => navigate(-1)}
							className='flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300'
						>
							<Icon icon='heroicons:arrow-left' className='w-5 h-5' />
							<span>Go Back</span>
						</button>
						<Link
							to='/blogs'
							className='flex items-center space-x-2 px-6 py-3 bg-primary-red text-white rounded-xl hover:bg-red-700 transition-all duration-300'
						>
							<span>All Articles</span>
							<Icon
								icon='heroicons:arrow-right'
								className='w-5 h-5'
							/>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Blog;
