let version = 1;

export const initDb = () => {
    return new Promise((resolve) => {
        let request = indexedDB.open("myDB");

        request.onupgradeneeded = () => {
            let db = request.result;

            if (!db.objectStoreNames.contains("test")) {
                db.createObjectStore("test", { keyPath: "id" });
            }
        };

        request.onsuccess = () => {
            let db = request.result;
            version = db.version;
            resolve(true);
        };

        request.onerror = () => {
            resolve(false);
        };
    });
};

export const addData = (storeName, data) => {
    return new Promise((resolve) => {
        let request = indexedDB.open("myDB", version);

        request.onsuccess = () => {
            let db = request.result;
            const tx = db.transaction(storeName, "readwrite");
            const store = tx.objectStore(storeName);
            store.add(data);
            resolve(data);
        };

        request.onerror = () => {
            const error = request.error?.message;
            if (error) {
                resolve(error);
            } else {
                resolve("Unknown error");
            }
        };
    });
};

export const getStoreData = (storeName) => {
    return new Promise((resolve) => {
        let request = indexedDB.open("myDB");

        request.onsuccess = () => {
            let db = request.result;
            const tx = db.transaction(storeName, "readonly");
            const store = tx.objectStore(storeName);
            const res = store.getAll();
            res.onsuccess = () => {
                resolve(res.result);
            };
        };
    });
};

export const updateData = (storeName, key, data) => {
    return new Promise((resolve) => {
        let request = indexedDB.open("myDB", version);

        request.onsuccess = () => {
            let db = request.result;
            const tx = db.transaction(storeName, "readwrite");
            const store = tx.objectStore(storeName);
            const res = store.get(key);
            res.onsuccess = () => {
                const newData = { ...res.result, ...data };
                store.put(newData);
                resolve(newData);
            };
            res.onerror = () => {
                resolve(null);
            };
        };
    });
};

export const deleteData = (storeName, key) => {
    return new Promise((resolve) => {
        let request = indexedDB.open("myDB", version);

        request.onsuccess = () => {
            let db = request.result;
            const tx = db.transaction(storeName, "readwrite");
            const store = tx.objectStore(storeName);
            const res = store.delete(key);

            res.onsuccess = () => {
                resolve(true);
            };
            res.onerror = () => {
                resolve(false);
            };
        };
    });
};
