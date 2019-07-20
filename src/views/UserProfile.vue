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
                  <!--<h6 class="isansFont">Designer</h6>-->
                  <!--<a href="#" class="btn btn-just-icon btn-simple btn-dribbble"><i class="fa fa-dribbble"></i></a>-->
                  <!--<a href="#" class="btn btn-just-icon btn-simple btn-twitter"><i class="fa fa-twitter"></i></a>-->
                  <!--<a href="#" class="btn btn-just-icon btn-simple btn-pinterest"><i class="fa fa-pinterest"></i></a>-->
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
                    <li v-bind:class="{active : activeDownloadedBookletSection}">
                      <a href="#downloadedBooklets" class="isansFont" role="tab" data-toggle="tab"
                         aria-expanded="false">
                        <i class="material-icons">notes</i>
                        جزوات دانلود شده
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
            <!--<div class="tab-pane work" v-bind:class="{active : activeLikedPostsSection}" id="favoriteInterviews">-->
            <!--<div class="row">-->
            <!--<div class="col-md-7 col-md-offset-1">-->
            <!--<h4 class="title isansFont">لیست مصاحبه های محبوب شما : </h4>-->
            <!--<div class="row collections">-->
            <!--<div class="col-md-6" v-for="post in favoriteInterviews">-->
            <!--<div class="card card-background"-->
            <!--:style="'background-image: url(\'' +  post.post_main_image + '\')'">-->
            <!--<div class="card-content">-->
            <!--<label class="label label-info isansFont">-->
            <!--{{post.jalali_timestamp_string.day}}-->
            <!--{{post.jalali_timestamp_string.month}}-->
            <!--{{post.jalali_timestamp_string.year}}-->
            <!--</label>-->
            <!--<router-link to="/">-->
            <!--<h3 class="card-title isansFont interviewTitleLink">-->
            <!--{{post.title}}-->
            <!--</h3>-->
            <!--</router-link>-->
            <!--<p class="description isansFont text-centner">-->
            <!--<span v-if="post.post_type == 'interview'">-->
            <!--نوع مصاحبه : ویدوئی-->
            <!--</span>-->
            <!--<span v-if="post.post_type == 'Q&A'">-->
            <!--نوع مصاحبه : پرسش و پاسخ متنی-->
            <!--</span>-->
            <!--<br><br>-->
            <!--<router-link-->
            <!--:to="'/blog/post/' + post.topic_slug + '/' + post.slug"-->
            <!--class="btn btn-rosse isansFont">-->
            <!--ورود به صفحه مصاحبه-->
            <!--</router-link>-->
            <!--</p>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="col-md-2 col-md-offset-1 stats">-->
            <!--<h4 class="title isansFont">توضیحات</h4>-->
            <!--<ul class="list-unstyled isansFont text-right">-->
            <!--<li> تعداد مصاحبه ها : <strong>{{favoriteInterviews.length}}</strong></li>-->
            <!--</ul>-->
            <!--<hr>-->
            <!--<h4 class="title isansFont">درباره مصاحبه های اسنیدز</h4>-->
            <!--<p class="description text-justify isansFont">-->
            <!--لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان-->
            <!--گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و-->
            <!--برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای-->
            <!--کاربردی می باشد.-->
            <!--</p>-->
            <!--<hr>-->
            <!--<h4 class="title isansFont">برچسب ها</h4>-->
            <!--<span class="label label-primary yekanFont">برچسب تست 1</span>-->
            <!--<span class="label label-rose yekanFont">برچسب تست 2</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <div class="tab-pane connections" v-bind:class="{active : activeDownloadedBookletSection}"
                 id="downloadedBooklets">
              <div class="row">
                <div class="col-md-12">
                  <h4 class="title isansFont text-right">
                    لیست جزوات دانلود شده شما

                    ({{this.downloadedBooklets.length }} عدد) :

                  </h4>
                </div>
                <div class="col-md-4 bookletColumn" v-for="booklet in downloadedBooklets">
                  <div class="card card-blog">
                    <div
                      @click="$router.push('/booklets/field/' + $route.params.fieldSlug + '/course/' + booklet.topic_slug + '/' + booklet.slug)"
                      class="card-image">
                      <a href="#">
                        <img :alt="booklet.title + 's image'" class="img"
                             v-bind:src="booklet.booklet_image">
                      </a>
                      <div class="colored-shadow" style="opacity: 1;"></div>
                    </div>
                    <div class="card-content">
                      <div class="row bookletHeader bookletRow">

                        <h6 class="category text-danger gadugiFont isansFont pull-right">
                          <i class="material-icons">library_books</i>
                          {{booklet.number_of_pages}}
                          صفحه
                        </h6>

                        <h6 class="pull-left text-danger yekanFont">
                          <router-link class="text-danger"
                                       :to="'/booklets/field/' + booklet.field_slug + '/booklets/'">
                            {{booklet.field_title}}
                          </router-link>
                          |
                          {{booklet.topic_title}}
                        </h6>
                      </div>
                      <hr>
                      <h4 class="card-title yekanFont">
                        <router-link
                          v-bind:to="'/booklets/field/' + $route.params.fieldSlug + '/course/' + booklet.topic_slug + '/' + booklet.slug">
                          {{booklet.title}}
                        </router-link>
                      </h4>
                      <p class="card-description yekanFont">
                        استاد : {{booklet.teacher}}
                      </p>
                      <hr>
                      <div class="container-fluid">
                        <div class="row bookletRow">
                          <div class="col-lg-12 seeBookletWrapper isansFont text-center">
                            <router-link
                              :to="'/booklets/field/' + booklet.field_slug + '/course/' + booklet.topic_slug + '/' + booklet.slug "
                              class="btn btn-success">
                              <i class="material-icons">
                                library_books
                              </i>
                              <span class="numberOfLikes">
                                                مشاهده جزوه
                                            </span>
                            </router-link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
