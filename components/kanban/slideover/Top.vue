<script lang="ts" setup>
import dayjs from 'dayjs';
import { useDealSlideStore } from '~/store/deal-slide.store';

const dealStore = useDealSlideStore();

</script>

<template>
    <div class="border-border bg-black/20 rounded p-3">
        <div class="uppercase bold text-xl mb-4">О сделке</div>
        <KanbanSlideoverLabel label-text="Наименование">
            <h2>
                {{ dealStore.card?.name }}
            </h2>
        </KanbanSlideoverLabel>
        <KanbanSlideoverLabel label-text="Сумма">
            {{ convertCurrency(dealStore.card?.price || 0) }}
        </KanbanSlideoverLabel>
        <KanbanSlideoverLabel label-text="Статус">
            <Badge variant="outline">
                {{ dealStore.card?.status }}
            </Badge>
        </KanbanSlideoverLabel>
        <KanbanSlideoverLabel label-text="Клиент">
            {{ dealStore.card?.companyName }}
        </KanbanSlideoverLabel>
        <KanbanSlideoverLabel label-text="Дата создания">
            {{ dayjs(dealStore.card?.$createdAt).format('DD MMMM YYYY') }}
        </KanbanSlideoverLabel>
    </div>
</template>