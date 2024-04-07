<script>
export default {
  name: "Home"
}
</script>

<template>
  <Card>
    <template #title>Altin Islemleri</template>
  </Card>
  <Button label="Altin Alis" @click="$router.push({name:'BuyGold'})"/>
  <Button label="Altin Satis" @click="$router.push({name:'SellGold'})"/>
  <Button label="Islem Gecmisi" @click="$router.push({name:'TransactionHistory'})"/>
</template>

<style scoped>

</style>