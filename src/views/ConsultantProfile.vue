<template>
    <div class="profile-page">
        <div class="page-header header-filter" data-parallax="true"
             style="background-image: url('http://193.176.241.131/sneedsAssets/img/userbg.jpg');"></div>

        <div class="main">
            <div class="profile-content">
                <div class="container">

                    <div class="row">
                        <div class="col-xs-6 col-xs-offset-3">
                            <ConsultantTitle :consultant="consultant" v-if="!profileLoading.value"></ConsultantTitle>
                        </div>
                    </div>

                    <div class="row" style="margin-top:20px;">
                        <RectNotifBlock :message="profileLoading.message"
                                        type="warning"
                                        borderRound="true"
                                        v-if="profileLoading.value"></RectNotifBlock>

                        <RectNotifBlock :message="profileSuccess.message"
                                        type="success"
                                        borderRound="true"
                                        v-else-if="profileSuccess.value"></RectNotifBlock>

                        <RectNotifBlock :message="profileFailed.message"
                                        type="danger"
                                        borderRound="true"
                                        v-else-if="profileFailed.value"></RectNotifBlock>
                    </div>

                    <div class="row">
                        <div class="col-md-12 text-center" v-if="!profileLoading.value">
                            <ul class="nav nav-pills nav-pills-white d-inline-block isansFont">
                                <li :class="{'active' :  activeDesc}"><a href="#description" data-toggle="tab"
                                                                         aria-expanded="true">مشخصات</a></li>
                                <li :class="{'active' :  activeCalendar}"><a href="#calendar" data-toggle="tab"
                                                                             aria-expanded="false">تقویم</a></li>
                                <li :class="{'active' :  activeComments}"><a href="#comments" data-toggle="tab"
                                                                             aria-expanded="false"> نظرات <sup>{{comments.length}}</sup></a>
                                </li>
                            </ul>
                        </div>

                        <div class="col-md-12" v-if="!profileLoading.value">
                            <div class="tab-content tab-space">
                                <div class="tab-pane" :class="{'active' :  activeDesc}" id="description">
                                    <div class="row">
                                        <div class="col-md-7">
                                            <ConsultantInfoBlock :consultant="consultant"></ConsultantInfoBlock>

                                            <p class="description isansFont text-justify">
                                                {{consultant.bio}}
                                            </p>
                                        </div>
                                        <div class="col-md-5">
                                            <iframe :src="aparatFrameLink" class="aparatFrame"></iframe>
                                        </div>
                                    </div>
                                </div>

                                <div class="tab-pane" id="calendar" :class="{'active' :  activeCalendar}">
                                    <div class="row">
                                        <UserCalendar :consultantId="consultant.id" v-if="consultant.id"></UserCalendar>
                                    </div>
                                </div>
                                <div class="tab-pane" id="comments" :class="{'active' :  activeComments}">
                                    <div class="row">
                                        <div class="col-md-4 sticky-top" v-if="isLoggedIn">
                                            <div class="media media-post">
                                                <div class="media-body">
                                                    <div class="form-group form-rose is-empty">
                                                        <textarea id="comment" class="form-control isansFont"
                                                                  placeholder="نظرتون رو بنویسید" rows="6"
                                                                  v-model="inputComment"></textarea>
                                                        <span class="material-input"></span>
                                                    </div>
                                                    <div class="media-footer">
                                                        <button @click.prevet="submitComment()"
                                                                class="btn btn-rose  isansFont pull-left">
                                                            <i class="material-icons" v-if="submitCommentFailed.value">block</i>
                                                            <i class="material-icons" v-if="submitCommentSuccess.value">done</i>
                                                            <img src="http://193.176.241.131/sneedsAssets/img/loading.svg"
                                                                 alt="loading icon"
                                                                 class="loadingIcon"
                                                                 v-if="submitCommentLoading.value"
                                                                 style="width:15px;height:15px">
                                                            ثبت نظر
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-4 text-center sticky-top" v-else>
                                            <router-link to="/login" class="btn btn-sm btn-warning isansFont">
                                                برای ثبت نظر باید وارد حساب خود شوید. برای ورود کلیک کنید
                                            </router-link>
                                        </div>

                                        <div class="col-md-8">
                                            <CommentBlock v-for="comment in comments"
                                                          :config="{'showEdit':true,'showRemove':true,'deleted': false}"
                                                          :consultant="consultant"
                                                          @update-comments="getConsultantComments(consultant.id)"
                                                          :comment="comment"
                                                          :key="comments.indexOf(comment)"
                                            ></CommentBlock>
                                        </div>
                                    </div>
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
    import axios from 'axios';
    import CommentBlock from '@/components/StandAlone/CommentBlock';
    import RectNotifBlock from '@/components/NotifBlocks/RectNotifBlock';
    import ConsultantInfoBlock from '@/components/Consultant/ConsultantInfoBlock'
    import ConsultantTitle from '@/components/Consultant/ConsultantTitle'
    import UserCalendar from '@/components/Consultant/UserCalendar'

    export default {
        name: "ConsultantProfile",
        components: {
            CommentBlock, RectNotifBlock, ConsultantInfoBlock, ConsultantTitle, UserCalendar
        },
        data() {
            return {
                consultant: {},
                inputComment: '',
                comments: [],

                aparatFrameLink: '',

                calendarConfig: {
                    usersConfig: true,
                    managerConfig: false
                },

                submitCommentSuccess: {
                    value: false,
                    message: 'نظر شما با موفقیت ثبت شد،چند لحظه صبر کنید...'
                },

                submitCommentLoading: {
                    value: false,
                    message:
                        'چند لحظه صبر کنید...'
                },

                submitCommentFailed: {
                    value: false,
                    message: 'مشکلی در ثبت نظر رخ داد...'
                },

                profileSuccess: {
                    value: false,
                    message: 'عملیات موفقیت آمیز بود'
                },

                profileLoading: {
                    value: false,
                    message:
                        'چند لحظه صبر کنید...'
                },

                profileFailed: {
                    value: false,
                    message: 'مشکلی رخ داد...'
                },


            }
        },
        computed: {
            isLoggedIn: function () {
                return this.$store.getters.isLoggedIn;
            },
            activeCart: function () {
                return this.$store.getters.getCart;
            },
            activeCalendar: function () {
                return this.$route.query.as === 'calendar'
            },
            activeDesc: function () {
                return this.$route.query.as === 'desc' || this.$route.query.as == undefined;
            },
            activeComments: function () {
                return this.$route.query.as === 'comments';
            }
        },
        created() {
            this.resetprofileLogic();
            this.startprofileLogic();
            this.getConsultantBySlug(this.$route.params.consultantSlug).then(response => {
                this.consultant = response.data;
                this.aparatFrameLink = this.getVideoFrameLink(this.consultant.aparat_link);
                this.getConsultantComments(this.consultant.id).then(() => {
                    this.resetprofileLogic();
                }).catch(error => {
                    this.failedprofileLogic();
                });
            }).catch(error => {
                window.console.log(error.response);
                this.failedprofileLogic();
            });

        },
        mounted() {
            scrollTo(0, 0);
        },

        methods: {

            resetprofileLogic: function () {
                window.console.log('no loading deploy');
                this.profileLoading.value = false;
                this.profileFailed.value = false;
                this.profileSuccess.value = false;
            },

            startprofileLogic: function () {
                window.console.log('start loading deploy');
                this.profileLoading.value = true;
                this.profileFailed.value = false;
                this.profileSuccess.value = false;
            },

            failedprofileLogic: function () {
                window.console.log('failed loading deploy');
                this.profileLoading.value = false;
                this.profileFailed.value = true;
                this.profileSuccess.value = false;
            },

            successprofileLogic: function () {
                window.console.log('success loading deploy');
                this.profileLoading.value = false;
                this.profileFailed.value = false;
                this.profileSuccess.value = true;
            },

            resetSubmitCommentLogic: function () {
                window.console.log('no loading deploy');
                this.submitCommentLoading.value = false;
                this.submitCommentFailed.value = false;
                this.submitCommentSuccess.value = false;
            },

            startSubmitCommentLogic: function () {
                window.console.log('start loading deploy');
                this.submitCommentLoading.value = true;
                this.submitCommentFailed.value = false;
                this.submitCommentSuccess.value = false;
            },

            failedSubmitCommentLogic: function () {
                window.console.log('failed loading deploy');
                this.submitCommentLoading.value = false;
                this.submitCommentFailed.value = true;
                this.submitCommentSuccess.value = false;
            },

            successSubmitCommentLogic: function () {
                window.console.log('success loading deploy');
                this.submitCommentLoading.value = false;
                this.submitCommentFailed.value = false;
                this.submitCommentSuccess.value = true;
            },

            submitComment: function () {
                this.resetSubmitCommentLogic();
                this.startSubmitCommentLogic();
                if (this.inputComment != null && this.inputComment.length != 0) {
                    console.log('sending request');
                    let payload = {
                        'consultant': this.consultant.id,
                        'message': this.inputComment,
                    };

                    this.sendSubmitCommentRequest(payload).then((response) => {
                        this.successSubmitCommentLogic();

                        this.getConsultantComments(this.consultant.id).then(response => {
                            console.log(response.data);
                            this.comments = response.data;
                            this.inputComment = '';
                            this.resetSubmitCommentLogic();
                        }).catch(error => {
                            console.log(error.response);
                        });

                        console.log('response:', response.data);
                    }).catch((error) => {
                        if (error.response) {
                            this.submitCommentFailed.message = 'خطایی هنگام ثبت نظر رخ داد. ' + error.response;
                        } else {
                            this.submitCommentFailed.message = 'خطایی هنگام ثبت نظر رخ داد. ';
                        }
                        this.failedSubmitCommentLogic();
                        console.log('error:', error.response);
                    })
                } else {
                    this.submitCommentFailed.message = 'لطفا فیلد نظر را بنویسید.';
                    this.failedSubmitCommentLogic();
                    console.log('comment was empty');
                }


            },

            sendSubmitCommentRequest: function (payload) {
                console.log('request method with payload : ', payload);
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'comment/comments/',
                        method: 'POST',
                        headers: {
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                            'Content-Type': 'application/json',
                        },
                        data: payload,
                    }).then(response => {
                        console.log('response axios :', response.data);
                        resolve(response);
                    }).catch(error => {
                        console.log('error axios :', error);
                        reject(error);
                    })
                });
            },

            getConsultantComments: function (consultantId) {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'comment/comments/?consultant=' + consultantId,
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(response => {
                        console.log('axios response:', response);
                        console.log(response.data);
                        this.comments = response.data;
                        resolve(response);
                    }).catch(error => {
                        console.log('axios error:', error);
                        reject(error);
                    })
                })
            },

            getConsultantBySlug(consultantSlug) {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'account/consultant-profiles/' + consultantSlug + '/',
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {
                        resolve(response);
                    }).catch(error => {
                        reject(error);
                    })
                })
            },

            getVideoFrameLink(aparatLink) {
                return 'https://www.aparat.com//video/video/embed/videohash/' + aparatLink.replace('https://www.aparat.com/v/', '') + '/vt/frame'
            },
        }

    }

</script>

<style scoped>
    .description {
        padding: 15px;
        line-height: 25px;
        word-break: break-all;
    }

    .videoTitle {
        margin-top: 15px;
        margin-bottom: 30px;
    }

    .aparatFrame {
        min-height: 400px;
        border: none;
    }

    .nav-pills.nav-pills-white > li.active > a {
        background-color: white;
        color: #555555;
        box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2);
    }

    .sticky-top {
        top: 120px;
        position: sticky;
    }

    @media only screen and (min-width: 0) and (max-width: 992px) {
        .sticky-top {
            position: static;
            top: initial;
        }
    }
</style>