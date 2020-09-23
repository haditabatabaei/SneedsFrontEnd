<template>
    <section class="form-other gadugiFont">
        <h1 class="other-title">
            Other information and resume
            <i class="material-icons">help_outline</i>
        </h1>
        <h3 class="other-desc">
            These information are very helpful for us.
        </h3>

        <div class="form-other-items" v-if="detailedForm">
            <c-collapsable-input class="form-other-collapsable" title="Linked-in profile" :isOpenByDefault="true">
                <c-simple-input label="Linked-in profile URL" v-model="linkedin"  style="width: 100%" />
            </c-collapsable-input>
            <c-collapsable-input class="form-other-collapsable" title="Olympiad experience">
                <textarea name="collapsable-input" class="collapsable-input-textarea" :style="`resize:vertical;`"
                          cols="30" rows="10" placeholder="Olympiad experience" v-model="olympiad"/>
            </c-collapsable-input>
            <c-collapsable-input class="form-other-collapsable" title="Personal website">
                <c-simple-input label="Personal website/portfolio URL" v-model="homepage"  style="width: 100%"/>
            </c-collapsable-input>
            <c-collapsable-input class="form-other-collapsable" title="Resume/CV file">
                <input type="file" @change="handleFile">
                <a v-if="currentFile" :href="currentFile" target="_blank">Download current resume/CV</a>
            </c-collapsable-input>
            <c-collapsable-input class="form-other-collapsable" title="Comment">
                <textarea name="collapsable-input" class="collapsable-input-textarea" :style="`resize:vertical;`"
                          cols="30" rows="10" placeholder="Comments..." v-model="comment"/>
            </c-collapsable-input>
        </div>
    </section>
</template>

<script>
    import CollapsableInput from "@/components/Form/CollapsableInput";
    import SimpleInput from "@/components/Form/SimpleInput";

    export default {
        name: "OtherInformationInput",
        components: {
            'c-collapsable-input': CollapsableInput,
            'c-simple-input': SimpleInput
        },
        data() {
            return {
                linkedin: null,
                olympiad: null,
                homepage: null,
                comment: null,
                currentFile: null,
                inputFile: null,
            }
        },
        computed: {
            user() {
                return {...this.$store.getters.getUserInfo, ...this.$store.getters.getUser}
            },

            detailedForm() {
                return this.$store.getters.detailedForm;
            },

            detailedFormId() {
                return this.$store.getters.detailedFormId;
            },

            api() {
                return this.$store.getters.getApi
            },

            httpConfig() {
                return this.$store.getters.httpConfig
            },

            multipartHttpConfig() {
                return this.$store.getters.multipartHttpConfig
            },
        },
        watch: {
            detailedForm(newDetailedForm) {
                console.log('detailed form changed ', newDetailedForm);
                this.init();
            },

            comment(value) {
                this.$store.commit('setDetailedFormProperty', {prop: 'comment', value})
            },

            olympiad(value) {
                this.$store.commit('setDetailedFormProperty', {prop: 'olympiad', value})
            },

            linkedin(value) {
                this.$store.commit('setDetailedFormProperty', {prop: 'linkedin_url', value})
            },

            homepage(value) {
                this.$store.commit('setDetailedFormProperty', {prop: 'homepage_url', value})
            }
        },
        methods: {
            init() {
                if (this.detailedForm) {
                    this.linkedin = this.detailedForm.linkedin_url;
                    this.olympiad = this.detailedForm.olympiad;
                    this.homepage = this.detailedForm.homepage_url;
                    this.comment = this.detailedForm.comment;
                    this.currentFile = this.detailedForm.resume;
                }
            },

            handleFile(eve) {
                console.log(eve.target.files);
                let file = eve.target.files[0];
                console.log(file)
                if(file && file.type == 'application/pdf') {
                    this.inputFile = file
                } else {
                    this.inputFile = null;
                }
                this.$store.commit('setDetailedFormProperty', {prop: 'xInputFile', value: this.inputFile})
                console.log(this.detailedForm);
            }
        },
        created() {
            this.init();
        }
    }
</script>

<style scoped>
    .form-other {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .other-title {
        color: #173F5F;
        font-size: 22px;
        font-weight: bold;
        margin: 20px 25px;
        display: flex;
        align-items: center;
    }

    .other-title i {
        margin-right: 10px;
        color: #707070;
        border-radius: 50%;
    }

    .other-desc {
        font-size: 14px;
        margin: 0 25px;
        color: #9B9999;
    }

    .form-other-items {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 20px;
        margin-top: 30px;
    }

    .collapsable-input-textarea {
        background-color: #F8F8F8;
        border-radius: 10px;
        border: 1px solid #F2F2F2;
        padding: 5px;
        color: #9B9999;
        width: 100%;
    }

    .form-other-collapsable {
        margin-top: 10px
    }
</style>