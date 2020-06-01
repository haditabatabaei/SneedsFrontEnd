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
                            <input type="text" class="newTaskModal-body-input" id="taskTitle" name="taskTitle" v-model="newTaskInput.title">
                        </label>
                        <label for="taskStatus" class="newTaskModal-body-label">
                        <span class="newTaskModal-body-label-name">
                            وضعیت فعلی
                            <mark>*</mark>
                            :
                        </span>
                            <select name="taskStatus" id="taskStatus" class="newTaskModal-body-input" v-model="newTaskInput.status">
                                <option value="in_progress" class="newTaskModal-body-input-option">درحال انجام</option>
                                <option value="in_progress" class="newTaskModal-body-input-option">انجام شده</option>
                            </select>
                        </label>
                    </div>
                    <div class="newTaskModal-footer isansFont">
                        <p class="package-empty-tab-warn">
                            .توجه داشته باشید که کاربر قادر به مشاهده تمام جزئیات کارها می‌باشد
                        </p>
                        <button class="newTaskModal-footer-cancel" v-if="!editTaskPattern" id="closable-action" @click="hideNewTaskModal">
                            بیخیال
                        </button>
                        <button class="newTaskModal-footer-delete" v-if="editTaskPattern">
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
                <img class="package-head-info-image" src="" alt="">
                <div class="package-head-info-text isansFont--faNum">
                    <p class="package-head-info-namerate">
                        {{`${soldPackage.sold_to.first_name} ${soldPackage.sold_to.last_name}`}}
                    </p>
                    <p class="package-head-info-study">
                    </p>
                </div>
            </div>
            <div class="package-head-action isansFont">
                <button class="package-head-action-profileview" @click="showNewTaskModal">
                    <i class="material-icons">add</i>
                    افزودن کار جدید به این مرحله
                </button>
            </div>
        </div>
        <div class="package-body isansFont--faNum">
            <div class="package-body-switcher">
                <ul class="package-body-switcher-items">
                    <li class="package-body-switcher-item" v-for="phase in allPhases ">
                        <button class="switcher-item-button"
                                :class="[{'switcher-item-button--active': currentPhase === phase}]"
                                @click="toggleCurrentPhase(phase)">
                            {{phase.title}}
                            <i class="material-icons" v-if="currentPhase === phase">done</i>
                        </button>
                    </li>
                </ul>
            </div>
            <div class="package-body-tab" v-if="currentPhaseTasks.length != 0">
                <div class="package-body-tab-title">
                    <p class="body-tab-title-text">

                    </p>
                    <p class="body-tab-title-text">
                        عنوان
                    </p>
                    <p class="body-tab-title-text">
                        تاریخ ایجاد
                    </p>
                    <p class="body-tab-title-text">
                        تاریخ آخرین تغییر
                    </p>
                    <p class="body-tab-title-text">
                        وضعیت
                    </p>
                    <p class="body-tab-title-text">
                        فایل
                    </p>
                </div>
                <div class="package-body-tab-row" v-for="task in currentPhaseTasks">
                    <p class="body-tab-row-text">
                        <button class="tab-row-edit" title="ویرایش این کار" @click="editTask(task)">
                            <i class="material-icons">settings</i>
                        </button>
                    </p>
                    <p class="body-tab-row-text row-text--dark">
                        {{task.title}}
                    </p>
                    <p class="body-tab-row-text">
                        {{getJalali(task.created).format('YY/MM/DD')}}
                    </p>
                    <p class="body-tab-row-text">
                        {{getJalali(task.updated).format('YY/MM/DD HH:mm')}}
                    </p>
                    <p class="body-tab-row-text">
                        <mark class="row-text-status status--done">
                            در حال انجام
                        </mark>
                    </p>
                    <p class="body-tab-row-text">
                        ندارد
                        <!--                        <a class="row-text-file" href="#">-->
                        <!--                            <i class="material-icons">-->
                        <!--                                folder-->
                        <!--                            </i>-->
                        <!--                        </a>-->
                    </p>
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
        },
        methods: {
            getJalali(date) {
                return jalali(date).locale(this.$store.getters.locale);
            },

            showNewTaskModal() {
                this.isShowingNewTaskModal = true;
            },

            hideNewTaskModal(event, forced = false) {
                if(forced) {
                    this.isShowingNewTaskModal = false;
                    this.editTaskPattern = false;
                } else {
                    if(event.target.id.startsWith('closable')) {
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
                this.currentPhase = phase;
                this.getCurrentPhaseTasks();
            },

            async performEditTask() {
                try {
                    this.$loading(true);
                    let payload = {
                        "status" : this.newTaskInput.status,
                        "title": this.newTaskInput.title,
                    };
                    let result = await this.$api.put(`${this.api}/store/packages/sold-store-package-phase-detail-detail/${this.newTaskInput.id}/`, payload, this.httpConfig);
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
                        "status" : this.newTaskInput.status,
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
                    this.toggleCurrentPhase(this.allPhases[0]);
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

</style>