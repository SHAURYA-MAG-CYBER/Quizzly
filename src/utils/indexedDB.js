import { openDB } from "idb";

const DB_NAME = "QuizDB";
const STORE_NAME = "Attempts";

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    },
  });
}

export async function saveAttempt(attempt) {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.store.add(attempt);
  await tx.done;
}

export async function getAttempts() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

export async function clearAttempts() {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.store.clear();
  await tx.done;
}
