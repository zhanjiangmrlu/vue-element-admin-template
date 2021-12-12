<template>
  <div class="appraise">
    <div>售后评价列表</div>
  </div>
</template>

<script>
import appraiseJson from "@/json/appraise.json";

export default {
  name: "Appraise",
  data() {
    return {};
  },
  created() {
    const { resultData } = appraiseJson;
    console.log("appraiseJson", resultData);
  },
};
</script>

<style lang="scss" scoped></style>
