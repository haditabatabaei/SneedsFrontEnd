<template>
    <div class="card commentBlock" v-if="!config.deleted">
        <div class="commentWrapper">
            <div class="commentSender">
                <h5 class="senderName isansFont">{{comment.first_name}}</h5>
                <h6 class="dateCreated isansFont">{{this.fromNow}}</h6>
            </div>

            <div class="commmentMessage">
                <p class="isansFont">{{comment.message}}</p>
            </div>
        </div>
        <div class="commentWrapper" v-if="comment.admin_reply != null">
            <div class="commentSender">
                <h5 class="senderName isansFont">ادمین</h5>
                <h6 class="dateCreated isansFont">{{this.adminFromNow}}</h6>
            </div>

            <div class="commmentMessage">
                <p class="isansFont">{{comment.admin_reply.message}}</p>
            </div>
        </div>
        <div class="editPanel"
             v-if="this.$store.getters.isLoggedIn && comment.user == this.$store.getters.getUserInfo.user_pk">
            <button @click.prevent="deleteComment()" v-if="config.showRemove" class="btn btn-danger btn-sm isansFont">
                <img src="../../../public/webimages/loading.svg" alt="loading icon" class="loadingIcon"
                     v-if="commentLoading.value">
                <i class="material-icons" v-if="commentSuccess.value">done</i>
                حذف نظر
            </button>
            <button @click.prevent="toggleEditComment()" v-if="config.showEdit" class="btn btn-info btn-sm isansFont">
                ویرایش این نظر
            </button>
            <div class="w-100 d-block" v-if="showEditPanel">
                <div class="form-group form-rose is-empty">
                    <label for="editComment" class="isansFont">نظر خود را ویرایش کنید :</label>
                    <textarea id="editComment" class="form-control isansFont" v-model="editedCommentInput"
                              rows="6"></textarea>
                    <span class="material-input"></span>
                    <button class="btn btn-success btn-sm isansFont" @click="editComment()">ثبت تغییرات</button>
                </div>
            </div>
        </div>
        <RectNotifBlock
                :message="commentLoading.message"
                type="warning"
                borderRound="true"
                v-if="commentLoading.value">
        </RectNotifBlock>

        <RectNotifBlock
                :message="commentSuccess.message"
                type="success"
                borderRound="true"
                v-else-if="commentSuccess.value">
        </RectNotifBlock>

        <RectNotifBlock
                :message="commentFailed.message"
                type="danger"
                borderRound="true"
                v-else-if="commentFailed.value">
        </RectNotifBlock>
    </div>

</template>

<script>
    import jalali from 'jalali-moment'
    import axios from 'axios'
    import RectNotifBlock from '@/components/NotifBlocks/RectNotifBlock';

    export default {
        name: "CommentBlock",
        components: {
            RectNotifBlock,
        },
        data: function () {
            return {
                showEditPanel: false,
                editedCommentInput: this.comment.message,
                commentSuccess: {
                    value: false,
                    message: 'تغییرات شما با موفقیت اعمال شد ...'
                },

                commentLoading: {
                    value: false,
                    message: 'چند لحظه صبر کنید'
                },

                commentFailed: {
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
            resetCommentLogic: function () {
                window.console.log('no loading deploy');
                this.commentLoading.value = false;
                this.commentFailed.value = false;
                this.commentSuccess.value = false;
            },
            startCommentLogic: function () {
                window.console.log('start loading deploy');
                this.commentLoading.value = true;
                this.commentFailed.value = false;
                this.commentSuccess.value = false;
            },
            failedCommentLogic: function () {
                window.console.log('failed loading deploy');
                this.commentLoading.value = false;
                this.commentFailed.value = true;
                this.commentSuccess.value = false;
            },
            successCommentLogic: function () {
                window.console.log('success loading deploy');
                this.commentLoading.value = false;
                this.commentFailed.value = false;
                this.commentSuccess.value = true;
            },
            toggleEditComment: function () {
                this.showEditPanel = !this.showEditPanel;
            },
            editComment: function () {
                this.resetCommentLogic();
                this.startCommentLogic();
                let payload = {'consultant': this.consultant.id, 'message': this.editedCommentInput};
                let editPromise = this.sendEditRequest(payload);
                editPromise.then(response => {
                    window.console.log(response);
                    this.successCommentLogic();
                    setTimeout(() => {
                        this.resetCommentLogic();
                    }, 2000)
                }).catch(error => {
                    console.log(error.response);
                    if (error.response) {
                        this.commentFailed.message = 'مشکلی رخ داد...' + error.response;
                    } else {
                        this.commentFailed.message = 'مشکلی رخ داد...';
                    }
                    this.failedCommentLogic();
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
                this.resetCommentLogic();
                this.startCommentLogic();
                let deletePromise = this.sendDeleteRequest();
                deletePromise.then(response => {
                    this.successCommentLogic();
                    console.log(response);
                    setTimeout(() => {
                        this.resetCommentLogic();
                        this.config.deleted = true;
                    }, 2000)
                }).catch(error => {
                    // console.log(error.response);
                    if (error.response) {
                        this.commentFailed.message = 'مشکلی رخ داد...' + error.response;
                    } else {
                        this.commentFailed.message = 'مشکلی رخ داد...';
                    }
                    this.failedCommentLogic();
                })
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
            }
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
    }

    .commentWrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    }

    .commentSender {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    .editPanel {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-around;
    }

    .loadingIcon {
        width: 20px !important;
        height: 20px !important;
    }
</style>