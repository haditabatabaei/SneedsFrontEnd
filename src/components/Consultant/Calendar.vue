<template>
    <div v-if="consultant" class="col-md-12 text-center">
        <button class="btn btn-simple btn-week isansFont" @click.prevent="showPrevWeek()">
            <i class="fas fa-chevron-circle-right"></i>
            هفته قبلی
        </button>
        <button class="btn btn-simple btn-week isansFont" @click.prevent="showNextWeek()">
            هفته بعدی
            <i class="fas fa-chevron-circle-left"></i>
        </button>
        <div class="myTable isansFont">
            <div class="myTableRow firstRow">
                <div class="myTableCell">ساعت / روز</div>
                <div class="myTableCell dayTitleCell" v-for="day in tableDataArray">
                    <p>{{day.date.format('dddd')}}</p>
                    <p class="monthSmallText">{{day.date.format('DD MMMM')}}</p>
                </div>
                <div class="myTableCell">روز / ساعت</div>
            </div>
            <div v-for="index in 16" :key="index" class="myTableRow">
                <div class="myTableCell firstCellInRow">{{ (index - 1 + 8) + ":00" + " تا " + (index - 1 + 1 + 8) +
                    ":00"}}
                </div>
                <div class="myTableLargerCell myTableSemiRow" v-for="rowIndex in 7" :key="rowIndex">
                    <div
                            :data-datestart="days[rowIndex - 1].clone().hour(index + 7).minute(0).second(0).millisecond(0).locale('en').utc().toISOString()"
                            :data-dateend="days[rowIndex - 1].clone().hour(index + 8).minute(0).second(0).millisecond(0).locale('en').utc().toISOString()"
                            v-if="days[rowIndex - 1].clone().hour(index + 7).minute(0).second(0).millisecond(0).isBefore(justNowDate)"
                            class="myTableSemiCell timeNotAvailable"
                    ></div>

                    <div
                            v-else-if="isInConsultantTime(days[rowIndex - 1].clone().hour(index + 7).minute(0).second(0).millisecond(0).locale('en').utc(), days[rowIndex - 1].clone().hour(index + 8).minute(0).second(0).millisecond(0).locale('en').utc())"
                            @click="itemClickHandler(days[rowIndex - 1].clone().hour(index + 7).minute(0).second(0).millisecond(0).locale('en').utc().toISOString(),days[rowIndex - 1].clone().hour(index + 8).minute(0).second(0).millisecond(0).locale('en').utc().toISOString())"
                            :class="[
                            {'timeOpen' : !isDatePresentOnSelectedList(days[rowIndex - 1].clone().hour(index + 7).minute(0).second(0).millisecond(0).locale('en').utc().toISOString(),days[rowIndex - 1].clone().hour(index + 8).minute(0).second(0).millisecond(0).locale('en').utc().toISOString())},
                            {'timeSelected' : isDatePresentOnSelectedList(days[rowIndex - 1].clone().hour(index + 7).minute(0).second(0).millisecond(0).locale('en').utc().toISOString(),days[rowIndex - 1].clone().hour(index + 8).minute(0).second(0).millisecond(0).locale('en').utc().toISOString())},
                            ]"
                    ></div>

                    <div
                            :data-datestart="days[rowIndex - 1].clone().hour(index + 7).minute(0).second(0).millisecond(0).locale('en').utc().toISOString()"
                            :data-dateend="days[rowIndex - 1].clone().hour(index + 8).minute(0).second(0).millisecond(0).locale('en').utc().toISOString()"
                            v-else="isInConsultantTime(days[rowIndex - 1].clone().hour(index + 7).minute(0).second(0).millisecond(0).locale('en').utc(), days[rowIndex - 1].clone().hour(index + 8).minute(0).second(0).millisecond(0).locale('en').utc())"
                            class="myTableSemiCell timeNotAvailable"
                    ></div>
                </div>
                <div class="myTableCell lastCellInRow">
                    {{ (index - 1 + 8) + ":00" + " تا " + (index - 1 + 1 + 8) + ":00"}}
                </div>
            </div>
            <div class="myTableRow firstRow">
                <div class="myTableCell">ساعت / روز</div>
                <div class="myTableCell dayTitleCell" v-for="day in tableDataArray">
                    <p>{{day.date.format('dddd')}}</p>
                    <p class="monthSmallText">{{day.date.format('DD MMMM')}}</p>
                </div>
                <div class="myTableCell">روز / ساعت</div>
            </div>
        </div>

        <button class="btn btn-rose isansFont" @click="addSelectedTimesToCart()"
                v-if="isLoggedIn && config.showAddToCart">
            <i class="material-icons" v-if="reserveSuccess.value">done</i>
            <img src="http://193.176.241.131/sneedsAssets/img/loading.svg" alt="loading icon" class="loadingIcon"
                 v-if="reserveLoading.value">
            <i class="material-icons" v-if="reserveFailed.value">block</i>
            اضافه کردن به سبد خرید
        </button>
        <router-link to="/login" class="btn btn-sm btn-warning isansFont"
                     v-else-if="!isLoggedIn && config.showAddToCart">
            برای رزرو جلسات باید وارد حساب خود شوید. برای ورود کلیک کنید
        </router-link>
    </div>
</template>

<script>
    import jalali from 'jalali-moment'
    import axios from 'axios'

    export default {
        name: "Calendar",
        props: {
            consultant: {},
            config: {showAddToCart: true, showConsultantManagePanel: false}
        },
        data() {
            return {
                slots: [],
                days: [],
                tableData: '',
                selectedDates: [],
                shownDate: {},
                justNowDate: jalali().locale('fa'),
                tableDataArray: [
                    {date: {}},
                    {date: {}},
                    {date: {}},
                    {date: {}},
                    {date: {}},
                    {date: {}},
                    {date: {}}
                ],

                reserveSuccess: {
                    value: false,
                },

                reserveLoading: {
                    value: false,
                },
                reserveFailed: {
                    value: false,
                },
            }
        },
        computed: {
            isLoggedIn: function () {
                return this.$store.getters.isLoggedIn;
            }, activeCart: function () {
                return this.$store.getters.getCart;
            },
        },
        created() {
            this.getListOfTimesById(this.consultant.id).then(timeRes => {
                window.console.log('slot times:', timeRes.data);
                this.slots = timeRes.data;
                this.shownDate = jalali().locale('fa');
                this.handleWeek(this.shownDate);
            }).catch(timesErr => {
                console.log(timesErr.response);
            })
        },
        mounted() {

        },
        methods: {
            itemClickHandler(datestart, dateend) {
                //check see if this time is not added to the list
                if (!this.isDatePresentOnSelectedList(datestart, dateend)) {
                    this.selectedDates.push({
                        'datestart': datestart,
                        'dateend': dateend
                    });
                }// else means that element is present in the list, so we will remove it from the list
                else {
                    this.removeElementFromArray(this.selectedDates, {
                        'datestart': datestart,
                        'dateend': dateend
                    });
                }
                console.log(this.selectedDates);
            },

            isDatePresentOnSelectedList(datestart, dateend) {
                for (let i = 0; i < this.selectedDates.length; i++) {
                    if (this.selectedDates[i].datestart == datestart && this.selectedDates[i].dateend == dateend)
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

            addSelectedTimesToCart: function () {
                this.resetReserveLogic();
                this.startReserveLogic();
                console.log(this.selectedDates);

                let payload = {"time_slot_sales": []};

                for (let i = 0; i < this.selectedDates.length; i++) {
                    payload.time_slot_sales.push(this.getSlotIdByDate(this.selectedDates[i].datestart, this.selectedDates[i].dateend));
                }

                console.log("active card is :", this.activeCart);
                if (this.activeCart !== undefined && this.activeCart != null && this.activeCart !== {}) {
                    //put new items in it
                    console.log('put new items in cart');
                    console.log(this.activeCart);
                    for (let i = 0; i < payload.time_slot_sales.length; i++) {
                        this.activeCart.time_slot_sales.push(payload.time_slot_sales[i]);
                    }


                    let config = {
                        "payload": {"time_slot_sales": Array.from(new Set(this.activeCart.time_slot_sales))},
                        "cartId": this.activeCart.id,
                    };

                    console.log(config);
                    this.$store.dispatch('putCartRequest', config).then(response => {
                        console.log(response);
                        this.successReserveLogic();
                        setTimeout(() => {
                            this.resetReserveLogic();
                            this.$router.push('/user/cart');
                        }, 1000)
                    }).catch(error => {
                        this.failedReserveLogic();
                        console.log(error);
                        if (error.response) {
                            console.log(error.response);
                        }
                    });
                } else {
                    //card doesnt exits
                    //post new items;
                    console.log('post new items in cart');
                    this.$store.dispatch('postCart', payload).then(response => {
                        console.log(response);
                        this.successReserveLogic();
                        setTimeout(() => {
                            this.resetReserveLogic();
                            this.$router.push('/user/cart');
                        }, 1000)
                    }).catch(error => {
                        this.failedReserveLogic();
                        console.log(error);
                        if (error.response) {
                            console.log(error.response.data.detail);
                        }
                    })
                }

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
                this.createCalendarTable(this.shownDate);
                this.$nextTick(function () {
                    this.initDateSelector();
                })
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
                    // this.days.push(date.clone().subtract(toStart - i, 'd'));
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
                    this.tableDataArray[i].date = this.days[i];
                }
                console.log(this.tableDataArray);
            },

            removeElementFromArray(arr, value) {
                this.selectedDates = arr.filter(function (val, index, arr) {
                    return arr[index].datestart != value.datestart && arr[index].dateend != value.dateend;
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

        },

    }
</script>

<style scoped>
    /*tr th, tr td {*/
    /*    text-align: center;*/
    /*    transition: all 0.1s ease-in-out;*/
    /*}*/

    .timeNotAvailable {
        color: white;
    }

    .timeOpen {
        background-color: #4ee367;
        cursor: pointer;
    }

    .timeSelected {
        background-color: #ffca18 !important;
        cursor: pointer;
    }

    .itemIsReadyToResreve {
        background-color: #e91e63;
        color: white;
        cursor: pointer;
    }

    .itemIsReadyToResreve::before {
        transition: all 0.1s ease-in-out;
        color: white;
        content: 'باز برای رزرو'
    }

    .timeReserved {
        background-color: blue;
        /*cursor: pointer;*/
    }

    .timeReserved::before {
        transition: all 0.1s ease-in-out;
        content: "رزرو شده";
        color: white;
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
        /*font-weight: normal;*/
        font-size: 10px;
    }

    .myTableLargerCell div {
        border-radius: 20px;
        min-height: 35px;
        width: 90%;
    }

    .firstRow {
        background-color: white;
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

</style>