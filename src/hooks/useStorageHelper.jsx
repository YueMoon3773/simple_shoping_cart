import { useCallback } from 'react';

export const useStorageHelper = (storageType) => {
    let storage = window[storageType];

    const checkStorageIsAvailable = useCallback(() => {
        try {
            const testVar = '__storage_test__';
            storage.setItem(testVar, testVar);
            storage.removeItem(testVar);
            return true;
        } catch (e) {
            return (
                e instanceof DOMException &&
                e.name === 'QuotaExceededError' &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage &&
                storage.length !== 0
            );
        }
    }, [storage]);

    const clearStorage = useCallback(() => storage.clear(), [storage]);

    const verifyItemExisted = useCallback(
        (itemKey) => {
            const key = `product_${itemKey}`;

            if (storage.getItem(key) !== null) return true;
            else return false;
        },
        [storage],
    );

    const saveDataToStorage = useCallback(
        (itemKey, itemData) => {
            const key = `product_${itemKey}`;
            let data;

            if (checkStorageIsAvailable()) {
                if (verifyItemExisted(itemKey) === false) {
                    data = itemData.toString();
                    storage.setItem(key, data);
                } else {
                    data = Number(storage.getItem(key)) + itemData;
                    storage.setItem(key, data);
                }
                // console.log(storage);
            } else {
                throw new Error(`Cannot save data to ${storage}`);
            }
        },
        [storage],
    );

    const deleteItemByKey = useCallback(
        (itemKey) => {
            const key = `product_${itemKey}`;

            if (verifyItemExisted(itemKey) === false) return;
            else {
                storage.removeItem(key);
                // console.log(storage);
            }
        },
        [storage],
    );

    const getItemDataByKey = useCallback(
        (itemKey) => {
            const key = `product_${itemKey}`;

            if (verifyItemExisted(itemKey) === false) return;
            else {
                return Number(storage.getItem(key));
            }
        },
        [storage],
    );

    const getAllStoredItems = useCallback(() => {
        let dataInStorage;
        const allKeys = Object.keys(storage).filter((key) => key.startsWith('product_'));

        dataInStorage = allKeys.map((key) => {
            return {
                productId: Number(key.split('_')[1]),
                quantity: Number(storage.getItem(key)),
            };
        });

        // console.log(dataInStorage);
        return dataInStorage;
    }, [storage]);

    const getTotalNumberOfItems = () => {
        const storedData = getAllStoredItems();

        const total = storedData.reduce((accu, item, index) => {
            return accu + item.quantity;
        }, 0);

        return total;
    };

    const updateItemDataByKey = useCallback(
        (itemKey, newItemData) => {
            if (verifyItemExisted(itemKey) === false) return;
            else {
                deleteItemByKey(itemKey);
                saveDataToStorage(itemKey, newItemData);
            }
        },
        [storage],
    );

    return {
        checkStorageIsAvailable,
        clearStorage,
        verifyItemExisted,
        saveDataToStorage,
        deleteItemByKey,
        getItemDataByKey,
        getAllStoredItems,
        getTotalNumberOfItems,
        updateItemDataByKey,
    };
};
