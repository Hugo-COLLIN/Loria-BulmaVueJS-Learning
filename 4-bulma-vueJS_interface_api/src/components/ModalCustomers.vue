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
              <div class="field">
                <div class="columns is-desktop">
                  <div class="column">
                    <label class="label">Address</label>
                    <div class="control has-icons-left">
                      <input v-model="this.form.Address" class="input" name="address" placeholder="e.g. 1 Microsoft Way"
                             required type="text">
                      <span class="icon is-small is-left">
                        <i class="fa fa-dollar"></i>
                    </span>
                    </div>
                    <p v-if="error.Address" class="help is-danger">Please enter an address</p>
                  </div>
                  <div class="column">
                    <label class="label">City</label>
                    <div class="control">
                      <input v-model="this.form.City" class="input" name="city" placeholder="e.g. Redmond" required
                             type="text">
                    </div>
                    <p v-if="error.City" class="help is-danger">Please enter a city</p>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="columns is-desktop">
                  <div class="column">
                    <label class="label">Postal Code</label>
                    <div class="control">
                      <input v-model="this.form.PostalCode" class="input" name="postalCode" placeholder="e.g. 98052"
                             required type="text">
                    </div>
                    <p v-if="error.PostalCode" class="help is-danger">Please enter a postal code</p>
                  </div>

                  <div class="column">
                    <label class="label">State</label>
                    <div class="control">
                      <input v-model="this.form.State" class="input" name="state" placeholder="e.g. WA" required
                             type="text">
                    </div>
                    <p v-if="error.State" class="help is-danger">Please enter a state</p>
                  </div>
                  <div class="column">
                    <label class="label">Country</label>
                    <div class="control">
                      <input v-model="this.form.Country" class="input" name="country" placeholder="e.g. USA" required
                             type="text">
                    </div>
                    <p v-if="error.Country" class="help is-danger">Please enter a country</p>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="columns is-desktop">
                  <div class="column">
                    <label class="label">Company</label>
                    <div class="control">
                      <input v-model="this.form.Company" class="input" name="company" placeholder="e.g. Microsoft"
                             required type="text">
                    </div>
                    <p v-if="error.Company" class="help is-danger">Please enter a company</p>
                  </div>
                  <div class="column">
                    <label class="label">Email</label>
                    <div class="control">
                      <input v-model="this.form.Email" class="input" name="email" placeholder="e.g. truc@mail.com"
                             required type="email">
                    </div>
                    <p v-if="error.Email" class="help is-danger">Please enter an email</p>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="columns is-desktop">
                  <div class="column">
                    <label class="label">First Name</label>
                    <div class="control">
                      <input v-model="this.form.FirstName" class="input" name="firstName" placeholder="e.g. John"
                             required type="text">
                    </div>
                    <p v-if="error.FirstName" class="help is-danger">Please enter a first name</p>
                  </div>
                  <div class="column">
                    <label class="label">Last Name</label>
                    <div class="control">
                      <input v-model="this.form.LastName" class="input" name="lastName" placeholder="e.g. Doe" required
                             type="text">
                    </div>
                    <p v-if="error.LastName" class="help is-danger">Please enter a last name</p>
                  </div>
                  <div class="column">
                    <label class="label">Phone</label>
                    <div class="control">
                      <input v-model="this.form.Phone" class="input" name="phone" placeholder="e.g. 123-456-7890"
                             required type="text">
                    </div>
                    <p v-if="error.Phone" class="help is-danger">Please enter a phone number</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
      <footer :class="{'is-hidden': !hideNotification}" class="modal-card-foot field">
        <div class="buttons">
          <button class="button is-medium is-success" @click.prevent="sendModal">Create</button>
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
  name: "ModalCustomers",
  data() {
    return {
      hideNotification: true,
      reportMessage: "",
      edit: false,
      btnTitle: "",
      form: {
        "Address": "",
        "City": "",
        "Company": "",
        "Country": "",
        "Email": "",
        "FirstName": "",
        "LastName": "",
        "Phone": "",
        "PostalCode": "",
        "State": "",
        "SupportRepId": 0
      },
      error: {
        Address: false,
        City: false,
        Company: false,
        Country: false,
        Email: false,
        FirstName: false,
        LastName: false,
        Phone: false,
        PostalCode: false,
        State: false,
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

      // Check if all fields are filled else return error
      for (let key in this.form) {
        // console.log(key)
        if (this.form[key] === "") {
          console.log(key)
          return this.error[key] = true;
        }
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
      // for (let key in this.form)
      //   if (typeof(this.form[key]) === "string")
      //     this.form[key] = "";

      this.form.Address = "";
      this.form.City = "";
      this.form.Company = "";
      this.form.Country = "";
      this.form.Email = "";
      this.form.Fax = "";
      this.form.FirstName = "";
      this.form.LastName = "";
      this.form.Phone = "";
      this.form.PostalCode = "";
      this.form.State = "";
      this.form.SupportRepId = 0;
    },

    editForm(item) {
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