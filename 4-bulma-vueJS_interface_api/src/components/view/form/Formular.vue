<!-- Formular -->
<!-- Hugo COLLIN, 20/03/2023 -->
<!-- This component is used to create a form
     It's set with a list of nested arrays of objects
     to create multiple fields in a row and multiple rows.
-->

<template>
  <form class="container is-inline">

    <div>
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
        <div class="buttons">
            <button class="button is-medium is-success" @click.prevent="sendForm">{{this.btnTitle}}</button>
            <button class="button" @click.prevent="cancel">Cancel</button>
        </div>
    </div>
    <!--          <Teleport to=".modal-card-foot" :disabled="!this.teleportState">-->

    <!--          </Teleport>-->

    <!--          <portal to="modal-footer">-->
    <!--            <div class="buttons">-->
    <!--              <button class="button is-medium is-success" @click.prevent="sendModal">{{this.btnTitle}}</button>-->
    <!--              <button class="button" @click="closeModal">Cancel</button>-->
    <!--            </div>-->
    <!--          </portal>-->
  </form>
<!--  <button class="button" @click.prevent="closeModal">Cancel</button>-->
<!--  TODO: Bugs events-->

</template>

<script>
// import {Portal} from "portal-vue";
export default {
  name: "Formular",
  emits: ["close", "sent-data", "edit-data"],
  components: {
    // Portal
  },
  data() {
    return {
      edit: false,
      btnTitle: "",
      // teleportState: false,

      form: {},
      error: {},
      formStruct: {},
      itemAttributes: {}
    };
  },
  methods: {
    /** @vuese
     * Abort the form
     */
    cancel() {
      console.log("cancel - Formular.vue")
      this.$emit("close");
    },

    /** @vuese
     * Send the form
     */
    sendForm() {
      let isErrors = false;
      this.resetErrors();

      // Check if all fields are filled
      for (let key in this.form) {
        if (this.form[key] === "" || this.form[key] === null || this.form[key] === undefined /*|| this.form[key] === 0*/) //TODO: implement required/not required fields, string check can cause pb if field not implemented in the form, but can cause axios error if check not implemented
        {
          this.error[key] = true;
          isErrors = true;
        }
      }
      // Return error if not all fields are filled
      if (isErrors) return;

      this.resetErrors();

      // Convert minutes to milliseconds
      if (this.form.Milliseconds !== undefined) this.form.Milliseconds *= 60000;

      // Send data to parent component
      if (this.edit)
        // use the form content to edit the item
        this.$emit("edit-data", this.form);
      else
        // use the form content to create an item
        this.$emit("sent-data", this.form);
    },

    /* @vuese
      Reset all errors
     */
    resetErrors() {
      for (let key in this.error)
        this.error[key] = false;
    },

    /** @vuese
     * Set default values for all fields
     */
    setFieldsDefault() {
      for (let key in this.itemAttributes)
        if (typeof(this.itemAttributes[key]) === "string")
          this.form[key] = "";
        else if (typeof(this.itemAttributes[key]) === "number")
          this.form[key] = 1; //TODO: 0
        else if (typeof(this.itemAttributes[key]) === "boolean")
          this.form[key] = false;
        else if (typeof(this.itemAttributes[key]) === "object")
          this.form[key] = null;

    },

    /** @vuese
     * Set the structure of the form
     * @param itemAttributes
     */
    setItemAttributes(itemAttributes) {
      this.itemAttributes = itemAttributes;
    },

    /** @vuese
     * Delete all the this.form object properties'
     */
    cleanFields() {
      for (let key in this.form)
        delete this.form[key];
    },

    /** @vuese
     * Prepare the form to create a new item
     */
    newForm() {
      this.edit = false;
      this.btnTitle = "Create item";

      // Reset all fields
      this.cleanFields();
      this.setFieldsDefault();

      // this.teleportState = true; // teleport try
    },

    /** @vuese
     * Prepare the form to edit an item
     * @param item
     */
    editForm(item)
    {
      this.edit = true;
      this.btnTitle = "Update item";

      this.setFieldsDefault();
      for (let key in item)
        this.form[key] = item[key];
      this.form.Milliseconds /= 60000;
    },

    /** @vuese
     * Set the form structure
     * @param formStruct
     */
    setFormStruct(formStruct) {
      this.formStruct = formStruct;
      for (let key in this.formStruct) {
        for (let key2 in this.formStruct[key]) {
          this.error[this.formStruct[key][key2].name] = false;
        }
      }
      console.log(this.error)
    },

  },

  /** @vuese
   * Set default values for all fields
   */
  mounted() {
    this.setFieldsDefault();
  }
}
</script>