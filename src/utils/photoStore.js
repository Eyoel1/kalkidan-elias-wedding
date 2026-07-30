// IndexedDB Helper for persistent guest photo storage
const DB_NAME = 'WeddingGuestPhotosDB';
const DB_VERSION = 1;
const STORE_NAME = 'photos';

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveGuestPhoto = async (photoObj) => {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const item = {
      id: photoObj.id || `guest_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      src: photoObj.src, // base64 or blob URL data
      uploaderName: photoObj.uploaderName || 'Anonymous Guest',
      caption: photoObj.caption || '',
      likes: photoObj.likes || 0,
      timestamp: photoObj.timestamp || new Date().toISOString(),
      tag: 'Guest Upload'
    };
    store.put(item);
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve(item);
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.error('Failed to save guest photo to IndexedDB:', err);
    throw err;
  }
};

export const getAllGuestPhotos = async () => {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const index = store.index('timestamp');
    const request = index.getAll();
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        // Return sorted by newest first
        const photos = request.result.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        resolve(photos);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Failed to read guest photos:', err);
    return [];
  }
};

export const deleteGuestPhoto = async (id) => {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.delete(id);
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(false);
    });
  } catch (err) {
    console.error('Failed to delete photo:', err);
    return false;
  }
};
