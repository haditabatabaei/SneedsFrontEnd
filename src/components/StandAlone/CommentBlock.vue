<template>
    <div class="card commentBlock">
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
            <button @click.prevent="deleteComment()" v-if="config.showRemove" class="btn btn-danger btn-sm isansFont">حذف نظر</button>
            <button @click.prevent="toggleEditComment()" v-if="config.showEdit" class="btn btn-info btn-sm isansFont">ویرایش این نظر</button>
            <div class="w-100 d-block" v-if="showEditPanel">
                <div class="form-group form-rose is-empty">
                    <label for="editComment" class="isansFont">نظر خود را ویرایش کنید :</label>
                    <textarea id="editComment" class="form-control isansFont" v-model="editedCommentInput"
                              rows="6">

                    </textarea>
                    <span class="material-input"></span>
                    <button class="btn btn-success btn-sm isansFont" @click="editComment()">ثبت تغییرات</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import jalali from 'jalali-moment'
    import axios from 'axios'

    export default {
        name: "CommentBlock",
        data: function () {
            return {
                showEditPanel: false,
                editedCommentInput: this.comment.message,
            }
        },
        props: {
            comment: {},
            consultant: {},
            config : {}
    },
    methods: {
        toggleEditComment: function () {
            this.showEditPanel = !this.showEditPanel;
        }
    ,
        editComment: function () {
            let payload = {'consultant': this.consultant.id, 'message': this.editedCommentInput};
            let editPromise = this.sendEditRequest(payload);
            editPromise.then(response => {
                window.console.log(response);
            }).catch(error => {
                console.log(error.response);
            })
        }
    ,
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
        }
    ,
        deleteComment: function () {
            let deletePromise = this.sendDeleteRequest();
            deletePromise.then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error.response);
            })
        }
    ,
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
    }
    ,
    computed: {
        fromNow: function () {
            return jalali(this.comment.created).locale('fa').fromNow();
        }
    ,
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
</style>