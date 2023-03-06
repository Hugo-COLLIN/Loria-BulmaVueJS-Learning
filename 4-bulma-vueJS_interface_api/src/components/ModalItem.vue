<template>
  <div class="modal" :class="{'is-active': showModal}">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">

      <header class="modal-card-head" :class="{'is-hidden': !hideNotification}">
        <p class="modal-card-title">Item information</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <form ref="itemAddForm">
        <section class="modal-card-body" :class="{'notification is-success': !hideNotification}">
          <div :class="{'is-hidden': hideNotification}">
            <p>Item added!</p>
          </div>

          <div :class="{'is-hidden': !hideNotification}">
            <div class="field">
              <div class="field">
                <label class="label">Title</label>
                <div class="control">
                  <input v-model="this.form.Name" :class="{'is-danger': error.Name}" class="input is-large" type="text" placeholder="e.g. Designing with Bulma" required>
                </div>
                <p class="help is-danger" v-if="error.Name">Please enter an item name</p>
              </div>
            </div>

            <div class="columns is-desktop">
              <div class="column">
                <label class="label">Price</label>
                <div class="control has-icons-left">
                  <input v-model="this.form.UnitPrice" class="input" type="number" placeholder="e.g. 22.99" required>
                  <span class="icon is-small is-left">
                      <i class="fa fa-dollar"></i>
                  </span>
                </div>
                <p class="help is-danger" v-if="error.UnitPrice">Please enter a price</p>
              </div>

              <div class="column">
                <label class="label">Duration (milliseconds /to change)</label>
                <div class="control">
                  <input v-model="this.form.Milliseconds" class="input" type="number" placeholder="e.g. 270" required>
                </div>
                <p class="help is-danger" v-if="error.Milliseconds">Please enter a duration</p>
              </div>

              <div class="column">
                <label class="label">Composers (comma separated)</label>
                <div class="control">
                  <input v-model="this.form.Composer" class="input" type="text" placeholder="e.g. 9781939902351" required>
                </div>
                <p class="help is-danger" v-if="error.Composer">Please enter compositors</p>
              </div>
            </div>

            <div class="field">
              <label class="label">Cover image</label>
              <div class="control">
                <div class="file has-name">
                  <label class="file-label">
                    <input class="file-input" type="file"> <!-- v-model="this.form.title"-->
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
                  <p class="help is-danger" v-if="error.coverImage">Please choose a picture</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </form>
      <footer class="modal-card-foot field" :class="{'is-hidden': !hideNotification}">
        <div class="buttons">
          <button class="button is-medium is-success" @click.prevent="sendModal">{{this.btnTitle}}</button>
          <button class="button" @click="closeModal">Cancel</button>
        </div>
      </footer>


    </div>
  </div>
</template>

<script>
export default {
  name: "ModalItem",
  data() {
    return {
      hideNotification: true,
      reportMessage: "",
      edit: false,
      btnTitle: "",

      form: {
        Name: "",
        UnitPrice: "",
        Milliseconds: "",
        Composer: "",
        publishDate: 2017,
        coverImage: "newbook.jpg"
      },
      error: {
        Name: false,
        UnitPrice: false,
        Milliseconds: false,
        Composer: false,
        publishDate: false,
        coverImage: false
      }
    };
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    reset: ['item', 'form']
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },

    resetModal() {
      this.reportMessage = "";
      this.closeModal();
    },

    sendModal() {
      this.resetErrors();

      for (let key in this.form)
        if (this.form[key] === "")
        {
          console.log(key)
          return this.error[key] = true;
        }

      this.resetErrors();

      //this.hideNotification = false;

      if (this.edit)
        this.$emit("edit-data", this.form);
      else
        this.$emit("sent-data", this.form);

/*
      setTimeout(() => {
        this.hideNotification = true;
        this.resetModal();
      }, 3000);*/
    },

    resetErrors() {
      for (let key in this.error)
        this.error[key] = false;
    },

    newForm() {
      this.edit = false;
      this.btnTitle = "Create item";

      /*
      for (let key in this.form)
        this.form[key] = "";
              */
      this.form.Name = "";
      this.form.UnitPrice = "";
      this.form.Milliseconds = "";
      this.form.Composer = "";
    },

    editForm(item)
    {
      this.edit = true;
      this.btnTitle = "Update item";

      for (let key in item)
        this.form[key] = item[key];
    }
  },
}
</script>

<style scoped>

</style>