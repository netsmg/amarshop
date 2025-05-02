import { writable } from 'svelte/store';
import { db } from '$lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const createCartStore = () => {
  const { subscribe, set, update } = writable([]);

  const syncCart = async (userId) => {
    const cartRef = doc(db, 'users', userId, 'cart', 'active');
    const snapshot = await getDoc(cartRef);
    set(snapshot.exists() ? snapshot.data().items : []);
  };

  const persistCart = async (userId, items) => {
    const cartRef = doc(db, 'users', userId, 'cart', 'active');
    await setDoc(cartRef, { items }, { merge: true });
  };

  return {
    subscribe,
    addItem: async (product) => {
      update(async (items) => {
        const existing = items.find(i => i.id === product.id);
        const newItems = existing ? 
          items.map(i => i.id === product.id ? {...i, qty: i.qty + 1} : i) :
          [...items, { ...product, qty: 1 }];
        
        if (auth.currentUser) await persistCart(auth.currentUser.uid, newItems);
        return newItems;
      });
    },
    initialize: (userId) => syncCart(userId)
  };
};

export const cart = createCartStore();
