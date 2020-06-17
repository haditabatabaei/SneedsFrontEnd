<template>
    <section class="itemBlock">
        <div class="package-title">
            <h1 class="package-title-text isansFont">
                مدیریت پکیج اپلای کاربر
            </h1>
        </div>
        <div class="package-head">
            <div class="package-head-info" v-if="hasConsultant">
                <img class="package-head-info-image" :src="consultant.profile_picture" :alt="`${consultant.first_name} ${consultant.last_name}`">
                <div class="package-head-info-text isansFont--faNum">
                    <p class="package-head-info-namerate">
                        {{`${consultant.first_name} ${consultant.last_name}`}}
                    </p>
                    <p class="package-head-info-study" v-if="hasStudyInfo">
                        {{studyText}}
                    </p>
                    <p class="package-head-info-study" v-else>
                        بدون خلاصه تحصیلات
                    </p>
                </div>
            </div>
            <div class="package-head-action isansFont">
                <router-link to="/user/chatroom" class="package-head-action-profileview">
                    <i class="material-icons">mail</i>
                    <span class="no--mobile">
                        گفتگو با مشاور
                    </span>
                </router-link>
            </div>
        </div>
        <div class="package-body isansFont--faNum">
            <div class="package-body-switcher">
                <ul class="package-body-switcher-items">
                    <li class="package-body-switcher-item" v-for="phase in allPhases ">
                        <button class="switcher-item-button"
                                :class="[{'switcher-item-button--active': currentPhase === phase}]"
                                @click="currentPhase = phase">
                            {{phase.title}}
                            <i class="material-icons" v-if="currentPhase === phase">done</i>
                        </button>
                    </li>
                </ul>
            </div>
            <select class="mobile-switcher" v-model="currentPhase">
                <option :value="phase" v-for="phase in allPhases">{{phase.title}}</option>
            </select>
            <div class="package-body-tab" v-if="currentPhaseTasks.length != 0">
                <div class="package-body-tab-title">
                    <p class="body-tab-title-text">
                        عنوان
                    </p>
                    <p class="body-tab-title-text no--mobile">
                        تاریخ ایجاد
                    </p>
                    <p class="body-tab-title-text no--mobile">
                        تاریخ آخرین تغییر
                    </p>
                    <p class="body-tab-title-text">
                        وضعیت
                    </p>
                    <p class="body-tab-title-text">
                        <span v-if="isOnMobile">اطلاعات بیشتر</span>
                        <span v-else>فایل</span>
                    </p>
                </div>
                <div class="package-body-tab-row" v-for="task in currentPhaseTasks">
                    <p class="body-tab-row-text row-text--dark">
                        {{task.title}}
                    </p>
                    <p class="body-tab-row-text no--mobile">
                        {{getJalali(task.created).format('YY/MM/DD')}}
                    </p>
                    <p class="body-tab-row-text no--mobile">
                        {{getJalali(task.updated).format('YY/MM/DD HH:mm')}}
                    </p>
                    <p class="body-tab-row-text">
                        <mark class="row-text-status"
                              :class="[{'status--done': task.status === 'done' || task.status === 'finished', 'status--inprogress': task.status === 'in_progress'}]">
                            {{getTaskStatusName(task)}}
                        </mark>
                    </p>
                    <div class="body-tab-row-text more-info-row">
                        <span v-if="!isOnMobile">
                            <a v-if="task.file" :href="task.file" target="_blank">دانلود</a>
                            <span v-else>ندارد</span>
                        </span>
                        <button class="row-more-info-button" v-if="isOnMobile" @click="toggleTaskMoreInfo(task)">
                            <i class="material-icons">info</i>
                        </button>
                        <div class="row-more-info-box" v-if="isOnMobile && showTaskMobileMoreInfo && taskToShowMoreInfo === task">
                            <button @click="toggleTaskMoreInfo(task)" class="more-info-box-close">
                                <i class="material-icons">close</i>
                            </button>
                            <p class="more-info-item">
                                <span>تاریخ ایجاد</span>
                                {{getJalali(task.created).format('YY/MM/DD')}}
                            </p>
                            <p class="more-info-item">
                                <span>تاریخ آخرین تغییر</span>
                                {{getJalali(task.updated).format('YY/MM/DD HH:mm')}}
                            </p>
                            <p class="more-info-item" v-if="task.file">
                                <span>فایل</span>
                                <a :href="task.file" target="_blank">دانلود فایل</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="package-body-tab body-tab--empty" v-else>
                <p class="package-empty-tab-warn">
                    <i class="material-icons">
                        info
                    </i>
                    در {{currentPhase.title}} هیچ کاری تعریف نشده است.
                </p>
            </div>
        </div>
        <button @click="payCurrentPhase" class="payCurrentPhase isansFont" v-if="currentPhase.active">پرداخت قسط {{currentPhase.title}}</button>
    </section>
</template>

<script>
    import jalali from 'jalali-moment'

    export default {
        name: "UserPackagesManager",
        data() {
            return {
                soldPackage: {},
                consultant: null,
                currentPhase: {},
                currentPhaseTasks: [],
                showTaskMobileMoreInfo: false,
                taskToShowMoreInfo: null,
                availableStatuses: [
                    {value: 'in_progress', name: 'در حال انجام'},
                    {value: 'done', name: 'انجام شد'},
                    {value: 'finished', name: 'دریافت نتیجه'},
                    {value: 'pending_user_data', name: 'دریافت اطلاعات کاربر'}
                ],
            }
        },
        computed: {
            api() {
                return this.$store.getters.getApi;
            },
            httpConfig() {
                return this.$store.getters.httpConfig;
            },
            isConsultant() {
                return this.$store.getters.isConsultant;
            },
            userInfo() {
                return this.$store.getters.getUserInfo;
            },
            allPhases() {
                if (this.soldPackage.id) {
                    return this.soldPackage.sold_store_paid_package_phases.concat(this.soldPackage.sold_store_unpaid_package_phases);
                } else {
                    return []
                }
            },

            hasConsultant() {
                return !!this.consultant;
            },

            hasStudyInfo() {
                return this.consultant && this.consultant.study_info.length > 0;
            },

            studyInfo() {
                return this.hasStudyInfo && this.consultant.study_info[this.consultant.study_info.length - 1];
            },

            studyText() {
                if (this.hasStudyInfo) {
                    return ` دانشجوی  ${this.persianGrade} ${this.studyInfo.field_of_study.name} در دانشگاه ${this.studyInfo.university.name} ${this.studyInfo.country.name} `
                } else {
                    return " ";
                }
            },

            persianGrade() {
                if (this.hasStudyInfo) {
                    switch (this.studyInfo.grade) {
                        case 'phd':
                            return 'دکترا';
                        case 'master':
                            return 'کارشناسی ارشد';
                        case 'bachelor':
                            return 'کارشناسی';
                        default :
                            return ' ';
                    }
                } else {
                    return ' ';
                }
            },
            isOnMobile() {
                return this.windowWidth <= 568;
            },
        },
        watch: {
            currentPhase(newVal) {
                this.toggleCurrentPhase(newVal);
            }
        },
        methods: {
            getJalali(date) {
                return jalali(date).locale(this.$store.getters.locale);
            },

            getTaskStatusName(task) {
                return (this.availableStatuses.find(status => status.value === task.status)).name;
            },

            async toggleCurrentPhase(phase) {
                this.getCurrentPhaseTasks();
            },

            getPhaseContentType(phase) {
                if (this.soldPackage.sold_store_paid_package_phases.includes(phase)) {
                    return "soldstorepaidpackagephase"
                } else {
                    return "soldstoreunpaidpackagephase"
                }
            },

            async getCurrentPhaseTasks() {
                try {
                    this.$loading(true);
                    let result = await this.$api.get(`${this.api}/store/packages/sold-store-package-phase-detail-list/?object_id=${this.currentPhase.id}&content_type=${this.getPhaseContentType(this.currentPhase)}`, this.httpConfig);
                    console.log(result);
                    this.currentPhaseTasks = result.data;
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },

            async getSoldPackage() {
                try {
                    this.$loading(true);
                    let result = await this.$api.get(`${this.api}/store/packages/sold-store-package-detail/${this.$route.params.packageId}/`, this.httpConfig);
                    console.log(result);
                    this.soldPackage = result.data;
                    this.consultant = (await this.$api.get(this.soldPackage.consultant_url, this.httpConfig)).data;
                    console.log('consultant:', this.consultant);
                    this.currentPhase = this.allPhases[0];
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },

            async payCurrentPhase() {
                if(!!this.currentPhase.active) {
                    try {
                        this.$loading(true);
                        let result = (await this.$api.post(`${this.api}/cart/carts/`, {"products": [this.currentPhase.id]}, this.httpConfig))
                        console.log(result);
                        this.$router.push(`/carts/${result.data.id}`)
                    } catch (e) {
                        if(e.response) {
                            console.log(e.response);
                        }
                    } finally {
                        this.$loading(false);
                    }
                } else {

                }
            },

            toggleTaskMoreInfo(task) {
                if(this.showTaskMobileMoreInfo) {
                    if(this.taskToShowMoreInfo === task) {
                        this.hideTaskMoreInfo();
                    } else {
                        this.showTaskMoreInfo(task);
                    }
                } else {
                    this.showTaskMoreInfo(task);
                }
            },

            showTaskMoreInfo(task) {
                this.taskToShowMoreInfo = task;
                this.showTaskMobileMoreInfo = true;
            },

            hideTaskMoreInfo() {
                this.taskToShowMoreInfo = null;
                this.showTaskMobileMoreInfo = false;
            },
        },
        created() {
            this.getSoldPackage();
        }
    }
</script>

<style scoped>
    .itemBlock {
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        margin-top: 30px;
        padding-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .package-title {
        background-color: #FCFCFC;
        border-radius: 15px 15px 0 0;
        margin: 0;
        padding: 0;
    }

    .package-title-text {
        margin: 10px;
        font-size: 16px;
        color: #9B9999;
    }

    .package-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0;
        margin: 0 10px;
    }

    .package-head-info {
        display: flex;
        align-items: center;
    }

    .package-head-info-image {
        height: 62px;
        width: 62px;
        border-radius: 50%;
    }

    .package-head-info-text {
        margin-right: 10px;
    }

    .package-head-info-namerate {
        margin: 0;
        color: #585858;
        font-size: 16px;
        font-weight: bold;
    }

    .package-head-info-study {
        margin: 10px 0 0 0;
    }

    .package-head-info-study {
        color: #9B9999;
        font-size: 14px;
    }

    .package-head-action-profileview {
        background-color: white;
        border: 1px solid #8C3DDB;
        color: #8C3DDB;
        border-radius: 10px;
        font-size: 12px;
        padding: 7px 25px;
        text-align: center;
        margin-left: 10px;
        display: flex;
        align-items: center;
    }

    .package-head-action-profileview i {
        color: #8C3DDB;
        font-size: 16px;
        margin-left: 5px;
    }

    .package-body {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .package-body-switcher {
        display: flex;
        align-items: center;
        justify-content: stretch;
        background-color: #F8F8F8;
        margin: 20px 0;
    }

    .package-body-switcher-items {
        display: flex;
        padding: 0;
        list-style: none;
        align-items: stretch;
        margin: 0;
    }

    .package-body-switcher-item {
        display: flex;
        align-items: stretch;
        justify-content: stretch;
    }

    .switcher-item-button {
        display: flex;
        align-items: center;
        padding: 10px 25px;
        margin: 0;
        font-size: 13px;
        background: none;
        border: none;
        color: #9B9999;
    }

    .switcher-item-button i {
        font-size: 15px;
        margin-right: 5px;
    }

    .switcher-item-button--active {
        background: white;
        color: #8C3DDB;
        font-weight: bold;
    }

    .package-body-tab {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .body-tab--empty {
        align-items: center;
        justify-content: center
    }

    .package-empty-tab-warn {
        display: flex;
        align-items: center;
        background-color: #FBF8DE;
        color: #6C2C10;
        padding: 5px 20px;
        border-radius: 15px;
        font-size: 13px;
    }

    .package-empty-tab-warn i {
        margin-left: 5px;
        font-size: 20px;
    }

    .package-body-tab-title {
        margin-top: 30px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-bottom: 2px solid #f9f9f9;
    }

    .body-tab-title-text {
        color: #9B9999;
        font-size: 13px;
    }

    .package-body-tab-row {
        padding: 20px 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: #9B9999;
    }

    .row-text--dark {
        color: #585858;
    }

    .row-text-status {
        padding: 5px 15px;
        border-radius: 15px;
        font-size: 12px;
    }

    .status--inprogress {
        background-color: #FFFCF4;
        color: #8C6D1F;
    }

    .status--done {
        background-color: #E7FFFE;
        color: #1B655E;
    }

    .row-text-file {
        padding: 0;
        margin: 0;
    }

    .row-text-file i {
        font-size: 20px;
    }

    .tab-row-edit {
        margin: 0;
        padding: 0;
        background: none;
        border: none;
    }

    .tab-row-edit i {
        font-size: 20px;
        color: #707070;
    }

    .payCurrentPhase {
        align-self: flex-start;
        margin: 15px 30px 0 0;
        color: white;
        background-color: #1B655E;
        border-radius: 10px;
        border: none;
        padding: 7px 25px;
        font-size: 14px;
    }

    .mobile-switcher {
        display: none;
    }

    .row-more-info-button {
        display: none;
    }

    @media only screen and (max-width: 991.8px) {
        .itemBlock {
            box-shadow: none;
            border-radius: 0;
        }
    }


    @media only screen and (max-width: 567.8px) {
        .no--mobile {
            display: none;
        }

        .package-head-action-profileview {
            padding: 0;
            margin: 0;
            border-radius: 50%;
            width: 35px;
            height: 35px;
        }

        .package-head-action-profileview i {
            margin: auto;
        }

        .package-body-switcher {
            display: none;
        }

        .mobile-switcher {
            display: flex;
            background-color: #F2F2F2;
            margin: 10px;
            border-radius: 15px;
            height: 35px;
            color: #8C3DDB;
            padding: 0 15px;
            border: none;
        }

        .more-info-row {
            position: relative;
        }

        .row-more-info-button {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #9B9999;
            background: none;
            font-size: 18px;
            padding: 0;
            margin: 0;
            border: none;
        }

        .row-more-info-box {
            position: absolute;
            display: flex;
            flex-direction: column;
            top: 10px;
            left: 10px;
            box-shadow: -2px 0 10px #00000029;
            border-radius: 15px;
            background-color: white;
            z-index: 11;
            min-width: 130px;
        }

        .more-info-item {
            display: flex;
            flex-direction: column;
            color: #707070;
            font-size: 12px;
            padding: 10px;
        }

        .more-info-item span {
            color: #9B9999;
            font-size: 10px;
        }

        .more-info-box-close {
            position: absolute;
            left: 0;
            top: 0;
            width: 30px;
            height: 30px;
            background: none;
            border: none;
            margin: 10px;
        }

        .more-info-box-close i {
            font-size: 16px;
        }
    }
</style>