<template>
  <v-card
    class="mb-4 pb-4"
  >
    <v-card-title class="mb-8 bg-primary">
      Promowane wydarzenia
    </v-card-title>
    <v-card-text>
      <v-row
        v-for="label in eventLabels"
        :key="label.value"
      >
        <v-col class="py-0">{{ label.text }}:</v-col>
        <v-col class="py-0">{{ formatValue(event[label.value]) }}</v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import type { EventData } from '@/types/EventData'
  import { formatDisplayDateWithHours } from '@/helpers/dates'

  defineProps<{
    event: EventData
    eventLabels: { text: string, value: keyof EventData }[]
  }>()

  const formatValue = (value: Date | string | number) => {
    return value instanceof Date ? formatDisplayDateWithHours(value) : value.toString()
  }

</script>
