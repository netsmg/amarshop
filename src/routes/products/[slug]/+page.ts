import type { PageLoad } from './$types';
import { productsApi } from '$lib/api/products';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
    const productId = parseInt(params.slug);
    const product = await productsApi.getProduct(productId);
    
    if (!product) {
        throw error(404, 'Product not found');
    }

    return { product };
};
