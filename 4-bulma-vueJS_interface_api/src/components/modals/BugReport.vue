<template>
  <div :class="{'is-active': showModal}" class="modal">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Modal title</p>
        <button aria-label="close" class="delete" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <div :class="{'is-hidden': hideNotification}" class="notification is-success">
          <p>
            <span class="icon"><i class="fa fa-bug"></i></span>
            Thanks. Your bug has been reported.
          </p>
          <p>We will do our best to fix it as soon as possible</p>
        </div>
        <p :class="{'is-hidden': hideNotification}" class="help">The following message was sent</p>
        <textarea v-model="reportMessage" :disabled="!hideNotification" class="textarea"
                  placeholder="Let us know what problems you faced."></textarea>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="sendReport">Save changes</button>
        <button class="button" @click="closeModal">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "BugReport",
  // the data that will be used in the component
  data() {
    return {
      hideNotification: true,
      reportMessage: ""
    };
  },
  // the properties that will be used in the component
  props: {
    // the showModal property will be used to show or hide the popup
    showModal: {
      type: Boolean,
      default: false
    }
  },
  methods: {

    closeModal() {
      this.$emit("close");
    },

    resetModal() {
      this.reportMessage = "";
      this.closeModal();
    },

    sendReport() {
      this.hideNotification = false;

      // TODO: Explain what is happening here
      setTimeout(() => {
        this.hideNotification = true;
        this.resetModal();
      }, 4000);
    }
  },
}
</script>

<style scoped>

</style>