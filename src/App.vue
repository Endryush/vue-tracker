<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': modoEscuroAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @ao-tema-alterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <Formulario @ao-salvar-tarefa="salvarTarefa" />
      <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <Box v-if="listaVazia">
          Nenhuma tarefa feita hoje!
        </Box>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue'
import Formulario from './components/Formulario.vue'
import Tarefa from './components/Tarefa.vue';
import ITarefa from './interfaces/ITarefa'
import Box from './components/Box.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    Formulario,
    Tarefa,
    Box
  },

  data() {
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivo: false
    }
  },

  computed: {
    listaVazia() : boolean {
      return this.tarefas.length === 0
    }
  },

  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa)
    },

    trocarTema(modoEscuroAtivo : boolean) : void {
      this.modoEscuroAtivo = modoEscuroAtivo
    }
  }
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
main {
  --bg-primary: #fff;
  --text-primary: #151416;
}
main.dark-mode {
  --bg-primary: #151416;
  --text-primary: #ddd;
}
.conteudo {
 background-color: var(--bg-primary); 
}
</style>
