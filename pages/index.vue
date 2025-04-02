<script lang="ts" setup>
import { useMutation } from '@tanstack/vue-query';
import dayjs from 'dayjs';
import { COLLECTION_DEALS, DB_ID } from '~/app.constants';
import { generateColumnStyle } from '~/components/kanban/generate-gradient';
import type { ICard, IColumn } from '~/components/kanban/kanban.types';
import { useKanbanQuery } from '~/components/kanban/useKanbanQuery';
import { useDealSlideStore } from '~/store/deal-slide.store';
import { EnumStatus } from '~/types/deals.types';

useSeoMeta({
    title: 'Home | CRM System'
});

const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const { data, isLoading, refetch } = useKanbanQuery();
const dealStore = useDealSlideStore();

type TypeMutationVariables = {
    docId: string
    status?: EnumStatus
}

const { mutate } = useMutation({
    mutationKey: ['move card'],
    mutationFn: ({ docId, status }: TypeMutationVariables) =>
        DB.updateDocument(DB_ID, COLLECTION_DEALS, docId, {
            status
        }),
    onSuccess: () => {
        refetch();
    }
});

function handleDragStart(card: ICard, column: IColumn) {
    dragCardRef.value = card;
    sourceColumnRef.value = column;
}

function handleDragOver(event: DragEvent) {
    event.preventDefault();
}

function handleDrop(targetColumn: IColumn) {
    if (dragCardRef.value && sourceColumnRef.value) {
        mutate({ docId: dragCardRef.value.id, status: targetColumn.id });
    }
}

</script>

<template>
    <div class="p-10">
        <h1 class="font-bold text-2xl mb-10">CRM System</h1>
        <div v-if="isLoading">Loading...</div>
        <div v-else>
            <div class="grid grid-cols-5 gap-16">
                <div v-for="(column, index) in data" :key="column.id" @dragover="handleDragOver"
                    @drop="() => handleDrop(column)"
                    class="min-h-screen"
                >

                    <div class="rounded bg-slate-700 py-1 px-5 mb-2 text-center"
                        :style="generateColumnStyle(index, data?.length)">
                        {{ column.name }}
                    </div>
                    <div>
                        <KanbanCreateDeal :refetch="refetch" :status="column.id" />
                        <Card 
                            v-for="card in column.items"
                            class="mb-5 bg-sidebar"
                            draggable="true"
                            :key="card.id"
                            @dragstart="() => handleDragStart(card, column)"
                        >
                            <CardHeader role="button" @click="dealStore.set(card)">
                                <CardTitle>{{ card.name }}</CardTitle>
                                <CardDescription class="mt-2 block">{{ convertCurrency(card.price) }}</CardDescription>
                            </CardHeader>

                            <CardContent class="text-xs">{{ card.companyName }}</CardContent>
                            <CardFooter>{{ dayjs(card.$createdAt).format('DD MMMM YYYY') }}</CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
            <KanbanSlideover />
        </div>
    </div>
</template>