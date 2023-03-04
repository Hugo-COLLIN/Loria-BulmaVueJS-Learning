<template>
  <div class="modal" :class="{'is-active': showModal}">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">

      <header class="modal-card-head" :class="{'is-hidden': !hideNotification}">
        <p class="modal-card-title">Book information</p>
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
                  <input v-model="this.form.title" :class="{'is-danger': error.title}" class="input is-large" type="text" placeholder="e.g. Designing with Bulma" required>
                </div>
                <p class="help is-danger" v-if="error.title">Please enter a title</p>
              </div>
            </div>

            <div class="columns is-desktop">
              <div class="column">
                <label class="label">Price</label>
                <div class="control has-icons-left">
                  <input v-model="this.form.price" class="input" type="number" placeholder="e.g. 22.99" required>
                  <span class="icon is-small is-left">
                      <i class="fa fa-dollar"></i>
                  </span>
                </div>
                <p class="help is-danger" v-if="error.price">Please enter a price</p>
              </div>

              <div class="column">
                <label class="label">Pages</label>
                <div class="control">
                  <input v-model="this.form.pages" class="input" type="number" placeholder="e.g. 270" required>
                </div>
                <p class="help is-danger" v-if="error.pages">Please enter a title</p>
              </div>

              <div class="column">
                <label class="label">ISBN</label>
                <div class="control">
                  <input v-model="this.form.isbn" class="input" type="text" placeholder="e.g. 9781939902351" required>
                </div>
                <p class="help is-danger" v-if="error.isbn">Please enter a title</p>
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
                  <p class="help is-danger" v-if="error.coverImage">Please enter a title</p>
                </div>
              </div>

            </div>
          </div>
        </section>
        <footer class="modal-card-foot field" :class="{'is-hidden': !hideNotification}">
          <div class="buttons field">
            <button class="button is-medium is-success" @click.prevent="sendModal">Create book</button>
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
      reportMessage: "",

      form: {
        title: "",
        price: "",
        pages: "",
        isbn: "",
        publishDate: 2017,
        coverImage: "newbook.jpg"
      },
      error: {
        title: false,
        price: false,
        pages: false,
        isbn: false,
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
  methods: {/*
    saveBook() {
      this.form.publishDate = "2017";
      this.form.coverImage = "newbook.jpg";
      this.allBooks.push(this.form);
      this.sendModal();
    },*/
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
      this.$emit("sent-data", this.form);
      //console.log(this.form)
/*
      for (let key in this.form)
        this.form[key] = "";
 */
      //TODO: execute before calling the form
      // this.form.title = "";
      // this.form.price = "";
      // this.form.pages = "";
      // this.form.isbn = "";


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

    resetForm() {
      /*
      for (let key in this.form)
        this.form[key] = "";
              */
      this.form.title = "";
      this.form.price = "";
      this.form.pages = "";
      this.form.isbn = "";
    },

    greet(name) {
      console.log(`hello world ${name}`);
    },
  },
  /*
  mounted() {
    this.reset.bus.$on('edit-item', this.resetForm);

  }*/
}
</script>

<style scoped>

</style>