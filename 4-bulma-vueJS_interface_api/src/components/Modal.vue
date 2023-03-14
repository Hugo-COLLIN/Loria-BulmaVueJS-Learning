<template>
  <div :class="{'is-active': showModal}" class="modal">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">

      <header :class="{'is-hidden': !hideNotification}" class="modal-card-head">
        <p class="modal-card-title">Item information</p>
        <button aria-label="close" class="delete" @click="closeModal"></button>
      </header>
      <form ref="itemAddForm">
        <section :class="{'notification is-success': !hideNotification}" class="modal-card-body">
          <div :class="{'is-hidden': hideNotification}">
            <p>Item added!</p>
          </div>
          <div :class="{'is-hidden': !hideNotification}">
            <div class="field">
              <template v-for="(item,key) in splitedForm">
                <div class="field">
                  <div class="columns is-desktop">
                    <template v-for="(item2,key2) in item">
                      <div class="column">
                        <label class="label">{{ key2 }}</label>
                        <div class="control has-icons-left">
                          <input :name="key2" :v-model="item2" class="input" required type="text">
                         
                        </div>
                        <p v-if="error[key2]" class="help is-danger">Please enter a {{ key2 }}</p>
                      </div>
                    </template>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </section>
      </form>
      <footer :class="{'is-hidden': !hideNotification}" class="modal-card-foot field">
        <div class="buttons">
          <button class="button is-medium is-success" @click.prevent="sendModal">{{ this.btnTitle }}</button>
          <button class="button" @click="closeModal">Cancel</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal.vue",
  data() {
    return {
      hideNotification: true,
      edit: false,
      column: 1,
      form: {},
      splitedForm: {},
      error: {},
      btnTitle: "Add item",
    }
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
      this.closeModal();
    },
    sendModal() {
      this.resetErrors();
      // Check if all fields are filled else return error
      for (let key in this.form) {
        // console.log(key)
        if (this.form[key] === "") {
          console.log(key)
          return this.error[key] = true;
        }
      }
      this.resetErrors();
      this.resetErrors();

      // Check if all fields are filled else return error
      for (let key in this.form) {
        // console.log(key)
        if (this.form[key] === "") {
          console.log(key)
          return this.error[key] = true;
        }
      }

      this.resetErrors();
      // Send data to parent component
      if (this.edit)
        this.$emit("edit-data", this.form);
      else
        this.$emit("sent-data", this.form);

    },
    resetErrors() {
      for (let key in this.error) {
        this.error[key] = false;
      }
    },
    newForm() {
      for (let key in this.form) {
        this.form[key] = "";
      }
      this.edit = false;
      this.btnTitle = "Add item";
    },
    editForm() {
      this.edit = true;
      this.btnTitle = "Update item";
      for (let key in this.form) {
        this.form[key] = this.item[key];
      }
    },
    init(form) {
      this.form = form;
      this.error = {};
      for (let key in this.form) {
        this.error[key] = false;
      }
      this.column = Math.round(Object.keys(this.form).length / 3);
      console.log(this.column)
      this.splitedForm = this.splitForm(this.form, this.column);
    },
    splitForm(form, column) {
      let splicedForm = {};
      let i = 0;
      let index = 0;
      for (let key in form) {
        if (i % column === 0) {
          index++;
        }
        if (!splicedForm[index]) {
          splicedForm[index] = {};
        }
        splicedForm[index][key] = form[key];
        i++;
      }
      return splicedForm;
    }
  }
}
</script>
<style scoped>

</style>