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
          :hideNotification="hideNotification"
          :reportMessage="reportMessage"
          @edit-data="editData"
          @sent-data="sentData"></Formular>
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
      reportMessage: "",
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
    // visibly not used
    // reset: ['item', 'form'],

    item: {
      type: Object,
      default: null
    }
  },
  methods: {
    closeModal() {
      // emitted to hide the modal
      this.$emit("close");
      // this.showModal = false;
    },

    resetModal() {
      this.reportMessage = "";
      this.closeModal();
    },

    sendModal() {
      let isErrors = false;
      this.resetErrors();

      // Convert minutes to milliseconds
      if (this.form.Milliseconds !== undefined) this.form.Milliseconds *= 60000;

      // Check if all fields are filled else return error
      for (let key in this.form) {
        // console.log(key)
        if (/*this.form[key] === "" ||*/ this.form[key] === null || this.form[key] === undefined /*|| this.form[key] === 0*/) {
          // console.log(key)
          // console.log(this.formStruct)
          if (this.form.Milliseconds !== undefined) this.form.Milliseconds /= 60000;
          this.error[key] = true;
          isErrors = true;
          // console.log("error: " + key)
        }
      }
      if (isErrors) return;

      this.resetErrors();

      //this.hideNotification = false;
      // console.log(this.form)

      // Send data to parent component
      if (this.edit)
        // use the form content to edit the item
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