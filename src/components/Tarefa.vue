<template>
    <Box>
        <div class="columns">
            <div class="column is-4">
                {{ tarefa.descricao || 'Tarefa sem descrição' }}
            </div>
            <div class="column is-3">
                {{ tarefa.projeto?.nome || 'N/D' }}
            </div>
            <div class="column temporizador-tarefa">
                <Cronometro :tempo-em-segundos="tarefa.duracaoEmSegundos" />
            </div>
            <span class="icon is-small"  @click="tarefaClicada">
                <i class="fas fa-pencil-alt"></i>
            </span>
        </div>
    </Box>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import Cronometro from "./Cronometro.vue";
import ITarefa from "@/interfaces/ITarefa";
import Box from "./Box.vue";

export default defineComponent({
    name: 'ListaDeTarefas',

    components: { Cronometro, Box },

    emits: ['aoTarefaClicada'],

    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },

    methods: {
        tarefaClicada(): void {
            this.$emit('aoTarefaClicada', this.tarefa)
        }
    }
})
</script>

<style scoped>
.box {
    background: #964dff;
    color: #eaf2f3;
}
</style>