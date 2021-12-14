import axios from 'axios';
import { IRequest } from '@/data-structures/request';

export default {
  state() {
    return {
      requests: [] as Array<IRequest>
    }
  },
}
