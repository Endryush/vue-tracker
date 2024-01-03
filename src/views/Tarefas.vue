<!-- eslint-disable -->
<template>
    <div class="column is-three-quarter conteudo">
        <Formulario @ao-salvar-tarefa="salvarTarefa" />
        <div class="lista">
            <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"
                @aoTarefaClicada="selecionarTarefa" />
            <Box v-if="listaVazia">
                Nenhuma tarefa feita hoje!
            </Box>
            <!-- <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="text" placeholder="Digite para filtrar">
                    <span class="icon is-small is-left">
                        <i class="fas fa-search"></i>
                    </span>
                </p>
            </div> -->

            <Modal :mostrar="tarefaSelecionada != null">
                <template v-slot:header class="modal-card-head">
                    <p class="modal-card-title">Editando Tarefa</p>
                    <button class="delete" aria-label="close" @click="fecharModal"></button>
                </template>
                <template v-slot:body class="modal-card-body">
                    <div class="field">
                        <label for="descricaoDaTarefa" class="label">
                            Descrição
                        </label>
                        <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa">
                    </div>
                </template>
                <template v-slot:footer class="modal-card-foot">
                    <button class="button is-success" @click="alterarTarefa">Salvar Alterações</button>
                    <button class="button" @click="fecharModal">Cancel</button>
                </template>
            </Modal>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import Formulario from '../components/Formulario.vue'
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';
import { useStore } from '@/store';
import { OBTER_PROJETOS } from '@/store/tipo-acoes';
import { DEFINIR_TAREFAS, ADICIONA_TAREFA, ALTERA_TAREFA } from '@/store/tipo-mutacoes';
import { computed } from '@vue/reactivity';
import ITarefa from '@/interfaces/ITarefa';
import Modal from '@/components/Modal.vue';

export default defineComponent({
    name: '-Tarefas',
    components: {
        Formulario,
        Tarefa,
        Box,
        Modal
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
        store.dispatch(DEFINIR_TAREFAS)
        store.dispatch(OBTER_PROJETOS)

        const filtro = ref('')

        const tarefas = computed(() => store.state.tarefas.filter(tarefa => !filtro.value || tarefa.descricao.includes(filtro.value)))

        watchEffect(() => {
            store.dispatch(DEFINIR_TAREFAS, filtro.value)
        })


        return {
            tarefas,
            store,
            filtro
        }
    },

    methods: {
        salvarTarefa(tarefa: ITarefa): void {
            this.store.commit(ADICIONA_TAREFA, tarefa)
        },

        selecionarTarefa(tarefa: ITarefa): void {
            this.tarefaSelecionada = tarefa
        },

        fecharModal(): void {
            this.tarefaSelecionada = null
        },
        alterarTarefa(): void {
            this.store.commit(ALTERA_TAREFA, this.tarefaSelecionada)
            this.fecharModal()
        }
    }
});
</script>

