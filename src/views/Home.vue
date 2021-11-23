<template>
  <div class="home">
  <h1> Swapi API Wrapper (Apollo) </h1>


<div class="input-group">
    <form  @submit.prevent @submit="handleSearch">
    <div class="form-outline">
      <input type="search" id="apolloSearch" class="form-control" placeholder="Search for a people... " 
      v-model="dataToSearched" />
     </div>
    </form>
</div>
 <br><br>
  <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
    </tr>
  </thead>
  <tbody >
    <tr v-for="(person, index) in people" :key="index">
      <th scope="col">{{ index + 1 }}</th>
      <router-link :to="{ name: 'Details', params: { name: person.name }}"><td spcope="col">{{ person.name}}</td></router-link>
    </tr>
  </tbody>
</table>
  </div>

</template>

<script lang="ts">

import { gql } from 'graphql-tag';
import { useQuery, useResult, provideApolloClient } from '@vue/apollo-composable'
import {  onMounted, ref, watch } from 'vue'
import { defaultClient } from '../apollo/apollo.client';
provideApolloClient(defaultClient);



export default {
  setup() {
    const people = ref([])
    const dataToSearched = ref("")

    const  handleSearch = () => {

      if (dataToSearched.value === "") {
        return;
      }

      let findPeople =  findByName(String(dataToSearched.value));
      people.value = (findPeople && findPeople.value && findPeople.value.results) ?  findPeople.value.results: [];
      
      console.log('Apollo Query results ', findPeople);
      console.log('Reactive people ', people);

       dataToSearched.value = "";
    }

    onMounted(() => {
      people.value = JSON.parse(localStorage.peopleStored)
    })
    watch(people, (newPeople) => {
      localStorage.peopleStored = JSON.stringify(newPeople);
    });


    return { people , handleSearch, dataToSearched } ;

   
    
  }
}

function findAll() {
  const findAll = gql` query Query {

    findAll {
      results {
        name
        height
        mass
        gender
        homeworld
      }
      next
    }
  }`

  const { result } = useQuery(findAll);
  const people = useResult(result, null, data => data.findAll);
  return people;
}

function findBypage( pageNumber:number) {
  const findBypage = gql` query Query($page: Int) {
    findAllByPage(page: $page) {
      next
      results {
        name
      }
    }
  }`
  
  const { result } = useQuery(findBypage, { page: pageNumber })
  const people = useResult(result, null, data => data.findAllByPage)
  return people;
}

function findByName(searchName:string) {
  console.log("Search name in fyByName ", JSON.stringify(searchName));
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

  const { result } = useQuery(findByName, { name: searchName } )
  const people = useResult(result, null, data => data.findByName)
  return people;
}

</script>

<style>
  .input-group form{
    width: 100%;
    margin-left: 25%;
    margin-right: 25%;
  }

  .input-group input {
   border: 1px solid black;
  }

</style>
