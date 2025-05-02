import { writable } from 'svelte/store';
import { db } from '$lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth } from '$lib/firebase'; // Make sure auth is properly imported

// Type definitions
type CartItem = {
  id: string;
  qty: number;
  [key: string]: any;
};

const createCartStore = () => {
  const { subscribe, set, update } = writable<CartItem[]>([]);

  const getCartRef = (userId: string) => doc(db, 'users', userId, 'cart', 'active');

  const syncCart = async (userId: string) => {
    try {
      const snapshot = await getDoc(getCartRef(userId));
      set(snapshot.exists() ? snapshot.data()?.items ?? [] : []);
    } catch (error) {
      console.error('Failed to sync cart:', error);
    }
  };

  const persistCart = async (userId: string, items: CartItem[]) => {
    try {
      await setDoc(getCartRef(userId), { items }, { merge: true });
    } catch (error) {
      console.error('Failed to persist cart:', error);
    }
  };

  const addItem = async (product: CartItem) => {
    const user = auth.currentUser;
    if (!user) return;

    let newItems: CartItem[];
    update((items) => {
      const existing = items.find(i => i.id === product.id);
      newItems = existing
        ? items.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...items, { ...product, qty: 1 }];
      return newItems;
    });

    await persistCart(user.uid, newItems!);
  };

  return {
    subscribe,
    addItem,
    initialize: (userId: string) => syncCart(userId),
  };
};

export const cart = createCartStore();
