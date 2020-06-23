<template>
    <div class="col-md-12 text-center">
        <button class="btn btn-simple btn-week isansFont ml-10" @click.prevent="showPrevWeek()">
            <i class="fas fa-chevron-circle-right"/>
            هفته قبلی
        </button>
        <button class="btn btn-simple btn-week isansFont mr-10" @click.prevent="showNextWeek()">
            هفته بعدی
            <i class="fas fa-chevron-circle-left"/>
        </button>

        <div class="myTable isansFont" v-if="calendarDataset.length != 0">
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
                <div class="myTableCell dayTitleCell" v-for="(dayArray, index) in calendarDataset" :key="index">
                    <p>{{getJalali(dayArray[0].datestart).locale('fa').format('dddd')}}</p>
                    <p class="mont1hSmallText">{{getJalali(dayArray[0].datestart).locale('fa').format('DD MMMM')}}</p>
                </div>
            </div>


            <div v-for="index in 16" :key="index" class="myTableRow">
                <div class="myTableCell firstCellInRow">
                    {{ (index + 7) + ":00" + " تا " + (index + 8) + ":00"}}
                </div>

                <div class="myTableLargerCell myTableSemiRow" v-for="rowIndex in 7" :key="rowIndex">
                    <div v-if="getJalali(calendarDataset[rowIndex - 1][index - 1].datestart).locale('en').isBefore(justNowDate)" class="myTableSemiCell timeNotAvailable" ></div>
                    <div v-else-if="!isInReservedTimes(getJalali(calendarDataset[rowIndex - 1][index - 1].datestart), getJalali(calendarDataset[rowIndex - 1][index - 1].dateend)) &&
                        !isInConsultantTime(getJalali(calendarDataset[rowIndex - 1][index - 1].datestart),getJalali(calendarDataset[rowIndex - 1][index - 1].dateend))"
                         :class="[{'timeSelected': isDatePresentOnSelectedList(selectedDatesToOpen,calendarDataset[rowIndex - 1][index - 1].datestart,calendarDataset[rowIndex - 1][index - 1].dateend)}]"
                         @click="itemClickHandlerToOpen(calendarDataset[rowIndex - 1][index - 1].datestart,calendarDataset[rowIndex - 1][index - 1].dateend)"
                         class="myTableSemiCell timeOpenForManagerToSet"
                    ></div>
                    <div v-else class="myTableSemiCell timeOpen"
                         :class="[{'timeSelected': isDatePresentOnSelectedList(selectedDatesToRemove,calendarDataset[rowIndex - 1][index - 1].datestart,calendarDataset[rowIndex - 1][index - 1].dateend)}]"
                         @click="itemClickHandlerToRemove(calendarDataset[rowIndex - 1][index - 1].datestart, calendarDataset[rowIndex - 1][index - 1].dateend)"></div>
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
                            <span class="material-input"/>
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
            </div>
        </div>
    </div>
</template>

<script>
    import jalali from 'jalali-moment'
    import axios from 'axios'
    import {required, between, numeric} from 'vuelidate/lib/validators'

    export default {
        name: "Calendar",
        validations: {
            selectedPrice: {required, between: between(1000, 100000), numeric}
        },
        props: {
            consultantId: {
                type: Number || String
            },
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
                calendarDataset: [],
            }
        },
        computed: {
            isLoggedIn: function () {
                return this.$store.getters.isLoggedIn;
            },
            activeCart: function () {
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

            initComp: async function () {
                await this.getListOfTimesById(this.consultantId);
                await this.getListOfSoldTimes();
                console.log('shown date init');
                this.shownDate = jalali().locale('fa');
                console.log('handle week init');
                this.handleWeek(this.shownDate);
            },

            async addTimes() {
                if (!this.$v.selectedPrice.$error && this.canAddOpenTimes) {
                    console.log('selected dates to add open:', this.selectedDatesToOpen);
                    console.log('selected price:', this.selectedPrice);
                    try {
                        //this.$loading(true);
                        for (let selecteDate of this.selectedDatesToOpen) {
                            let payload = {
                                "start_time": selecteDate.datestart,
                                "end_time": selecteDate.dateend,
                                "price": this.selectedPrice
                            };
                            let result = await this.$api.post(`${this.$store.getters.getApi}/store/time-slot-sales/`,payload,this.$store.getters.httpConfig);
                            console.log(result);
                        }

                        await this.initComp();
                        this.selectedDatesToOpen = [];
                    } catch (e) {
                        console.log(e);
                        if(e.response) {
                            console.log(e.response);
                        }
                    } finally {

                    }
                } else {
                    // show error message
                }

            },

            getTimeStampByIndex(dayIndexInArr, timeIndex, hourToAdd, getIsoString) {
                if (getIsoString) {
                    return this.days[dayIndexInArr - 1].clone().hour(Number(timeIndex) + Number(hourToAdd)).locale('en').utc().toISOString();
                } else {
                    return this.days[dayIndexInArr - 1].clone().hour(Number(timeIndex) + Number(hourToAdd)).locale('en').utc();
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

            async startDeleteItems() {
                if (window.confirm('برای حذف زمان های باز انتخاب شده مطمئید ؟')) {
                    try {
                        //this.$loading(true);
                        for (let selectedDate of this.selectedDatesToRemove) {
                            let itemIdToDelete = this.getSlotIdByDate(selectedDate.datestart, selectedDate.dateend);
                            let result = await this.$api.delete(`${this.$store.getters.getApi}/store/time-slot-sales/${itemIdToDelete}/`, this.$store.getters.httpConfig);
                            console.log(result);
                        }
                        this.selectedDatesToRemove = [];
                        await this.initComp();
                    } catch (e) {
                        console.log(e);
                        if(e.response) {
                            console.log(e.response);
                        }
                    } finally {

                    }
                }

            },

            async getListOfSoldTimes() {
                try {
                    //this.$loading(true);
                    console.log('getting list of sold times');
                    let result = await this.$api.get(`${this.$store.getters.getApi}/store/sold-time-slot-sales/`, this.$store.getters.httpConfig);
                    console.log(result);
                    this.soldSlots = result.data;
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {

                }
            },

            async getListOfTimesById(id) {
                try {
                    //this.$loading(true);
                    console.log('getting list of times by id ', id);
                    let result = await this.$api.get(`${this.$store.getters.getApi}/store/time-slot-sales/?consultant=${id}`, this.$store.getters.httpConfig);
                    console.log(result);
                    this.slots = result.data;
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                } finally {

                }
            },

            getSlotIdByDate(startDate, endDate) {
                for (let i = 0; i < this.slots.length; i++) {
                    if (jalali(this.slots[i].start_time).isSame(jalali(startDate), 'minute') && jalali(this.slots[i].end_time).isSame(jalali(endDate), 'minute'))
                        return this.slots[i].id;
                }
            },

            showWeek: function (numOfWeek, siblingStatus) {
                if (siblingStatus === 'prev') {
                    this.handleWeek(this.shownDate.subtract(Number(numOfWeek) * 7, 'd').locale('fa'));
                } else if (siblingStatus === 'next') {
                    this.handleWeek(this.shownDate.add(Number(numOfWeek) * 7, 'd').locale('fa'));
                }
            },

            showPrevWeek: function () {
                this.showWeek(1, 'prev');
            },

            showNextWeek: function () {
                this.showWeek(1, 'next');
            },

            generateSaturdayNew(date) {
                return date.minute(0).second(0).millisecond(0).clone().add(0 - date.weekday(), 'd');
            },

            generateSundayNew(date) {
                return date.minute(0).second(0).millisecond(0).clone().add(1 - date.weekday(), 'd');
            },

            generateMondayNew(date) {
                return date.minute(0).second(0).millisecond(0).clone().add(2 - date.weekday(), 'd');
            },

            generateTuesdayNew(date) {
                return date.minute(0).second(0).millisecond(0).clone().add(3 - date.weekday(), 'd');
            },

            generateWednesdayNew(date) {
                return date.minute(0).second(0).millisecond(0).clone().add(4 - date.weekday(), 'd');
            },

            generateThursdayNew(date) {
                return date.minute(0).second(0).millisecond(0).clone().add(5 - date.weekday(), 'd');
            },

            generateFridayNew(date) {
                return date.minute(0).second(0).millisecond(0).clone().add(6 - date.weekday(), 'd');
            },

            handleWeek(now) {

                console.log('WATCH HERE----------------------------------');
                console.log(this.getJalali("2020-03-04T18:30:00.000Z").locale('fa'));
                console.log(this.getJalali("2020-03-04T18:30:00.000Z").locale('fa').toISOString());
                console.log('WATCH HERE----------------------------------');
                console.log('inside handle week');
                this.days = [];
                this.calendarDataset = [];
                this.days.push(this.generateSaturdayNew(now));
                this.days.push(this.generateSundayNew(now));
                this.days.push(this.generateMondayNew(now));
                this.days.push(this.generateTuesdayNew(now));
                this.days.push(this.generateWednesdayNew(now));
                this.days.push(this.generateThursdayNew(now));
                this.days.push(this.generateFridayNew(now));

                for (let i = 0; i < this.days.length; i++) {
                    this.tableDataArray[i] = this.days[i];
                }

                //calendarDataset
                for (let i = 0; i < this.days.length; i++) {
                    let tempDayArray = [];
                    for (let j = 1; j <= 16; j++) {
                        let tempDateObject = {'datestart': this.days[i].clone().add(j - 1, 'hour').toISOString()};
                        if (j !== 16) {
                            tempDateObject["dateend"] = this.days[i].clone().add(j, 'hour').toISOString();
                        }
                        if (j === 16) {
                            tempDateObject["dateend"] = this.days[i].clone().add(j, 'hour').toISOString();
                        }
                        tempDayArray.push(tempDateObject);
                    }
                    this.calendarDataset.push(tempDayArray);
                }
                console.log('calendar dataset multi array:', this.calendarDataset);
            },

            removeElementFromToOpenDates(value) {
                this.selectedDatesToOpen = this.selectedDatesToOpen.filter( val => {
                    return val.datestart != value.datestart && val.datestart.dateend != value.dateend;
                });
            },

            removeElementFromToRemoveDates(value) {
                this.selectedDatesToRemove = this.selectedDatesToRemove.filter( val => {
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
