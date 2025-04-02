<script lang="ts" setup>
import { useAuthStore, useIsLoadingStore } from '~/store/auth.store';
import {v4 as uuid} from 'uuid'

useHead({
    title: 'Login | CRM System'
})

const emailRef = ref('');
const passwordRef = ref('');
const nameRef = ref('');

const isLoadingStore = useIsLoadingStore();
const router = useRouter();
const authStore = useAuthStore();

const login = async () => {
    isLoadingStore.set(true);
    await account.createEmailPasswordSession(emailRef.value, passwordRef.value);
    const response = await account.get();

    if (response) {
        authStore.set({
            email: response.email,
            name: response.name,
            status: response.status
        })
    }

    emailRef.value = '';
    passwordRef.value = '';
    nameRef.value = '';

    await router.push('/');
    isLoadingStore.set(false);
}

const register = async () => {
    await account.create(uuid(), emailRef.value, passwordRef.value, nameRef.value);

    await login();
}

</script>

<template>
    <div class="flex items-center justify-center min-h-screen w-full">
        <div class="rounded bg-sidebar w-1/4 p-5">
            <h1 class="text-2xl font-bold text-center mb-5">Login</h1>

            <form>
                <Input 
                    placeholder="Email" 
                    type="email" 
                    class="mb-3" 
                    v-model="emailRef" 
                />
                <Input 
                    placeholder="Password" 
                    type="password" 
                    class="mb-3" 
                    v-model="passwordRef" 
                    autocomplete="false"
                />
                <Input 
                    placeholder="Name" 
                    type="name" 
                    class="mb-3" 
                    v-model="nameRef" 
                />

                <div class="flex items-center justify-center gap-5">
                    <Button type="button" @click="login">Login</Button>
                    <Button type="button" @click="register">Registration</Button>
                </div>
            </form>
        </div>
    </div>
</template>