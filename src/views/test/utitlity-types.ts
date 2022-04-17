// Partial<T> makes all props of T optional

enum EMaritalStatus {
    SINGLE,
    MARRIED
}

interface IUser {
    name: string;
    income: number;
    maritalStatus: typeof EMaritalStatus
}

const user: Partial<IUser> = {
  name: 'Ivan'
}

// Required<T> makes all props required
// Readonly<T> makes all props readonly

// Record<K, T>

type TStore = Record<string, number>
const aRecord: TStore = {
}

console.log(aRecord)

// Exclude<T, U>
type TA = string | string[] | undefined
type TAWithoutUndefined = Exclude<TA, undefined>
// NonNullable<T>
type TB = string | string [] | null | undefined
type TBPure = NonNullable<TB>

const a: TAWithoutUndefined = 'Bam!'

// ReturnType<T>
