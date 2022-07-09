import { INotificacao } from "@/interfaces/INotificacao";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ALTERAR_TAREFA,  CADASTRAR_TAREFA,  OBTER_TAREFAS } from "./tipo-acoes";
import {  ADICIONA_TAREFA,  ALTERA_TAREFA,  DEFINIR_TAREFAS,  NOTIFICAR } from "./tipo-mutacoes";
import http from '@/http'
import ITarefa from "@/interfaces/ITarefa";
import { EstadoDoProjeto, projeto } from "./modulos/projeto";

export interface  Estado {
    tarefas: ITarefa[],
    notificacoes: INotificacao[],
    projeto: EstadoDoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        tarefas: [],
        notificacoes: [],
        projeto: {
            projetos: []
        }
    },
    mutations: {
        [DEFINIR_TAREFAS] (state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [ADICIONA_TAREFA] (state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [ALTERA_TAREFA] (state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(tarefa => tarefa.id === tarefa.id)
            state.tarefas[index] = tarefa
        },
        [NOTIFICAR] (state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(() => novaNotificacao.id !== novaNotificacao.id)
            }, 2000)
        }
    },
    actions: {
        [OBTER_TAREFAS] ({ commit }, filtro: string ) {
            let url = 'tarefas'

            if (filtro) {
                url += '?descricao=' + filtro
            }

            http.get(url)
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
        },
        [CADASTRAR_TAREFA] ({ commit }, tarefa: ITarefa) {
            return http.post('/tarefas', tarefa)
                .then(resposta => commit(ADICIONA_TAREFA, resposta.data) )
        },
        [ALTERAR_TAREFA] ({ commit }, tarefa: ITarefa) {
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERA_TAREFA, tarefa))
        },
    },
    modules: {
        projeto
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}