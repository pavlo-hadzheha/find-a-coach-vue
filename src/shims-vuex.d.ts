import { Store } from '@/store'// path to store file

declare module '@vue/runtime-core' {
  interface IComponentCustomProperties {
    $store: Store;
  }
}
