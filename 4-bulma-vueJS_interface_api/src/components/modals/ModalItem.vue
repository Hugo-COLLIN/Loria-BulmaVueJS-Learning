<!-- ModalItem.vue -->
<!-- Hugo COLLIN, 20/03/2023 -->
<!-- This component is used to create a new item or edit an existing one. -->
<!-- TODO : init formular component with initButton parameter to false -->

<template>
  <div class="modal" :class="{'is-active': showModal}">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">

      <header class="modal-card-head" :class="{'is-hidden': !hideNotification}">
        <p class="modal-card-title">Item information</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body" :class="{'notification is-success': !hideNotification}">
        <Formular
            ref="formular"
          @edit-data="editData"
          @sent-data="sentData"
          @close="closeModal"></Formular>
      </section>

      <footer class="modal-card-foot field" :class="{'is-hidden': !hideNotification}">
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

      // form: {},
      // error: {},
      // formStruct: {},
      // itemAttributes: {}
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
    closeModal() {
      // emitted to hide the modal
      this.$emit("close");
      // this.showModal = false;
    },

    resetModal() {
      // this.reportMessage = "";
      this.closeModal();
    },

    /*
      Reset all errors
     */
    resetErrors() {
      for (let key in this.error)
        this.error[key] = false;
    },

    /**
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

    /**
     * Delete all fields
     */
    cleanFields() {
      for (let key in this.form)
        delete this.form[key];
    },

    /*
    --- FORM METHODS CALLS ---
     */
    setFormStruct(formStruct) {
      this.$refs.formular.setFormStruct(formStruct);
    },

    setItemAttributes(itemAttributes) {
      this.$refs.formular.setItemAttributes(itemAttributes);
    },

    newForm() {
      this.$refs.formular.newForm();
    },

    editForm(item)
    {
      this.$refs.formular.editForm(item);
    },

    /*
    --- FORM EMITS REEMITED ---
     */
    editData(item) {
      this.$emit("edit-data", item);
    },

    sentData(item) {
      this.$emit("sent-data", item);
    }

  },

  mounted() {
    this.setFieldsDefault();
  }
}
</script>

<style scoped>
/**
 * This is a fix for the modal card to be scrollable
 **/
.modal-card > * {
  overflow: auto;
}
</style>