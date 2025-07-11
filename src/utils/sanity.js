import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'r2dwso19',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)

// Query functions
export const getBlogPosts = async (limit = 10, offset = 0) => {
  const query = `*[_type == "post"] | order(publishedAt desc) [${offset}...${offset + limit}] {
    _id,
    title,
    slug,
    author->{
      name,
      image
    },
    mainImage,
    categories[]->{
      title
    },
    publishedAt,
    body[0...2],
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
  }`
  
  return await client.fetch(query)
}

export const getBlogPost = async (slug) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    author->{
      name,
      image,
      bio
    },
    mainImage,
    categories[]->{
      title
    },
    publishedAt,
    body,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
  }`
  
  return await client.fetch(query, { slug })
}

export const getRelatedPosts = async (categories, currentPostId, limit = 3) => {
  const query = `*[_type == "post" && _id != $currentPostId && count((categories[]._ref)[@ in $categories]) > 0] | order(publishedAt desc) [0...${limit}] {
    _id,
    title,
    slug,
    author->{
      name
    },
    mainImage,
    publishedAt,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
  }`
  
  return await client.fetch(query, { 
    categories: categories?.map(cat => cat._id) || [],
    currentPostId 
  })
}

export const searchPosts = async (searchTerm) => {
  const query = `*[_type == "post" && (title match $searchTerm || pt::text(body) match $searchTerm)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author->{
      name
    },
    mainImage,
    publishedAt,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
  }`
  
  return await client.fetch(query, { searchTerm: `*${searchTerm}*` })
}
