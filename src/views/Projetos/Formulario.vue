<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from '@/hooks/notificador'
import { ADICIONA_PROJETO, ALTERA_PROJETO } from "@/store/tipo-mutacoes";
import { useRouter } from "vue-router";

export default defineComponent({
    name: '-Formulário',

    props: {
        id: {
            type: String
        }
    },

    setup(props) {

        const router = useRouter()

        const store = useStore()
        const { notificar } = useNotificador()
        const nomeDoProjeto = ref('')

        if (props.id) {

            const projeto = store.state.projeto.projetos.find(
                (proj) => proj.id == props.id
            );
            nomeDoProjeto.value = projeto?.nome || ''

        }

        const salvar = () => {
            try {
                if (props.id) {
                    store.commit(ALTERA_PROJETO, {
                        id: props.id,
                        nome: nomeDoProjeto.value
                    })
                } else {
                    store.commit(ADICIONA_PROJETO, nomeDoProjeto.value)
                }
                clearAndRedirect()
            } catch (error) {
                failedMessage()   
            }
        }

        const clearAndRedirect = () => {
            nomeDoProjeto.value = '';
            notificar(TipoNotificacao.SUCESSO, 'Sucesso!', 'Projeto cadastrado com sucesso!')
            router.push('/projetos')
        }

        const failedMessage = () => {
            notificar(TipoNotificacao.FALHA, 'Atenção', `A operação falhou...Tente novamente!`)
        }

        return {
            nomeDoProjeto,
            salvar
        }
    }
});
</script>

