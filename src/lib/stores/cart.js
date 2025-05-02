import { writable } from 'svelte/store';

const cartStore = () => {
  const { subscribe, update } = writable([]);
  
  return {
    subscribe,
    addItem: (product) => update(items => {
      const existing = items.find(i => i.id === product.id);
      return existing ? 
        items.map(i => i.id === product.id ? {...i, qty: i.qty + 1} : i) :
        [...items, { ...product, qty: 1 }];
    }),
    removeItem: (id) => update(items => items.filter(i => i.id !== id)),
    clear: () => update(() => [])
  };
};

export const cart = cartStore();
