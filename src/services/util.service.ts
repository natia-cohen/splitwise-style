export function makeId(length: number = 6): string {
  let txt = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

export function makeLorem(size: number = 100): string {
  const words = [
    'The sky', 'above', 'the port', 'was', 'the color of television', 'tuned',
    'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.',
    'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally',
    'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.',
    'It', 'was', 'a pleasure', 'to', 'burn'
  ];
  let txt = '';
  while (size > 0) {
    size--;
    txt += words[Math.floor(Math.random() * words.length)] + ' ';
  }
  return txt.trim();
}

export function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomPastTime(): number {
  const HOUR = 1000 * 60 * 60;
  const DAY = 1000 * 60 * 60 * 24;
  const WEEK = 1000 * 60 * 60 * 24 * 7;

  const pastTime = getRandomIntInclusive(HOUR, WEEK);
  return Date.now() - pastTime;
}

// export function debounce<T extends (...args: any[]) => void>(func: T, timeout: number = 300): (...args: Parameters<T>) => void {
//   let timer: ReturnType<typeof setTimeout>;
//   return (...args: Parameters<T>) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => { func.apply(this, args); }, timeout);
//   };
// }

export function saveToStorage(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromStorage<T = any>(key: string): T | undefined {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}

