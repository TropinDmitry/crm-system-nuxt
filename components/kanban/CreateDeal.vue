<script setup lang="ts">
import { v4 as uuid } from 'uuid';
import { defineProps } from 'vue';
import { COLLECTION_DEALS, DB_ID } from '~/app.constants';
import type { IDeal } from '~/types/deals.types';
import { useForm } from 'vee-validate';
import { useMutation } from '@tanstack/vue-query';
import { Permission, Role } from 'appwrite';

const isOpenForm = ref<boolean>(false);

interface IDealFormState extends Pick<IDeal, 'name' | 'price'> {
    customer: {
        email: string
        name: string
    }
    status: string
}

const props = defineProps({
    status: {
        type: String,
        default: ''
    }, refetch: {
        type: Function
    }
});

const {handleSubmit, defineField, handleReset} = useForm<IDealFormState>({
    initialValues: {
        status: props.status
    }
});

const [name, nameAttrs] = defineField('name');
const [price, priceAttrs] = defineField('price');
const [customerEmail, customerEmailAttrs] = defineField('customer.email');
const [customerName, customerNameAttrs] = defineField('customer.name');

const {mutate, isPending} = useMutation({
    mutationKey: ['create a new deal'],
    mutationFn: (data: IDealFormState) => DB.createDocument(DB_ID, COLLECTION_DEALS, uuid(), data),
    onSuccess() {
        props.refetch && props.refetch();
        handleReset();
    }
});

const onSubmit = handleSubmit(values => {
    mutate(values)
})

</script>

<template>
    <div class="text-center mb-2">
        <button 
            class="transition-all opacity-5 hover:opacity-100 hover:text-[#a252c8]" 
            @click="isOpenForm = !isOpenForm"
        >
            <Icon
                v-if="isOpenForm"
                name="radix-icons:arrow-up"
                class="fade-in-100 fade-out-0"
                size="38"
            />
            <Icon
                v-else
                name="radix-icons:plus-circled"
                class="fade-in-100 fade-out-0"
                size="38"
            />
        </button>
    </div>
    <form v-if="isOpenForm" @submit="onSubmit" class="form mb-3">
        <UInput
            placeholder="Наименование"
            v-model="name"
            v-bind="nameAttrs"
            type="text"
            class="input"
        />
        <UInput
            placeholder="Сумма"
            v-model="price"
            v-bind="priceAttrs"
            type="number"
            class="input"
        />
        <UInput
            placeholder="Email"
            v-model="customerEmail"
            v-bind="customerEmailAttrs"
            type="text"
            class="input"
        />
        <UInput
            placeholder="Компания"
            v-model="customerName"
            v-bind="customerNameAttrs"
            type="text"
            class="input"
        />

        <button class="btn" :disabled="isPending">
            {{ isPending ? 'Загрузка...' : 'Добавить' }}
        </button>
    </form>
</template>

<style scoped>

.input {
    @apply border-[#161c26]  placeholder:text-[#748092]  transition-colors;
}
/*mb-2 focus:border-border  text-xs py-1 px-2 rounded hover:text-white*/
.btn {
    @apply  border    border-[#161c26] hover:border-[#482c65] transition-colors text-[#aebed5];
}

.form {
    @apply  block;
    animation: show 0.3s ease-in-out;
}

@keyframes show {
    from {
        /*@apply border-[#a252c83d];*/
        border-color: rgba(162, 82, 200, 0.24);
        transform: translateY(-35px);
        opacity: 0.4;
    }

    90% {
        /*@apply border-[#a252c83d];*/
        border-color: rgba(162, 82, 200, 0.24);
    }

    to {
        /*@apply border-transparent;*/
        border-color: transparent;
        transform: translateY(0);
        opacity: 1;
    }
}

</style>