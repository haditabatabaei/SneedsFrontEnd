<template>
    <section class="itemBlock">
        <transition name="fade">
            <div class="modal-overlay" v-if="isShowingTaskMoreInfoModal" id="closable-overlay" @click.self="isShowingTaskMoreInfoModal = false">
                <div class="newTaskModal">
                    <div class="newTaskModal-head">
                        <h2 class="newTaskModal-head-title isansFont">
                            <button class="newTaskModal-head-title-close">
                                <i id="closable-modal" class="material-icons" @click.self="isShowingTaskMoreInfoModal = false">close</i>
                            </button>
                        </h2>
                    </div>
                    <div class="newTaskModal-body isansFont">
                        <div class="modal-body-title">
                            <h2 class="isansFont modal-body-title-text">
                                {{taskToShowMoreInfo.title}}
                                <mark class="row-text-status"
                                      :class="[{'status--done': taskToShowMoreInfo.status === 'done' || taskToShowMoreInfo.status === 'finished', 'status--inprogress': taskToShowMoreInfo.status === 'in_progress'}]">
                                    {{getTaskStatusName(taskToShowMoreInfo)}}
                                </mark>
                            </h2>
                            <a class="modal-body-title-file" :href="taskToShowMoreInfo.file" target="_blank" v-if="taskToShowMoreInfo.file">
                                دانلود فایل
                                <i class="material-icons-outlined title-file-icon">cloud_download</i>
                            </a>
                            <a class="modal-body-title-file file--nofile" v-else>
                                بدون فایل
                                <i class="material-icons-outlined title-file-icon">cloud_off</i>
                            </a>
                        </div>
                        <p class="modal-body-dates isansFont--faNum">
                            <span>
                                <i class="material-icons-outlined">access_time</i>
                                تاریخ ایجاد (
                                {{getJalali(taskToShowMoreInfo.created).format('YY/MM/DD HH:mm')}}
                                )
                            </span>
                            |
                            <span>
                                تاریخ آخرین تغییر (
                                {{getJalali(taskToShowMoreInfo.updated).format('YY/MM/DD HH:mm')}}
                                )
                            </span>
                        </p>
                    </div>
                    <div class="newTaskModal-footer isansFont">
                        <p class="modal-footer-title">
                            <i class="material-icons-outlined">
                                info
                            </i>
                            توضیحات
                            {{taskToShowMoreInfo.title}}
                        </p>
                        <div class="modal-footer-content" v-html="taskToShowMoreInfo.description">
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <div class="package-title">
            <h1 class="package-title-text isansFont">
                مدیریت پکیج اپلای کاربر
            </h1>
        </div>
        <div class="package-head">
            <div class="package-head-info" v-if="hasConsultant">
                <img class="package-head-info-image" :src="consultant.profile_picture"
                     :alt="`${consultant.first_name} ${consultant.last_name}`">
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
                    <p class="package-head-info-phasestatus">
                        <span>وضعیت {{currentPhase.title}}: </span>
                        <span :class="[{'phasestatus--notstarted': currentPhase.status == 'not_started', 'phasestatus--inprogress': currentPhase.status == 'in_progress', 'phasestatus--paytostart': currentPhase.status == 'pay_to_start'}]">{{currentPhaseStatusName}}</span>
                    </p>
                </div>
            </div>
            <div class="package-head-action isansFont">
                <router-link to="/user/chatroom" class="package-head-action-profileview">
                    <i class="material-icons-outlined">mail</i>
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
            <div class="package-body-desc">
                <div class="package-body-desc-title" :class="[{'body-desc-title--open': isShowingCurrentPhaseDescription}]">
                    <button @click="toggleCurrentPhaseDescription">
                        مشاهده توضیحات {{currentPhase.title}}
                        <transition name="fade">
                            <i class="material-icons" v-if="isShowingCurrentPhaseDescription">keyboard_arrow_up</i>
                            <i class="material-icons" v-else>keyboard_arrow_down</i>
                        </transition>
                    </button>
                </div>
                <transition name="fade">
                    <div class="package-body-desc-content" v-html="currentPhase.description" v-if="isShowingCurrentPhaseDescription"></div>
                </transition>
            </div>
            <div class="package-body-tab" v-if="currentPhaseTasks.length != 0">
                <div class="package-body-tab-title">
                    <p class="body-tab-title-text">
                        عنوان
                    </p>
                    <p class="body-tab-title-text">
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
                <div class="package-body-tab-row" @click.self="showTaskMoreInfo(task)" v-for="task in currentPhaseTasks">
                    <p class="body-tab-row-text row-text--dark" @click.self="showTaskMoreInfo(task)">
                        {{task.title}}
                    </p>
                    <p class="body-tab-row-text" @click="showTaskMoreInfo(task)">
                        {{getJalali(task.updated).format('YY/MM/DD HH:mm')}}
                    </p>
                    <p class="body-tab-row-text" @click="showTaskMoreInfo(task)">
                        <mark class="row-text-status"
                              :class="[{'status--done': task.status === 'done' || task.status === 'finished', 'status--inprogress': task.status === 'in_progress'}]">
                            {{getTaskStatusName(task)}}
                        </mark>
                    </p>
                    <div class="body-tab-row-text more-info-row">
                        <span v-if="!isOnMobile">
                            <a v-if="task.file" :href="task.file" target="_blank">
                                <i class="material-icons-outlined file-icon">cloud_download</i>
                            </a>
                            <span v-else>
                                <i class="material-icons nofile-icon">horizontal_rule</i>
                            </span>
                        </span>
                        <button class="row-more-info-button" v-if="isOnMobile" @click="showTaskMoreInfo(task)">
                            <i class="material-icons-outlined">info</i>
                        </button>
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
        <button @click="payCurrentPhase" class="payCurrentPhase isansFont" v-if="currentPhase.active">پرداخت قسط
            {{currentPhase.title}}
        </button>
        <p class="currentPhase-paidbefore isansFont--faNum"
           v-if="getPhaseContentType(currentPhase) === 'soldstorepaidpackagephase'">
            شما قبلاً هزینه {{currentPhase.title}} را پرداخت کرده اید.
            <i class="material-icons">done</i>
        </p>
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
                isShowingTaskMoreInfoModal: false,
                availablePhaseStatuses: [
                    {value: 'in_progress', name: 'در حال انجام'},
                    {value: 'pay_to_start', name: 'پرداخت هزینه'},
                    {value: 'not_started', name: 'شروع نشده'}
                ],
                availableStatuses: [
                    {value: 'in_progress', name: 'در حال انجام'},
                    {value: 'done', name: 'انجام شد'},
                    {value: 'finished', name: 'دریافت نتیجه'},
                    {value: 'pending_user_data', name: 'دریافت اطلاعات کاربر'}
                ],
                isShowingCurrentPhaseDescription: false,
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
            currentPhaseStatusName() {
                return (this.availablePhaseStatuses.find(status => status.value === this.currentPhase.status)).name;
            }
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

            toggleCurrentPhaseDescription() {
                this.isShowingCurrentPhaseDescription = !this.isShowingCurrentPhaseDescription;
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
                if (!!this.currentPhase.active) {
                    try {
                        this.$loading(true);
                        let result = (await this.$api.post(`${this.api}/cart/carts/`, {"products": [this.currentPhase.id]}, this.httpConfig))
                        console.log(result);
                        this.$router.push(`/carts/${result.data.id}`)
                    } catch (e) {
                        if (e.response) {
                            console.log(e.response);
                        }
                    } finally {
                        this.$loading(false);
                    }
                } else {

                }
            },

            toggleTaskMoreInfo(task) {
                if (this.showTaskMobileMoreInfo) {
                    if (this.taskToShowMoreInfo === task) {
                        this.hideTaskMoreInfo();
                    } else {
                        this.showTaskMoreInfo(task);
                    }
                } else {
                    this.showTaskMoreInfo(task);
                }
            },

            showTaskMoreInfo(task, event) {
                console.log('show more info for task ', task);
                console.log(event);
                this.taskToShowMoreInfo = task;
                this.isShowingTaskMoreInfoModal = true;
                // this.showTaskMobileMoreInfo = true;
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
        align-items: flex-start;
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
        transition: all 0.1s ease-in-out;
    }

    .package-head-action-profileview i {
        font-size: 16px;
        margin-left: 5px;
    }

    .package-head-action-profileview:hover {
        background-color: #8C3DDB;
        color: white;
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
        font-size: 12px;
        margin-right: 8px;
        border-radius: 50%;
        padding: 1px;
        font-weight: bold;
        border: 1.3px solid #8C3DDB;
    }

    .switcher-item-button:hover {
        color: #8C3DDB;
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
        transition: all 0.3s ease-in-out;
    }

    .package-body-tab-row:hover {
        background-color: #F8F8F8;
        cursor: pointer;
    }

    .body-tab-row-text {
        margin: 0;
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

    .currentPhase-paidbefore {
        color: #3CAEA3;
        display: flex;
        align-items: center;
        margin: 10px 15px;
    }

    .currentPhase-paidbefore i {
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #3CAEA3;
        font-size: 14px;
        padding: 2px;
        margin: 0 5px;
    }

    .file-icon {
        color: #A347FF;
        font-size: 21px;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease-in-out;
    }

    .file-icon:hover {
        border-radius: 50%;
        border: 1px solid #8C3DDB;
        padding: 1.5px;
        font-size: 18px;
    }

    .nofile-icon {
        color: #9B9999;
        font-weight: bold;
    }

    .package-head-info-phasestatus {
        font-size: 13px;
        color: #585858;
        margin-top: 10px;
    }

    .phasestatus--inprogress {
        color: #6C2C10;
        background-color: #FBF8DE;
        border-radius: 10px;
        padding: 2.5px 10px;
        font-size: 12px;
        font-weight: bold;
    }

    .phasestatus--paytostart {
        color: #6C2C10;
        background-color: #FBF8DE;
        border-radius: 10px;
        padding: 2.5px 10px;
        font-size: 12px;
        font-weight: bold;
    }

    .phasestatus--notstarted {
        color: #6C2C10;
        background-color: #FBF8DE;
        border-radius: 10px;
        padding: 2.5px 10px;
        font-size: 12px;
        font-weight: bold;
    }

    .package-body-desc {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .package-body-desc-title {
        background-color: white;
        padding: 10px 20px 10px 0;
        display: flex;
        align-items: center;
    }

    .body-desc-title--open {
        background-color: #F8F8F8;
    }

    .package-body-desc-title button {
        display: flex;
        align-items: center;
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        color: #707070;
    }

    .package-body-desc-title button i {
        margin-right: 5px;
    }

    .package-body-desc-content {
        margin: 0 20px;
        padding: 20px 0;
        border-bottom: 2px solid #F8F8F8;
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1016;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .newTaskModal {
        width: 100%;
        max-width: 790px;
        max-height: 100vh;
        overflow: auto;
        background-color: white;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding-bottom: 15px;
    }

    .newTaskModal-head-title {
        color: #B3B3B3;
        display: flex;
        align-items: center;
        margin: 10px;
        font-size: 18px;
    }

    .newTaskModal-head-title-close {
        padding: 0;
        margin: 0;
        background: none;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .newTaskModal-body {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        margin: 20px;
    }

    .modal-body-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        margin: 0 20px 10px 20px;
    }

    .modal-body-title-text {
        font-size: 18px;
        color: #707070;
    }

    .modal-body-title-file {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #8C3DDB;
        color: white;
        padding: 7.5px 25px;
        border-radius: 10px;
        font-weight: normal;
        transition: all 0.1s ease-in-out;
    }

    .modal-body-title-file:hover {
        border: 1px inset #8C3DDB;
        background-color: white;
        color: #8C3DDB;
    }

    .modal-body-title-file.file--nofile {
        background-color: #F2F2F2;
        color: #B3B3B3;
    }

    .title-file-icon {
        margin-right: 10px;
    }

    .modal-body-dates {
        margin: 0 20px 10px 20px;
        display: flex;
        align-items: center;
        color: #9B9999;
        font-size: 13px;
        flex-wrap: wrap;
    }

    .modal-body-dates span {
        display: flex;
        align-items: center;
        margin: 0 10px;
    }

    .modal-body-dates span:first-child {
        margin-right: 0;
    }

    .modal-body-dates span i {
        margin-left: 5px;
        font-size: 18px;
    }

    .newTaskModal-footer {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        margin: 0 20px 20px 20px;
    }

    .modal-footer-title {
        margin: 20px 20px 15px 20px;
        display: flex;
        align-items: center;
        color: #585858;
    }

    .modal-footer-title i {
        margin-left: 5px;
        color: #D2D2D2;
        font-size: 18px;
    }

    .modal-footer-content {
        margin: 15px 20px 20px 20px;
        background-color: #F8F8F8;
        padding: 15px;
        border-radius: 10px;
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