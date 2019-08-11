<template>
    <div v-if="consultant" class="col-md-12 text-center">
        <button class="btn btn-info isansFont" @click.prevent="showPrevWeek()">< هفته قبلی</button>
        <button class="btn btn-info isansFont" @click.prevent="showNextWeek()">هفته بعدی ></button>
        <div class="table-responsive">
            <table class="table table-bordered isansFont " id="myTable" v-html="tableData">

            </table>
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
                this.createCalendarTable(this.shownDate);
                this.$nextTick(function () {
                    this.initDateSelector();
                });
            }).catch(timesErr => {
                console.log(timesErr.response);
            })
        },
        mounted() {

        },
        methods: {
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
            },

            createCalendarTable() {
                this.tableData = '';
                let justNow = jalali().locale('fa');
                for (let i = 0; i < 17; i++) {
                    if (i == 0) {
                        this.tableData += '<tr>';
                        this.tableData += '<th>ساعت / روز</th>';
                        this.tableData += '<th>' + this.days[0].format('YYYY/MM/DD dddd') + '</th>';
                        this.tableData += '<th>' + this.days[1].format('YYYY/MM/DD dddd') + '</th>';
                        this.tableData += '<th>' + this.days[2].format('YYYY/MM/DD dddd') + '</th>';
                        this.tableData += '<th>' + this.days[3].format('YYYY/MM/DD dddd') + '</th>';
                        this.tableData += '<th>' + this.days[4].format('YYYY/MM/DD dddd') + '</th>';
                        this.tableData += '<th>' + this.days[5].format('YYYY/MM/DD dddd') + '</th>';
                        this.tableData += '<th>' + this.days[6].format('YYYY/MM/DD dddd') + '</th>';
                        this.tableData += '</tr>';
                    } else {
                        this.tableData += '<tr>';
                        for (let j = 0; j < 8; j++) {
                            if (j == 0 && i == 1) {
                                this.tableData += '<td>' + (i + 7) + ':00 تا ' + (i + 8) + ':00' + '</td>';
                            } else if (j == 0 && i != 1) {
                                this.tableData += '<td>' + (i + 7) + ':00 تا ' + (i + 8) + ':00' + '</td>';
                            } else {
                                let dateStartString = this.days[j - 1].clone().hour(i + 7).minute(0).second(0).millisecond(0).locale("en").utc().toISOString();
                                let dateEndString = this.days[j - 1].clone().hour(i + 8).minute(0).second(0).millisecond(0).locale("en").utc().toISOString();

                                if (this.days[j - 1].clone().hour(i + 7).minute(0).second(0).millisecond(0).isBefore(justNow)) {
                                    this.tableData += '<td class="timeNotAvailable" data-datestart="' + dateStartString + '" data-dateend="' + dateEndString + '"></td>';
                                } else {
                                    if (this.isInConsultantTime(this.days[j - 1].clone().hour(i + 7).minute(0).second(0).millisecond(0).locale('en').utc(), this.days[j - 1].clone().hour(i + 8).minute(0).second(0).millisecond(0).locale("en").utc())) {
                                        this.tableData += '<td class="timeOpen" data-datestart="' + dateStartString + '" data-dateend="' + dateEndString + '"></td>';
                                    } else {
                                        this.tableData += '<td class="timeNotAvailable" data-datestart="' + dateStartString + '" data-dateend="' + dateEndString + '"></td>';
                                    }
                                }

                            }
                        }
                        this.tableData += '</tr>';
                    }

                }
            },

            initDateSelector() {
                let list = document.getElementsByTagName('td');
                for (let i = 0; i < list.length; i++) {
                    list[i].addEventListener('click', () => {
                        if (list[i].dataset.datestart !== undefined && !list[i].classList.contains('timeNotAvailable')) {
                            if (list[i].classList.contains('timeOpen')) {
                                list[i].classList.remove('timeOpen');
                                list[i].classList.add('timeSelected');
                                console.log(list[i].dataset.datestart + ' ' + list[i].dataset.dateend);
                                this.selectedDates.push({
                                    'datestart': list[i].dataset.datestart,
                                    'dateend': list[i].dataset.dateend
                                });
                                console.log(this.selectedDates);
                            } else {
                                list[i].classList.remove('timeSelected');
                                list[i].classList.add('timeOpen');
                                console.log(list[i].dataset.datestart + ' ' + list[i].dataset.dateend);
                                this.removeElementFromArray(this.selectedDates, {
                                    'datestart': list[i].dataset.datestart,
                                    'dateend': list[i].dataset.dateend
                                });
                                console.log(this.selectedDates);
                            }
                        }

                    });
                }
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

<style>
    tr th, tr td {
        text-align: center;
    }

    .timeNotAvailable {
        background-color: #999999;
        color: white;
    }

    .timeOpen {
        background-color: #4caf50;
        cursor: pointer;
    }

    .timeOpen::before {
        content: "آماده انتخاب";
        color: white;
    }

    .timeSelected {
        background-color: orange !important;
        cursor: pointer;
    }

    .timeSelected::before {
        content: "انتخاب شده" !important;
        color: white;
    }


    .itemIsReadyToResreve {
        background-color: #e91e63;
        color: white;
        cursor: pointer;
    }

    .itemIsReadyToResreve::before {
        color: white;
        content: 'باز برای رزرو'
    }

    .timeReserved {
        background-color: blue;
        /*cursor: pointer;*/
    }

    .timeReserved::before {
        content: "رزرو شده";
        color: white;
    }
</style>