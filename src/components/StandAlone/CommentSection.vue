<template>
    <div class="commentSectionWrapper">

        <div class="commentInputSection isansFont--faNum" v-if="isLoggedIn">
            <textarea id="comment" placeholder="نظرتون رو بنویسید" rows="6"
                      v-model="$v.inputComment.$model"></textarea>
            <p class="text-danger" v-if="$v.inputComment.$error">برای ثبت نظر باید حتما فیلد نظر را بنویسید.</p>
            <button @click.prevet="submitComment()" :disabled="$v.inputComment.$error || !$v.inputComment.$dirty">
                ثبت نظر
            </button>
        </div>

        <div class="col-md-12" v-else>
            <router-link to="/login" class="btn btn-sm btn-warning isansFont">
                برای ثبت نظر باید وارد حساب خود شوید. برای ورود کلیک کنید
            </router-link>
        </div>

        <div class="col-md-12">
            <h3 class="text-right commentsMiniTitle isansFont--faNum">
                نظرات ( {{comments.length}} )
            </h3>
            <CommentBlock v-for="comment in comments"
                          @update-comments="getConsultantComments(consultant.id)"
                          :config="{'showEdit':true,'showRemove':true,'deleted': false}"
                          :consultant="consultant"
                          :comment="comment"
                          :key="comments.indexOf(comment)"
            ></CommentBlock>
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
            this.getConsultantComments(this.consultant.id).then((commentsResponse) => {
                this.comments = commentsResponse.data;
            }).catch(error => {
            });
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
            consultant: {}
        },
        computed: {
            isLoggedIn: function () {
                return this.$store.getters.isLoggedIn;
            }
        },
        methods: {
            getConsultantComments: function (consultantId) {
                console.log('calling get consultant comments');
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

            submitComment: function () {
                if (!this.$v.inputComment.$invalid) {
                    console.log('sending request');
                    let payload = {
                        'consultant': this.consultant.id,
                        'message': this.inputComment,
                    };

                    this.sendSubmitCommentRequest(payload).then((response) => {
                        this.getConsultantComments(this.consultant.id).then(response => {
                            console.log(response.data);
                            this.comments = response.data;
                            this.inputComment = '';
                        }).catch(error => {
                            console.log(error.response);
                        });

                        console.log('response:', response.data);
                    }).catch((error) => {

                    })
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
</style>