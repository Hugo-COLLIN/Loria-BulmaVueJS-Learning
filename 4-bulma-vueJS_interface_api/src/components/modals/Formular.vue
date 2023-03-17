<template>
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
                    <input :name="key2" v-model="this.form[item2.name]" class="input"
                           :class="item2.classes, {'is-danger' : this.error[item2.name]}"
                           :placeholder="item2.placeholder" required :type="item2.type">
                    <span v-if="item2.icon !== '' && item2.icon !== undefined" class="icon is-small is-left">
                            <i :class="item2.icon"></i>
                          </span>
                  </div>
                  <p v-if="this.error[item2.name]" class="help is-danger">Please enter {{ item2.label.toLowerCase()
                    }}</p>
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
</template>
<script>
export default {
  name: 'Formular',
  props: {
    formStruct: {},
    hideNotification: {}
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