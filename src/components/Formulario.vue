<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao" />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @ao-temporizador-finalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, ref } from "@vue/reactivity";
import { defineComponent } from "vue";
import Temporizador from "./Temporizador.vue";

export default defineComponent({
  name: "FormularioCronometro",
  emits: ['aoSalvarTarefa'],


  components: { Temporizador },
  setup(props, { emit }) {

    const projetos = computed(() => store.state.projeto.projetos)
    const store = useStore()
    const descricao = ref('')
    const idProjeto = ref('')

    const finalizarTarefa = (tempoDecorrido: number) => {
      emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: descricao.value,
        projeto: projetos.value.find(proj => proj.id === idProjeto.value)
      })
      descricao.value = ''
    }

    return {
      idProjeto,
      descricao,
      projetos,
      finalizarTarefa
    }
  }
});
</script>

<style>
.formulario {
  color: var(--text-primary);
  background-color: var(--bg-primary);
}
</style>
