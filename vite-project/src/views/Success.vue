<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  email: String
})
</script>


<template>
Your purchase was successful, we will send you a link to the document within the next minute. Please check your emails at the adress you provided us : {{email}}
</template>

<style scoped>

</style>
