<template>
    <div class="column is-three-quarter conteudo">
        <Formulario @ao-salvar-tarefa="salvarTarefa" />
        <div class="lista">
            <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
            <Box v-if="listaVazia">
                Nenhuma tarefa feita hoje!
            </Box>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Formulario from '../components/Formulario.vue'
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';
import ITarefa from '@/interfaces/ITarefa';

export default defineComponent({
    name: '-Tarefas',
    components: {
        Formulario,
        Tarefa,
        Box
    },

    data() {
        return {
            tarefas: [] as ITarefa[]
        }
    },

    computed: {
        listaVazia(): boolean {
            return this.tarefas.length === 0
        }
    },

    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.tarefas.push(tarefa)
        }
    }
});
</script>

