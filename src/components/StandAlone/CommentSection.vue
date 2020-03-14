<template>
    <div class="commentSectionWrapper">

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

        <div class="col-md-12" v-else>
            <router-link to="/auth/login" class="btn btn-sm btn-warning isansFont">
                برای ثبت نظر باید وارد حساب خود شوید. برای ورود کلیک کنید
            </router-link>
        </div>

        <div class="col-md-12 commentsWrapper">
            <h3 class="text-right commentsMiniTitle isansFont--faNum">
                نظرات ( {{comments.length}} )
            </h3>
            <comment-block
                v-for="(comment, index) in comments"
                :key="index"
                @update-comments="getConsultantComments(consultant.id)"
                :config="{'showEdit':true,'showRemove':true,'deleted': false}"
                :consultant="consultant"
                :comment="comment"
            />
        </div>
    </div>
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
                    this.$loading(true);
                    let result = await axios.get(
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
                    this.$loading(false);
                }
            },

            async submitComment() {
                if (!this.$v.inputComment.$invalid) {
                    console.log('sending request');
                    try {
                        this.$loading(true);
                        let result = await axios.post(
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
                        this.$loading(false);
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
        border: 1.5px solid #ccc;

        margin-top: 30px;
        border-radius: 15px;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;

        padding: 15px;
    }

    .commentInputSection {
        width: 100%;
    }

    .commentInputSection textarea {
        width: 100%;
        padding: 10px;
        resize: none;
        border: none;
        border-bottom: 2px solid #ccc;
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
            margin-top: 15px;
            width: 100%;
            padding-right: 0;
            padding-left: 0;
        }
    }
</style>
