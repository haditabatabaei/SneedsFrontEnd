<template>
    <section class="commentSectionWrapper">
        <h1 class="commentSectionWrapper-title isansFont">
            نظرات
            <sub v-if="comments.length > 0" class="commentSectionWrapper-title-meta isansFont--faNum">{{comments.length}} نظر</sub>
        </h1>
        <div class="commentInputSection isansFont--faNum" v-if="isLoggedIn">
            <textarea
                id="comment"
                placeholder="نظرتون رو بنویسید" rows="6"
                v-model="$v.inputComment.$model">
            </textarea>

            <p class="text-danger" v-if="$v.inputComment.$error">برای ثبت نظر باید حتما فیلد نظر را بنویسید.</p>
            <button @click.prevent="submitComment()" :disabled="$v.inputComment.$error || !$v.inputComment.$dirty">
                ثبت نظر
            </button>
        </div>

        <div class="col-md-12 text-center comment-login-needed" v-else>
            <router-link to="/auth/login" class=" isansFont">
                برای ثبت نظر باید وارد حساب خود شوید. برای ورود کلیک کنید
            </router-link>
        </div>

        <div class="col-md-12 commentsWrapper">
            <comment-block
                v-for="(comment, index) in comments"
                :key="index"
                @update-comments="getConsultantComments(consultant.id)"
                :config="{'showEdit':true,'showRemove':true,'deleted': false}"
                :consultant="consultant"
                :comment="comment"
            />
        </div>
    </section>
</template>

<script>
    import CommentBlock from '@/components/StandAlone/CommentBlock'
    import axios from 'axios'
    import {required} from 'vuelidate/lib/validators'

    export default {
        name: "CommentSection",
        components: {
            CommentBlock
        },
        created() {
            console.log('consultant id :' + this.consultant.id);
            this.getConsultantComments(this.consultant.id);
        },
        validations: {
            inputComment: {
                required,
            }
        },
        data: function () {
            return {
                comments: [],
                inputComment: '',
            }
        },
        props: {
            consultant: {
                type : Object
            }
        },
        computed: {
            isLoggedIn: function () {
                return this.$store.getters.isLoggedIn;
            }
        },
        methods: {
            async getConsultantComments(consultantId) {
                console.log('calling get consultant comments');
                try {
                    //this.$loading(true);
                    let result = await this.$api.get(
                        `${this.$store.getters.getApi}/comment/comments/?consultant=${consultantId}`,
                        this.$store.getters.httpConfig
                    );
                    console.log('get comments result ', result);
                    this.comments = result.data;
                } catch (e) {
                    console.log(e);
                    if(e.response) {
                        console.log(e.response);
                    }
                } finally {

                }
            },

            async submitComment() {
                if (!this.$v.inputComment.$invalid) {
                    console.log('sending request');
                    try {
                        //this.$loading(true);
                        let result = await this.$api.post(
                            `${this.$store.getters.getApi}/comment/comments/`,
                            {consultant: this.consultant.id, message: this.inputComment},
                            this.$store.getters.httpConfig
                        );
                        console.log('create comment result :', result);
                        await this.getConsultantComments(this.consultant.id);
                        this.inputComment = '';
                        this.$v.$reset();
                    } catch (e) {
                        console.log(e);
                        if(e.response) {
                            console.log(e.response);
                        }
                    } finally {

                    }
                } else {
                    console.log('comment was empty');
                }
            },
        }
    }
</script>

<style scoped>
    .commentSectionWrapper {
        background-color: white;
        border-radius: 0 0 15px 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        padding: 60px 15px;
    }

    .commentSectionWrapper-title {
        font-size: 24px;
        color: #444;
        margin-top: 30px;
        font-weight: bold;
        text-align: right;
        width: 100%;
    }

    .comment-login-needed {
        width: 100%;
        text-align: right;
        padding-right: 0;
    }

    .commentSectionWrapper-title-meta {
        font-size: 12px;
        color: #555;
    }

    .commentInputSection {
        width: 100%;
    }

    .commentInputSection textarea {
        width: 100%;
        padding: 10px;
        resize: none;
        border: 1px solid #ccc;
        border-radius: 15px;
    }

    .commentInputSection button {
        color: white;
        font-weight: bold;
        border-radius: 5px;
        padding: 10px 30px;
        border: none;
        background-color: #E81E63;
        float: left;
    }

    .commentsMiniTitle {
        color: #bbb;
    }

    button:disabled {
        background-color: rgba(232,30,99,0.5);
        cursor: not-allowed;
    }

    @media only screen and (max-width : 991.2px) and (min-width: 0) {
        .commentsWrapper {
            margin-top: 30px;
            width: 100%;
            padding-right: 0;
            padding-left: 0;
        }
    }
</style>
