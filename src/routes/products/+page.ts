import type { PageLoad } from './$types';
import { productsApi } from '$lib/api/products';

export const load: PageLoad = async () => {
    const products = await productsApi.getAllProducts();
    return { products };
};