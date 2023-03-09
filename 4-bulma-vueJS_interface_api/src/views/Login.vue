<template>
  <div class="login">
    <section class="hero is-primary is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form class="box">

                <div class="field has-text-centered">
                  <img :src="require('@/assets/images/logo-bis.png')" width="167">
                </div>

                <div class="field">
                  <label class="label">Email</label>
                  <div class="control has-icons-left">
                    <input v-model="email" :class="{'is-danger': error.email}" class="input" type="email" placeholder="e.g. alexjohnson@gmail.com">
                    <span class="icon is-small is-left">
                        <i class="fa fa-envelope"></i>
                    </span>
                  </div>
                  <p class="help is-danger is-left" v-if="error.email">Oops... wrong email!</p>
                </div>

                <div class="field">
                  <label class="label">Password</label>
                  <div class="control has-icons-left">
                    <input v-model="password" :class="{'is-danger': error.password}" class="input" type="password" placeholder="**********">
                    <span class="icon is-small is-left">
                        <i class="fa fa-lock"></i>
                    </span>
                  </div>
                  <p class="help is-danger" v-if="error.password">Oops... wrong password!</p>
                </div>

<!--                <div class="field">-->
<!--                  <label class="checkbox">-->
<!--                    <input type="checkbox">-->
<!--                    Remember me-->
<!--                  </label>-->
<!--                </div>-->

                <div class="field">
                  <button class="button is-success" @click.prevent="tryLogin">
                    Login
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";


export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: {
        email: false,
        password: false
      }
    }
  },
  methods: {
    tryLogin() {
      this.resetErrors();

      console.log(this.form.email);
      console.log(this.form.password)

      axios.post('http://51.91.76.245:8000/api/login', {
        username: this.form.email,
        password: this.form.password,
      })
          .then(response => {
            console.log(response.data);
            //this.$cookies.set('tokenSession', response.data, '1D');
            this.$store.commit('setTokenLogin', response.data);
            sessionStorage.setItem('tokenSession', response.data);

            //console.log(this.$store.state.tokenLogin)
            this.$router.push({name: 'dashboard'});
            this.resetErrors();
          })
          .catch(error => {
            console.log(error);
          });
    },
    resetErrors() {
      this.error.email = false;
      this.error.password = false;
    }
  },
  computed: {
    email: {
      get() {
        return this.form.email;
      },
      set(value) {
        this.form.email = value;
      }
    },
    password: {
      get() {
        return this.form.password;
      },
      set(value) {
        this.form.password = value;
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>