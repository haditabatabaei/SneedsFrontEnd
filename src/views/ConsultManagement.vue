<template>
    <div>
        <div class="page-header header-filter header-small" data-parallax="true"
             style="background-image: url('../webimages/bg3.jpg'); transform: translate3d(0px, 0px, 0px);">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2 text-center">
                        <h2 class="title isansFont">
                            پنل مدیریت جلسات مشاوره
                        </h2>
                    </div>
                </div>
            </div>
        </div>

        <div class="main profile-page">
            <div class="profile-content">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-6 col-xs-offset-3">
                            <div class="profile">
                                <div class="avatar">
                                    <img src="../../public/webimages/marc.jpg" alt="Circle Image"
                                         class="img-circle img-responsive img-raised">
                                </div>
                                <div class="name">
                                    <h3 class="title isansFont">
                                        {{user.first_name}}

                                        {{user.last_name}}
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-2 follow">

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <div class="row">
                                <div class="col-md-12">
                                    <h3 class="isansFont text-center">
                                        تقویم شما
                                    </h3>
                                    <h5 class="isansFont text-center">
                                        جلسات مورد نیاز خود را در تقویم زیر انتخاب و آن هارا به سیستم اضافه کنید
                                    </h5>
                                </div>
                            </div>
                            <div class="row">

                                <div class="col-md-12 text-right">
                                    <RectNotifBlock :message="alertLoading.message" type="warning" borderRound="true"
                                                    v-if="alertLoading.value"></RectNotifBlock>

                                    <RectNotifBlock :message="alertSuccess.message" type="success" borderRound="true"
                                                    v-else-if="alertSuccess.value"></RectNotifBlock>

                                    <RectNotifBlock :message="alertFailed.message" type="danger" borderRound="true"
                                                    v-else-if="alertFailed.value"></RectNotifBlock>
                                </div>
                                <div class="col-md-3 card stickyPanel">
                                    <form action="" class="form">
                                        <div class="form-group form-rose gadugiFont isansFont">
                                            <p class="text-success text-right isansFont">پنل اضافه کردن جلسه:</p>
                                            <label for="selectedPrice" class="isansFont">هزینه کلاس:</label>
                                            <input id="selectedPrice" class="isansFont d-block w-100" type="number"
                                                   min="0" v-model="selectedPrice" required
                                                   placeholder="لطفا هزینه کلاس را وارد کنید">
                                            <span class="material-input"></span>
                                            <span class="text-center isansFont text-danger"
                                                  v-if="inputErrors.costError">
                      لطفا هزینه شرکت در جلسه را مشخص نمایید از 0 ( رایگان ) تا 100 ( هزار تومان )
                                                 </span>
                                            <button @click.prevent="addTimes()"
                                                    class="btn btn-success btn-block isansFont">
                                                اضافه کردن جلسات انتخاب شده
                                            </button>

                                        </div>
                                        <hr>
                                        <div class="form-group">
                                            <p class="text-danger text-right isansFont">پنل حذف جلسه:</p>
                                            <button class="btn btn-danger btn-block isansFont"
                                                    @click.prevent="startDeleteItems()">حذف تایم های انتخاب شده
                                            </button>
                                            <hr>
                                        </div>
                                    </form>
                                </div>
                                <div class="col-md-9">
                                    <button class="btn btn-info isansFont" @click.prevent="showPrevWeek()"> < هفته
                                        قبلی
                                    </button>
                                    <button class="btn btn-info isansFont" @click.prevent="showNextWeek()">هفته بعدی >
                                    </button>
                                    <div class="table-responsive">
                                        <table class="table table-bordered isansFont table-hover" id="myTable"
                                               v-html="tableData">

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import jalali from 'jalali-moment';
    import RectNotifBlock from '@/components/NotifBlocks/RectNotifBlock'


    export default {
        name: "ConsultManagement",
        components: {RectNotifBlock},
        data() {
            return {
                inputErrors: {costError: false},
                slots: [],
                days: [],
                tableData: '',
                selectedDates: [],
                shownDate: {},
                selectedPrice: '',
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
        }, created() {
            this.startReset();
        },
        mounted() {
            // scrollTo(0, 0)
        },
        methods: {
            startReset() {
                let slotsPromise = this.getListOfTimesById(this.userInfo.user_pk);
                slotsPromise.then(response => {
                    this.slots = response.data;
                    this.selectedDates = [];
                    window.console.log('my available slots :', this.slots);
                    this.shownDate = jalali().locale('fa');
                    this.handleWeek(this.shownDate);
                    this.createCalendarTable(this.shownDate);
                    this.$nextTick(function () {
                        this.initDateSelector();
                    })
                }).catch(error => {

                });
            },
            textExport() {
                window.console.log('export', this.selectedDates, 'price', this.selectedPrice)
            },
            showNextWeek: function () {
                this.showWeek(1, 'next');
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
            createCalendarTable(now) {
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
                                    if (this.isInConsultantTime(this.days[j - 1].clone().hour(i + 7).minute(0).second(0).millisecond(0).locale("en").utc(), this.days[j - 1].clone().hour(i + 8).minute(0).second(0).millisecond(0).locale("en").utc())) {
                                        this.tableData += '<td class="itemIsReadyToResreve" data-datestart="' + dateStartString + '" data-dateend="' + dateEndString + '"></td>';
                                    } else {
                                        this.tableData += '<td class="timeOpen" data-datestart="' + dateStartString + '" data-dateend="' + dateEndString + '"></td>';
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
                        console.log('td with date:', list[i].dataset.datestart, ' untill ', list[i].dataset.dateend)
                        if (list[i].dataset.datestart !== undefined && list[i].dataset.dateend !== undefined && !list[i].classList.contains('timeNotAvailable') && !list[i].classList.contains('reserved')) {
                            //time selected - open - ready to reserve

                            if (list[i].classList.contains('timeSelected')) {
                                list[i].classList.remove('timeSelected');
                                this.removeElementFromArray(this.selectedDates, {
                                    'datestart': list[i].dataset.datestart,
                                    'dateend': list[i].dataset.dateend
                                });
                            } else {
                                list[i].classList.add('timeSelected');
                                this.selectedDates.push({
                                    'datestart': list[i].dataset.datestart,
                                    'dateend': list[i].dataset.dateend
                                });
                            }
                        }

                    });
                }
            },
            getVideoFrameLink(aparatLink) {
                return 'https://www.aparat.com//video/video/embed/videohash/' + aparatLink.replace('https://www.aparat.com/v/', '') + '/vt/frame'
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
            removeElementFromArray(arr, value) {
                this.selectedDates = arr.filter(function (val, index, arr) {
                    return arr[index].datestart != value.datestart && arr[index].dateend != value.dateend;
                });
            },
            isInConsultantTime(cellStartDate, cellEndDate) {
                for (let i = 0; i < this.slots.length; i++) {
                    if (cellStartDate.isSame(jalali(this.slots[i].start_time), 'hour') && cellEndDate.isSame(jalali(this.slots[i].end_time), 'hour')) {
                        return true;
                    }
                }
                return false;
            },
            resetLoadingLogic: function () {
                window.console.log('no loading deploy');
                this.alertLoading.value = false;
                this.alertFailed.value = false;
                this.alertSuccess.value = false;
                scrollTo(0, 0);
            },

            startLoadingLogic: function () {
                window.console.log('start loading deploy');
                this.alertLoading.value = true;
                this.alertFailed.value = false;
                this.alertSuccess.value = false;
                scrollTo(0, 0);
            },

            failedLoadingLogic: function () {
                window.console.log('failed loading deploy');
                this.alertLoading.value = false;
                this.alertFailed.value = true;
                this.alertSuccess.value = false;
                scrollTo(0, 0);
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
                console.log('selected dates:', this.selectedDates);
                console.log('selected price:', this.selectedPrice);
                let promises = [];
                for (let i = 0; i < this.selectedDates.length; i++) {
                    let payload = {
                        "start_time": this.selectedDates[i].datestart,
                        "end_time": this.selectedDates[i].dateend,
                        "price": this.selectedPrice
                    };
                    let promise = this.sendAddTimesRequest(payload);
                    promises.push(promise);
                }

                Promise.all(promises).then(() => {

                    console.log('all promises done');

                    this.startReset();

                    this.alertSuccess.message = 'جلسات انتخاب شده با موفقیت برای رزرو باز شدند';
                    this.successLoadingLogic();
                    setTimeout(() => {
                        this.resetLoadingLogic();
                    }, 2000);
                }).catch((error) => {
                    console.log('all promises catch');
                    this.failedLoadingLogic();
                })
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


            startDeleteItems() {
                this.resetLoadingLogic();
                this.startLoadingLogic();
                let promises = [];
                for (let i = 0; i < this.selectedDates.length; i++) {
                    let itemIdToDelete = this.getSlotIdByDate(this.selectedDates[i].datestart, this.selectedDates[i].dateend);
                    let deletePromise = this.sendDeleteTimesRequest(itemIdToDelete);
                    promises.push(deletePromise);
                }

                Promise.all(promises).then(() => {
                    let slotsPromise = this.getListOfTimesById(this.userInfo.user_pk);
                    slotsPromise.then(response => {
                        this.slots = response.data;
                        this.selectedDates = [];
                        window.console.log('my available slots :', this.slots);
                        this.shownDate = jalali().locale('fa');
                        this.handleWeek(this.shownDate);
                        this.createCalendarTable(this.shownDate);

                        this.$nextTick(function () {
                            this.initDateSelector();
                        });
                        this.alertSuccess.message = 'جلسات انتخاب شده با موفقیت حذف شدند';
                        this.successLoadingLogic();
                        setTimeout(() => {
                            this.resetLoadingLogic();
                        }, 2000);

                    }).catch(error => {

                    });
                }).catch((error) => {
                    console.log(error);
                })
            },

            getSlotIdByDate(startDate, endDate) {
                for (let i = 0; i < this.slots.length; i++) {
                    if (jalali(this.slots[i].start_time).isSame(jalali(startDate), 'minute') && jalali(this.slots[i].end_time).isSame(jalali(endDate), 'minute'))
                        return this.slots[i].id;
                }
                // return null;
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

        },

        computed: {
            user: function () {
                return this.$store.getters.getUser;
            },
            userInfo: function () {
                return this.$store.getters.getUserInfo;
            }
        }
    }
</script>

<style scoped>
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        appearance: none;
        -webkit-appearance: none;
        margin: 0;
    }

    .stickyPanel {
        position: sticky;
        top: 150px;
    }

</style>