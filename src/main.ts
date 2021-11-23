import { createApp, provide, h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { defaultClient } from './apollo/apollo.client';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"


  createApp(
    {
      setup () {
        provide(DefaultApolloClient, defaultClient)
      },
      render() {
        return h(App)
      }
    }
  ).use(store).use(router).use(store).mount('#app')

