/**
 * Composable para manejar la lógica del blog
 * Diseñado para trabajar con @nuxt/content v3 + i18n
 */

import type { Collections } from '@nuxt/content'

export interface BlogPost {
  slug?: string
  title: string
  date: string
  lastmod?: string
  author?: string
  tags?: string[]
  summary?: string
  image?: string
  id?: string
  path?: string
}

export function useBlog() {
  const { locale } = useI18n()

  /**
   * Obtiene el nombre de la collection basado en el idioma actual
   */
  const getCollectionName = (): keyof Collections => {
    return `content_${locale.value}` as keyof Collections
  }

  /**
   * Obtiene todos los posts del blog filtrados por idioma actual
   * Retorna directamente la promesa para ser usada con useAsyncData
   */
  const getPosts = (): Promise<BlogPost[]> => {
    const collection = getCollectionName()
    return queryCollection(collection).all()
  }

  /**
   * Obtiene un post específico por slug
   * Retorna directamente la promesa para ser usada con useAsyncData
   */
  const getPost = async (slug: string): Promise<BlogPost | null> => {
    const collection = getCollectionName()
    
    try {
      // Buscar por slug en el frontmatter
      const posts = await queryCollection(collection).all()
      const post = posts.find((p: BlogPost) => p.slug === slug || p.id === slug)
      
      if (post) return post
      
      // Fallback al idioma por defecto si no existe en el actual
      if (locale.value !== 'en') {
        const enPosts = await queryCollection('content_en').all()
        return enPosts.find((p: BlogPost) => p.slug === slug || p.id === slug) || null
      }
      
      return null
    } catch (error) {
      console.error('Error fetching post:', error)
      return null
    }
  }

  /**
   * Busca el post equivalente en otro idioma
   * Con el nuevo enfoque, el mismo slug existe en ambos idiomas
   */
  const findEquivalentPost = async (
    currentPath: string,
    toLocale: string
  ): Promise<BlogPost | null> => {
    const targetCollection = `content_${toLocale}` as keyof Collections
    return await queryCollection(targetCollection).path(currentPath).first()
  }

  /**
   * Obtiene los posts más recientes (limitado a N posts)
   * Retorna directamente la promesa para ser usada con useAsyncData
   */
  const getRecentPosts = (limit = 5): Promise<BlogPost[]> => {
    const collection = getCollectionName()
    return queryCollection(collection).limit(limit).all()
  }

  /**
   * Obtiene posts por tag
   * Retorna directamente la promesa para ser usada con useAsyncData
   */
  const getPostsByTag = (tag: string): Promise<BlogPost[]> => {
    const collection = getCollectionName()
    return queryCollection(collection).where('tags', 'LIKE', `%${tag}%`).all()
  }

  /**
   * Obtiene todos los tags únicos de los posts
   */
  const getAllTags = async (): Promise<string[]> => {
    const posts = await getPosts()
    const tagsSet = new Set<string>()
    
    posts.forEach(post => {
      post.tags?.forEach(tag => tagsSet.add(tag))
    })
    
    return Array.from(tagsSet).sort((a, b) => a.localeCompare(b))
  }

  return {
    getPosts,
    getPost,
    findEquivalentPost,
    getRecentPosts,
    getPostsByTag,
    getAllTags
  }
}
