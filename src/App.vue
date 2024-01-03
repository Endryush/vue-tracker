<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': modoEscuroAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @ao-tema-alterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <Notificacoes />
     <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue'
import Notificacoes from './components/Notificacoes.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    Notificacoes
},

  data() {
    return {
      modoEscuroAtivo: false
    }
  },

  methods: {
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
