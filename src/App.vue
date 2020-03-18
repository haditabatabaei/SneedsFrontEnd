<template>
    <div>
        <notifications group="notif" position="bottom right" classes="notif isansFont"/>
        <bug-report/>
        <modal name="bugReportModal" :height="650" :resizable="true">
            <div class="bugModal-title">
                <h4 class="bugModal-title-head isansFont">
                    گزارش باگ!
                </h4>
                <button class="bugModal-title--close" @click="$modal.hide('bugReportModal')">
                    <i class="material-icons">close</i>
                </button>
            </div>
            <p class="isansFont bugModal-description">
                لطفا با گزارش باگ ها و مشکلات سایت به ما در بهبود عملکرد سایتمون کمک کنید.
            </p>
            <hr>
            <form class="loginForm">
                <label class="loginForm-label isansFont" for="email">
                    <span class="text-right">
                        ایمیل :
                        (<mark>برای ارتباط در آینده و ارسال جوایز احتمالی.</mark>)
                    </span>
                    <input class="loginForm-control" placeholder="ایمیل خود را وارد کنید..." id="email" type="email"
                           v-model.trim="$v.bug.senderEmail.$model">
                </label>
                <label class="loginForm-label isansFont" for="desc">
                    <span class="text-right">
                        توضیحات* :
                        (<mark>انتظار داشتی چی بشه و چی شد؟</mark>)
                    </span>
                    <textarea rows="5" class="loginForm-control" style="resize:none"
                              placeholder="انتظار داشتی چی بشه و چی شد!؟" id="desc" type="text"
                              v-model.trim="$v.bug.description.$model">
                    </textarea>
                </label>
                <label class="loginForm-label isansFont" for="bugImage">
                    <span class="text-right">
                        آپلود تصویر :
                        (<mark>در صورت امکان عکسی برای توضیح بیشتر آپلود کنید.</mark>)
                    </span>
                    <br>
                    <span style="width:120px" class="imageUploadButton isansFont">
                        <span>آپلود فایل</span>
                        <i class="material-icons">keyboard_arrow_up</i>
                    </span>
                    <input class="loginForm-control" style="display: none" placeholder="ایمیل خود را وارد کنید..." id="bugImage" type="file" @change="fileHandler">

                </label>
                <div class="files">
                    <ul>
                        <li v-for="(image, index) in bug.images" :key="index">{{image.name}} <button class="btn btn-sm btn-simple" @click="removeItem(index)"><i class="material-icons">close</i></button></li>
                    </ul>
                </div>
                <button class="loginForm-button isansFont">
                    ثبت باگ
                </button>
            </form>
        </modal>
        <top-menu style="top:50px"/>
        <transition
                name="fade"
                mode="out-in"
        >
            <router-view style="margin-top:50px;" :key="$route.fullPath"/>
        </transition>
        <Footer/>
    </div>

</template>

<script>
    import TopMenu from "@/components/TopMenus/TopMenu";
    import Footer from "@/components/StandAlone/Footer";
    import BugReport from '@/components/StandAlone/BugReport';
    import {required, email, minLength, maxLength} from 'vuelidate/lib/validators'

    export default {
        name: 'App',
        validations: {
            bug: {
                senderEmail: {email},
                description: {required, minLength: minLength(5), maxLength: maxLength(400)},
                images: {}
            }
        },
        data() {
            return {
                bug: {
                    senderEmail: '',
                    description: '',
                    images: []
                }
            }
        },
        methods: {
            fileHandler(event) {
                console.log(event);
                console.log(event.target.files);
                if(event.target.files[0].type.startsWith("image") && !this.bug.images.find(val => val.name === event.target.files[0] )) {
                    this.bug.images.push(event.target.files[0]);
                }
            },
            removeItem(imageToRemove) {
                this.bug.images.splice(imageToRemove, 1);
                // this.files
            },
        },
        components: {
            "top-menu": TopMenu,
            "bug-report": BugReport,
            Footer
        },
    }
</script>

<style>
    /** Modal Styles **/
    .v--modal-box {
        border-top: 5px solid #c9737c;
        left: 0 !important;
        top: 0 !important;
        margin-top: 120px !important;
    }

    .bugModal-title {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .bugModal-title-head {
        margin-right: 20px;
        font-weight: bold;
    }

    .bugModal-title--close {
        margin: 0 0 0 20px;
        padding: 0;
        background: none;
        border: none;
    }

    .bugModal-title--close i {
        margin: 0;
        padding: 0;
        font-size: 20px;
    }

    .bugModal-description {
        text-align: right;
        padding-right: 20px;
        margin-top: 20px;
    }

    .loginForm {
        width: 100%;
        display: flex;
        align-items: stretch;
        justify-content: center;
        flex-direction: column;
    }

    .loginForm-label {
        margin: 20px;
        display: flex;
        flex-direction: column;
    }

    .loginForm-label span {
        color: #333;
        font-size: 14px;
    }

    .loginForm-label mark {
        background: none;
        font-size: 12px;
        color: #999;
    }

    .loginForm-label:not(:first-child) {
        margin-top: 0;
    }

    .loginForm-control {
        border-radius: 10px;
        padding: 10px;
        border: none;
        background-color: #F8F8F8;
        margin-top: 10px;
        color: #999;
        /*width: 50%*/
    }

    .files {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
    }

    .imageUploadButton {
        display: flex;
        align-items: center;
        justify-content: space-around;
        background: #eee;
        color: #777;
        border: none;
        border-radius: 15px;
        padding: 7px 17px;
        margin-right: 20px;
    }

    .files ul {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        list-style: none;
    }

    .loginForm-control:focus {
        border: 1px solid #9038CC;
    }

    .loginForm-meta {
        font-size: 12px;
        margin-top: 10px;
    }

    .loginForm-meta.error {
        color: #c9737c;
    }

    .loginForm-button {
        margin: 0 20px;
        border-radius: 10px;
        border: none;
        background-color: #9038CC;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
    }

    .v--modal-background-click {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
        height: 100vh;
        position: absolute;
        left: 0;
        top: 0;
    }


    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.3s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }

    .notif {
        color: white;
        direction: rtl;
        flex-direction: column;
        border-right: 4px solid;
        border-radius: 5px 0 0 5px;
        padding: 10px;
        text-align: right !important;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-right: 5px;
    }

    .notif.error {
        background-color: #d9534f;
        border-right-color: #963a38;
    }

    .notif.warn {
        background-color: #f0ad4e;
        border-right-color: #a77836;
    }

    .notif.success {
        background-color: #5cb85c;
        border-right-color: #428342;
    }

    .notif.info {
        background-color: #5bc0de;
        border-right-color: #418a9f;
    }

</style>
