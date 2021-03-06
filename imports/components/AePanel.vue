<template>
  <router-link v-if="to" class="ae-panel" :to="to">
    <div v-if="showProgressBar" class="progressbar" :style="progressbarStyle" />
    <div class="content">
      <header v-if="title || closeHandler">
        <h1>{{title}}</h1>
        <ae-close-button @click="close" />
      </header>
      <slot />
    </div>
  </router-link>
  <div v-else class="ae-panel">
    <div v-if="showProgressBar" class="progressbar" :style="progressbarStyle" />
    <div class="content">
      <header v-if="title || closeHandler">
        <h1>{{title}}</h1>
        <ae-close-button @click="closeHandler" />
      </header>
      <slot />
    </div>
  </div>
</template>

<script>
  import AeCloseButton from './AeCloseButton.vue';

  export default {
    props: {
      to: [String, Object],
      ratio: { type: Number, required: false },
      title: { type: String, required: false },
      closeHandler: { type: Function, required: false },
    },
    components: { AeCloseButton },
    computed: {
      progressbarStyle() {
        const pc = this.ratio * 100;
        return {
          backgroundImage:
            `linear-gradient(to right, var(--maegenta) ${pc}%, var(--aubergine) ${pc}%)`,
        };
      },
      showProgressBar() {
        return typeof this.ratio === 'number';
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "./variables";

  .ae-panel {
    border-radius: 10px;
    box-shadow: 0 4px 8px 2px rgba(60, 60, 60, 0.1); // added 2px spread
    max-width: $container-width;
    margin: 20px auto;
    box-sizing: border-box;
    overflow: hidden;
    display: block;
    text-decoration: none;
    background-color: $white;
    color: inherit;
    @media (max-width: $container-width) {
      margin-left: 10px;
      margin-right: 10px;
    }
    @media (max-width: $screen-phone) {
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .progressbar {
      content: "";
      display: block;
      width: 100%;
      height: 4px;
    }

    .content {
      padding: 30px;
      @media (max-width: $screen-phone) {
        padding: 20px;
      }

      header {
        display: flex;
        flex-direction: row;

        h1 {
          font-size: 28px;
          line-height: 50px;
          flex-grow: 1;
          font-weight: 500;
          margin: 0;
        }
      }
    }
  }
</style>
