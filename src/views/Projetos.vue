<template>
    <div class="pg-projetos">
        <h1 class="title">Projetos</h1>
        <router-view></router-view>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: '-Projetos',


})
</script>
<style scoped>
.pg-projetos {
    padding: 1.25rem;
}
</style>