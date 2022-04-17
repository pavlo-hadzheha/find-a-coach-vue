// S T O R A G E

Storage.prototype._setItem = Storage.prototype.setItem
Storage.prototype.setItem = function (key: string, value: any) {
  this._setItem(key, JSON.stringify(value))
}

Storage.prototype._getItem = Storage.prototype.getItem
Storage.prototype.getItem = function <T> (key: string): T | string | null {
  const item = this._getItem(key)
  try {
    return JSON.parse(item)
  } catch {
    return item
  }
}

Storage.prototype.hasKey = function (key: string): boolean {
  return this._getItem(key) !== null
}
