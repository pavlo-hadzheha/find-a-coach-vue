import '@/assets/tailwind.css'
import 'element-plus/dist/index.css'

import '@/core/utils/global-prototype.utils'

import { createApp } from 'vue'
import App from '@/App.vue'

import { router } from '@/router'
import { store } from '@/store'

import { VueGlobalPrototypesPlugin, PortalPlugin } from '@/plugins'

import { Message, Refresh, UserFilled } from '@element-plus/icons-vue'

import { BaseContainer } from '@/components/UI'
import { ElLoading } from 'element-plus'
import '@/assets/styles/main.scss'

const app = createApp(App)

// BuildUpons
app.use(store)
app.use(router)

app.use(PortalPlugin)
app.use(VueGlobalPrototypesPlugin)
app.use(ElLoading)

app.component('MessageIcon', Message)
app.component('UserIcon', UserFilled)
app.component('RefreshIcon', Refresh)

// app.use(ElDialog)

// UI
app.component('BaseContainer', BaseContainer)

router.isReady().then(() => {
  app.mount('#app')
})

export { app }
