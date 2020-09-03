<template>
    <div class="commentBlock" v-if="!config.deleted">
        <div class="commentWrapper">
            <div class="commentSender">
                <h5 class="senderName gadugiFont"> {{comment.user.first_name}} </h5>
            </div>
            <div class="commentMessage">
                <p class="isansFont" v-if="!showEditPanel">{{comment.message}}</p>
                <form @submit.prevent="editComment()" v-else>
                    <div class="form-group form-rose is-empty editForm">
                        <label for="editComment" class="isansFont">Edit your comment :</label>
                        <textarea
                            id="editComment"
                            class="form-control isansFont"
                            v-model="$v.editedCommentInput.$model"
                            rows="10" cols="100" />
                        <span class="material-input" />
                        <span class="text-danger d-block editError isansFont" v-if="$v.editedCommentInput.$error">
                            Edited comment is required.
                        </span>
                        <button class="btn btn-success btn-sm isansFont pull-left mb-10 " title="ثبت تغییرات">
                            Submit changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div class="commentWrapper adminWrapper" v-if="comment.admin_reply != null">
            <div class="commentSender">
                <h5 class="senderName gadugiFont"> Admin </h5>
            </div>

            <div class="commentMessage">
                <p class="gadugiFont">{{comment.admin_reply}}</p>
            </div>
        </div>
    </div>

</template>

<script>
    import jalali from 'jalali-moment'
    import {required} from 'vuelidate/lib/validators'

    export default {
        name: "CommentBlock",
        validations: {
            editedCommentInput: {required}
        },
        data() {
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
            async editComment() {
                try {
                    //this.$loading(true);
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

                }
            },
        },
        computed: {
            fromNow() {
                return jalali(this.comment.created).locale('fa').fromNow();
            },
            adminFromNow() {
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
        margin-left: 10px;
    }

    .commentMessage p {
        padding: 10px 20px;
        font-size: 15px;
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

    .editForm {
        padding: 20px;
        margin-top: 0;
    }

    .commentWrapper.adminWrapper {
        padding-left: 30px;
    }
    .adminWrapper .senderName {
        border-left: 5px solid #E04DDF;
        padding-left: 5px;
    }

    .adminWrapper .dateCreated {
        padding-left: 10px;
    }

    .adminWrapper .commentMessage {
        padding-left: 10px;
    }

    .editError {
        font-size: 12px;
        padding: 5px;
    }
</style>
