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
                  <input v-model="this.form.Name" :class="{'is-danger': error.Name}" class="input is-large" type="text" placeholder="Title" name="title" required>
                </div>
                <p class="help is-danger" v-if="error.Name">Please enter an item name</p>
              </div>
            </div>

            <div class="columns is-desktop">
              <div class="column">
                <label class="label">Price</label>
                <div class="control has-icons-left">
                  <input v-model="this.form.UnitPrice" class="input" type="number" placeholder="e.g. 22.99" name="price" required>
                  <span class="icon is-small is-left">
                      <i class="fa fa-dollar"></i>
                  </span>
                </div>
                <p class="help is-danger" v-if="error.UnitPrice">Please enter a price</p>
              </div>

              <div class="column">
                <label class="label">Duration (minutes)</label>
                <div class="control">
                  <input v-model="this.form.Milliseconds" class="input" type="number" placeholder="e.g. 270" name="duration" required>
                </div>
                <p class="help is-danger" v-if="error.Milliseconds">Please enter a duration</p>
              </div>

              <div class="column">
                <label class="label">Composers (comma separated)</label>
                <div class="control">
                  <input v-model="this.form.Composer" class="input" type="text" placeholder="e.g. 9781939902351" name="composer" required>
                </div>
                <p class="help is-danger" v-if="error.Composer">Please enter composers</p>
              </div>
            </div>

<!--            <div class="field">-->
<!--              <label class="label">Cover image</label>-->
<!--              <div class="control">-->
<!--                <div class="file has-name">-->
<!--                  <label class="file-label">-->
<!--                    <input class="file-input" type="file"> &lt;!&ndash; v-model="this.form.title"&ndash;&gt;-->
<!--                    <span class="file-cta">-->
<!--                       <span class="file-icon">-->
<!--                        <i class="fa fa-upload"></i>-->
<!--                       </span>-->
<!--                         <span class="file-label">-->
<!--                          Choose a file…-->
<!--                         </span>-->
<!--                       </span>-->

<!--                    <span class="file-name">-->
<!--                       No file chosen-->
<!--                    </span>-->
<!--                  </label>-->
<!--                  <p class="help is-danger" v-if="error.coverImage">Please choose a picture</p>-->
<!--                </div>-->
<!--              </div>-->

<!--            </div>-->
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
/*
  This component is used to create a new item or edit an existing one.
 */
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
      },
      error: {
        Name: false,
        UnitPrice: false,
        Milliseconds: false,
        Composer: false,
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

      // Convert minutes to milliseconds
      this.form.Milliseconds *= 60000;

      // Check if all fields are filled else return error
      for (let key in this.form)
        if (this.form[key] === "")
        {
          console.log(key)
          return this.error[key] = true;
        }

      this.resetErrors();

      //this.hideNotification = false;

      // Send data to parent component
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

    /*
      Reset all errors
     */
    resetErrors() {
      for (let key in this.error)
        this.error[key] = false;
    },
    /*
      Reset all fields
     */
    newForm() {
      this.edit = false;
      this.btnTitle = "Create item";

      // Reset all fields
      for (let key in this.form)
        if (typeof(this.form[key]) === "string")
          this.form[key] = "";
      /*this.form.Name = "";
      this.form.UnitPrice = "";
      this.form.Milliseconds = "";
      this.form.Composer = "";*/
      //TODO : implement these fields and set them by default to error value (-1)
      this.form.AlbumId = 5;
      this.form.MediaTypeId = 1;
      this.form.GenreId = 1;
      this.form.Bytes = 1111;
    },

    editForm(item)
    {
      this.edit = true;
      this.btnTitle = "Update item";

      for (let key in item)
        this.form[key] = item[key];
      this.form.Milliseconds /= 60000;
    }
  },
}
</script>

<style scoped>

</style>