const last = <T>(arr: Array<T>): T => {
  return arr[arr.length - 1]
}

const l = last([1, 2, 3])
const l2 = last(['a', 'b', 'c'])

console.log(l, l2)

const makeArr = <X, Y = number>(x: X, y: Y): [X, Y] => {
  return [x, y]
}

const arr1 = makeArr(5, 'a')
const arr2 = makeArr(5, 2)

console.log(arr1, arr2)

const makeFullName = <T extends { firstName: string, lastName: string }>(obj: T) => {
  return {
    ...obj,
    fullName: obj.firstName + ' ' + obj.lastName
  }
}
const v1 = makeFullName({
  firstName: 'bob',
  lastName: 'whitney',
  age: 15
})

console.log(v1)

// interface ITab<T> {
//   id: string;
//   position: number;
//   data: T;
// }

// type TNumberTab = ITab<number>
// type TStringTab = ITab<string>
