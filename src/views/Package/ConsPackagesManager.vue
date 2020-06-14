<template>
    <section class="itemBlock">
        <transition name="fade">
            <div class="modal-overlay" v-if="isShowingNewTaskModal" id="closable-overlay" @click="hideNewTaskModal">
                <div class="newTaskModal">
                    <div class="newTaskModal-head">
                        <h2 class="newTaskModal-head-title isansFont" v-if="editTaskPattern">
                            <button class="newTaskModal-head-title-close">
                                <i id="closable-modal" class="material-icons" @click="hideNewTaskModal">close</i>
                            </button>
                            ویرایش کار
                        </h2>
                        <h2 class="newTaskModal-head-title isansFont" v-else>
                            <button class="newTaskModal-head-title-close">
                                <i id="closable-modal" class="material-icons" @click="hideNewTaskModal">close</i>
                            </button>
                            ایجاد کار جدید
                        </h2>
                    </div>
                    <div class="newTaskModal-body isansFont">
                        <label for="taskTitle" class="newTaskModal-body-label">
                        <span class="newTaskModal-body-label-name">
                            عنوان کار
                            <mark>*</mark>
                            :
                        </span>
                            <input type="text" class="newTaskModal-body-input" id="taskTitle" name="taskTitle"
                                   v-model="newTaskInput.title">
                        </label>
                        <label for="taskStatus" class="newTaskModal-body-label">
                        <span class="newTaskModal-body-label-name">
                            وضعیت فعلی
                            <mark>*</mark>
                            :
                        </span>
                            <select name="taskStatus" id="taskStatus" class="newTaskModal-body-input"
                                    v-model="newTaskInput.status">
                                <option :value="status.value" class="newTaskModal-body-input-option"
                                        v-for="status in availableStatuses">{{status.name}}
                                </option>
                            </select>
                        </label>
                    </div>
                    <div class="newTaskModal-footer isansFont">
                        <p class="package-empty-tab-warn">
                            توجه داشته باشید که کاربر قادر به مشاهده تمام جزئیات کارها می‌باشد.
                        </p>
                        <button class="newTaskModal-footer-cancel" v-if="!editTaskPattern" id="closable-action"
                                @click="hideNewTaskModal">
                            بیخیال
                        </button>
                        <button class="newTaskModal-footer-delete" @click="deleteTask" v-if="editTaskPattern">
                            <i class="material-icons">delete_forever</i>
                            حذف این کار
                        </button>
                        <button class="newTaskModal-footer-create" @click="performEditTask" v-if="editTaskPattern">
                            اعمال تغییرات
                        </button>
                        <button v-else class="newTaskModal-footer-create" @click="createNewTask">
                            ایجاد کار جدید
                        </button>
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
            <div class="package-head-info">
                <img class="package-head-info-image" src="/sneedsAssets/img/profile.png" alt="">
                <div class="package-head-info-text isansFont--faNum">
                    <p class="package-head-info-namerate" v-if="soldPackage.sold_to">
                        {{`${soldPackage.sold_to.first_name} ${soldPackage.sold_to.last_name}`}}
                    </p>
                </div>
            </div>
            <div class="package-head-action isansFont">
                <router-link class="package-head-action-chat" to="/user/chatroom">
                    <i class="material-icons">mail</i>
                </router-link>
                <button class="package-head-action-profileview" @click="showNewTaskModal">
                    <i class="material-icons">add</i>
                    <span class="action-profilevew-holder">
                        افزودن کار جدید به این مرحله
                    </span>
                </button>
            </div>
        </div>
        <div class="package-body isansFont--faNum">
            <div class="package-body-switcher no--mobile">
                <ul class="package-body-switcher-items">
                    <li class=" package-body-switcher-item" v-for="phase in allPhases ">
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
                    <p class="body-tab-title-text no--mobile">

                    </p>
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
                    <p class="body-tab-row-text no--mobile">
                        <button class="tab-row-edit" title="ویرایش این کار" @click="editTask(task)">
                            <i class="material-icons">settings</i>
                        </button>
                    </p>
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
                        <button class="row-more-info-button" v-if="isOnMobile">
                            <i class="material-icons">info</i>
                        </button>
                        <div class="row-more-info-box" v-if="isOnMobile">
                            <p class="more-info-item">
                                <span>تاریخ ایجاد</span>
                                {{getJalali(task.created).format('YY/MM/DD')}}
                            </p>
                            <p class="more-info-item">
                                <span>تاریخ آخرین تغییر</span>
                                {{getJalali(task.updated).format('YY/MM/DD HH:mm')}}
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
                <button class="package-empty-addtask" @click="showNewTaskModal">
                    <i class="material-icons">
                        add
                    </i>
                </button>
            </div>
        </div>
    </section>
</template>

<script>
    import jalali from 'jalali-moment'

    export default {
        name: "ConsPackagesManager",
        data() {
            return {
                soldPackage: {},
                consultant: {},
                currentPhase: {},
                currentPhaseTasks: [],
                isShowingNewTaskModal: false,
                editTaskPattern: false,
                newTaskInput: {
                    title: '',
                    status: 'in_progress'
                },
                availableStatuses: [
                    {value: 'in_progress', name: 'در حال انجام'},
                    {value: 'done', name: 'انجام شد'},
                    {value: 'finished', name: 'دریافت نتیجه'},
                    {value: 'pending_user_data', name: 'دریافت اطلاعات کاربر'}
                ]
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
            isOnMobile() {
                return this.windowWidth <= 568;
            }
        },
        watch: {
            currentPhase(newVal) {
                this.toggleCurrentPhase(newVal)
            }
        },
        methods: {
            getJalali(date) {
                return jalali(date).locale(this.$store.getters.locale);
            },

            showNewTaskModal() {
                this.isShowingNewTaskModal = true;
            },

            getTaskStatusName(task) {
                return (this.availableStatuses.find(status => status.value === task.status)).name;
            },

            hideNewTaskModal(event, forced = false) {
                if (forced) {
                    this.isShowingNewTaskModal = false;
                    this.editTaskPattern = false;
                } else {
                    if (event.target.id.startsWith('closable')) {
                        this.isShowingNewTaskModal = false;
                        this.editTaskPattern = false;
                    }
                }
            },

            editTask(task) {
                this.showNewTaskModal();
                this.editTaskPattern = true;
                this.newTaskInput.title = task.title;
                this.newTaskInput.status = task.status;
                this.newTaskInput.id = task.id;
            },


            async toggleCurrentPhase(phase) {
                this.getCurrentPhaseTasks();
            },

            async deleteTask() {
                try {
                    this.$loading(true);
                    let result = await this.$api.delete(`${this.api}/store/packages/sold-store-package-phase-detail-detail/${this.newTaskInput.id}/`, this.httpConfig);
                    console.log(result);
                    this.hideNewTaskModal(null, true);
                    await this.getCurrentPhaseTasks();
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },

            async performEditTask() {
                try {
                    this.$loading(true);
                    let payload = {
                        "status": this.newTaskInput.status,
                        "title": this.newTaskInput.title,
                    };
                    console.log(payload)
                    let result = await this.$api.patch(`${this.api}/store/packages/sold-store-package-phase-detail-detail/${this.newTaskInput.id}/`, payload, this.httpConfig);
                    this.newTaskInput = {status: "", title: ""};
                    this.hideNewTaskModal(null, true);
                    await this.getCurrentPhaseTasks();
                    console.log(result);
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },

            async createNewTask() {
                try {
                    this.$loading(true);
                    let payload = {
                        "status": this.newTaskInput.status,
                        "title": this.newTaskInput.title,
                        "object_id": this.currentPhase.id,
                        "content_type": this.getPhaseContentType(this.currentPhase)
                    };
                    let result = await this.$api.post(`${this.api}/store/packages/sold-store-package-phase-detail-list/`, payload, this.httpConfig);
                    this.newTaskInput = {status: "", title: ""};
                    this.hideNewTaskModal(null, true);
                    await this.getCurrentPhaseTasks();
                    console.log(result);
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
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
                    this.currentPhase = this.allPhases[0];
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            }
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

    .package-head-action {
        display: flex;
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
        justify-content: center;
    }

    .package-head-action-profileview i {
        font-size: 16px;
        margin-left: 5px;
    }

    .package-head-action-profileview:hover {
        background-color: #8C3DDB;
        color: white;
    }

    .package-head-action-chat {
        background-color: white;
        border: 1px solid #8C3DDB;
        color: #8C3DDB;
        border-radius: 50%;
        padding: 2px;
        margin-left: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
    }

    .package-head-action-chat i {
        font-size: 16px;
    }

    .package-head-action-chat:hover {
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

    .package-empty-addtask {
        padding: 0;
        margin: 10px 0;
        color: #8C3DDB;
        border-radius: 50%;
        border: 1px solid #8C3DDB;
        background: none;
        display: flex;
        align-items: center;
    }

    .package-empty-addtask i {
        padding: 0;
        margin: 0;
        font-size: 20px;
    }

    .package-empty-addtask:hover {
        background-color: #8C3DDB;
        color: white;
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
        width: 80%;
        background-color: white;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding-bottom: 15px;
    }

    .newTaskModal-head-title {
        color: #9B9999;
        display: flex;
        align-items: center;
        margin: 10px;
        font-size: 18px;
    }

    .newTaskModal-head-title-close {
        padding: 0;
        margin: 0 0 0 5px;
        background: none;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .newTaskModal-body {
        display: flex;
        align-items: center;
        margin: 20px;
    }

    .newTaskModal-body-label {
        display: flex;
        flex-direction: column;
        color: #707070;
    }

    .newTaskModal-body-label:not(:first-child) {
        margin-right: 15px;
    }

    .newTaskModal-body-input {
        margin-top: 10px;
        border-radius: 5px;
        padding: 5px 5px 5px 15px;
        min-width: 250px;
        min-height: 40px;
        border: 1px solid #F2F2F2;
        background-color: #F8F8F8;
    }

    .newTaskModal-body-label-name mark {
        padding: 0;
        margin: 0;
        background: none;
        color: #E46464;
    }

    .newTaskModal-footer {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin: 0 15px;
    }

    .newTaskModal-footer-cancel {
        color: #9B9999;
        background: none;
        border: none;
        margin: 10px;
    }

    .newTaskModal-footer-create {
        color: #FCFCFC;
        border: none;
        border-radius: 10px;
        padding: 7px 25px;
        background-color: #3CAEA3;
        margin: 10px;
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

    .newTaskModal-footer-delete {
        color: #DC3030;
        border: none;
        border-radius: 10px;
        padding: 7px 25px;
        background-color: #FFECEC;
        margin: 10px;
        display: flex;
        align-items: center;
    }

    .newTaskModal-footer-delete i {
        margin-left: 5px;
        font-size: 20px;
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

        .package-empty-tab-warn {
            margin-bottom: 0;
        }

        .newTaskModal-body {
            flex-wrap: wrap;
            justify-content: center;
        }

        .newTaskModal-footer {
            flex-wrap: wrap;
            justify-content: center;
        }
    }

    @media only screen and (max-width: 767.8px) {
        .newTaskModal-body-label:not(:first-child) {
            margin-right: 0;
        }

        .newTaskModal-body-label {
            width: 100%;
        }

        .newTaskModal-body-input {
            width: 100%;
            min-width: initial;
        }
    }

    @media only screen and (max-width: 567.8px) {
        .package-head-info {
            flex-direction: column;
            align-items: flex-start;
        }

        .package-head-info-image {
            margin-bottom: 15px;
        }

        .package-head-action-chat {
            margin-left: 0;
            border-radius: 0 10px 10px 0;
            border-color: #F0E6FA;
            color: #8C3DDB;
        }

        .package-head-action-profileview {
            margin-left: 0;
            width: 35px;
            height: 35px;
            border-right: 0;
            border-color: #F0E6FA;
            color: #8C3DDB;
            border-radius: 10px 0 0 10px;
            padding: 5px 20px;
        }

        .package-head-action-profileview i {
            margin-left: 0;
        }

        .action-profilevew-holder {
            display: none;
        }

        .no--mobile {
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

        .row-more-info-button:active ~ .row-more-info-box {
            color: #8C3DDB;
            display: flex;
            flex-direction: column;
        }

        .row-more-info-box {
            position: absolute;
            display: none;
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
    }

</style>