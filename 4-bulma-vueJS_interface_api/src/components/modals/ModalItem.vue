<!-- ModalItem.vue -->
<!-- Hugo COLLIN, 20/03/2023 -->
<!-- This component is used to create a new item or edit an existing one. -->
<!-- TODO : init formular component with initButton parameter to false -->

<template>
  <div class="modal" :class="{'is-active': showModal}">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">

      <header class="modal-card-head">
        <p class="modal-card-title">{{ this.modalTitle }}</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <Formular
            ref="formular"
          @edit-data="editData"
          @sent-data="sentData"
          @close="closeModal"></Formular>
      </section>

      <footer class="modal-card-foot field">
<!--        <div class="buttons">-->
<!--          <button class="button is-medium is-success" @click.prevent="sendModal">{{this.btnTitle}}</button>-->
<!--          <button class="button" @click="closeModal">Cancel</button>-->
<!--        </div>-->
<!--        <portal-target name="modal-footer"></portal-target>-->
      </footer>

    </div>
  </div>
</template>

<script>
/*
  This component is used to create a new item or edit an existing one.
 */
import Formular from "../view/form/Formular.vue";
// import {PortalTarget} from "portal-vue";
import PortalTarget from "portal-vue";

export default {
  name: "ModalItem",
  components: {
    Formular,
    // PortalTarget
  },
  data() {
    return {
      hideNotification: true,
      edit: false,
      btnTitle: "",
      modalTitle: "",
    };
  },
  props: {
    // determine if the modal is visible or not
    showModal: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    /** @vuese
     * Close the modal
     */
    closeModal() {
      // emitted to hide the modal
      this.$emit("close");
      // this.showModal = false;
    },

    /** @vuese
     * Reset the modal TODO delete this method
     */
    resetModal() {
      // this.reportMessage = "";
      this.closeModal();
    },

    /** @vuese
      * Reset all errors
      */
    resetErrors() {
      for (let key in this.error)
        this.error[key] = false;
    },

    /** @vuese
     * Reset all fields to default values
     */
    setFieldsDefault() {
      // console.log(this.itemAttributes)
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
     * Delete all fields
     */
    cleanFields() {
      for (let key in this.form)
        delete this.form[key];
    },

    /*
    --- FORM METHODS CALLS ---
     */
    /** @vuese
     * Set its structure to the formular component
     * @param formStruct
     */
    setFormStruct(formStruct) {
      this.$refs.formular.setFormStruct(formStruct);
    },

    /** @vuese
     * Set item attributes to the formular component
     * @param itemAttributes
     */
    setItemAttributes(itemAttributes) {
      this.$refs.formular.setItemAttributes(itemAttributes);
    },

    /** @vuese
     * Set the formular component to create a new item
     */
    newForm() {
      this.$refs.formular.newForm();
    },

    /** @vuese
     * Set the formular component to edit an existing item
     * @param item
     */
    editForm(item)
    {
      this.$refs.formular.editForm(item);
    },

    /*
    --- FORM EMITS REEMITED ---
     */
    /** @vuese
     * Reemit the edit-data event from the formular component
     * @param item
     */
    editData(item) {
      // Reemitted to edit the item
      // @arg item : the item to edit
      this.$emit("edit-data", item);
    },

    /** @vuese
     * Reemit the sent-data event from the formular component
     * @param item
     */
    sentData(item) {
      // Reemitted to create a new item
      // @arg item : the item to create
      this.$emit("sent-data", item);
    }

  },

  /** @vuese
   * Set the default values of the fields
   */
  mounted() {
    this.setFieldsDefault();
  }
}
</script>

<style scoped>
/** @vuese
 * This is a fix for the modal card to be scrollable
 **/
.modal-card > * {
  overflow: auto;
}
</style>