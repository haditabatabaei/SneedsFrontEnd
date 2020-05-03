<template>
    <div class="commentBlock" v-if="!config.deleted">
        <div class="commentWrapper">
            <div class="commentSender">
                <h5 class="senderName isansFont"> {{comment.user.first_name}} </h5>
                <h6 class="dateCreated isansFont">{{this.fromNow}}</h6>
            </div>

            <div class="commentMessage">
                <p class="isansFont text-justify" v-if="!showEditPanel">{{comment.message}}</p>
                <form @submit.prevent="editComment()" v-else>
                    <div class="form-group form-rose is-empty editForm">
                        <label for="editComment" class="isansFont">نظر خود را ویرایش کنید :</label>
                        <textarea
                            id="editComment"
                            class="form-control isansFont"
                            v-model="$v.editedCommentInput.$model"
                            rows="10" cols="100" />
                        <span class="material-input" />
                        <span class="text-danger d-block editError isansFont" v-if="$v.editedCommentInput.$error">برای
                            ویرایش باید یک چیزی وارد کنید.</span>
                        <button class="btn btn-success btn-sm isansFont pull-left mb-10 " title="ثبت تغییرات">
                            ثبت تغییرات
                        </button>
                    </div>
                </form>
            </div>

<!--            <div class="commentAction"-->
<!--                 v-if="this.$store.getters.isLoggedIn && comment.user.id == this.$store.getters.getUserInfo.id">-->
<!--                <button @click.prevent="deleteComment()" v-if="config.showRemove" title="حذف نظر"-->
<!--                        class="btn btn-fab btn-fab-mini btn-simple isansFont btn-remove">-->
<!--                    <i class="material-icons">delete_forever</i>-->
<!--                </button>-->
<!--                <button @click.prevent="toggleEditComment()" v-if="config.showEdit" title="ویرایش نظر"-->
<!--                        class="btn btn-fab btn-fab-mini btn-simple btn-sm isansFont btn-edit">-->
<!--                    <i class="material-icons">border_color</i>-->
<!--                </button>-->
<!--            </div>-->
        </div>
        <div class="commentWrapper adminWrapper" v-if="comment.admin_reply != null">
            <div class="commentSender">
                <h5 class="senderName isansFont"> ادمین </h5>
                <h6 class="dateCreated isansFont">{{this.adminFromNow}}</h6>
            </div>

            <div class="commentMessage">
                <p class="isansFont">{{comment.admin_reply}}</p>
            </div>
        </div>
    </div>

</template>

<script>
    import jalali from 'jalali-moment'
    import axios from 'axios'
    import {required} from 'vuelidate/lib/validators'

    export default {
        name: "CommentBlock",
        validations: {
            editedCommentInput: {required}
        },
        data: function () {
            return {
                showEditPanel: false,
                editedCommentInput: this.comment.message
            }
        },
        props: {
            comment: {
                type : Object,
            },
            consultant: {
                type : Object
            },
            config: {
                type : Object,
                default : () => { return {'showEdit':true,'showRemove':true,'deleted': false} }
            },
        },
        methods: {
            toggleEditComment: function () {
                this.showEditPanel = !this.showEditPanel;
                this.editedCommentInput = this.comment.message;
            },

            async editComment() {
                try {
                    this.$loading(true);
                    let result = await this.$api.put(
                        `${this.$store.getters.getApi}/comment/comments/${this.comment.id}/`,
                        {consultant: this.consultant.id, message: this.editedCommentInput},
                            this.$store.getters.httpConfig
                        );
                    console.log('edit comment result ', result);
                    this.showEditPanel = false;
                    this.$emit('update-comments');
                } catch (e) {
                    console.log(e);
                    if(e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },

            async deleteComment() {
                if (window.confirm('از حذف نظر خود مطمئنید ؟')) {
                    try {
                        this.$loading(true);
                        let result = await this.$api.delete(
                            `${this.$store.getters.getApi}/comment/comments/${this.comment.id}/`,
                            this.$store.getters.httpConfig
                        );
                        console.log('edit delete result ', result);
                        this.$emit('update-comments');
                    } catch (e) {
                        console.log(e);
                        if(e.response) {
                            console.log(e.response);
                        }
                    } finally {
                        this.$loading(false);
                    }
                }

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
        word-break: break-all;
        color: #868686;
    }

    .dateCreated {
        margin: 5px 10px;
        color: #c8c8c8;

    }

    .senderName {
        margin: 5px 10px;
        font-weight: bold;
        color: #636363;
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

    .commentWrapper.adminWrapper {
        padding-right:30px;
    }
    .adminWrapper .senderName {
        border-right:5px solid #E04DDF;
        padding-right:5px;
    }

    .adminWrapper .dateCreated {
        padding-right:10px;
    }

    .adminWrapper .commentMessage {
        padding-right:10px;
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
