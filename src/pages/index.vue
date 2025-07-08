<template>
  <v-container>
    <AdvForm :event-data="eventData" />
  </v-container>
</template>

<script lang="ts" setup>
  import type { EventData } from '@/types/EventData'
  import { daysBetween } from '@/helpers/dates'

  const eventData = ref<EventData>({
    id: 1,
    date: new Date('2025-08-10 18:00'),
    title: 'Koncert XYZ',
    city: 'Warszawa',
    freeSeats: 50,
    daysToEvent: 0,
  })

  onBeforeMount(() => {
    eventData.value.daysToEvent = daysBetween(new Date(), eventData.value.date)
  })
</script>
