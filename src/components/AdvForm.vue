<template>
  <v-container max-width="800">
    <event-information
      :event="eventData"
      :event-labels="eventLabels"
    />

    <transition mode="out-in" name="fade">
      <adv-form-success v-if="formSended" @close="close" />
      <v-card v-else>
        <v-card-title
          class="mb-4 bg-primary"
        >
          Nowe zlecenie kampanii Biletyna.Ads
        </v-card-title>
        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="sendAdvOrder"
        >
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-date-input
                  v-model="campaign.startDate"
                  append-inner-icon="mdi-calendar-month-outline"
                  color="primary"
                  :display-format="formatDisplayDate"
                  label="Data rozpoczęcia kampanii"
                  :max="eventData.date"
                  messages="opcjonalnie, standardowo rozpoczyna się tak szybko, jak to możliwe"
                  :min="tomorrow"
                  prepend-icon=""
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-date-input
                  v-model="campaign.endDate"
                  append-inner-icon="mdi-calendar-month-outline"
                  color="primary"
                  :display-format="formatDisplayDate"
                  label="Data zakończenia kampanii"
                  messages="opcjonalnie, standardowo optymalizujemy dziennie wydatki"
                  :min="campaign.startDate"
                  prepend-icon=""
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="campaign.totalBudget"
                  color="primary"
                  label="Budżet całkowity netto"
                  :rules="[budgetRule, minDayBudgetRule]"
                  type="number"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="campaign.duration"
                  color="primary"
                  label="Czas trwania kampanii w dniach"
                  :rules="[durationRule]"
                  type="number"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col class="px-4">
                <p class="pb-4">
                  Dzienny koszt kampanii wynosi {{ (campaign.totalBudget / campaign.duration).toFixed(2) }} zł.
                </p>
                <p>
                  Uwaga! Minimalny dzienny budżet wynosi {{ minDayBudget }} zł<br>
                  Przedłużenie czasu trwania kampanii, powoduje zwięksenie budżetu netto.
                </p>
              </v-col>
            </v-row>
            <v-checkbox
              v-model="campaign.acceptTerms"
              color="primary"
              label="Akceptuję regulamin zleceń płatnej reklamy"
              :rules="[acceptTermsRule]"
            />
          </v-card-text>
          <v-card-actions class="justify-center pb-4">
            <v-btn
              color="primary"
              type="submit"
              variant="elevated"
            >
              Zapisz
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </transition>
  </v-container>
</template>

<script lang="ts" setup>
  import type { EventData } from '@/types/EventData'
  import { dateAfterXDays, daysBetween, formatDisplayDate } from '@/helpers/dates'
  import { Campaign } from '@/types/Campaign'

  const minDayBudget = 30
  const minBudget = 210
  const tomorrow = dateAfterXDays(new Date(), 1)

  defineProps<{
    eventData: EventData
  }>()

  const eventLabels = ref<{ text: string, value: keyof EventData }[]>([
    { text: 'ID wydarzenia', value: 'id' },
    { text: 'Data wydarzenia', value: 'date' },
    { text: 'Tytuł', value: 'title' },
    { text: 'Miasto', value: 'city' },
    { text: 'Wolne miejsca', value: 'freeSeats' },
    { text: 'Dni do wydarzenia', value: 'daysToEvent' },
  ])

  const campaign = ref<Campaign>(new Campaign(tomorrow, dateAfterXDays(tomorrow, 7), minDayBudget))

  const valid = ref(false)
  const formSended = ref(false)

  const budgetRule = (value: number) =>
    value >= minBudget || `Minimalna wartość zamówienia to ${minBudget} zł`
  const minDayBudgetRule = (value: number) =>
    value / campaign.value.duration >= minDayBudget || `Minimalny dzienny budżet to ${minDayBudget} zł`
  const durationRule = (value: number) =>
    value >= 1 || `Czas kampanii musi wynosić co najmniej 1 dzień`
  const acceptTermsRule = (value: boolean) =>
    value || 'Musisz zaakceptować regulamin'

  const sendAdvOrder = () => {
    if (valid.value) {
      console.log('Zlecenie kampanii:', campaign.value)
      // Wywołanie metody wysyałania zlecenia kampanii
      formSended.value = true
    }
  }

  const close = () => {
    valid.value = false
    formSended.value = false
    campaign.value = new Campaign(tomorrow, dateAfterXDays(tomorrow, 7), minDayBudget)
  }

  watch(() => campaign.value.duration, (newDuration, oldDuration) => {
    if (newDuration > oldDuration && campaign.value.totalBudget / newDuration < minDayBudget) {
      campaign.value.totalBudget = newDuration * minDayBudget
    }
    campaign.value.endDate = dateAfterXDays(campaign.value.startDate, newDuration - 1)
  })

  watch([() => campaign.value.startDate, () => campaign.value.endDate], ([newStartDate, newEndDate]) => {
    if (newStartDate && newEndDate) {
      campaign.value.duration = daysBetween(newStartDate, newEndDate) + 1
      if (campaign.value.totalBudget / campaign.value.duration < minDayBudget) {
        campaign.value.totalBudget = campaign.value.duration * minDayBudget
      }
    }
  })
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity position 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
