import { products } from '@wix/stores';

/**
 * Service for fetching products from Wix Stores/Products catalog
 * This allows displaying store products directly without persisting to CMS
 */

export interface StoreProduct {
  _id: string;
  name?: string;
  price?: number;
  mainMedia?: {
    image?: {
      url?: string;
    };
  };
  description?: string;
  productType?: string;
}

/**
 * Fetch all products from Wix Stores catalog
 * @returns Array of products with pagination info
 */
export async function fetchStoreProducts(limit: number = 50, skip: number = 0) {
  try {
    const result = await products.queryProducts()
      .limit(limit)
      .skip(skip)
      .find();

    return {
      items: result.items || [],
      totalCount: result.totalCount || 0,
      hasNext: (skip + limit) < (result.totalCount || 0),
      currentPage: Math.floor(skip / limit),
      pageSize: limit,
      nextSkip: (skip + limit) < (result.totalCount || 0) ? skip + limit : null,
    };
  } catch (error) {
    console.error('Error fetching store products:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch store products');
  }
}

/**
 * Fetch a single product by ID
 */
export async function fetchStoreProductById(productId: string) {
  try {
    const result = await products.getProduct(productId);
    return result;
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    throw error instanceof Error ? error : new Error(`Failed to fetch product ${productId}`);
  }
}

/**
 * Search products by name or description
 */
export async function searchStoreProducts(query: string, limit: number = 50) {
  try {
    const result = await products.queryProducts()
      .search(query)
      .limit(limit)
      .find();

    return {
      items: result.items || [],
      totalCount: result.totalCount || 0,
    };
  } catch (error) {
    console.error('Error searching store products:', error);
    throw error instanceof Error ? error : new Error('Failed to search store products');
  }
}
