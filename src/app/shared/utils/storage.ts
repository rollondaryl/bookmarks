/**
 * Safely read and parse JSON from localStorage.
 *
 * @param key - The storage key to read.
 * @param fallback - Value to return if the key is missing or parsing fails.
 * @returns The parsed value if available, otherwise the fallback.
 */
export function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed as T;
  } catch {
    return fallback;
  }
}

/**
 * Stringify and write JSON to localStorage.
 *
 * @param key - The storage key to write.
 * @param value - The value to persist.
 */
export function writeJson<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}
