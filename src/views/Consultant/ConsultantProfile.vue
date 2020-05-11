<template>
    <main class="main">
        <transition name="fade">
            <div class="modalOverlay" data-command="consultant-modal-close" v-if="showModalOverlay"
                 @click="hideAllModals">
                <div class="consultant-modal consultant-modal--registerIntro" v-if="showRegisterIntro">
                    <div class="intro-head">
                        <i class="material-icons" data-command="consultant-modal-close">close</i>
                    </div>
                    <div class="modal-warn isansFont">
                        <i class="material-icons modal-warn-icon">
                            info
                        </i>
                        <p>
                            <strong>برای رزرو مشاوره نیاز به حساب کاربری دارید!</strong>
                            <br>
                            بعد از ثبت نام / ورود، مستقیماً به صفحه پرداخت هدایت خواهید شد.
                        </p>
                    </div>
                    <div class="intro-content ">
                        <h2 class="intro-content-head isansFont">
                            چرا ثبت نام کنم ؟
                        </h2>
                        <ul class="intro-content-list isansFont">
                            <li class="intro-content-item">
                                <i class="material-icons">done</i>
                                میتونی لیست جلسات رزرو شده رو ببینی
                            </li>
                            <li class="intro-content-item">
                                <i class="material-icons">done</i>
                                میتونی با یک کلیک وارد جلسه مشاوره بشی
                            </li>
                            <li class="intro-content-item">
                                <i class="material-icons">done</i>
                                میتونی به طور مداوم با مشاورت در ارتباط باشی
                            </li>
                            <li class="intro-content-item">
                                <i class="material-icons">done</i>
                                میتونی ساعت و زمان باقی مانده به جلسه مشاوره رو دقیق ببینی
                            </li>
                            <li class="intro-content-item">
                                <i class="material-icons">done</i>
                                میتونی بعد از جلسه مشاوره، امتیاز بدی
                            </li>
                        </ul>
                    </div>
                    <div class="intro-action isansFont">
                        <button class="intro-action-button intro-action-button--active" @click="continueRegisterFlow">
                            ورود/ثبت نام و رزرو وقت
                        </button>
                        <button @click="hideAllModals" data-command="consultant-modal-close"
                                class="intro-action-button intro-action-button--passive">
                            بیخیال
                        </button>
                    </div>
                </div>
                <div class="consultant-modal consultant-modal--register" v-if="showRegisterModal">
                    <div class="intro-head">
                        <i class="material-icons" data-command="consultant-modal-close">close</i>
                    </div>
                    <div class="authFormWrapper-switcher isansFont">
                        <button @click="showLoginForm" class="switcher" :class="[{'switcher--active' : loginForm}]">
                            ورود
                        </button>
                        <button @click="showRegisterForm" class="switcher"
                                :class="[{'switcher--active' : registerForm}]">ثبت نام
                        </button>
                    </div>
                    <login-form :customAction="true" @custom-action-call="loginFormAction" submit-label="ورود و ادامه"
                                v-if="loginForm"/>
                    <register-form :customAction="true" @custom-action-call="registerFormAction"
                                   submit-label="ثبت نام و ادامه" v-else-if="registerForm"/>
                </div>

                <div class="consultant-modal consultant-modal--register" v-if="showNameModal">
                    <div class="intro-head">
                        <i class="material-icons" data-command="consultant-modal-close">close</i>
                    </div>
                    <div class="modal-warn modal--error isansFont">
                        <i class="material-icons modal-warn-icon modal-icon--error">
                            info
                        </i>
                        <p>
                            <strong>لطفا نام و نام خانوادگی خود را وارد کنید.</strong>
                            <br>
                            برای رزرو، نیاز هست که نام و نام خانوادگی خودتون رو ثبت کنید تا مشاور شمارو بشناسه.
                            این اطلاعات  همیشه از طریق پروفایلتان قابل ویرایش است.
                        </p>
                    </div>
                    <label class="loginForm-label isansFont" for="phone" style="margin-top: 15px">
                        نام :
                        <input class="loginForm-control" id="phone" type="text" v-model.trim="first_name">
                    </label>
                    <label class="loginForm-label isansFont" for="password">
                        نام خانوادگی :
                        <input class="loginForm-control" id="password" v-model.trim="last_name">
                    </label>
                    <div class="intro-action isansFont">
                        <button class="intro-action-button intro-action-button--active" @click="setNameAndPay">
                            ثبت و رزرو وقت
                        </button>
                        <button @click="addSelectedTimesToCart(true)" data-command="consultant-modal-close"
                                class="intro-action-button intro-action-button--passive">
                            بعدا وارد میکنم
                        </button>
                    </div>
                </div>
            </div>
        </transition>
        <section class="container">
            <div class="row">
                <div class="col-md-9">
                    <div class="row" id="descBlock">
                        <div class="col-md-12 consultantBlock">
                            <div class="meta">
                                <div class="meta-overlap"></div>
                            </div>
                            <consultant-desc-block :consultant="consultant" v-if="consultant.id"/>
                            <mobile-user-calendar
                                    v-if="consultant.id && windowWidth > 991.8"
                                    :consultant-id="consultant.id"
                                    :desktop-mode="true"
                            />
                            <comment-section :consultant="consultant" v-if="consultant.id"/>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 sideBarBlockSticky">
                    <div class="consultantSidebarBlock">
                        <div class="consultantSidebarBlock--info">
                            <transition name="fade">
                                <img v-if="showSidebarAvatar" :src="consultant.profile_picture"
                                     :alt="consultant.first_name + ' ' + consultant.last_name">

                            </transition>
                            <div class="consultantSidebarBlock--info_detail">
                                <h1 class="isansFont--faNum">
                                    {{consultant.first_name + " " + consultant.last_name}}
                                </h1>
                                <span class="isansFont--faNum" v-if="consultant.rate != null"> امتیاز {{consultant.rate}}</span>
                                <span class="isansFont--faNum" v-else>بدون امتیاز</span>
                            </div>
                        </div>
                        <div class="consultantSidebarBlock--selectedItems isansFont--faNum">
                            <ul class="consultantSidebarBlock--selectedItems_list">
                                <li v-if="stash.length === 0">
                                    زمانی برای رزرو انتخاب نشده است. حداقل یک زمان از تقویم باید
                                    انتخاب شود.
                                </li>
                                <li v-for="(item, index) in stash" :key="index">
                                    <i class="material-icons" role="button"
                                       @click="$store.commit('removeItemFromStash',{'itemToRemove': item, type:'time-slot'})">close</i>
                                    <span v-if="$store.getters.isiran">{{item.start_time_date.format('dddd') + " - " + item.start_time_date.format('HH:mm') + " تا " + item.end_time_date.format('HH:mm') }}</span>
                                    <span v-else class="isansFont">{{item.start_time_date.format('dddd') + " - " + item.start_time_date.format('HH:mm') + " تا " + item.end_time_date.format('HH:mm') }}</span>
                                </li>
                            </ul>
                        </div>

                        <button class="isansFont--faNum addToCartButton"
                                @click="addSelectedTimesToCart()">رزرو جلسات انتخاب شده
                        </button>
                    </div>
                </div>
            </div>

            <div class="consultant-mobile-calendar-overlay" v-if="showMobileCalendar"
                 @click="toggleMobileCalendar"></div>
            <div class="consultant-mobile-calendar isansFont"
                 :class="[{'consultant-mobile-calendar--round' : showMobileCalendar}]" v-if="!showModalOverlay">
                <button @click="toggleMobileCalendar" class="mobile-calendar-toggler" v-if="!showMobileCalendar">
                    رزرو وقت مشاوره
                </button>
                <div class="mobile-calendar-header" v-if="showMobileCalendar">
                    <button @click="toggleMobileCalendar" class="mobile-calendar-close">
                        <i class="material-icons">
                            close
                        </i>
                    </button>
                    <h2 class="mobile-calendar-header-title isansFont">
                        تقویم
                        {{consultant.first_name + " " + consultant.last_name}}
                    </h2>
                </div>
                <mobile-user-calendar :consultant-id="consultant.id"  @add-times-to-cart="addSelectedTimesToCart" v-if="consultant.id && showMobileCalendar"/>
            </div>
        </section>
    </main>

</template>

<script>
    import CommentSection from '@/components/StandAlone/CommentSection'
    import MobileUserCalendar from "@/components/Consultant/MobileUserCalendar";
    import ConsultantDescBlock from '@/components/Consultant/ConsultantDescBlock';
    import RegisterForm from '@/components/StandAlone/RegisterForm';
    import LoginForm from '@/components/StandAlone/LoginForm';
    import jalali from 'jalali-moment'

    export default {
        name: "ConsultantProfile",
        components: {
            CommentSection, ConsultantDescBlock, MobileUserCalendar,
            "login-form": LoginForm,
            "register-form": RegisterForm
        },
        data() {
            return {
                consultant: {},
                activeSection: 'desc',
                descPos: 0,
                calendarPos: 0,
                commentsPos: 0,
                scrollListener: null,
                showMobileCalendar: false,
                showSidebarAvatar: false,
                showRegisterIntro: false,
                showRegisterModal: false,
                showNameModal: false,
                loginForm: true,
                registerForm: false,
                first_name: '',
                last_name: ''
            }
        },
        computed: {
            isLoggedIn() {
                return this.$store.getters.isLoggedIn;
            },
            stash() {
                return this.$store.getters.getStash;
            },
            showModalOverlay() {
                return this.showRegisterIntro || this.showRegisterModal || this.showNameModal;
            },
            user() {
                return this.$store.getters.getUser;
            },
            showNameModalAfterLogin() {
                if (this.user.first_name == null || this.user.last_name == null) {
                    return true
                } else if (this.user.first_name.trim().length === 0 || this.user.last_name.trim().length === 0) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        created() {
            document.addEventListener('scroll', this.scrollEnoughToShowAvatar, false);
            console.log(this.scrollListener);
            console.log('consultant profile created hook called');
            this.getConsultantBySlug(this.$route.params.consultantSlug);
        },

        beforeDestroy() {
            document.removeEventListener('scroll', this.scrollEnoughToShowAvatar, false);
        },

        methods: {
            scrollEnoughToShowAvatar() {
                this.showSidebarAvatar = window.scrollY >= 150 && this.windowWidth > 991.8;
            },

            toggleMobileCalendar() {
                this.showMobileCalendar = !this.showMobileCalendar;
            },

            loginFormAction() {
                this.showRegisterIntro = false;
                this.showRegisterModal = false;
                if (this.showNameModalAfterLogin) {
                    this.showNameModal = true;
                } else {
                    this.addSelectedTimesToCart();
                }
            },

            registerFormAction() {
                this.showRegisterModal = false;
                this.showRegisterIntro = false;
                this.showNameModal = true;
            },

            async addSelectedTimesToCart(forced = false) {
                if(forced) {
                    this.hideAllModals({target: {dataset: {command: 'consultant-modal-close'}}});
                }
                console.log(this.stash);
                let payload = {"products": []};
                this.stash.forEach(item => {
                    payload.products.push(item.old_slot.id);
                });

                console.log(payload);
                this.showMobileCalendar = false;
                if (this.stash.length > 0) {
                    if (this.isLoggedIn) {
                        if (this.showNameModalAfterLogin && !forced) {
                            this.showNameModal = true;
                        } else {
                            try {
                                this.$loading(true);
                                let result = await this.$api.post(`${this.$store.getters.getApi}/cart/carts/`, payload, this.$store.getters.httpConfig);
                                console.log(result);
                                this.$router.push(`/carts/${result.data.id}`);
                            } catch (e) {
                                console.log(e);
                                if (e.response) {
                                    console.log(e.response)
                                }
                                this.printMessage("خطایی هنگام ارتباط با سرور رخ داد.", "رزرو : خطا", "error", 3000, "notif")
                            } finally {
                                this.$loading(false);
                            }
                        }
                    } else {
                        this.showRegisterIntro = true;
                    }
                } else {
                    this.printMessage("زمانی برای رزرو انتخاب نشده است. از تقویم باید زمان مورد نظر خود را انتخاب کنید.", "رزرو : اخطار", "warn", 7000, "notif")
                }
            },

            continueRegisterFlow() {
                this.showRegisterIntro = false;
                this.showRegisterModal = true;
                this.showNameModal = false;
            },

            hideAllModals(event) {
                let command = event.target.dataset.command;
                if (command === 'consultant-modal-close') {
                    this.showRegisterIntro = false;
                    this.showRegisterModal = false;
                    this.showNameModal = false;
                }
            },

            setNameAndPay() {
                let requests = [];
                let editReq = this.$api.put(`${this.$store.getters.getApi}/auth/accounts/${this.$store.getters.getUserInfo.id}/`, {
                    "first_name": this.first_name,
                    "last_name": this.last_name
                }, this.$store.getters.httpConfig);
                let dispatchUser = this.$store.dispatch('getUserWithId', this.$store.getters.getUserInfo.id);
                requests.push(editReq);
                requests.push(dispatchUser);
                this.$loading(true);
                Promise.all(requests).then(([editRes, dispatchRes]) => {
                    this.addSelectedTimesToCart();
                }).catch(error => {

                }).finally(() => {
                    this.$loading(false);
                })
            },

            getJalali(date) {
                return jalali(date);
            },

            getSlotIdByDate(startDate, endDate) {
                for (let i = 0; i < this.slots.length; i++) {
                    if (jalali(this.slots[i].start_time).isSame(jalali(startDate), 'minute') && jalali(this.slots[i].end_time).isSame(jalali(endDate), 'minute'))
                        return this.slots[i].id;
                }
            },

            showLoginForm() {
                this.loginForm = true;
                this.registerForm = false;
                this.showNameModal = false;
            },

            showRegisterForm() {
                this.registerForm = true;
                this.loginForm = false;
                this.showNameModal = false;
            },

            async getConsultantBySlug(consultantSlug) {
                this.$loading(true);
                try {
                    let result = await this.$api.get(`${this.$store.getters.getApi}/account/consultant-profiles/${consultantSlug}/`, this.$store.getters.httpConfig);
                    this.consultant = result.data;
                    console.log(result);
                } catch (e) {
                    console.log(e.response);
                    this.printMessage("خطایی هنگام ارتبا با سرور رخ داد.", "مشاور :‌ خطا", "error", 3000, "notif");
                } finally {
                    this.$loading(false);
                }
            },

            printMessage(text, title, type, duration, group) {
                this.$notify({
                    group: group,
                    text: text,
                    title: title,
                    type: type,
                    duration: duration
                })
            },
        }
    }
</script>

<style scoped>

    .main {
        min-height: 100vh;
        padding-bottom: 40px;
        background-color: #f2f2f2;
    }

    .nav-pills.nav-pills-white > li.active > a {
        background-color: white;
        color: #555555;
        box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2);
    }

    .consultantSidebarBlock {
        background-color: white;
        width: 100%;
        border-radius: 15px;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        margin-top: 130px;
    }

    .sideBarBlockSticky {
        position: sticky;
        top: 120px;
        padding-right: 0;
    }

    .consultantSidebarBlock--info {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .consultantSidebarBlock--info_detail {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-right: 10px;
    }

    .consultantSidebarBlock--info_detail h1 {
        font-size: 1.5rem;
        margin-right: 10px;
    }

    .consultantSidebarBlock--info_detail span {
        font-size: 12px;
        background-color: #f0f0f0;
        color: #bababa;
        border-radius: 30px;
        padding: 3px 20px;
    }

    .meta {
        width: 100%;
        height: 115px;
        border-radius: 0 0 15px 15px;
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
        position: relative;
        background: url('/sneedsAssets/img/consultant-profile-top-bg.png') no-repeat 0 -300px / cover;
    }

    .meta-overlap {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(32, 184, 163, 0.8);
        border-radius: 0 0 15px 15px;
    }

    .consultantSidebarBlock--info img {
        width: 70px;
        height: 70px;
        border-radius: 10px;
        margin: 10px;
    }

    .consultantSidebarBlock--links {
        width: 100%;
        margin-top: 15px;
    }

    .consultantSidebarBlock--links ul {
        display: flex;
        list-style: none;
        padding-right: 0;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }

    .consultantSidebarBlock--links ul li button {
        background: none;
        border: none;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-right: 10px;
        margin-top: 5px;
        color: #b2b2b2;
        transition: all 0.1s ease-in-out;
    }

    .consultantSidebarBlock--links ul li button:hover {
        border-right: inset 3px #8C3DDB;
        font-weight: bold;
        color: #4c4c4c;
        padding-right: 15px;
    }

    .consultantSidebarBlock--links ul li.active button {
        border-right: inset 3px #8C3DDB;
        font-weight: bold;
        color: #4c4c4c;
        padding-right: 15px;
    }

    .consultantSidebarBlock--selectedItems_list {
        list-style: none;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        padding-right: 0;
        font-size: 13px;
        margin-top: 5px;
    }

    .consultantSidebarBlock--selectedItems_list li {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 15px;
        color: #333;
    }

    .consultantSidebarBlock--selectedItems_list li span {
        margin-right: 5px;
    }

    .consultantSidebarBlock--links_list li i {
        font-size: 20px;
    }

    .consultantSidebarBlock--numberDiscounts_list {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin-top: 20px;
        padding: 0 10px;
        list-style: none;
    }

    .consultantSidebarBlock--numberDiscounts_list li {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 12px;
        font-weight: bold;
        color: #b8b8b8;
        margin-top: 15px;
    }

    .consultantSidebarBlock--numberDiscounts_list li i {
        font-size: 20px;
        margin-left: 5px;
    }

    .consultantSidebarBlock--numberDiscounts_list mark {
        color: #3faf54;
        background: none;
        border-radius: 50%;
        width: 10px;
        height: 10px;
        font-weight: bold;
        font-size: 13px;
    }

    .addToCartButton {
        align-self: stretch;
        border-radius: 0 0 15px 15px;
        border: none;
        font-size: 14px;
        padding-top: 15px;
        padding-bottom: 15px;
        color: white;
        background-color: #8C3DDB;
        outline: none;
    }

    .consultant-mobile-calendar {
        display: none;
    }

    .modalOverlay {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1013;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .consultant-modal {
        width: 100%;
        max-width: 400px;
        min-height: 450px;
        background-color: white;
        border-radius: 10px;
        z-index: 1014;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding-bottom: 20px
    }

    .intro-head {
        background-color: #FCFCFC;
        height: 45px;
        display: flex;
        align-items: center;
        border-radius: 10px 10px 0 0;
    }

    .intro-head i {
        color: #B3B3B3;
        font-size: 18px;
        margin-right: 10px;
        cursor: pointer;
    }

    .mobile-calendar-header {
        display: flex;
        align-items: center;
        padding-top: 10px;
        align-self: stretch;
    }

    .mobile-calendar-header-title {
        margin: 0 10px;
        font-size: 17px;
    }

    .modal-warn {
        background-color: #FFFCF4;
        color: #8C6D1F;
        display: flex;
        align-items: flex-start;
        margin: 0 15px;
        padding: 15px;
        border-radius: 5px;
        font-size: 13px;
    }

    .modal-warn-icon {
        color: #CAA53D;
        margin-left: 10px;
    }

    .modal-warn p {
        margin-bottom: 0;
    }

    .modal--error {
        color: #891B1B;
        background-color: #FFECEC
    }

    .modal-icon--error {
        color: #891B1B;
    }
    .intro-content {
        margin: 15px;
        display: flex;
        flex-direction: column;
    }

    .intro-content-head {
        font-size: 14px;
        margin: 10px 0;
        color: #585858;
        font-weight: bold;
    }

    .intro-content-list {
        padding: 0;
        list-style: none;
    }

    .intro-content-item {
        display: flex;
        align-items: center;
        margin-top: 5px;
        margin-bottom: 5px;
        font-size: 13px;
        color: #707070;
    }

    .intro-content-item i {
        color: #00BFD6;
        font-size: 16px;
        margin-left: 5px;
    }

    .intro-action {
        margin: 15px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }

    .intro-action-button {
        border-radius: 10px;
        padding: 10px 20px;
        border: none;
        font-size: 12px;
    }

    .intro-action-button--active {
        background-color: #8C3DDB;
        color: white;
    }

    .intro-action-button--passive {
        background-color: white;
        color: #707070;
    }

    .authFormWrapper-switcher {
        border-bottom: 3px solid #eee;
        min-height: 50px;
        margin: 0;
        display: flex;
        align-items: stretch;
    }

    .switcher {
        margin-right: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        color: #aaa;
        background: none;
        border: none;
    }

    .switcher--active {
        border-bottom: 3px solid #9038CC;
        color: #9038CC;
    }

    .loginForm-label {
        margin: 20px;
        display: flex;
        flex-direction: column;
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
    }

    .loginForm-meta {
        font-size: 12px;
        margin-top: 10px;
    }

    .loginForm-meta.error {
        color: #c9737c;
    }


    @media only screen and (min-width: 0) and (max-width: 991.8px) {
        .main {
            padding-bottom: 50px;
            width: 100%;
            border-radius: 0;
        }

        .meta {
            border-radius: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-position: center;
        }

        .meta-overlap {
            border-radius: 0;
        }

        .sideBarBlockSticky {
            position: static;
            padding-right: 15px;
        }

        .consultantSidebarBlock {
            display: none;
        }

        .container {
            padding-right: 0;
            padding-left: 0;
        }

        .row {
            margin-right: 0;
            margin-left: 0;
        }

        .col-md-9 {
            padding-right: 0;
            padding-left: 0;
        }

        .col-md-12 {
            padding-right: 0;
            padding-left: 0;
        }

        .consultant-mobile-calendar {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            flex-direction: column;
            min-height: 65px;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: white;
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
            z-index: 1014;
        }

        .consultant-mobile-calendar--round {
            border-radius: 15px 15px 0 0;
        }

        .consultant-mobile-calendar-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(0, 0, 0, 0.2);
            z-index: 1013;
        }

        .mobile-calendar-toggler {
            color: white;
            background-color: #8C3DDB;
            border: none;
            width: 100%;
            height: 65px;
        }

        .mobile-calendar-close {
            width: 25px;
            height: 25px;
            padding: 0;
            margin: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            border-radius: 50%;
            border: 1px solid #B3B3B3;
            color: #B3B3B3;
            background-color: white;
        }

        .mobile-calendar-close i {
            font-size: 12px;
        }

    }
</style>
