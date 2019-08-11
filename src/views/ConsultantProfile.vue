<template>
    <div class="profile-page">
        <div class="page-header header-filter" data-parallax="true"
             style="background-image: url('http://193.176.241.131/sneedsAssets/img/userbg.jpg');"></div>

        <div class="main">
            <div class="profile-content">
                <div class="container">

                    <div class="row">
                        <div class="col-xs-6 col-xs-offset-3">
                            <ConsultantTitle :consultant="consultant"></ConsultantTitle>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-md-12 text-center">
                            <ul class="nav nav-pills nav-pills-rose d-inline-block isansFont">
                                <li class="active"><a href="#description" data-toggle="tab"
                                                      aria-expanded="true">مشخصات</a></li>
                                <li class=""><a href="#calendar" data-toggle="tab" aria-expanded="false">تقویم</a></li>
                                <li class=""><a href="#comments" data-toggle="tab" aria-expanded="false"> نظرات <sup>{{consultant.comment_number}}</sup></a>
                                </li>
                            </ul>
                        </div>

                        <div class="col-md-12">
                            <div class="tab-content tab-space">
                                <div class="tab-pane active" id="description">
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

                                <div class="tab-pane" id="calendar">
                                    <div class="row">
                                        <h4 class="videoTitle isansFont text-center">
                                            تقویم مشاور
                                        </h4>
                                        <Calendar v-bind:consultant="consultant" v-bind:config="calendarConfig" v-if="consultant.id"></Calendar>
                                    </div>
                                </div>
                                <div class="tab-pane" id="comments">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <h4 class="videoTitle isansFont text-center">نظرات</h4>
                                        </div>
                                        <div class="col-md-12" v-for="comment in comments">
                                            <CommentBlock :config="{'showEdit':true,'showRemove':true,'deleted': false}"
                                                          :consultant="consultant"
                                                          @update-comments="getConsultantComments(consultant.id)"
                                                          :comment="comment"></CommentBlock>
                                        </div>
                                    </div>

                                    <div class="row" v-if="isLoggedIn">
                                        <div class="col-md-12">
                                            <div class="media media-post">
                                                <div class="media-body">
                                                    <div class="form-group form-rose is-empty">
                                                        <label for="comment" class="isansFont">سوال یا نظری دارید
                                                            بنویسید :</label>
                                                        <textarea id="comment" class="form-control isansFont"
                                                                  placeholder="نظرتون رو بنویسید" rows="6"
                                                                  v-model="inputComment"></textarea>
                                                        <span class="material-input"></span>
                                                    </div>
                                                    <div class="media-footer">
                                                        <button @click.prevet="submitComment()"
                                                                class="btn btn-rose  isansFont">
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
                                    </div>
                                    <div class="row" v-else>
                                        <div class="col-md-12 text-center">
                                            <router-link to="/login" class="btn btn-sm btn-warning isansFont">
                                                برای ثبت نظر باید وارد حساب خود شوید. برای ورود کلیک کنید
                                            </router-link>
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
    import Calendar from '@/components/Consultant/Calendar'

    export default {
        name: "ConsultantProfile",
        components: {
            CommentBlock, RectNotifBlock, ConsultantInfoBlock, ConsultantTitle, Calendar
        },
        data() {
            return {
                consultant: {},
                inputComment: '',
                comments: [],

                aparatFrameLink: '',

                calendarConfig: {
                    showAddToCart: true,
                    showConsultantManagePanel: false
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


            }
        },
        computed: {
            isLoggedIn: function () {
                return this.$store.getters.isLoggedIn;
            },
            activeCart: function () {
                return this.$store.getters.getCart;
            },
        },
        created() {
            let consultPromise = this.getConsultantBySlug(this.$route.params.consultantSlug);
            consultPromise.then(response => {
                this.consultant = response.data;
                this.aparatFrameLink = this.getVideoFrameLink(this.consultant.aparat_link);
                this.getConsultantComments(this.consultant.id);
            }).catch(error => {
                window.console.log(error.response);
            });

        },
        mounted() {
            scrollTo(0, 0);
        },

        methods: {

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

                    let commitPromise = this.sendSubmitCommentRequest(payload);

                    commitPromise.then((response) => {
                        this.successSubmitCommentLogic();
                        let commentsPromise = this.getConsultantComments(this.consultant.id);
                        commentsPromise.then(response => {
                            console.log(response.data);
                            this.comments = response.data;
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

<style>
    .description {
        padding: 15px;
        line-height: 25px;
    }

    .videoTitle {
        margin-top: 15px;
        margin-bottom: 30px;
    }

    .aparatFrame {
        width: 100%;
        min-height: 400px;
        border: none;
    }

    tr th, tr td {
        text-align: center;
    }

    .timeNotAvailable {
        background-color: #999999;
        color: white;
    }

    .timeOpen {
        background-color: #4caf50;
        cursor: pointer;
    }

    .timeOpen::before {
        content: "آماده انتخاب";
        color: white;
    }

    .timeSelected {
        background-color: orange !important;
        cursor: pointer;
    }

    .timeSelected::before {
        content: "انتخاب شده" !important;
        color: white;
    }


    .itemIsReadyToResreve {
        background-color: #e91e63;
        color: white;
        cursor: pointer;
    }

    .itemIsReadyToResreve::before {
        color: white;
        content: 'باز برای رزرو'
    }

    .timeReserved {
        background-color: blue;
        /*cursor: pointer;*/
    }

    .timeReserved::before {
        content: "رزرو شده";
        color: white;
    }
</style>