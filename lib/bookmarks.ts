const STORAGE_KEY = "stf-bookmarks";

function getStorage(): Storage | null {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem("__stf_test", "1");
      window.localStorage.removeItem("__stf_test");
      return window.localStorage;
    }
  } catch {
    // localStorage disabled or unavailable
  }
  return null;
}

export function getBookmarks(): Set<string> {
  const storage = getStorage();
  if (!storage) return new Set();
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

export function isBookmarked(id: string): boolean {
  return getBookmarks().has(id);
}

export function toggleBookmark(id: string): boolean {
  const bookmarks = getBookmarks();
  const storage = getStorage();
  if (!storage) return false;

  if (bookmarks.has(id)) {
    bookmarks.delete(id);
  } else {
    bookmarks.add(id);
  }

  storage.setItem(STORAGE_KEY, JSON.stringify(Array.from(bookmarks)));
  return bookmarks.has(id);
}
