import { createApp } from 'vue'
import 'element-plus/dist/index.css';
import '@/assets/tailwind.css';
import {Message, User, UserFilled} from '@element-plus/icons-vue';

import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElCheckbox,
  ElCheckboxGroup,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElCard,
  ElIcon,
  ElTag,
  ElCheckboxButton,
  ElDialog,
} from 'element-plus';

import TheHeader from '@/components/layout/TheHeader.vue';
import { TheAuth, TheRequests, TheCoaches } from '@/pages'
import { BaseContainer} from '@/components/UI';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

const app = createApp(App);

// BuildUpons
app.use(store);
app.use(router);

// ElementPlus
app.use(ElButton);
app.use(ElInput);
app.use(ElForm);
app.use(ElFormItem);
app.use(ElInput);
app.use(ElInputNumber);
app.use(ElCheckbox);
app.use(ElCheckboxGroup);

app.use(ElRow);
app.use(ElCol);
app.use(ElSelect);
app.use(ElOption);
app.use(ElIcon);
app.use(ElCard);
app.use(ElTag);
app.use(ElCheckboxButton);
app.component('message-icon', Message);
app.component('user-icon', UserFilled);

app.use(ElDialog);


// UI
app.component('base-container', BaseContainer);

// TheComponents
app.component('the-header', TheHeader);
app.component('the-coaches', TheCoaches);
app.component('the-requests', TheRequests);
app.component('the-auth', TheAuth);

app.mount('#app');
