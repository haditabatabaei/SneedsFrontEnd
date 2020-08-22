<template>
    <section class="analysis-form">
        <div class="analysis-form-bluebg"></div>
        <div class="form-title-circle"></div>
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
                            <strong>برای ثبت نهایی فرم نیاز به حساب کاربری دارید!</strong>
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
                                میتونی بعد از جلسه مشاوره، امتیاز بدی و کلی قابلیت دیگه
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
        <section class="form-container">
            <aside class="form-title">
                <h1 class="form-title-text" style="font-family: Sans-Serif !important">
                    sneeds.ir
                </h1>
                <p class="form-title-desc danaFont">
                    برای رسید به اهدافت نیاز به کمک داری؟
                    <br>
                    <span class="form-title-desc-emphase">
                        درست اومدی!
                        <span class="form-title-desc-star"></span>
                    </span>
                </p>
                <img draggable="false" class="form-title-image" src="/sneedsAssets/img/takhminstars.svg" alt="کاربران اسنیدز">
            </aside>
            <main class="form-layout-view-wrapper">
                <router-view @langcert-add="sendsubmitlanguagecerts"
                             @paper-add="submitpaperHandler()"
                             @education-add="submitlasteducationallevelHandler"
                             @destination-add="submitdestinationhandler"
                             @sync-current-page="syncCurrentPage"
                             :key="$route.fullPath" class="form-layout-view"></router-view>
                <div class="progress-wrapper">
                    <div class="form-confirm isansFont">
                        <button @click="submitAndMoveNext()" class="form-confirm-next">
                        <span>
                        ادامه
                        </span>
                            <i class="material-icons">keyboard_arrow_left</i>
                            <moon-loader class="loading-icon" style="align-self:center;margin:20px auto;" color="purple" :loading="loading" :size="20" sizeUnit="px"/>
                        </button>
                        <button @click="goBack()" class="form-confirm-back">
                            <i class="material-icons">keyboard_arrow_right</i>
                        </button>
                    </div>
                    <div class="form-progress">
                        <span class="form-progress-value" :style="currentPageWidthStyle"></span>
                    </div>
                </div>
            </main>
        </section>
    </section>
</template>

<script>
    import RegisterForm from '@/components/StandAlone/RegisterForm';
    import LoginForm from '@/components/StandAlone/LoginForm';
    import {MoonLoader} from "@saeris/vue-spinners";

export default {
    name: 'AnalysisFormLayout',
    components: {
        "login-form": LoginForm,
        "register-form": RegisterForm,
        "moon-loader": MoonLoader
    },
    data() {
        return {
            startPage: 1,
            showRegisterIntro: false,
            showRegisterModal: false,
            showNameModal: false,
            loginForm: true,
            registerForm: false,
            first_name: '',
            last_name: '',
            loading: false,
        }
    },
    computed: {
        currentPageWidthStyle() {
            console.log(this.currentPage)
            console.log(this.lastPage);
            console.log(this.$route);
            console.log(`width:${(this.currentPage / this.lastPage) * 100}%`);
            return `width:${(this.currentPage / this.lastPage) * 100}%`;
        },

        currentPage() {
            for(let entry of this.pageMap.entries()) {
                //if value was equal to form part name of current route
                if(entry[1] == this.$route.meta.formPartName) {
                    //return key as current page number
                    return entry[0]
                }
            }
            return 1;
        },

        lastPage() {
            return this.pageMap.size;
        },

        nextPageRoute() {
            let nextPage = this.currentPage + 1;
            if(nextPage > this.lastPage) {
                nextPage = this.lastPage;
            }
            return `/analysis/form/${this.pageMap.get(nextPage)}`
        },

        prevPageRoute() {
            let prevPage = this.currentPage - 1;

            if(prevPage < this.startPage ) {
                prevPage = this.startPage;
            }

            return `/analysis/form/${this.pageMap.get(prevPage)}`
        },

        pageMap() {
            return this.$store.getters.analysisFormPageMapping;
        },

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

        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        },

        showModalOverlay() {
            return this.showRegisterIntro || this.showRegisterModal || this.showNameModal;
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

    methods: {
        syncCurrentPage(currentPageNumber) {
            this.currentPage = currentPageNumber;
        },

        hideAllModals(event) {
            let command = event.target.dataset.command;
            if (command === 'consultant-modal-close') {
                this.showRegisterIntro = false;
                this.showRegisterModal = false;
                this.showNameModal = false;
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

        continueRegisterFlow() {
            this.showRegisterIntro = false;
            this.showRegisterModal = true;
            this.showNameModal = false;
        },

        loginFormAction() {
            this.showRegisterIntro = false;
            this.showRegisterModal = false;
            if (this.showNameModalAfterLogin) {
                this.showNameModal = true;
            } else {
                // this.addSelectedTimesToCart();
            }
        },

        registerFormAction() {
            this.showRegisterModal = false;
            this.showRegisterIntro = false;
            this.showNameModal = true;
        },

        async submitAndMoveNext() {
            if(this.$route.path != this.nextPageRoute) {
                //try this.submitmarriage() or this.submitmilitaryservice() or this.submit + this route name in store page map()
                await this[`submit${this.pageMap.get(this.currentPage)}`]();
            } else {
                if(this.currentPage == this.lastPage) {
                    console.log('we are in last page');
                    // this.showRegisterIntro = true;
                    this.submitotherinformation();
                } else {
                    console.log('nowhere to go.')
                }
            }
        },

        async submitmarriage() {
            try {
                this.loading = true;
                console.log(this.detailedForm.is_married);
                let result = await this.$api.patch(`${this.api}/account/student-detailed-info/${this.detailedFormId}/`, {'is_married': this.detailedForm.is_married}, this.httpConfig)
                console.log('marriage status code', result.status)
                this.$router.push(this.nextPageRoute);

            } catch (e) {

            } finally {
                this.loading = false;
            }
        },

        async submitmilitaryservice() {
            try {
                this.loading = false;
                console.log(this.detailedForm.military_service_status);
                let result = await this.$api.patch(`${this.api}/account/student-detailed-info/${this.detailedFormId}/`, {'military_service_status': this.detailedForm.military_service_status}, this.httpConfig)
                console.log('military_service_status status code', result.status)
                this.$router.push(this.nextPageRoute);

            } catch (e) {

            } finally {
                this.loading = false;
            }

        },

        async submiteducationalgap() {
            try {
                this.loading = true;
                console.log(this.detailedForm.academic_break);
                let result = await this.$api.patch(`${this.api}/account/student-detailed-info/${this.detailedFormId}/`, {'academic_break': this.detailedForm.academic_break}, this.httpConfig)
                console.log('academic break status code', result.status)
                this.$router.push(this.nextPageRoute);

            } catch (e) {

            } finally {
                this.loading = false;
            }
        },

        async submitgender() {
            try {
                this.loading = true;
                console.log(this.detailedForm.academic_break);
                let result = await this.$api.patch(`${this.api}/account/student-detailed-info/${this.detailedFormId}/`, {'gender': this.detailedForm.gender, 'age': this.detailedForm.age}, this.httpConfig)
                console.log('academic break status code', result.status)
                this.$router.push(this.nextPageRoute);

            } catch (e) {

            } finally {
                this.loading = false;
            }

        },

        async submitworkexperience() {
            try {
                this.loading = true;
                console.log(this.detailedForm.related_work_experience);
                let result = await this.$api.patch(`${this.api}/account/student-detailed-info/${this.detailedFormId}/`, {'related_work_experience': this.detailedForm.related_work_experience}, this.httpConfig)
                console.log('work exp status code', result.status)
                this.$router.push(this.nextPageRoute);

            } catch (e) {

            } finally {
                this.loading = false;
            }

        },

        async submitlasteducationallevel() {
            console.log('last educational level handler')
            this.$store.commit('setAddEducationPermission', true);
        },

        submitlasteducationallevelHandler() {
            if(this.$store.getters.wantsToAddEducation) {
                this.loading = true;
                this.$store.dispatch('createEducation')
                    .then(response => {
                        console.log(response);
                        this.$router.push(this.nextPageRoute);
                    })
                    .catch(error => {
                        console.log(error);
                        this.$notify({
                            group: 'notif',
                            title: 'مقطع تحصیلی: خطا',
                            text: 'خطایی هنگام ارتباط با سرور رخ داد.',
                            type: 'error',
                            duration: 3000
                        })
                    })
                    .finally(() => {
                        this.loading = false;
                    })
            } else {
                this.$router.push(this.nextPageRoute);
            }
        },

        async submiteducationallevelsitems() {
            console.log('educationallevelsitems handler')
            this.$router.push(this.nextPageRoute);

        },

        async submitpaper() {
            console.log('paper handler ')
            if(this.$store.getters.wantsToAddPaper) {
                this.$store.commit('setPaperAddPermission', true)
            } else {
                this.$router.push(this.nextPageRoute);
            }
        },

        async submitpaperHandler() {
            this.loading = true;
            this.$store.dispatch('createPaper')
                .then(response => {
                    console.log(response)
                    this.$router.push(this.nextPageRoute);
                })
                .catch(error => {
                    console.log(error);
                    this.$notify({
                        group: 'notif',
                        title: 'مقاله: خطا',
                        text: 'خطایی هنگام ارتباط با سرور رخ داد.',
                        type: 'error',
                        duration: 3000
                    })
                })
                .finally(() => {
                    this.loading = false;
                })
        },

        async submitpaperitems() {
            console.log('paperitems handler')
            this.$router.push(this.nextPageRoute);
        },

        async submitpowerfulrecom() {
            try {
                this.loading = true;
                let result = await this.$api.patch(`${this.api}/account/student-detailed-info/${this.detailedFormId}/`,
                    {'powerful_recommendation': this.detailedForm.powerful_recommendation},
                    this.httpConfig);
                console.log('powerful recom status code ', result.status)
                this.$router.push(this.nextPageRoute);

            } catch (e) {

            } finally {
                this.loading = false;
            }
        },

        async submitlanguagecerts() {
            console.log('languagecerts handler')
            if(this.$store.getters.wantsToAddCert) {
                console.log('wants to add cert')
                this.$store.commit('setLangCertAddPermission', true)
                console.log('toggle lang add permission to true.')
            } else {
                this.$router.push(this.nextPageRoute);
            }
        },

        async sendsubmitlanguagecerts() {
            console.log('send submit called');
            this.loading = true;
            this.$store.dispatch('createLanguageCert')
                .then(result => {
                    console.log(result)
                    this.$router.push(this.nextPageRoute);
                })
                .catch(e => {
                    console.log(e)
                    this.$notify({
                        group: 'notif',
                        title: 'مدرک: خطا',
                        text: 'خطایی هنگام ارتباط با سرور رخ داد.',
                        type: 'error',
                        duration: 3000
                    })
                })
                .finally(() => {
                    this.loading = false;
                })

        },

        async submitlanguagecertsitems() {
            console.log('languagecertsitems handler')
            this.$router.push(this.nextPageRoute);

        },

        async submitdestination() {
            console.log('destination add process, settings permission to true')
            this.$store.commit('setDestinationAddPermission', true)
        },

        submitdestinationhandler() {
            console.log('destination submitting started.')
            this.loading = true;
            this.$store.dispatch('createDestination')
                .then(result => {
                    console.log(result);
                    this.$router.push(this.nextPageRoute);
                })
                .catch(e => {
                    console.log(e)
                    this.$notify({
                        group: 'notif',
                        title: 'مقصد: خطا',
                        text: 'خطایی هنگام ارتباط با سرور رخ داد.',
                        type: 'error',
                        duration: 3000
                    })
                })
                .finally(() => {
                    this.loading = false;
                })
        },


        async submitdestinationitems() {
            console.log('destinationitems handler')
            this.$router.push(this.nextPageRoute);

        },

        async submitfunds() {
            try {
                this.loading = true;
                let result = await this.$api.patch(`${this.api}/account/student-detailed-info/${this.detailedFormId}/`,
                    {
                        'prefers_full_fund': this.detailedForm.prefers_full_fund,
                        'prefers_half_fund': this.detailedForm.prefers_half_fund,
                        'prefers_self_fund': this.detailedForm.prefers_self_fund,
                        'payment_affordability': this.detailedForm.payment_affordability
                    },
                    this.httpConfig)
                console.log('funds status code', result.status)
                this.$router.push(this.nextPageRoute);

            } catch (e) {

            } finally {
                this.loading = false;
            }

        },

        async submitotherinformation() {
            try {
                this.loading = true;
                if(this.detailedForm.xInputFile) {
                    let payload = new FormData();
                    payload.append('homepage_url', this.detailedForm.homepage_url);
                    payload.append('linkedin_url', this.detailedForm.linkedin_url);
                    payload.append('comment', this.detailedForm.comment);
                    payload.append('olympiad', this.detailedForm.olympiad);
                    payload.append('resume', this.detailedForm.xInputFile);
                    let result = await this.$api.patch(`${this.api}/account/student-detailed-info/${this.detailedFormId}/`,
                        payload,
                        this.multipartHttpConfig
                    )
                    console.log(result);
                } else {
                    let result = await this.$api.patch(`${this.api}/account/student-detailed-info/${this.detailedFormId}/`,
                        {
                            'homepage_url': this.detailedForm.homepage_url,
                            'linkedin_url': this.detailedForm.linkedin_url,
                            'comment': this.detailedForm.comment,
                            'olympiad': this.detailedForm.olympiad
                        },
                        this.httpConfig
                    )
                    console.log('other info result ', this.result);
                }
                this.startLastPageFlow();
            } catch (e) {

            } finally {
                this.loading = false;
            }
        },

        async startLastPageFlow() {
            if(this.isLoggedIn) {
                //user is logged in
                //check see if form is set or not
                if(this.detailedForm.user) {
                    //form user is set
                    //check if its current user
                    if(this.detailedForm.user.id == this.user.id) {
                        //yes its us
                        //everything is good
                        //show confirmation success message
                    } else {
                        //some serious thing is happening here !
                        // this is not supposed to happen
                    }
                } else {
                    //form has no user
                    //set form user to current form
                    let formUserSetResult = await this.$api.patch(`${this.api}/account/student-detailed-info/${formResult.data.id}/`,
                        {
                            'user': this.user.id
                        }, this.httpConfig);

                    console.log(formUserSetResult);
                }
            } else {
                //user is not logged in
                //start login modal process
                // this.show
            }
        },

        goBack() {
            if(this.$route.path != this.prevPageRoute) {
                this.$router.push(this.prevPageRoute);
            } else {
                console.log('nowhere to go.')
            }
        }
    },

    async created() {
        console.log('is logged in ', this.isLoggedIn)
        if(this.isLoggedIn) {
            //user is logged in
            //check user has form or not;
            //check if current user has available form
            if(!(this.detailedForm && this.detailedForm.user.id == this.user.id)) {
                //form obj is not present or is present but the owner is not logged in user
                try {
                    console.log('is logged in try getting user form')
                    let formResult = await this.$api.get(`${this.api}/account/user-student-detailed-info/${this.user.id}/`, this.httpConfig);

                    console.log(formResult)
                    //user already has form
                    this.$store.commit('setDetailedForm', formResult.data);
                } catch (e) {
                    //this user doesnt have form, try creating one for him and set the user prop of form
                    console.log(e);
                    if(e.response) {
                        console.log(e.response)
                    }
                    console.log('exception catched')
                    console.log('not found')
                    //create new form.
                    let formResult = await this.$api.post(`${this.api}/account/student-detailed-info/`, {}, this.httpConfig);
                    console.log('form create user on user logged in ', formResult);
                    //set this user id for form
                    let formUserSetResult = await this.$api.patch(`${this.api}/account/student-detailed-info/${formResult.data.id}/`,
                        {
                            'user': this.user.id
                        }, this.httpConfig);

                    console.log('form patch user id to created form result ', formUserSetResult);
                    this.$store.commit('setDetailedForm', formUserSetResult.data)

                }
            }

        } else {
            //user is not logged in
            //check if there is form id present in storage
            console.log('user is not logged in')
            console.log('detailed form id ', this.detailedFormId)
            if(this.detailedFormId) {
               //there is an id available
               console.log('there is id present ', this.detailedFormId)
               if(this.detailedForm) {
                   //there is form available
                   //nothing to do here
                   console.log('there is form with id nothing to add here ', this.detailedForm)
               } else {
                   //there is id but there is no form try fetch and set form
                   console.log('there is id but there is no form, try fetching form')
                   let formResult = await this.$api.get(`${this.api}/account/student-detailed-info/${this.detailedFormId}/`, this.httpConfig);
                   console.log(formResult)
                   this.$store.commit('setDetailedForm', formResult.data)
               }
           } else {
               //there is no id, create an empty form and set form id and empty form data
               let formResult = await this.$api.post(`${this.api}/account/student-detailed-info/`, {}, this.httpConfig);
               console.log(formResult);
               this.$store.commit('setDetailedForm', formResult.data)
           }

        }
    }
}
</script>

<style scoped>
    .analysis-form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-size: 50%;
        position: relative;
    }

    .analysis-form-bluebg {
        background: #20639b; /* Old browsers */
        background: -moz-linear-gradient(top,  #20639b 0%, #051c30 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(top,  #20639b 0%,#051c30 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom,  #20639b 0%,#051c30 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#20639b', endColorstr='#051c30',GradientType=0 ); /* IE6-9 */
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        min-height: 100vh;
        z-index: 1;
    }

    .form-container {
        width: 100%;
        min-height: 100vh;
        display: flex;
        justify-content: flex-start;
        z-index: 5;
    }

    .form-title {
        width: 40%;
        max-width: 600px;
        align-self: stretch;
        position: relative;
    }

    .form-title-circle {
        position: absolute;
        right: 0;
        top: 0;
        width: 120px;
        height: 110px;
        background-color: #0F4775;
        border-radius: 50% 0 50% 50%;
        z-index: 5;
    }

    .form-title-image {
        position: absolute;
        bottom:0;
        left: 0;
        margin-left: 15px;
    }

    .form-title-text {
        position: absolute;
        right: 30px;
        top: 30px;
        z-index: 10;
        color: #EFF8FF;
        background-color: #20639B;
        border-radius: 30px;
        font-size: 22px;
        padding: 5px 15px;
        margin: 0;
    }

    .form-title-desc {
        font-size: 19px;
        color: #F5F7FA;
        background-color: #1A5D8E;
        box-shadow: 0 13px 23px rgba(0,0,0,0.1);
        border-radius: 15px;
        margin: 150px 50px 0 50px;
        padding: 20px;
        display: flex;
        flex-direction: column;
    }

    .form-title-desc-emphase {
        position: relative;
        font-weight: bold;
        font-size: 24px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        padding-right: 16px;
    }

    .form-title-desc-emphase:before {
        position: absolute;
        right: 0;
        top: 10px;
        width: 5px;
        height: 5px;
        content: " \2726";
        font-size: 15px;
    }

    .form-layout-view-wrapper {
        min-height: 100vh;
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        background-color: white;
        padding-right: 35px;
        max-width: 800px;
    }

    .form-layout-view {
        min-height: calc(100vh - 200px);
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        padding-top: 100px;
    }

    .form-progress {
        width: calc(100% - 40px);
        margin: 20px;
        height: 17px;
        border-radius: 20px;
        background-color: #DDEEFC;
        position: relative;
        z-index: 10;
    }

    .form-progress-value {
        position: absolute;
        top: 0;
        right: 0;
        height: 17px;
        background-color: #00A3B6;
        z-index: 15;
        border-radius: 20px;
    }

    .form-confirm {
        display: flex;
        align-items: stretch;
        justify-content: center;
        flex-direction: row-reverse;
        height: 45px;
        max-width: 800px;
        align-self: flex-end;
        margin-left: 20px;
    }

    .form-confirm-next {
        background-color: #A347FF;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        padding: 5px 15px;
        border-radius: 5px 5px;
        font-size: 18px;
        transition: all 100ms ease-in-out;
        width: 200px;
    }

    .form-confirm-next i.material-icons {
        margin-right: auto;
    }

    .form-confirm-next span {
        margin-right: auto;
    }

    .form-confirm-next:hover {
        background-color: white;
        border: 2px solid #A347FF;
        padding: 5px 13px;
        color: #A347FF;
    }

    .form-confirm-back {
        border-radius: 5px;
        border: none;
        background-color: #F2F2F2;
        color: #707070;
        padding: 0 10px;
        transition: all 100ms ease-in-out;
    }

    .form-confirm-back:hover {
        background-color: #707070;
        color: #F2F2F2;
    }

    .progress-wrapper {
        display: flex;
        flex-direction: column;
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


    @media only screen and (max-width: 991.8px ) and (min-width: 767.8px) {
        .form-title {
            display: none;
        }

        .form-container {
            flex-direction: column;
        }

        .analysis-form-bluebg {
            display: none;
        }

        .form-title-circle {
            display: none;
        }

        .form-layout-view-wrapper {
            width: auto;
            padding: 0;
            max-width: initial;
        }
    }


    @media only screen and (max-width: 767.8px) {
        .form-title {
            display: none;
        }

        .form-layout-view-wrapper {
            width: 100%;
            padding: 0 0 122px 0;
        }

        .progress-wrapper {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: white;
            box-shadow: 0 -11px 16px #0000001A;
            justify-content: center;
        }

        .form-confirm-back {
            position: fixed;
            top: 20px;
            right: 20px;
            color: #959D9D;
            padding: 10px;
            background: none;
        }

        .form-confirm-back i {
            font-size: 24px;
        }

        .form-confirm {
            align-self: stretch;
            margin: 20px 20px 0 20px;
        }

        .form-confirm-next {
            width: 100%;
        }
    }
</style>