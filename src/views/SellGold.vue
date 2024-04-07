<template>
  <div class="card flex justify-content-center">
    <Stepper>
      <StepperPanel >
        <template #content="{ nextCallback }">
          <div class="flex flex-column h-12rem">
            <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              <DataTable
                  ref="dt"
                  v-model:selection="selectedTlAccount"
                  selection-mode="single"
                  :value="tlAccounts"
                  removable-sort
                  striped-rows
                  scrollable
                  scroll-height="800px"
                  data-key="id"
                  :filters="filters"
                  @row-click="nextCallback"
              >
                <template #header>
                  <div
                      class="flex flex-wrap gap-2 align-items-center justify-content-between"
                  >
                    <h4 class="m-0">Vadesiz Hesabima</h4>
                    <IconField icon-position="left">
                      <InputIcon>
                        <i class="pi pi-search" />
                      </InputIcon>
                      <InputText
                          v-model="filters['global'].value"
                          placeholder="Search..."
                      />
                    </IconField>
                  </div>
                </template>

                <Column
                    field="name"
                    header="Name"
                    sortable
                    style="min-width: 12rem"
                ></Column>
                <Column
                    field="balance"
                    header="Balance"
                    sortable
                    style="min-width: 8rem"
                ></Column>
              </DataTable>
            </div>
          </div>

        </template>
      </StepperPanel>
      <StepperPanel >
        <template #content="{prevCallback, nextCallback }">
          <div class="flex flex-column h-12rem">
            <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              <DataTable
                  ref="dt"
                  v-model:selection="selectedGoldAccount"
                  selection-mode="single"
                  :value="goldAccounts"
                  removable-sort
                  striped-rows
                  scrollable
                  scroll-height="800px"
                  data-key="id"
                  :filters="filters"
                  @row-click="nextCallback"
              >
                <template #header>
                  <div
                      class="flex flex-wrap gap-2 align-items-center justify-content-between"
                  >
                    <h4 class="m-0">Altin Hesabimdan</h4>
                    <IconField icon-position="left">
                      <InputIcon>
                        <i class="pi pi-search" />
                      </InputIcon>
                      <InputText
                          v-model="filters['global'].value"
                          placeholder="Search..."
                      />
                    </IconField>
                  </div>
                </template>

                <Column
                    field="name"
                    header="Name"
                    sortable
                    style="min-width: 12rem"
                ></Column>
                <Column
                    field="balance"
                    header="Balance"
                    sortable
                    style="min-width: 8rem"
                ></Column>
              </DataTable>
            </div>
          </div>
          <div class="flex pt-4 justify-content-between">
            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
          </div>
        </template>
      </StepperPanel>

      <StepperPanel >
        <template #content="{ prevCallback, nextCallback }">
          <div class="flex flex-column h-12rem">
            <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              <div class="field">
                <InputText
                    v-model="amount"
                    placeholder="Satilacak miktari giriniz"
                />
              </div>
            </div>
          </div>
          <div class="flex pt-4 justify-content-between">
            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
            <Button v-if="amount" label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" />
          </div>
        </template>
      </StepperPanel>
      <StepperPanel >
        <template #content="{ prevCallback, nextCallback }">
          <div class="flex flex-column h-12rem">
            <div class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              <Card>
                <template #header>
                  <h4>Confirmation</h4>
                </template>
                <template #content>
                  <Card>
                    <template #header>
                      <h5>Altin Hesabi</h5>
                    </template>
                    <template v-if="selectedGoldAccount" #content>
                      <p>{{ selectedGoldAccount.name }}</p>
                      <p>{{ selectedGoldAccount.balance }} </p>
                    </template>
                    <template v-else #content>
                      <p>Altin Hesabi secilmedi</p>
                    </template>
                  </Card>
                  <Card>
                    <template #header>
                      <h5>Vadesiz Hesabi</h5>
                    </template>
                    <template v-if="selectedTlAccount" #content>
                      <p>{{ selectedTlAccount.name }}</p>
                      <p>{{ selectedTlAccount.balance }}</p>
                    </template>
                    <template v-else #content>
                      <p>Vadesiz Hesabi secilmedi</p>
                    </template>
                  </Card>
                  <Card>
                    <template #header>
                      <h5>Satilan Altin Tutar</h5>
                    </template>
                    <template v-if="amount" #content>
                      <p>{{ amount }} gram</p>
                    </template>
                    <template v-else #content>
                      <p>Altin miktarini giriniz</p>
                    </template>
                  </Card>
                  <Card>
                    <template #header>
                      <h5>Satis Kuru</h5>
                    </template>
                    <template v-if="goldBuyingRate" #content>
                      <p>{{goldBuyingRate.price}} tl</p>
                    </template>
                  </Card>
                </template>
              </Card>
            </div>
          </div>
          <div class="flex pt-4 justify-content-between">
            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
            <Button label="Tamamla" icon="pi pi-arrow-right" iconPos="right" @click="sellGold" />
          </div>
        </template>
      </StepperPanel>
    </Stepper>
  </div>
</template>

<script>
import axios from "axios";
import {FilterMatchMode} from "primevue/api";
export default {
  name: "SellGold",
  data() {
    return {
      goldAccounts: [],
      tlAccounts: [],
      selectedGoldAccount: null,
      selectedTlAccount: null,
      amount: null,
      goldBuyingRate: null,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    };
  },
  created() {
    this.getGoldAccounts();
    this.getGoldBuyingRate();
  },
  methods: {
    async getGoldAccounts() {
      try {
        const response = await axios.get("http://localhost:8080/users/1/accounts");
        this.goldAccounts = response.data.filter((account) => account.type === "gold");
        this.tlAccounts = response.data.filter((account) => account.type === "tl");
      } catch (error) {
        console.error(error);
      }
    },
    async getGoldBuyingRate() {
      try {
        const response = await axios.post("http://localhost:8080/gold/calculate-value");
        this.goldBuyingRate = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async sellGold() {
      try {
        const response = await axios.post("http://localhost:8080/gold/sell", {
          userId: 1,
          goldAccountId: this.selectedGoldAccount.id,
          tlAccountId: this.selectedTlAccount.id,
          goldId: this.goldBuyingRate.id,
          amount: this.amount,
        });
        this.$toast.add({
          severity: "success",
          summary: "Basarili",
          detail: 'Altin satimi basarili',
          life: 3000,
        });
        this.$router.push({ name: "Home", });
      } catch (error) {
        console.error(error);
      }
    },
  },
}
</script>

<style scoped>
.p-stepper {
  flex-basis: 50rem;
}
</style>