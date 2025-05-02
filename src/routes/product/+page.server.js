import { db } from '$lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function load() {
  try {
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return {
      products
    };
  } catch (error) {
    console.error('Error loading products:', error);
    return {
      products: []
    };
  }
}
