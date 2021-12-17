export default {
  set(key: string, obj: any): void {
    localStorage.setItem(key, JSON.stringify(obj));
  },
  get<T>(key: string): T | null {
    if(localStorage.length && localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key) as string);
    } else {
      return null
    }
  },
  rm(key: string): void {
    localStorage.removeItem(key);
  }
}
