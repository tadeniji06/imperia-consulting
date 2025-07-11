import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { PortableText } from "@portabletext/react";
import SEO from "../utils/SEO";
import {
	getBlogPost,
	getRelatedPosts,
	urlFor,
} from "../utils/sanity";

const Blog = () => {
	const { slug } = useParams();
	const navigate = useNavigate();
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
							className='px-6 py-3 bg-primary-red text-white rounded-xl hover:bg-primary-red/90 transition-all duration-300 inline-block'
						>
							View All Articles
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<SEO
				title={`${post.title} | Imperia Consulting Blog`}
				description={
					post.body?.[0]?.children?.[0]?.text?.substring(0, 160) ||
					post.title
				}
				ogImage={
					post.mainImage
						? urlFor(post.mainImage).width(1200).height(630).url()
						: undefined
				}
				ogUrl={`https://imperiagrouponline.com/blog/${post.slug.current}`}
				canonicalUrl={`https://imperiagrouponline.com/blog/${post.slug.current}`}
				publishedAt={post.publishedAt}
				isBlogPost={true}
				ogType='article'
			/>

			<div className='min-h-screen bg-white'>
				{/* Reading Progress Bar */}
				<div className='fixed top-0 left-0 w-full h-1 bg-gray-200 z-50'>
					<div
						className='h-full bg-primary-red transition-all duration-100'
						style={{ width: `${readingProgress}%` }}
					/>
				</div>

				{/* Hero Section */}
				<section className='relative h-96 md:h-[500px] overflow-hidden'>
					{post.mainImage && (
						<>
							<img
								src={urlFor(post.mainImage)
									.width(1200)
									.height(600)
									.url()}
								alt={post.title}
								className='w-full h-full object-cover'
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />
						</>
					)}

					<div className='absolute inset-0 flex items-end'>
						<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full'>
							<div>
								{/* Categories */}
								{post.categories && post.categories.length > 0 && (
									<div className='flex flex-wrap gap-2 mb-4'>
										{post.categories.map((category, idx) => (
											<span
												key={idx}
												className='px-3 py-1 bg-primary-red text-white text-sm font-medium rounded-full'
											>
												{category.title}
											</span>
										))}
									</div>
								)}

								{/* Title */}
								<h1 className='text-3xl md:text-5xl font-bold text-white mb-6 leading-tight'>
									{post.title}
								</h1>

								{/* Meta info */}
								<div className='flex flex-wrap items-center gap-6 text-white/90'>
									<div className='flex items-center space-x-3'>
										{post.author?.image && (
											<img
												src={urlFor(post.author.image)
													.width(40)
													.height(40)
													.url()}
												alt={post.author.name}
												className='w-10 h-10 rounded-full border-2 border-white/20'
											/>
										)}
										<div>
											<p className='font-medium'>
												{post.author?.name || "Anonymous"}
											</p>
											{post.author?.bio && (
												<p className='text-sm text-white/70'>
													Author
												</p>
											)}
										</div>
									</div>

									<div className='flex items-center space-x-4 text-sm'>
										<div className='flex items-center space-x-1'>
											<Icon
												icon='heroicons:calendar-days'
												className='w-4 h-4'
											/>
											<time dateTime={post.publishedAt}>
												{new Date(
													post.publishedAt
												).toLocaleDateString("en-US", {
													year: "numeric",
													month: "long",
													day: "numeric",
												})}
											</time>
										</div>

										<div className='flex items-center space-x-1'>
											<Icon
												icon='heroicons:clock'
												className='w-4 h-4'
											/>
											<span>
												{post.estimatedReadingTime} min read
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Back button */}
					<button
						onClick={() => navigate(-1)}
						className='absolute top-8 left-8 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300'
					>
						<Icon icon='heroicons:arrow-left' className='w-6 h-6' />
					</button>
				</section>

				{/* Article Content */}
				<article className='article-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
					<div className='prose prose-lg max-w-none'>
						<PortableText
							value={post.body}
							components={portableTextComponents}
						/>
					</div>

					{/* Share buttons */}
					<div className='mt-12 pt-8 border-t border-gray-200'>
						<h3 className='text-lg font-semibold text-gray-900 mb-4'>
							Share this article
						</h3>
						<div className='flex space-x-4'>
							{[
								{
									name: "Twitter",
									icon: "pajamas:twitter",
									url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
										post.title
									)}&url=${encodeURIComponent(window.location.href)}`,
									color: "hover:bg-blue-500",
								},
								{
									name: "Facebook",
									icon: "ic:baseline-facebook",
									url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
										window.location.href
									)}`,
									color: "hover:bg-blue-600",
								},
								{
									name: "LinkedIn",
									icon: "mdi:linkedin",
									url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
										window.location.href
									)}`,
									color: "hover:bg-blue-700",
								},
								{
									name: "WhatsApp",
									icon: "ic:baseline-whatsapp",
									url: `https://wa.me/?text=${encodeURIComponent(
										post.title + " " + window.location.href
									)}`,
									color: "hover:bg-green-500",
								},
							].map((social) => (
								<a
									key={social.name}
									href={social.url}
									target='_blank'
									rel='noopener noreferrer'
									className={`p-3 bg-gray-100 text-gray-600 rounded-full transition-all duration-300 ${social.color} hover:text-white hover:scale-110 active:scale-95`}
								>
									<Icon icon={social.icon} className='w-5 h-5' />
								</a>
							))}
						</div>
					</div>

					{/* Author bio */}
					{post.author?.bio && (
						<div className='mt-12 p-6 bg-gray-50 rounded-2xl'>
							<div className='flex items-start space-x-4'>
								{post.author.image && (
									<img
										src={urlFor(post.author.image)
											.width(80)
											.height(80)
											.url()}
										alt={post.author.name}
										className='w-16 h-16 rounded-full'
									/>
								)}
								<div>
									<h4 className='text-xl font-bold text-gray-900 mb-2'>
										About {post.author.name}
									</h4>
									<div className='text-gray-600'>
										<PortableText value={post.author.bio} />
									</div>
								</div>
							</div>
						</div>
					)}
				</article>

				{/* Related Posts */}
				{relatedPosts.length > 0 && (
					<section className='bg-gray-50 py-16'>
						<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
							<h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
								Related Articles
							</h2>

							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
								{relatedPosts.map((relatedPost) => (
									<div
										key={relatedPost._id}
										className='bg-white rounded-2xl shadow-lg overflow-hidden group hover:-translate-y-1 transition-all duration-300'
									>
										<Link to={`/blog/${relatedPost.slug.current}`}>
											{relatedPost.mainImage && (
												<div className='relative overflow-hidden'>
													<img
														src={urlFor(relatedPost.mainImage)
															.width(400)
															.height(250)
															.url()}
														alt={relatedPost.title}
														className='w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110'
														loading='lazy'
													/>
													<div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700'>
														{relatedPost.estimatedReadingTime} min
														read
													</div>
												</div>
											)}

											<div className='p-6'>
												<h3 className='text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-red transition-colors duration-300'>
													{relatedPost.title}
												</h3>

												<div className='flex items-center justify-between text-sm text-gray-500'>
													<span>
														{relatedPost.author?.name || "Anonymous"}
													</span>
													<time dateTime={relatedPost.publishedAt}>
														{new Date(
															relatedPost.publishedAt
														).toLocaleDateString("en-US", {
															month: "short",
															day: "numeric",
														})}
													</time>
												</div>
											</div>
										</Link>
									</div>
								))}
							</div>
						</div>
					</section>
				)}

				{/* CTA Section */}
				<section className='bg-gradient-to-r from-primary-red to-red-600 py-16'>
					<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
						<h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
							Ready to Invest in Real Estate?
						</h2>
						<p className='text-xl text-red-100 mb-8'>
							Discover premium properties and investment opportunities
							with Imperia Consulting.
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							<Link
								to='/properties'
								className='px-8 py-4 bg-white text-primary-red font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105'
							>
								View Properties
							</Link>
							<Link
								to='/contact'
								className='px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary-red transition-all duration-300 hover:scale-105'
							>
								Contact Us
							</Link>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default Blog;
