<template>
  <div class="tags-select">
    <span v-for="t in tags" :key="t">
      <input
        type="checkbox"
        :id="t"
        :value="t"
        v-model="checkedTags"
      />
      <label :for="t"><ae-category>{{t}}</ae-category></label>
    </span>
  </div>
</template>

<script>
  import { Proposals } from '../../api/models/proposals';
  import AeCategory from '../../../components/AeCategory.vue';

  export default {
    props: {
      value: { type: Array, default: () => [] },
    },
    components: { AeCategory },
    data() {
      return {
        tags: Proposals.tags,
      };
    },
    computed: {
      checkedTags: {
        get() {
          return this.value;
        },
        set(v) {
          this.$emit('input', v);
        },
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../components/variables';

  .tags-select {
    text-align: center;
    margin: -10px;

    input {
      display: none;
    }

    label {
      display: inline-block;
      cursor: pointer;
    }

    input:not(:checked) + label > .ae-category {
      background-color: $grey;
    }

    .ae-category {
      height: 33px;
      line-height: 33px;
      font-size: 14px;
      min-width: 90px;
      margin: 10px;
    }
  }
</style>
