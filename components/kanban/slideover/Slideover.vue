<script lang="ts" setup>
import { useDealSlideStore } from '~/store/deal-slide.store';

const dealStore = useDealSlideStore();

const isLocalOpen = computed({
    get: () => dealStore.isOpen,
    set: value => {
        dealStore.isOpen = value
    }
})

</script>

<template>
    <USlideover v-model:open="isLocalOpen" :ui="{ footer: 'justify-end' }">
        <template #body>
            <UCard class="flex flex-col flex-1 overflow-y-auto">
                <template #header>
                    <KanbanSlideoverTop />
                </template>
                <template #footer>
                    <KanbanSlideoverComments />
                </template>
            </UCard>
        </template>
    </USlideover>
</template>