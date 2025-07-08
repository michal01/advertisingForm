<template>
  <v-card>
    <v-card-title class="mb-8 bg-success">
      Sukces! Twoje zlecenie zostało wysłane.
      <v-icon class="ml-2" color="white">mdi-check-circle</v-icon>
    </v-card-title>
    <v-card-text>
      <p>Zleciłeś kampanię Biletyna.Ads</p>
    </v-card-text>
    <v-card-actions class="justify-center pb-4">
      <v-btn
        color="primary"
        variant="elevated"
        @click="$emit('close')"
      >
        Złóż nowe zlecenie
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
  defineEmits<{
    (e: 'close'): void
  }>()
</script>
