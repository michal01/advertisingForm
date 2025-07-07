<template>
  <v-container max-width="800">
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
          <v-col class="py-0">{{ event[label.value] }}</v-col>
          <dd></dd>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title
        class="mb-4 bg-primary"
      >
        Nowe zlecenie kampanii Biletyna.Ads
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Data rozpoczęcia kampanii"
                v-model="campaign.startDate"
                type="date"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Data zakończenia kampanii"
                v-model="campaign.endDate"
                type="date"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Budżet całkowity netto"
                v-model="campaign.totalBudget"
                type="number"
                :rules="[budgetRule]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Czas trwania kampanii w dniach"
                v-model="campaign.duration"
                type="number"
                :rules="[durationRule]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-checkbox
            label="Akceptuję regulamin zleceń płatnej reklamy"
            v-model="campaign.acceptTerms"
            :rules="[acceptTermsRule]"
          ></v-checkbox>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="!valid" color="primary" @click="sendAdvOrder">
          Zapisz
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
const event = ref({
  id: 1,
  date: '2023-12-01 18:00',
  title: 'Koncert XYZ',
  city: 'Warszawa',
  freeSeats: 50,
  daysToEvent: 10,
});

const eventLabels = ref([
  { text: 'ID wydarzenia', value: 'id' },
  { text: 'Data wydarzenia', value: 'date' },
  { text: 'Tytuł', value: 'title' },
  { text: 'Miasto', value: 'city' },
  { text: 'Wolne miejsca', value: 'freeSeats' },
  { text: 'Dni do wydarzenia', value: 'daysToEvent' },
]);

const campaign = ref({
  startDate: '',
  endDate: '',
  totalBudget: 0,
  duration: 1,
  acceptTerms: false,
});

const valid = ref(false);

const budgetRule = (value: number) =>
  value >= 210 || 'Minimalna wartość zamówienia to 210zł';
const durationRule = (value: number) =>
  value >= 1 || 'Czas kampanii musi wynosić co najmniej 1 dzień';
const acceptTermsRule = (value: boolean) =>
  value || 'Musisz zaakceptować regulamin';

const sendAdvOrder = () => {
  if (valid.value) {
    console.log('Zlecenie kampanii:', campaign.value);
    alert('Zlecenie zostało zapisane!');
  }
};
</script>
