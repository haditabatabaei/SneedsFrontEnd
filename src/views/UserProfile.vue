<template>
  <div>
    <div class="page-header header-filter header-small" data-parallax="true"
         style="background-image: url('../webimages/bg3.jpg'); transform: translate3d(0px, 0px, 0px);">
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-md-offset-2 text-center">
            <h2 class="title isansFont">
              {{user.first_name}}
              عزیز خوش آمدید!
            </h2>
          </div>
        </div>
      </div>
    </div>

    <div class="main profile-page">
      <div class="profile-content">
        <div class="container">
          <div class="row">
            <div class="col-xs-6 col-xs-offset-3">
              <div class="profile">
                <div class="avatar">
                  <img src="../../public/webimages/marc.jpg" alt="Circle Image"
                       class="img-circle img-responsive img-raised">
                </div>
                <div class="name">
                  <h3 class="title isansFont">{{user.first_name}}</h3>
                </div>
              </div>
            </div>
            <div class="col-xs-2 follow">

            </div>
          </div>

          <div class="row">
            <div class="col-md-6 col-md-offset-3">
              <div class="profile-tabs">
                <div class="nav-align-center">
                  <ul class="nav nav-pills nav-pills-rose nav-pills-icons" role="tablist">
                    <li v-bind:class="{active : activeChangeSection}">
                      <a href="#profileSettings" class="isansFont" role="tab" data-toggle="tab">
                        <i class="material-icons">settings</i>
                        تنظیمات پروفایل
                      </a>
                    </li>
                    <!--<li v-bind:class="{active : activeLikedPostsSection}">-->
                    <!--<a href="#favoriteInterviews" role="tab" class="isansFont"-->
                    <!--data-toggle="tab"-->
                    <!--aria-expanded="true">-->
                    <!--<i class="material-icons">people</i>-->
                    <!--مصاحبه های محبوب شما-->
                    <!--</a>-->
                    <!--</li>-->
                    <li v-bind:class="{active : activeChangePassSection}">
                      <a href="#changePassword" role="tab" class="isansFont"
                         data-toggle="tab"
                         aria-expanded="true">
                        <i class="material-icons">lock</i>
                        تغییر رمز عبور
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- End Profile Tabs -->
            </div>
          </div>
          <div class="tab-content">
            <div class="tab-pane" v-bind:class="{active : activeChangeSection}" id="profileSettings">
              <ProfileSettings :user="user" :input-user="inputUser"></ProfileSettings>
            </div>
            <div class="tab-pane" v-bind:class="{active : activeChangePassSection}" id="changePassword">
              <PasswordChange></PasswordChange>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProfileSettings from '@/components/Profile/ProfileSettings'
  import PasswordChange from '@/components/Profile/PasswordChange'
  export default {
    name: "UserProfile",
    components : {
      ProfileSettings,PasswordChange
    },
    data: function () {
      return {
        downloadedBooklets: [],
        favoriteInterviews: [],

        activeChangeSection: true,
        activeDownloadedBookletSection: false,
        activeLikedPostsSection: false,
        activeChangePassSection: false,



        changePassLoading: false,
        changePassFailed: false,
        changePassSuccess: false,

        inputNewPassword: '',
        confirmInputNewPassword: '',

        // passwordError: true,
        // confirmPasswordError: true,
      }
    },
    methods: {
    }, computed: {
      user: function() {
        return this.$store.getters.getUser;
      },
      inputUser:function(){
        return this.$store.getters.getInputUser;
      }
    },
    mounted() {

      scrollTo(0, 0);

    }, created() {
      let promise = this.$store.dispatch('getUserKey');
      promise.then(() => {
        this.$store.dispatch('getUserWithKey', this.$store.getters.getUserInfo.user_pk)
      });
    },
  }
</script>

<style scoped>
  hr {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }

  .personDesc {
    line-height: 25px;
  }

  .interviewTitleLink {
    padding-top: 30px;
  }

  .card-content div.row.bookletHeader {
    padding-left: 15px;
    padding-right: 10px;
  }

  .bookletRow {
    margin-top: 15px !important;
    margin-bottom: 15px !important;
  }

  div.card-image {
    cursor: pointer;
  }

  .bookletColumn {
    min-height: 550px;
    margin-bottom: 30px;
  }
</style>
