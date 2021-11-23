import { createApp, provide, h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const defaultClient = new ApolloClient({
    uri: 'https://tosd6.sse.codesandbox.io/',
    cache: new InMemoryCache()
  })
  
  createApp(
    {
      setup () {
        provide(DefaultApolloClient, defaultClient)
      },
      render() {
        return h(App)
      }
    }
  ).use(store).use(router).mount('#app')
// createApp(App).use(store).use(router).mount('#app')
