// Lightweight client-side reading analytics — no backend, localStorage-only.
// Tracks per-book/chapter dwell time, completion, last-read timestamp, and totals.

export interface ChapterStat {
  seconds: number;
  views: number;
  lastRead: number; // epoch ms
  completed?: boolean;
}
export interface BookStat {
  bookId: string;
  title: string;
  chapters: Record<number, ChapterStat>;
  totalSeconds: number;
  startedAt: number;
  lastRead: number;
}
export type AnalyticsStore = Record<string, BookStat>;

const KEY = "cw:reading-analytics";

function safeRead(): AnalyticsStore {
  if (typeof localStorage === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}") as AnalyticsStore;
  } catch {
    return {};
  }
}
function safeWrite(s: AnalyticsStore) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
    window.dispatchEvent(new CustomEvent("cw:analytics-updated"));
  } catch {}
}

export function getAnalytics(): AnalyticsStore {
  return safeRead();
}

export function recordChapterDwell(
  bookId: string,
  title: string,
  chapter: number,
  seconds: number,
  completed?: boolean,
) {
  if (!seconds || seconds < 1) return;
  const s = safeRead();
  const now = Date.now();
  const book =
    s[bookId] ??
    ({ bookId, title, chapters: {}, totalSeconds: 0, startedAt: now, lastRead: now } as BookStat);
  const ch = book.chapters[chapter] ?? { seconds: 0, views: 0, lastRead: now };
  ch.seconds += Math.round(seconds);
  ch.lastRead = now;
  if (completed) ch.completed = true;
  book.chapters[chapter] = ch;
  book.totalSeconds += Math.round(seconds);
  book.lastRead = now;
  book.title = title;
  s[bookId] = book;
  safeWrite(s);
}

export function recordChapterView(bookId: string, title: string, chapter: number) {
  const s = safeRead();
  const now = Date.now();
  const book =
    s[bookId] ??
    ({ bookId, title, chapters: {}, totalSeconds: 0, startedAt: now, lastRead: now } as BookStat);
  const ch = book.chapters[chapter] ?? { seconds: 0, views: 0, lastRead: now };
  ch.views += 1;
  ch.lastRead = now;
  book.chapters[chapter] = ch;
  book.lastRead = now;
  book.title = title;
  s[bookId] = book;
  safeWrite(s);
}

export function resetAnalytics() {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent("cw:analytics-updated"));
}
