<template>
    <div v-if="consultantId" class="col-md-12 text-center">
        <button class="btn btn-simple btn-week isansFont" @click.prevent="showPrevWeek()">
            <i class="fas fa-chevron-circle-right"></i>
            هفته قبلی
        </button>
        <button class="btn btn-simple btn-week isansFont" @click.prevent="showNextWeek()">
            هفته بعدی
            <i class="fas fa-chevron-circle-left"></i>
        </button>

        <div class="myTable isansFont">
            <div class="calendarTopWrapper">
                <div class="calendarGuideWrapper">
                    <span class="isansFont text-sm">راهنمایی تقویم :</span>
                    <span class="btn btn-round btn-sm btn-sample timeNotAvailable isansFont">بسته</span>
                    <span class="btn btn-round btn-sm btn-sample timeOpenForManagerToSet isansFont text-dark">باز برای افزودن به تایم ها</span>
                    <span class="btn btn-round btn-sm btn-sample timeOpen isansFont">باز برای رزرو کاربر</span>
                    <span class="btn btn-round btn-sm btn-sample timeSelected isansFont">انتخاب شده</span>
                    <span class="btn btn-round btn-sm btn-sample timeReserved isansFont">رزرو شده</span>
                </div>
            </div>
            <div class="myTableRow firstRow">
                <div class="myTableCell">ساعت / روز</div>
                <div class="myTableCell dayTitleCell" v-for="day in tableDataArray">
                    <p>{{day.format('dddd')}}</p>
                    <p class="monthSmallText">{{day.format('DD MMMM')}}</p>
                </div>
                <div class="myTableCell">روز / ساعت</div>
            </div>


            <div v-for="index in 16" :key="index" class="myTableRow">
                <div class="myTableCell firstCellInRow">
                    {{ (index + 7) + ":00" + " تا " + (index + 8) + ":00"}}
                </div>
                <div class="myTableLargerCell myTableSemiRow" v-for="rowIndex in 7" :key="rowIndex">
                    <div
                            v-if="getTimeStampByIndex(rowIndex,index,7,false).isBefore(justNowDate)"
                            class="myTableSemiCell timeNotAvailable"
                    ></div>

                    <div
                            v-else-if="!isInReservedTimes(getTimeStampByIndex(rowIndex,index,7,false),getTimeStampByIndex(rowIndex,index,8,false)) && !isInConsultantTime(getTimeStampByIndex(rowIndex,index,7,false),getTimeStampByIndex(rowIndex,index,8,false)) "
                            @click="itemClickHandlerToOpen(getTimeStampByIndex(rowIndex , index, 7, true),getTimeStampByIndex(rowIndex , index, 8, true))"
                            class="myTableSemiCell timeOpenForManagerToSet"
                            :class="[{'timeSelected' : isDatePresentOnSelectedList(selectedDatesToOpen,getTimeStampByIndex(rowIndex , index, 7, true),getTimeStampByIndex(rowIndex, index, 8,true))}]"
                    ></div>

                    <div
                            v-else-if="isInConsultantTime(getTimeStampByIndex(rowIndex,index,7,false),getTimeStampByIndex(rowIndex,index,8,false))"
                            @click="itemClickHandlerToRemove(getTimeStampByIndex(rowIndex , index, 7, true),getTimeStampByIndex(rowIndex , index, 8, true))"
                            class="myTableSemiCell timeOpen"
                            :class="[{'timeSelected' : isDatePresentOnSelectedList(selectedDatesToRemove,getTimeStampByIndex(rowIndex , index, 7, true),getTimeStampByIndex(rowIndex, index, 8,true))}]"
                    ></div>

                    <div
                            v-else-if="isInReservedTimes(getTimeStampByIndex(rowIndex,index,7,false),getTimeStampByIndex(rowIndex,index,8,false))"
                            class="myTableSemiCell timeReserved"
                    ></div>

                </div>
                <div class="myTableCell lastCellInRow">
                    {{ (index + 7) + ":00" + " تا " + (index + 8) + ":00"}}
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <form action="" class="form row">
                    <div class="col-md-6">
                        <div class="form-group form-rose gadugiFont isansFont">
                            <p class="text-right isansFont">پنل اضافه کردن جلسه:</p>
                            <input id="selectedPrice" class="form-control isansFont" type="number"
                                   v-model="$v.selectedPrice.$model" placeholder="لطفا هزینه کلاس را وارد کنید">
                            <span class="material-input"></span>
                            <p class="text-right isansFont text-danger"
                               v-if="$v.selectedPrice.$error">
                                لطفا هزینه شرکت در جلسه را مشخص نمایید حداقل 1000 و حداکثر 100000. ( معادل 1000 تومان و
                                100 هزار تومان )
                            </p>
                            <p v-if="!canAddOpenTimes" class="text-right isansFont text-danger">
                                باید حداقل یک جلسه را انتخاب کنید
                            </p>
                            <button @click.prevent="addTimes()"
                                    :disabled="$v.selectedPrice.$error || !$v.selectedPrice.$dirty || !canAddOpenTimes"
                                    class="btn btn-success btn-block isansFont">
                                اضافه کردن جلسات انتخاب شده
                            </button>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <p class="text-right isansFont">پنل حذف جلسه:</p>
                            <p class="text-right isansFont text-danger" v-if="!canRemoveTimes">
                                باید حداقل یک جلسه را انتخاب کنید
                            </p>
                            <button :disabled="!canRemoveTimes" class="btn btn-danger btn-block isansFont"
                                    @click.prevent="startDeleteItems()">حذف
                                تایم های انتخاب شده
                            </button>
                            <hr>
                        </div>
                    </div>
                    <hr>
                </form>
                <RectNotifBlock :message="alertLoading.message" type="warning" borderRound="true"
                                v-if="alertLoading.value"></RectNotifBlock>

                <RectNotifBlock :message="alertSuccess.message" type="success" borderRound="true"
                                v-else-if="alertSuccess.value"></RectNotifBlock>

                <RectNotifBlock :message="alertFailed.message" type="danger" borderRound="true"
                                v-else-if="alertFailed.value"></RectNotifBlock>
            </div>
        </div>
    </div>
</template>

<script>
    import jalali from 'jalali-moment'
    import axios from 'axios'
    import RectNotifBlock from '@/components/NotifBlocks/RectNotifBlock'
    import {required, between, numeric} from 'vuelidate/lib/validators'

    export default {
        name: "Calendar",
        validations: {
            selectedPrice: {required, between: between(1000, 100000), numeric}
        },
        components: {RectNotifBlock},
        props: {
            consultantId: '',
        },
        data() {
            return {
                selectedPrice: '',
                slots: [],
                soldSlots: [],
                days: [],
                selectedDatesToOpen: [],
                selectedDatesToRemove: [],
                shownDate: {},
                justNowDate: jalali().locale('fa'),
                tableDataArray: [],

                reserveSuccess: {
                    value: false,
                },

                reserveLoading: {
                    value: false,
                },
                reserveFailed: {
                    value: false,
                },
                alertSuccess: {
                    value: false,
                    message: 'جلسات با موفقیت برای رزرو کاربران باز شدند.'
                },

                alertLoading: {
                    value: false,
                    message: 'چند لحظه صبر کنید..'
                },

                alertFailed: {
                    value: false,
                    message: 'مشکلی در اضافه کرد جلسات رخ داد...'
                },

            }
        },
        computed: {
            isLoggedIn: function () {
                return this.$store.getters.isLoggedIn;
            }, activeCart: function () {
                return this.$store.getters.getCart;
            },
            canAddOpenTimes: function () {
                return this.selectedDatesToOpen.length !== 0;
            },
            canRemoveTimes: function () {
                return this.selectedDatesToRemove.length !== 0;
            }
        },
        created() {
            this.initComp();
        },
        mounted() {

        },
        methods: {
            getJalali: function (date) {
                return jalali(date);
            },
            initComp: function () {
                this.startLoadingLogic();
                this.getListOfTimesById(this.consultantId).then(timeRes => {
                    window.console.log('slot times:', timeRes.data);
                    this.slots = timeRes.data;
                    this.getListOfSoldTimes().then(response => {
                        console.log('sold slot times:', response.data);
                        this.soldSlots = response.data;
                        this.resetLoadingLogic();
                    }).catch(error => {
                        console.log(error);
                        if (error.response)
                            console.log(error.response);
                        this.failedLoadingLogic();
                    });

                    this.shownDate = jalali().locale('fa');
                    this.handleWeek(this.shownDate);
                    this.resetLoadingLogic();
                }).catch(timesErr => {
                    console.log(timesErr)
                    if (timesErr.response)
                        console.log(timesErr.response);
                    this.failedLoadingLogic();
                })
            },
            resetLoadingLogic: function () {
                window.console.log('no loading deploy');
                this.alertLoading.value = false;
                this.alertFailed.value = false;
                this.alertSuccess.value = false;
            },
            startLoadingLogic: function () {
                window.console.log('start loading deploy');
                this.alertLoading.value = true;
                this.alertFailed.value = false;
                this.alertSuccess.value = false;
            },
            failedLoadingLogic: function () {
                window.console.log('failed loading deploy');
                this.alertLoading.value = false;
                this.alertFailed.value = true;
                this.alertSuccess.value = false;
            },
            successLoadingLogic: function () {
                window.console.log('success loading deploy');
                this.alertLoading.value = false;
                this.alertFailed.value = false;
                this.alertSuccess.value = true;
            },

            addTimes() {
                this.resetLoadingLogic();
                this.startLoadingLogic();
                if (!this.$v.selectedPrice.$error && this.canAddOpenTimes) {
                    console.log('selected dates to add open:', this.selectedDatesToOpen);
                    console.log('selected price:', this.selectedPrice);
                    let promises = [];
                    for (let i = 0; i < this.selectedDatesToOpen.length; i++) {
                        let payload = {
                            "start_time": this.selectedDatesToOpen[i].datestart,
                            "end_time": this.selectedDatesToOpen[i].dateend,
                            "price": this.selectedPrice
                        };
                        let promise = this.sendAddTimesRequest(payload);
                        promises.push(promise);
                    }

                    Promise.all(promises).then(() => {
                        console.log('all promises done');
                        this.selectedDatesToOpen = [];
                        this.initComp();
                    }).catch((error) => {
                        console.log('all promises catch');
                        this.failedLoadingLogic();
                    })
                } else {
                    this.failedLoadingLogic();
                    this.alertFailed.message = "لطفا هزینه شرکت در جلسه را مشخص نمایید حداقل 1000. ( معادل 1000 تومان )"
                }

            },

            sendAddTimesRequest(timePayload) {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'store/time-slot-sales/',
                        method: 'POST',
                        headers: {
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                            'Content-Type': 'application/json',
                        },
                        data: timePayload
                    }).then(response => {
                        console.log('axios response :', response);
                        resolve(response);
                    }).catch(error => {
                        console.log('axios error :', error, error.response);
                        reject(error);
                    })
                })
            },

            getTimeStampByIndex(dayIndexInArr, timeIndex, hourToAdd, getIsoString) {
                if (getIsoString) {
                    return this.days[dayIndexInArr - 1].clone().hour(Number(timeIndex) + Number(hourToAdd)).minute(0).second(0).millisecond(0).locale('en').utc().toISOString();
                } else {
                    return this.days[dayIndexInArr - 1].clone().hour(Number(timeIndex) + Number(hourToAdd)).minute(0).second(0).millisecond(0).locale('en').utc();
                }
            },

            itemClickHandlerToRemove(datestart, dateend) {
                //check see if this time is not added to the list
                if (!this.isDatePresentOnSelectedList(this.selectedDatesToRemove, datestart, dateend)) {
                    console.log('add elements to selected dates to remove')
                    this.selectedDatesToRemove.push({
                        'datestart': datestart,
                        'dateend': dateend
                    });
                }// else means that element is present in the list, so we will remove it from the list
                else {
                    console.log('remove element from selected dates to remove')
                    this.removeElementFromToRemoveDates({
                        'datestart': datestart,
                        'dateend': dateend
                    });
                }
                console.log(this.selectedDatesToRemove);
            },

            itemClickHandlerToOpen(datestart, dateend) {
                //check see if this time is not added to the list
                if (!this.isDatePresentOnSelectedList(this.selectedDatesToOpen, datestart, dateend)) {
                    console.log('add elements to selected dates to open')
                    this.selectedDatesToOpen.push({
                        'datestart': datestart,
                        'dateend': dateend
                    });
                }// else means that element is present in the list, so we will remove it from the list
                else {
                    console.log('remove element from selected dates to open')
                    this.removeElementFromToOpenDates({
                        'datestart': datestart,
                        'dateend': dateend
                    });
                }
                console.log(this.selectedDatesToOpen);
            },

            isDatePresentOnSelectedList(listToCheck, datestart, dateend) {
                for (let i = 0; i < listToCheck.length; i++) {
                    if (listToCheck[i].datestart == datestart && listToCheck[i].dateend == dateend)
                        return true;
                }
                return false;
            },


            resetReserveLogic: function () {
                window.console.log('no loading deploy');
                this.reserveLoading.value = false;
                this.reserveFailed.value = false;
                this.reserveSuccess.value = false;
            },

            startReserveLogic: function () {
                window.console.log('start loading deploy');
                this.reserveLoading.value = true;
                this.reserveFailed.value = false;
                this.reserveSuccess.value = false;
            },

            failedReserveLogic: function () {
                window.console.log('failed loading deploy');
                this.reserveLoading.value = false;
                this.reserveFailed.value = true;
                this.reserveSuccess.value = false;
            },

            successReserveLogic: function () {
                window.console.log('success loading deploy');
                this.reserveLoading.value = false;
                this.reserveFailed.value = false;
                this.reserveSuccess.value = true;
            },

            startDeleteItems() {
                if (window.confirm('برای حذف زمان های باز انتخاب شده مطمئید ؟')) {
                    this.resetLoadingLogic();
                    this.startLoadingLogic();
                    let promises = [];
                    for (let i = 0; i < this.selectedDatesToRemove.length; i++) {
                        let itemIdToDelete = this.getSlotIdByDate(this.selectedDatesToRemove[i].datestart, this.selectedDatesToRemove[i].dateend);
                        let deletePromise = this.sendDeleteTimesRequest(itemIdToDelete);
                        promises.push(deletePromise);
                    }
                    Promise.all(promises).then(() => {
                        this.selectedDatesToRemove = [];
                        this.initComp();
                    }).catch((error) => {
                        console.log(error);
                        this.failedLoadingLogic();
                    })
                }

            },

            sendDeleteTimesRequest(timeId) {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'store/time-slot-sales/' + timeId + '/',
                        method: 'DELETE',
                        headers: {
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                            'Content-Type': 'application/json',
                        },
                    }).then(response => {
                        console.log('axios response :', response);
                        resolve(response);
                    }).catch(error => {
                        console.log('axios error :', error, error.response);
                        reject(error);
                    })
                })
            },

            getListOfSoldTimes() {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'store/sold-time-slot-sales/',
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                        }
                    }).then(response => {
                        resolve(response);
                    }).catch(error => {
                        reject(error);
                    })
                })
            },

            getListOfTimesById(id) {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'store/time-slot-sales/?consultant=' + id,
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {
                        resolve(response);
                    }).catch(error => {
                        reject(error);
                    })
                })
            },

            getSlotIdByDate(startDate, endDate) {
                for (let i = 0; i < this.slots.length; i++) {
                    if (jalali(this.slots[i].start_time).isSame(jalali(startDate), 'minute') && jalali(this.slots[i].end_time).isSame(jalali(endDate), 'minute'))
                        return this.slots[i].id;
                }
            },

            showWeek: function (numOfWeek, siblingStatus) {
                if (siblingStatus == 'prev') {
                    this.handleWeek(this.shownDate.subtract(Number(numOfWeek) * 7, 'd').locale('fa'));
                } else if (siblingStatus == 'next') {
                    this.handleWeek(this.shownDate.add(Number(numOfWeek) * 7, 'd').locale('fa'));
                }
            },

            showPrevWeek: function () {
                this.showWeek(1, 'prev');
            },

            showNextWeek: function () {
                this.showWeek(1, 'next');
            },

            generateSaturday(date) {
                if (date.weekday() == 0) {
                    return date.clone();
                }

                let toEnd = 7 - date.weekday();
                let toStart = date.weekday();

                for (let i = toStart - 1; i >= 0; i--) {
                    let newDate = date.clone().subtract(toStart - i, 'd');
                    if (newDate.weekday() == 0) {
                        return newDate;
                    }
                }

                for (let i = 0; i < toEnd - 1; i++) {
                    let newDate = date.clone().add((i + 1), 'd');
                    if (newDate.weekday() == 0) {
                        return newDate;
                    }
                }
            },

            generateSunday(date) {
                if (date.weekday() == 1) {
                    return date.clone();
                }

                let toEnd = 7 - date.weekday();
                let toStart = date.weekday();

                for (let i = toStart - 1; i >= 0; i--) {
                    let newDate = date.clone().subtract(toStart - i, 'd');
                    if (newDate.weekday() == 1) {
                        return newDate;
                    }
                }

                for (let i = 0; i < toEnd - 1; i++) {
                    let newDate = date.clone().add((i + 1), 'd');
                    if (newDate.weekday() == 1) {
                        return newDate;
                    }
                }
            },

            generateMonday(date) {
                if (date.weekday() == 2) {
                    return date.clone();
                }

                let toEnd = 7 - date.weekday();
                let toStart = date.weekday();

                for (let i = toStart - 1; i >= 0; i--) {
                    let newDate = date.clone().subtract(toStart - i, 'd');
                    if (newDate.weekday() == 2) {
                        return newDate;
                    }
                }

                for (let i = 0; i < toEnd - 1; i++) {
                    let newDate = date.clone().add((i + 1), 'd');
                    if (newDate.weekday() == 2) {
                        return newDate;
                    }
                }
            },

            generateTuesday(date) {
                if (date.weekday() == 3) {
                    return date.clone();
                }

                let toEnd = 7 - date.weekday();
                let toStart = date.weekday();

                for (let i = toStart - 1; i >= 0; i--) {
                    let newDate = date.clone().subtract(toStart - i, 'd');
                    if (newDate.weekday() == 3) {
                        return newDate;
                    }
                }

                for (let i = 0; i < toEnd - 1; i++) {
                    let newDate = date.clone().add((i + 1), 'd');
                    if (newDate.weekday() == 3) {
                        return newDate;
                    }
                }
            },

            generateWednesday(date) {
                if (date.weekday() == 4) {
                    return date.clone();
                }

                let toEnd = 7 - date.weekday();
                let toStart = date.weekday();

                for (let i = toStart - 1; i >= 0; i--) {
                    let newDate = date.clone().subtract(toStart - i, 'd');
                    if (newDate.weekday() == 4) {
                        return newDate;
                    }
                }

                for (let i = 0; i < toEnd - 1; i++) {
                    let newDate = date.clone().add((i + 1), 'd');
                    if (newDate.weekday() == 4) {
                        return newDate;
                    }
                }
            },

            generateThursday(date) {
                if (date.weekday() == 5) {
                    return date.clone();
                }

                let toEnd = 7 - date.weekday();
                let toStart = date.weekday();

                for (let i = toStart - 1; i >= 0; i--) {
                    let newDate = date.clone().subtract(toStart - i, 'd');
                    if (newDate.weekday() == 5) {
                        return newDate;
                    }
                }

                for (let i = 0; i < toEnd - 1; i++) {
                    let newDate = date.clone().add((i + 1), 'd');
                    if (newDate.weekday() == 5) {
                        return newDate;
                    }
                }
            },

            generateFriday(date) {
                if (date.weekday() == 6) {
                    return date.clone();
                }

                let toEnd = 7 - date.weekday();
                let toStart = date.weekday();

                for (let i = toStart - 1; i >= 0; i--) {
                    let newDate = date.clone().subtract(toStart - i, 'd');
                    if (newDate.weekday() == 6) {
                        return newDate;
                    }
                }

                for (let i = 0; i < toEnd - 1; i++) {
                    let newDate = date.clone().add((i + 1), 'd');
                    if (newDate.weekday() == 6) {
                        return newDate;
                    }
                }
            },

            handleWeek(now) {
                this.days = [];
                this.days.push(this.generateSaturday(now));
                this.days.push(this.generateSunday(now));
                this.days.push(this.generateMonday(now));
                this.days.push(this.generateTuesday(now));
                this.days.push(this.generateWednesday(now));
                this.days.push(this.generateThursday(now));
                this.days.push(this.generateFriday(now));
                for (let i = 0; i < this.days.length; i++) {
                    this.tableDataArray[i] = this.days[i];
                }
                console.log(this.tableDataArray);
            },

            removeElementFromToOpenDates(value) {
                this.selectedDatesToOpen = this.selectedDatesToOpen.filter(function (val) {
                    return val.datestart != value.datestart && val.datestart.dateend != value.dateend;
                });
            },

            removeElementFromToRemoveDates(value) {
                this.selectedDatesToRemove = this.selectedDatesToRemove.filter(function (val) {
                    return val.datestart != value.datestart && val.datestart.dateend != value.dateend;
                });
            },

            isInConsultantTime(cellStartDate, cellEndDate) {
                for (let i = 0; i < this.slots.length; i++) {
                    if (cellStartDate.isSame(jalali(this.slots[i].start_time), 'second') && cellEndDate.isSame(jalali(this.slots[i].end_time), 'second')) {
                        return true;
                    }
                }
                return false;
            },

            isInReservedTimes(cellStartDate, cellEndDate) {
                for (let i = 0; i < this.soldSlots.length; i++) {
                    if (cellStartDate.isSame(jalali(this.soldSlots[i].start_time), 'hour') && cellEndDate.isSame(jalali(this.soldSlots[i].end_time), 'hour')) {
                        return true;
                    }
                }
                return false;
            },
        },

    }
</script>

<style scoped>

    .selectedDateBlock button {
        margin-right: 5px;
    }

    .selectedDateBlock p {
        font-size: 12px;
        padding: 10px;
        margin-bottom: 0;
    }

    .selectedDateBlockHeader p {
        margin-top: 20px;
    }


    .btn-sample {
        cursor: default !important;
    }

    .btn-sample.text-dark {
        color: #b3b3b3;
    }

    .btn-sample.text-dark:hover {
        color: #b3b3b3;
    }

    .timeNotAvailable {
        background-color: #d8d8d8;
    }

    .timeOpen {
        background-color: #4ee367;
        cursor: pointer;
    }

    .timeOpen:hover {
        background-color: #57d06d;
    }

    .timeOpenForManagerToSet {
        background-color: #f9f9f9;
        cursor: pointer;
    }

    .timeOpenForManagerToSet:hover {
        background-color: #e6e6e6;
    }

    .timeSelected {
        background-color: #ffca18 !important;
        cursor: pointer;
    }

    .timeReserved {
        background-color: rgb(156, 39, 176);;
    }

    .calendarTopWrapper {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-bottom: 20px;
        position: sticky;
        top: 70px;
        background-color: white;
        width: 100%;
    }

    .myTable {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        font-weight: bold;
    }

    .myTableRow {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .myTableLargerCell {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 5px;
        margin-right: 5px;
    }

    .myTableRow > div {
        width: calc(100% / 8);
        min-height: 50px;
    }

    .firstRow .myTableCell {
        margin-right: 8px;
    }

    .myTableRow {
        min-height: 50px;
        background-color: #eee;
    }

    .myTableCell, .myTableLargerCell div {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .dayTitleCell {
        flex-direction: column;
    }

    .dayTitleCell p {
        margin: 0;
        color: #4D4D4D;
    }

    .dayTitleCell .monthSmallText {
        color: #808080;
        font-size: 10px;
    }

    .myTableLargerCell div {
        border-radius: 20px;
        min-height: 35px;
        width: 90%;
    }

    .firstRow {
        background-color: white;
        position: sticky;
        top: 115px;
    }

    .firstCellInRow {
        background-color: white;
    }

    .lastCellInRow {
        background-color: white;
    }

    .btn-week {
        color: #666666;
    }

    .btn-week:hover {
        color: #3d3d3d;
    }

    p.text-danger {
        font-size: 12px;
    }

</style>