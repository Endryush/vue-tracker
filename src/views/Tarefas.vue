<template>
    <div class="column is-three-quarter conteudo">
        <Formulario @ao-salvar-tarefa="salvarTarefa" />
        <div class="lista">
            <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"
                @aoTarefaClicada="selecionarTarefa" />
            <Box v-if="listaVazia">
                Nenhuma tarefa feita hoje!
            </Box>
            <div v-if="tarefaSelecionada" class="modal" :class="{ 'is-active': tarefaSelecionada }">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Editando Tarefa</p>
                        <button class="delete" aria-label="close" @click="fecharModal"></button>
                    </header>
                    <section class="modal-card-body">
                        <div class="field">
                            <label for="descricaoDaTarefa" class="label">
                                Descrição
                            </label>
                            <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa">
                        </div>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-success" @click="alterarTarefa">Salvar Alterações</button>
                        <button class="button" @click="fecharModal">Cancel</button>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Formulario from '../components/Formulario.vue'
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';
import { useStore } from '@/store';
import { OBTER_TAREFAS, CADASTRAR_TAREFA, OBTER_PROJETOS, ALTERAR_TAREFA } from '@/store/tipo-acoes';
import { computed } from '@vue/reactivity';
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
            tarefaSelecionada: null as ITarefa | null
        }
    },

    computed: {
        listaVazia(): boolean {
            return this.tarefas.length === 0
        }
    },

    setup() {
        const store = useStore()
        store.dispatch(OBTER_TAREFAS)
        store.dispatch(OBTER_PROJETOS)
        return {
            tarefas: computed(() => store.state.tarefas),
            store
        }
    },

    methods: {
        salvarTarefa(tarefa: ITarefa): void {
            this.store.dispatch(CADASTRAR_TAREFA, tarefa)
        },

        selecionarTarefa(tarefa: ITarefa): void {
            this.tarefaSelecionada = tarefa
        },

        fecharModal(): void {
            this.tarefaSelecionada = null
        },
        alterarTarefa() : void {
            this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
                .then(() => this.fecharModal())
        }
    }
});
</script>

