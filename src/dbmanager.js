// Funkcja do otwierania bazy danych IndexedDB
function openDatabase(dbName = 'PixelArtDB', dbVersion = 1) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    // Tworzenie struktury bazy danych, jeżeli wersja jest zmieniona lub baza nie istnieje
    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      // Ustalamy obiekt store dla projektów
      if (!db.objectStoreNames.contains('projects')) {
        const store = db.createObjectStore('projects', { keyPath: 'id', autoIncrement: true });
        store.createIndex('name', 'name', { unique: true });
      }
    };

    request.onsuccess = function(event) {
      resolve(event.target.result); // Zwraca obiekt db po otwarciu
    };

    request.onerror = function(event) {
      reject('Error opening database: ' + event.target.error);
    };
  });
}

// Funkcja do tworzenia transakcji na obiektach bazodanowych
function createTransaction(db, storeName, mode = 'readwrite') {
  return db.transaction(storeName, mode);
}

// Funkcja do dodawania danych do store
function addData(db, storeName, data) {
  return new Promise((resolve, reject) => {
    const transaction = createTransaction(db, storeName);
    const store = transaction.objectStore(storeName);
    const request = store.add(data);

    request.onsuccess = function() {
      resolve('Data added successfully!');
    };

    request.onerror = function(event) {
      reject('Error adding data: ' + event.target.error);
    };
  });
}

// Funkcja do pobierania wszystkich danych z store
function getAllData(db, storeName) {
  return new Promise((resolve, reject) => {
    const transaction = createTransaction(db, storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = function() {
      resolve(request.result); // Zwraca wszystkie dane z store
    };

    request.onerror = function(event) {
      reject('Error retrieving data: ' + event.target.error);
    };
  });
}

// Funkcja do pobierania pojedynczego wpisu na podstawie ID
function getDataById(db, storeName, id) {
  return new Promise((resolve, reject) => {
    const transaction = createTransaction(db, storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.get(id);

    request.onsuccess = function() {
      resolve(request.result); // Zwraca wynik pobrania danych
    };

    request.onerror = function(event) {
      reject('Error retrieving data by ID: ' + event.target.error);
    };
  });
}

// Funkcja do aktualizowania danych
function updateData(db, storeName, data) {
  return new Promise((resolve, reject) => {
    const transaction = createTransaction(db, storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.put(data); // Zaktualizuje dane, jeśli id istnieje

    request.onsuccess = function() {
      resolve('Data updated successfully!');
    };

    request.onerror = function(event) {
      reject('Error updating data: ' + event.target.error);
    };
  });
}

// Funkcja do usuwania danych na podstawie ID
function deleteData(db, storeName, id) {
  return new Promise((resolve, reject) => {
    const transaction = createTransaction(db, storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);

    request.onsuccess = function() {
      resolve('Data deleted successfully!');
    };

    request.onerror = function(event) {
      reject('Error deleting data: ' + event.target.error);
    };
  });
}

// Funkcja do usuwania wszystkich danych w store
function clearStore(db, storeName) {
  return new Promise((resolve, reject) => {
    const transaction = createTransaction(db, storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.clear(); // Usuwa wszystkie dane w store

    request.onsuccess = function() {
      resolve('All data cleared successfully!');
    };

    request.onerror = function(event) {
      reject('Error clearing store: ' + event.target.error);
    };
  });
}