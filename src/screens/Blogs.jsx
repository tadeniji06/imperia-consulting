import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import SEO from "../utils/SEO";
import { getBlogPosts, searchPosts, urlFor } from "../utils/sanity";
import { PortableText } from "@portabletext/react";

const Blogs = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState("all");

	const postsPerPage = 6;

	// Fetch initial posts
	useEffect(() => {
		const fetchPosts = async () => {
			try {
				setLoading(true);
				const fetchedPosts = await getBlogPosts(postsPerPage, 0);
				setPosts(fetchedPosts);
				setHasMore(fetchedPosts.length === postsPerPage);
			} catch (error) {
				console.error("Error fetching posts:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	// Search functionality with debounce
	useEffect(() => {
		const delayedSearch = setTimeout(async () => {
			if (searchTerm.trim()) {
				setIsSearching(true);
				try {
					const results = await searchPosts(searchTerm);
					setSearchResults(results);
				} catch (error) {
					console.error("Search error:", error);
				} finally {
					setIsSearching(false);
				}
			} else {
				setSearchResults([]);
			}
		}, 300);

		return () => clearTimeout(delayedSearch);
	}, [searchTerm]);

	// Load more posts
	const loadMorePosts = async () => {
		try {
			const offset = currentPage * postsPerPage;
			const newPosts = await getBlogPosts(postsPerPage, offset);
			setPosts((prev) => [...prev, ...newPosts]);
			setCurrentPage((prev) => prev + 1);
			setHasMore(newPosts.length === postsPerPage);
		} catch (error) {
			console.error("Error loading more posts:", error);
		}
	};

	// Get unique categories
	const categories = useMemo(() => {
		const allCategories = posts.flatMap(
			(post) => post.categories || []
		);
		const uniqueCategories = [
			...new Set(allCategories.map((cat) => cat.title)),
		];
		return ["all", ...uniqueCategories];
	}, [posts]);

	// Filter posts by category
	const filteredPosts = useMemo(() => {
		const postsToFilter = searchTerm ? searchResults : posts;
		if (selectedCategory === "all") return postsToFilter;
		return postsToFilter.filter((post) =>
			post.categories?.some((cat) => cat.title === selectedCategory)
		);
	}, [posts, searchResults, searchTerm, selectedCategory]);

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const cardVariants = {
		hidden: {
			opacity: 0,
			y: 20,
			scale: 0.95,
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.5,
				ease: "easeOut",
			},
		},
		hover: {
			y: -8,
			scale: 1.02,
			transition: {
				duration: 0.3,
				ease: "easeInOut",
			},
		},
	};

	const BlogCard = ({ post, index }) => (
		<motion.div
			variants={cardVariants}
			initial='hidden'
			animate='visible'
			whileHover='hover'
			className='bg-white rounded-2xl shadow-lg overflow-hidden group'
			style={{ animationDelay: `${index * 0.1}s` }}
		>
			<Link to={`/blog/${post.slug.current}`} className='block'>
				<div className='relative overflow-hidden'>
					{post.mainImage && (
						<motion.img
							src={urlFor(post.mainImage)
								.width(400)
								.height(250)
								.url()}
							alt={post.title}
							className='w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110'
							loading='lazy'
						/>
					)}
					<div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

					{/* Reading time badge */}
					<div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700'>
						{post.estimatedReadingTime} min read
					</div>
				</div>

				<div className='p-6'>
					{/* Categories */}
					{post.categories && post.categories.length > 0 && (
						<div className='flex flex-wrap gap-2 mb-3'>
							{post.categories.slice(0, 2).map((category, idx) => (
								<span
									key={idx}
									className='px-3 py-1 bg-primary-red/10 text-primary-red text-xs font-medium rounded-full'
								>
									{category.title}
								</span>
							))}
						</div>
					)}

					{/* Title */}
					<h3 className='text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-red transition-colors duration-300'>
						{post.title}
					</h3>

					{/* Excerpt */}
					{post.body && post.body.length > 0 && (
						<div className='text-gray-600 mb-4 line-clamp-3'>
							<PortableText
								value={post.body.slice(0, 1)}
								components={{
									block: {
										normal: ({ children }) => (
											<p className='text-sm'>{children}</p>
										),
									},
								}}
							/>
						</div>
					)}

					{/* Author and date */}
					<div className='flex items-center justify-between text-sm text-gray-500'>
						<div className='flex items-center space-x-2'>
							{post.author?.image && (
								<img
									src={urlFor(post.author.image)
										.width(32)
										.height(32)
										.url()}
									alt={post.author.name}
									className='w-6 h-6 rounded-full'
								/>
							)}
							<span>{post.author?.name || "Anonymous"}</span>
						</div>
						<time dateTime={post.publishedAt}>
							{new Date(post.publishedAt).toLocaleDateString(
								"en-US",
								{
									year: "numeric",
									month: "short",
									day: "numeric",
								}
							)}
						</time>
					</div>
				</div>
			</Link>
		</motion.div>
	);

	return (
		<>
			<SEO
				title='Real Estate Blog | Imperia Consulting'
				description="Stay updated with the latest real estate trends, market insights, and property investment tips from Imperia Consulting's expert blog."
				keywords='real estate blog, property investment, Kenya real estate news, property market trends'
			/>

			<div className='min-h-screen bg-gray-50'>
				{/* Hero Section */}
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='bg-gradient-to-br from-gray-900 via-gray-800 to-primary-red/20 text-white py-20'
				>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
						<div className='text-center'>
							<motion.h1
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className='text-4xl md:text-6xl font-bold mb-6'
							>
								Real Estate{" "}
								<span className='text-primary-red'>Insights</span>
							</motion.h1>
							<motion.p
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.4 }}
								className='text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto'
							>
								Stay ahead with expert insights, market trends, and
								investment strategies from Kenya's premier real estate
								consultants.
							</motion.p>
						</div>
					</div>
				</motion.section>

				{/* Search and Filter Section */}
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className='py-8 bg-white shadow-sm'
				>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
						<div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
							{/* Search Bar */}
							<div className='relative flex-1 max-w-md'>
								<Icon
									icon='heroicons:magnifying-glass'
									className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5'
								/>
								<input
									type='text'
									placeholder='Search articles...'
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-red focus:border-transparent transition-all duration-300'
								/>
								{isSearching && (
									<Icon
										icon='eos-icons:loading'
										className='absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-red w-5 h-5 animate-spin'
									/>
								)}
							</div>

							{/* Category Filter */}
							<div className='flex flex-wrap gap-2'>
								{categories.map((category) => (
									<button
										key={category}
										onClick={() => setSelectedCategory(category)}
										className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
											selectedCategory === category
												? "bg-primary-red text-white shadow-lg"
												: "bg-gray-100 text-gray-700 hover:bg-gray-200"
										}`}
									>
										{category.charAt(0).toUpperCase() +
											category.slice(1)}
									</button>
								))}
							</div>
						</div>
					</div>
				</motion.section>

				{/* Blog Posts Grid */}
				<section className='py-16'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
						{loading ? (
							// Loading skeleton
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
								{[...Array(6)].map((_, i) => (
									<div
										key={i}
										className='bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse'
									>
										<div className='h-48 bg-gray-300'></div>
										<div className='p-6'>
											<div className='h-4 bg-gray-300 rounded mb-2'></div>
											<div className='h-6 bg-gray-300 rounded mb-4'></div>
											<div className='h-4 bg-gray-300 rounded mb-2'></div>
											<div className='h-4 bg-gray-300 rounded w-3/4'></div>
										</div>
									</div>
								))}
							</div>
						) : filteredPosts.length > 0 ? (
							<>
								<motion.div
									variants={containerVariants}
									initial='hidden'
									animate='visible'
									className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
								>
									<AnimatePresence>
										{filteredPosts.map((post, index) => (
											<BlogCard
												key={post._id}
												post={post}
												index={index}
											/>
										))}
									</AnimatePresence>
								</motion.div>

								{/* Load More Button */}
								{!searchTerm && hasMore && (
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										className='text-center mt-12'
									>
										<button
											onClick={loadMorePosts}
											className='inline-flex items-center px-8 py-4 bg-primary-red text-white font-semibold rounded-xl hover:bg-primary-red/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
										>
											<Icon
												icon='heroicons:arrow-down'
												className='w-5 h-5 mr-2'
											/>
											Load More Articles
										</button>
									</motion.div>
								)}
							</>
						) : (
							// No posts found
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								className='text-center py-16'
							>
								<Icon
									icon='heroicons:document-text'
									className='w-24 h-24 text-gray-300 mx-auto mb-6'
								/>
								<h3 className='text-2xl font-bold text-gray-900 mb-4'>
									{searchTerm
										? "No articles found"
										: "No articles yet"}
								</h3>
								<p className='text-gray-600 max-w-md mx-auto'>
									{searchTerm
										? `We couldn't find any articles matching "${searchTerm}". Try adjusting your search terms.`
										: "Stay tuned for exciting real estate insights and market updates coming soon!"}
								</p>
								{searchTerm && (
									<button
										onClick={() => setSearchTerm("")}
										className='mt-6 px-6 py-3 bg-primary-red text-white rounded-xl hover:bg-primary-red/90 transition-all duration-300'
									>
										Clear Search
									</button>
								)}
							</motion.div>
						)}
					</div>
				</section>


			</div>
		</>
	);
};

export default Blogs;
