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
                    <input class="input" type="email" placeholder="e.g. alexjohnson@gmail.com">
                    <span class="icon is-small is-left">
                                        <i class="fa fa-envelope"></i>
                                    </span>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Password</label>
                  <div class="control has-icons-left">
                    <input class="input" type="password" placeholder="**********">
                    <span class="icon is-small is-left">
                                        <i class="fa fa-lock"></i>
                                    </span>
                  </div>
                </div>

                <div class="field">
                  <label class="checkbox">
                    <input type="checkbox">
                    Remember me
                  </label>
                </div>

                <div class="field">
                  <button class="button is-success">
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
export default {
  name: 'Login'
}
</script>

<style lang="sass" scoped>

</style>