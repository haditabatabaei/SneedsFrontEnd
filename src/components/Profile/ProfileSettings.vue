<template>
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <h4 class="title isansFont text-right">
        پنل تنظیمات اطلاعات کاربری
      </h4>
      <hr>

      <RectNotifBlock :message="editLoading.message" type="warning" borderRound="true" v-if="editLoading.value"></RectNotifBlock>

      <RectNotifBlock :message="editSuccess.message" type="success" borderRound="true" v-else-if="editSuccess.value"></RectNotifBlock>

      <RectNotifBlock :message="editFailed.message" type="danger" borderRound="true" v-else-if="editFailed.value"></RectNotifBlock>

      <h5 class="isansFont text-right pull-right">
        اطلاعات فردی :
      </h5>
      <button @click.prevent="toggleChangeInfoAvailable()"
              class="btn btn-small btn-info isansFont pull-left"
              v-if="!editInfoAvailable">
        میخواهم اطلاعات زیر را ویرایش کنم
      </button>
      <button @click.prevent="toggleChangeInfoAvailable()" class="btn btn-small btn-rose isansFont pull-left" v-else>
        نیازی به ویرایش اطلاعات ندارم
      </button>
      <div class="card card-contact">
        <form action="" id="contact-form" method="post"
              @submit.prevent="edit()">
          <div class="card-content">
            <div class="row mt-0">
              <div class="col-md-6">
                <div class="input-group w-100">
                  <div class="form-group mt-0">
                    <label for="firstname" class="isansFont">نام : </label>
                    <input v-model="inputUser.first_name"
                           id="firstname" type="text"
                           name="firstname" class="form-control isansFont"
                           v-bind:disabled="!editInfoAvailable">
                    <span class="text-center isansFont text-danger" v-if="inputErrors.firstNameError">
                      لطفا یک نام معتبر وارد کنید
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="input-group w-100">
                  <div class="form-group mt-0">
                    <label for="lastname" class="isansFont">نام خانوادگی
                      : </label>
                    <input v-model="inputUser.last_name"
                           id="lastname" type="text"
                           name="lastname" class="form-control isansFont"
                           v-bind:disabled="!editInfoAvailable">
                    <span class="text-center isansFont text-danger" v-if="inputErrors.lastNameError">
                      لطفا یک نام خانوادگی معتبر وارد کنید
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="row mt-10">
              <div class="col-md-12">
                <div class="input-group w-100">
                  <div class="form-group mt-0">
                    <label for="email" class="isansFont">ایمیل (غیر قابل تغییر) : </label>
                    <input id="email" type="email"
                           v-model="inputUser.email" name="email"
                           class="form-control isansFont"
                           disabled>
                   </div>
                </div>
              </div>
            </div>
            <div class="row mt-10">
              <div class="col-md-12">
                <div class="input-group w-100">
                  <div class="form-group mt-0">
                    <label for="phonenum" class="isansFont">شماره تماس
                      : </label>
                    <input id="phonenum" type="number"
                           v-model="inputUser.phone_number"
                           name="phonenum" class="form-control isansFont"
                           v-bind:disabled="!editInfoAvailable">
                    <span class="text-center isansFont text-danger"
                          v-if="inputErrors.phoneError">
                      لطفا یک شماره تماس معتبر وارد کنید
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="input-group w-100">
                  <div class="form-group mt-0">
                    <label for="address" class="isansFont">آدرس
                      : </label>
                    <input id="address" type="text"
                           v-model="inputUser.address"
                           name="address" class="form-control isansFont"
                           v-bind:disabled="!editInfoAvailable">
                    <span class="text-center isansFont text-danger"
                          v-if="inputErrors.addressError">
                      لطفا یک آدرس معتبر وارد کنید
                                                </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-10">
              <div class="col-md-6"></div>
              <div class="col-md-6">
                <input type="submit" value="ذخیره تغییرات"
                       class="btn btn-success isansFont pull-left"
                       v-if="editInfoAvailable">
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import RectNotifBlock from '@/components/NotifBlocks/RectNotifBlock'

  export default {
    name: "ProfileSettings",
    components: {
      RectNotifBlock
    },
    data() {
      return {
        editInfoAvailable: false,

        phoneRegex : /(\+98|0|98|0098)?([ ]|-|[()]){0,2}9[0-9]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/ig,

        inputErrors: {
          firstNameError: false,
          lastNameError: false,
          phoneError: false,
          addressError: false,
          passwordError: false,
          confirmPasswordError: false,
          applyWithRulesError: false,
        },

        editSuccess: {
          value: false,
          message: 'اطلاعات شما با موفقیت ویرایش شد،چند لحظه صبر کنید...'
        },

        editLoading: {
          value: false,
          message:
            'در حال ویرایش اطلاعات، چند لحظه صبر کنید...'
        },

        editFailed: {
          value: false,
          message: 'مشکلی در ویرایش اطلاعات رخ داد...'
        },

      }
    }, props: {
      user : {}, inputUser : {}
    }, methods: {
      toggleChangeInfoAvailable: function () {
        this.editInfoAvailable = !this.editInfoAvailable;
      },

      resetInputErrors: function () {
        for (let errorProperty in this.inputErrors) {
          if (this.inputErrors.hasOwnProperty(errorProperty)) {
            this.inputErrors[errorProperty] = false;
          }
        }
      },

      userCanEdit: function () {
        for (let errorProperty in this.inputErrors) {
          if (this.inputErrors.hasOwnProperty(errorProperty)) {
            if (this.inputErrors[errorProperty] === true) {
              return false;
            }
          }
        }
        return true;
      },

      inputsValidation: function () {

        if (this.inputUser.first_name == null || this.inputUser.first_name.length == 0) {
          this.inputErrors.firstNameError = true;
        }

        if (this.inputUser.last_name == null || this.inputUser.last_name.length == 0) {
          this.inputErrors.lastNameError = true;
        }

        if (this.inputUser.phone_number == null || this.inputUser.phone_number.length == 0 || !this.inputUser.phone_number.match(this.phoneRegex)) {
          this.inputErrors.phoneError = true;
        }
      },

      isEditFormValid: function () {
        //Resetting error object
        this.resetInputErrors();

        //update user validation errors
        this.inputsValidation();

        return this.userCanEdit();
      },

      resetLoadingLogic: function () {
        window.console.log('no loading deploy');
        this.editLoading.value = false;
        this.editFailed.value = false;
        this.editSuccess.value = false;
      },

      startLoadingLogic: function () {
        window.console.log('start loading deploy');
        this.editLoading.value = true;
        this.editFailed.value = false;
        this.editSuccess.value = false;
      },

      failedLoadingLogic: function () {
        window.console.log('failed loading deploy');
        this.editLoading.value = false;
        this.editFailed.value = true;
        this.editSuccess.value = false;
      },

      successLoadingLogic: function () {
        window.console.log('success loading deploy');
        this.editLoading.value = false;
        this.editFailed.value = false;
        this.editSuccess.value = true;
      },

      edit: function () {
        window.console.log('edit pressed');

        //loading logic updated
        this.startLoadingLogic();

        let editFormValid = this.isEditFormValid();
        window.console.log("user edit is valid : ", editFormValid);
        window.console.log('user input data : ', this.inputUser);
        // window.console.log('apply With rules : ', this.applyWithRules);

        if (editFormValid) {
          window.console.log("dispatching edit with payload");

          delete this.inputUser.email;

          let editPromise = this.$store.dispatch('edit', this.inputUser);

          editPromise.then((response) => {
            this.successLoadingLogic();
            console.log(response);
            setTimeout(() => {
              let promise = this.$store.dispatch('getUserKey');
              promise.then(() => {
                this.$store.dispatch('getUserWithKey', this.$store.getters.getUserInfo.user_pk)
              });
              this.resetLoadingLogic();
              // this.$router.push('/');
            }, 2000)
          }).catch((err) => {
            console.log(err);
            console.log(err.response);
            this.editFailed.message = 'خطایی در ارتباط با سرور رخ داد.';
            this.failedLoadingLogic();
          })
        } else {
          this.editFailed.message = 'لطفا اطلاعات خود را به درستی پر کنید...';
          this.failedLoadingLogic();
        }
      },
    }
  }
</script>

<style scoped>
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    appearance: none;
    -webkit-appearance: none;
    margin: 0;
  }

</style>
