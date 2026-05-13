// Frontend-only newsletter persistence using localStorage.
const KEY = "cyber_subscribers_v1";

export function getSubscribers(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function addSubscriber(email: string): { ok: boolean; reason?: string } {
  if (typeof window === "undefined") return { ok: false, reason: "unavailable" };
  const e = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return { ok: false, reason: "invalid" };
  const list = getSubscribers();
  if (list.includes(e)) return { ok: false, reason: "duplicate" };
  list.push(e);
  localStorage.setItem(KEY, JSON.stringify(list));
  return { ok: true };
}
