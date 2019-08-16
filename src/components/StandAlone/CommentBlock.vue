<template>
    <div class="commentBlock" v-if="!config.deleted">
        <div class="commentWrapper">
            <div class="commentSender">
                <h5 class="senderName isansFont"> {{comment.first_name}} </h5>
                <h6 class="dateCreated isansFont">{{this.fromNow}}</h6>
            </div>

            <div class="commentMessage">
                <p class="isansFont text-justify" v-if="!showEditPanel">{{comment.message}}</p>
                <form @submit.prevent="editComment()" v-else>
                    <div class="form-group form-rose is-empty editForm">
                        <label for="editComment" class="isansFont">نظر خود را ویرایش کنید :</label>
                        <textarea id="editComment" class="form-control isansFont" v-model="$v.editedCommentInput.$model"
                                  rows="10" cols="100"></textarea>
                        <span class="material-input"></span>
                        <span class="text-danger d-block editError isansFont" v-if="$v.editedCommentInput.$error">برای
                            ویرایش باید یک چیزی وارد کنید.</span>
                        <button class="btn btn-success btn-sm isansFont pull-left mb-10 " title="ثبت تغییرات">
                            <img src="http://193.176.241.131/sneedsAssets/img/loading.svg" alt="loading icon"
                                 class="loadingIcon"
                                 v-if="editCommentLoading.value">
                            <i class="material-icons" v-if="editCommentSuccess.value">done</i>
                            <i class="material-icons" v-if="editCommentFailed.value">block</i>
                            ثبت تغییرات
                        </button>
                    </div>
                </form>
            </div>

            <div class="commentAction"
                 v-if="this.$store.getters.isLoggedIn && comment.user == this.$store.getters.getUserInfo.user_pk">
                <button @click.prevent="deleteComment()" v-if="config.showRemove" title="حذف نظر"
                        class="btn btn-fab btn-fab-mini btn-simple isansFont btn-remove">
                    <i class="material-icons">delete_forever</i>
                    <img src="http://193.176.241.131/sneedsAssets/img/loading.svg" alt="loading icon"
                         class="loadingIcon"
                         v-if="removeCommentLoading.value">
                    <i class="material-icons" v-if="removeCommentSuccess.value">done</i>
                    <i class="material-icons" v-if="removeCommentFailed.value">block</i>
                </button>
                <button @click.prevent="toggleEditComment()" v-if="config.showEdit" title="ویرایش نظر"
                        class="btn btn-fab btn-fab-mini btn-simple btn-sm isansFont btn-edit">
                    <i class="material-icons">border_color</i>
                </button>
            </div>
        </div>
        <div class="commentWrapper" v-if="comment.admin_reply != null">
            <div class="commentSender">
                <h5 class="senderName isansFont"> ادمین </h5>
                <h6 class="dateCreated isansFont">({{this.adminFromNow}})</h6>
            </div>

            <div class="commentMessage">
                <p class="isansFont">{{comment.admin_reply.message}}</p>
            </div>
        </div>
    </div>

</template>

<script>
    import jalali from 'jalali-moment'
    import axios from 'axios'
    import RectNotifBlock from '@/components/NotifBlocks/RectNotifBlock';
    import {required} from 'vuelidate/lib/validators'

    export default {
        name: "CommentBlock",
        components: {
            RectNotifBlock,
        },
        validations: {
            editedCommentInput: {required}
        },
        data: function () {
            return {
                showEditPanel: false,
                editedCommentInput: this.comment.message,
                removeCommentSuccess: {
                    value: false,
                    message: 'تغییرات شما با موفقیت اعمال شد ...'
                },

                removeCommentLoading: {
                    value: false,
                    message: 'چند لحظه صبر کنید'
                },

                removeCommentFailed: {
                    value: false,
                    message: 'مشکلی رخ داد...'
                },

                editCommentSuccess: {
                    value: false,
                    message: 'تغییرات شما با موفقیت اعمال شد ...'
                },

                editCommentLoading: {
                    value: false,
                    message: 'چند لحظه صبر کنید'
                },

                editCommentFailed: {
                    value: false,
                    message: 'مشکلی رخ داد...'
                },
            }
        },
        props: {
            comment: {},
            consultant: {},
            config: {},
        },
        methods: {
            resetremoveCommentLogic: function () {
                window.console.log('no loading deploy');
                this.removeCommentLoading.value = false;
                this.removeCommentFailed.value = false;
                this.removeCommentSuccess.value = false;
            },
            startremoveCommentLogic: function () {
                window.console.log('start loading deploy');
                this.removeCommentLoading.value = true;
                this.removeCommentFailed.value = false;
                this.removeCommentSuccess.value = false;
            },
            failedremoveCommentLogic: function () {
                window.console.log('failed loading deploy');
                this.removeCommentLoading.value = false;
                this.removeCommentFailed.value = true;
                this.removeCommentSuccess.value = false;
            },
            successremoveCommentLogic: function () {
                window.console.log('success loading deploy');
                this.removeCommentLoading.value = false;
                this.removeCommentFailed.value = false;
                this.removeCommentSuccess.value = true;
            },
            reseteditCommentLogic: function () {
                window.console.log('no loading deploy');
                this.editCommentLoading.value = false;
                this.editCommentFailed.value = false;
                this.editCommentSuccess.value = false;
            },
            starteditCommentLogic: function () {
                window.console.log('start loading deploy');
                this.editCommentLoading.value = true;
                this.editCommentFailed.value = false;
                this.editCommentSuccess.value = false;
            },
            failededitCommentLogic: function () {
                window.console.log('failed loading deploy');
                this.editCommentLoading.value = false;
                this.editCommentFailed.value = true;
                this.editCommentSuccess.value = false;
            },
            successeditCommentLogic: function () {
                window.console.log('success loading deploy');
                this.editCommentLoading.value = false;
                this.editCommentFailed.value = false;
                this.editCommentSuccess.value = true;
            },
            toggleEditComment: function () {
                this.showEditPanel = !this.showEditPanel;
                this.editedCommentInput = this.comment.message;
            },
            editComment: function () {
                this.reseteditCommentLogic();
                this.starteditCommentLogic();
                let payload = {'consultant': this.consultant.id, 'message': this.editedCommentInput};
                let editPromise = this.sendEditRequest(payload);
                editPromise.then(response => {
                    window.console.log(response);
                    this.reseteditCommentLogic();
                    this.showEditPanel = false;
                    this.$emit('update-comments');
                }).catch(error => {
                    console.log(error.response);
                    if (error.response) {
                        this.editCommentFailed.message = 'مشکلی رخ داد...' + error.response;
                    } else {
                        this.editCommentFailed.message = 'مشکلی رخ داد...';
                    }
                    this.failededitCommentLogic();
                })
            },
            sendEditRequest: function (payload) {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'comment/comments/' + this.comment.id + '/',
                        method: 'PUT',
                        headers: {
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                            'Content-Type': 'application/json',
                        },
                        data: payload,
                    }).then(response => {
                        resolve(response);
                    }).catch(error => {
                        reject(error);
                    })
                })
            },
            deleteComment: function () {
                if (window.confirm('از حذف نظر خود مطمئنید ؟')) {
                    this.resetremoveCommentLogic();
                    this.startremoveCommentLogic();
                    let deletePromise = this.sendDeleteRequest();
                    deletePromise.then(response => {
                        this.resetremoveCommentLogic();
                        console.log(response);
                        this.$emit('update-comments');
                    }).catch(error => {
                        // console.log(error.response);
                        if (error.response) {
                            this.removeCommentFailed.message = 'مشکلی رخ داد...' + error.response;
                        } else {
                            this.removeCommentFailed.message = 'مشکلی رخ داد...';
                        }
                        this.failedremoveCommentLogic();
                    })
                }

            },
            sendDeleteRequest: function () {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'comment/comments/' + this.comment.id,
                        method: 'DELETE',
                        headers: {
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {
                        resolve(response);
                    }).catch(error => {
                        reject(error);
                    })
                })
            },
        },
        computed: {
            fromNow: function () {
                return jalali(this.comment.created).locale('fa').fromNow();
            },
            adminFromNow: function () {
                if (this.comment.admin_reply != null) {
                    return jalali(this.comment.admin_reply.created).locale('fa').fromNow();
                } else return null;
            }
        }
    }
</script>

<style scoped>
    .commentBlock {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
        margin-bottom: 20px;
    }

    .commentWrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

    .commentSender {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-right: 10px;
    }

    .commentAction {
        align-self: flex-end;
    }

    .commentMessage p {
        padding: 10px 20px;
        font-size: 15px;
        /*font-weight:bold;*/
        color: #838383;
    }

    .dateCreated {
        margin: 5px 10px;
        color: #b3b3b3;

    }

    .senderName {
        margin: 5px 10px;
        font-weight: bold;
        color: #555555;
    }

    .editPanel {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .loadingIcon {
        width: 20px !important;
        height: 20px !important;
    }

    .editForm {
        padding: 20px;
        margin-top: 0;
    }

    .btn-edit:hover {
        color: #9c27b0;
    }

    .btn-remove:hover {
        color: #d9534f;
    }

    .editError {
        font-size: 12px;
        padding: 5px;
    }
</style>