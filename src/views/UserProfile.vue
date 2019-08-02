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
                                        <li :class="{active : activeCommentsSection}">
                                            <a href="#commentSection" class="isansFont" role="tab" data-toggle="tab">
                                                <i class="material-icons">note</i>
                                                نظرات شما
                                            </a>
                                        </li>
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
                        <div class="tab-pane" v-bind:class="{active: activeCommentsSection}" id="commentSection">
                            <div class="row">
                                <div class="col-md-8 col-md-offset-2" v-for="comment in comments">
                                    <CommentBlock :config="{'showEdit':false,'showRemove':true}" :comment="comment"></CommentBlock>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CommentBlock from '@/components/StandAlone/CommentBlock'
    import ProfileSettings from '@/components/Profile/ProfileSettings'
    import PasswordChange from '@/components/Profile/PasswordChange'
    import axios from 'axios';

    export default {
        name: "UserProfile",
        components: {
            ProfileSettings, PasswordChange, CommentBlock,
        },
        data: function () {
            return {
                favoriteInterviews: [],
                comments: [],

                activeChangeSection: true,
                activeChangePassSection: false,
                activeCommentsSection: false,

                changePassLoading: false,
                changePassFailed: false,
                changePassSuccess: false,

                inputNewPassword: '',
                confirmInputNewPassword: '',
            }
        },
        methods: {
            getAccountComments: function () {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'comment/comments/?user=' + this.$store.getters.getUserInfo.user_pk,
                        method: 'GET',
                        header: {
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {
                        resolve(response);
                    }).catch(error => {
                        reject(error);
                    })
                })
            }
        }, computed: {
            user: function () {
                return this.$store.getters.getUser;
            },
            inputUser: function () {
                return this.$store.getters.getInputUser;
            }
        },
        mounted() {
            scrollTo(0, 0);
        }, created() {
            let promise = this.$store.dispatch('getUserKey');
            promise.then(() => {
                let promise = this.$store.dispatch('getUserWithKey', this.$store.getters.getUserInfo.user_pk)
                promise.then(() => {
                    let commentPromise = this.getAccountComments();
                    commentPromise.then(response => {
                        console.log(response.data);
                        this.comments = response.data;
                    }).catch(error => {
                        console.log(error.response);
                    })
                }).catch(() => {

                })
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
