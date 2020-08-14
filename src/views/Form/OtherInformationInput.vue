<template>
    <section class="form-other">
        <h1 class="other-title isansFont">
            سایر موارد و رزومه
            <i class="material-icons">info</i>
        </h1>
        <h3 class="other-desc isansFont">
            این اطلاعات برای مقایسه خیلی به ما کمک می‌کنه.
        </h3>

        <div class="form-other-items" v-if="detailedForm">
            <c-collapsable-input title="آدرس لینکدین" :isOpenByDefault="true" >
                <textarea name="collapsable-input" class="collapsable-input-textarea" :style="`resize:vertical;`" cols="30" rows="10" placeholder="آدرس لینکدین" v-model="linkedin" />
            </c-collapsable-input>
            <c-collapsable-input title="سابقه المپیاد" >
                <textarea name="collapsable-input" class="collapsable-input-textarea" :style="`resize:vertical;`" cols="30" rows="10" placeholder="المپیاد" v-model="olympiad" />
            </c-collapsable-input>
            <c-collapsable-input title="آدرس وبسایت شخصی" >
                <c-simple-input label="آدرس وبسایت شخصی" @input="val => homepage = val" />
            </c-collapsable-input>
            <c-collapsable-input title="آپلود رزومه" >
                <input type="file">
            </c-collapsable-input>
            <c-collapsable-input title="سایر توضیحات">
                <textarea name="collapsable-input" class="collapsable-input-textarea" :style="`resize:vertical;`" cols="30" rows="10" placeholder="توضیحات" v-model="comment" />
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
                comment: null
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
            }
        },
        methods: {
            init() {

            }
        },
        created() {
            if(this.detailedForm) {
                this.init();
            }
            // this.fullFund = this.detailedForm.prefers_full_fund;
            // this.halfFund = this.detailedForm.prefers_half_fund;
            // this.selfFund = this.detailedForm.prefers_self_fund;
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
</style>