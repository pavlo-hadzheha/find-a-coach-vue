
export function toArray<T>(object: any, keyName = 'key'): Array<T> {
  const out: Array<T> = [];
  Object.entries(object).forEach((e: any) => {
    out.push({
      [keyName]: e[0],
      ... e[1]
    })
  });
  return out;
}

