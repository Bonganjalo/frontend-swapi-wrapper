<template>
  <div class="details">
     <h1> Swapi API Wrapper (Apollo) </h1>
<table class="table table-striped">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Height</th>
      <th scope="col">Mass</th>
      <th scope="col">Gender</th>
      <th scope="col">Homeworld</th>

    </tr>
  </thead>
  <tbody>
    <tr v-for="(person, index) in people.results" :key="index">
      <th scope="col">{{ index + 1 }}</th>
      <td spcope="col">{{ person.name}}</td>
      <td spcope="col">{{ person.height}}</td>
      <td spcope="col">{{ person.mass}}</td>
      <td spcope="col">{{ person.gender}}</td>
      <td spcope="col">{{ person.homeworld}}</td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script lang="ts">

import { gql } from 'graphql-tag';
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route =  useRoute();
    const people =  findByName(String(route.params.name));
    return { people };
    
  }
}

function findByName(personName:string ) {
  const findByName = gql`query Query($name: String) {
    findByName(name: $name) {
      next
      previous
      results {
        name
        height
        mass
        gender
        homeworld
      }
    }
  }`

  const { result } = useQuery(findByName, {  name: personName })
  const person = useResult(result, null, data => data.findByName)
  return person;
}

</script>
