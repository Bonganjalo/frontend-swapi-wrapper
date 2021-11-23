<template>
  <div class="home">
    {{ message }}
  </div>
    <ul>
    <li v-for="person in people.results" :key="person.name">
      <router-link :to="{ name: 'About', params: { name: person.name }}"><h2>{{ person.name}}</h2></router-link>
    </li>
  </ul>
</template>

<script lang="ts">

import { gql } from 'graphql-tag';
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'
// import allWinesQuery from '../graphql/queries/findAll.query.gql'
export default {
    
  
   setup(){
    const findAll = gql` query Query {

    findAll {
      results {
        name
        height
        mass
        gender
        homeworld
      }
    }
  }`
    const { result } = useQuery(findAll)
    const people = useResult(result, null, data => data.findAll)
    return { people};
    }

}
</script>
