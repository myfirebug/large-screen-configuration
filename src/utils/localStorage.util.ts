/**
 * 本地缓存
 */
const localStorage = {
  set(key: string, value: any, expires = -1) {
    window.localStorage.setItem(key, JSON.stringify({ value, expires }));
  },
  get(key: string) {
    const result = window.localStorage.getItem(key);
    if (result) {
      const store = JSON.parse(result);
      if (store.expires !== -1 && store.expires < Date.now()) {
        localStorage.remove(key);
        return -1;
      }
      return store.value;
    }
    return null;
  },
  remove(key: string) {
    window.localStorage.removeItem(key);
  },
};

export { localStorage };
