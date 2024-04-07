<template>
  <div class="card flex justify-content-center">
              <DataTable
                  ref="dt"
                  :value="transactions"
                  removable-sort
                  striped-rows
                  scrollable
                  scroll-height="800px"
                  data-key="id"
                  :filters="filters"
              >
                <template #header>
                  <div
                      class="flex flex-wrap gap-2 align-items-center justify-content-between"
                  >
                    <h4 class="m-0">Islemler</h4>
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
                    field="type"
                    header="type"
                    sortable
                    style="min-width: 12rem"
                ></Column>
                <Column
                    field="amount"
                    header="amount gr"
                    sortable
                    style="min-width: 8rem"
                ></Column>
                <Column
                    field="price"
                    header="price tl"
                    sortable
                    style="min-width: 8rem"
                ></Column>
                <Column
                    field="fee"
                    header="fee"
                    sortable
                    style="min-width: 8rem"
                ></Column>
                <Column
                    field="createdAt"
                    header="createdAt"
                    sortable
                    style="min-width: 8rem"
                ></Column>
              </DataTable>

  </div>
  <Button label ='Ana sayfa' @click="$router.push('/')" />

</template>

<script>
import axios from "axios";
import {FilterMatchMode} from "primevue/api";
export default {
  name: "TransactionHistory",
  data() {
    return {
      transactions: [],
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    };
  },
  created() {
    this.getTransactions();
  },
  methods: {
    async getTransactions() {
      try {
        const response = await axios.get("http://localhost:8080/users/1/transactions");
        this.transactions = response.data;
        console.log(this.transactions);
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