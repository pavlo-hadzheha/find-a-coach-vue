export function turnArray <T> (obj: Record<string, any>, keyName: string): Array<T> {
  const out: Array<T> = []
  if (obj) {
    Object.entries<T>(obj).forEach((e) => {
      out.push({
        [keyName]: e[0],
        ...e[1]
      })
    })
  }
  return out
}
