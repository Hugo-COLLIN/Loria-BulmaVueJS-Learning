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
              <template v-for="(item,key) in formStruct">
                <div class="field">
                  <div class="columns is-desktop">
                    <template v-for="(item2,key2) in item">
                      <div class="column">
                        <label class="label">{{ item2.label }}</label>
                        <div class="control" :class="{'has-icons-left': item2.icon !== '' && item2.icon !== undefined }">
                          <input :name="key2" v-model="this.form[item2.name]" class="input" :class="item2.classes, {'is-danger' : this.error[item2.name]}" :placeholder="item2.placeholder" required :type="item2.type">
                          <span v-if="item2.icon !== '' && item2.icon !== undefined" class="icon is-small is-left">
                            <i :class="item2.icon"></i>
                          </span>
                        </div>
                        <p v-if="this.error[item2.name]" class="help is-danger">Please enter {{ item2.label.toLowerCase() }}</p>
                      </div>
                    </template>
                  </div>
                </div>
              </template>

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

      form: {},
      error: {},
      formStruct: {},
      itemAttributes: {}
    };
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    reset: ['item', 'form'],

    item: {
      type: Object,
      default: null
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

    // initForm() {
    //   this.formStruct = this.$store.state.formStruct;
    //   this.setFieldsDefault();
    // },

    sendModal() {
      let isErrors = false;
      this.resetErrors();

      // Convert minutes to milliseconds
      if (this.form.Milliseconds !== undefined) this.form.Milliseconds *= 60000;

      // Check if all fields are filled else return error
      for (let key in this.form) {
        // console.log(key)
        if (this.form[key] === "") {
          console.log(key)
          console.log(this.formStruct)
          if (this.form.Milliseconds !== undefined) this.form.Milliseconds /= 60000;
          this.error[key] = true;
          isErrors = true;
        }
      }
      if (isErrors) return;

      this.resetErrors();

      //this.hideNotification = false;
      // console.log(this.form)

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

    setFieldsDefault() {
      for (let key in this.itemAttributes)
        if (typeof(this.itemAttributes[key]) === "string")
          this.form[key] = "";
        else if (typeof(this.itemAttributes[key]) === "number")
          this.form[key] = 1;
        else if (typeof(this.itemAttributes[key]) === "boolean")
          this.form[key] = false;
        else if (typeof(this.itemAttributes[key]) === "object")
          this.form[key] = null;

    },

    setItemAttributes(itemAttributes) {
      this.itemAttributes = itemAttributes;
    },

    cleanFields() {
      for (let key in this.form)
        delete this.form[key];
    },
    /*
      Reset all fields
     */
    newForm() {
      this.edit = false;
      this.btnTitle = "Create item";

      // Reset all fields
      this.cleanFields();
      this.setFieldsDefault();
      console.log(this.item)
      console.log(this.form)

      console.log(this.error)

      // this.form.Name = "";
      // this.form.UnitPrice = "";
      // this.form.Milliseconds = "";
      // this.form.Composer = "";
      // TODO : implement these fields and set them by default to error value (-1)
      // this.form.AlbumId = 5;
      // this.form.MediaTypeId = 1;
      // this.form.GenreId = 1;
      // this.form.Bytes = 1111;
    },

    editForm(item)
    {
      this.edit = true;
      this.btnTitle = "Update item";

      this.setFieldsDefault();
      for (let key in item)
        this.form[key] = item[key];
      this.form.Milliseconds /= 60000;
    },

    setFormStruct(formStruct) {
      this.formStruct = formStruct;
      console.log(this.formStruct)
      for (let key in this.formStruct) {
        console.log(key + ":")
        for (let key2 in this.formStruct[key]) {
          console.log(this.formStruct[key][key2])
          this.error[this.formStruct[key][key2].name] = false;
        }
      }
      console.log(this.error)
    },

  },

  mounted() {
    this.setFieldsDefault();
  }
}
</script>

<style scoped>
.modal-card > * {
  overflow: auto;
}
</style>