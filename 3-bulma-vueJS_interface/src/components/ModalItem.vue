<template>
  <div class="modal" :class="{'is-active': showModal}">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">
      <form>
        <header class="modal-card-head" :class="{'is-hidden': !hideNotification}">
          <p class="modal-card-title">Book information</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body" :class="{'notification is-success': !hideNotification}">
          <div :class="{'is-hidden': hideNotification}">
            <p>Item added!</p>
          </div>

          <div :class="{'is-hidden': !hideNotification}">
            <div class="field">
              <div class="field">
                <label class="label">Title</label>
                <div class="control">
                  <input class="input is-large" type="text" placeholder="e.g. Designing with Bulma" required>
                </div>
              </div>
            </div>

            <div class="columns is-desktop">
              <div class="column">
                <label class="label">Price</label>
                <div class="control has-icons-left">
                  <input class="input" type="number" placeholder="e.g. 22.99" required>
                  <span class="icon is-small is-left">
                                      <i class="fa fa-dollar"></i>
                                  </span>
                </div>
              </div>
              <div class="column">
                <label class="label">Pages</label>
                <div class="control">
                  <input class="input" type="number" placeholder="e.g. 270" required>
                </div>
              </div>
              <div class="column">
                <label class="label">ISBN</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g. 9781939902351" required>
                </div>
              </div>
            </div>

            <div class="field">
              <label class="label">Cover image</label>
              <div class="control">
                <div class="file has-name">
                  <label class="file-label">
                    <input class="file-input" type="file">
                    <span class="file-cta">
                       <span class="file-icon">
                        <i class="fa fa-upload"></i>
                       </span>
                         <span class="file-label">
                          Choose a file…
                         </span>
                       </span>

                    <span class="file-name">
                       No file chosen
                       </span>
                  </label>
                </div>
              </div>

            </div>
          </div>
        </section>
        <footer class="modal-card-foot field" :class="{'is-hidden': !hideNotification}">
          <div class="buttons field">
            <button class="button is-medium is-success" @click="sendReport">Create book</button>
            <button class="button" @click="closeModal">Cancel</button>
          </div>
        </footer>
      </form>

    </div>
  </div>
</template>

<script>
export default {
  name: "ModalItem",
  data() {
    return {
      hideNotification: true,
      reportMessage: ""
    };
  },
  props: {
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

      setTimeout(() => {
        this.hideNotification = true;
        this.resetModal();
      }, 3000);
    }
  },
}
</script>

<style scoped>

</style>