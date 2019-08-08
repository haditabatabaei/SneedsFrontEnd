<template>
    <div class="profile-page">
        <div class="page-header header-filter" data-parallax="true"
             style="background-image: url('../webimages/userbg.jpg');"></div>

        <div class="main">
            <div class="profile-content">
                <div class="container">

                    <div class="row">
                        <div class="col-xs-6 col-xs-offset-3">
                            <div class="profile">
                                <div class="avatar">
                                    <img :src="consultant.profile_picture"
                                         :alt="consultant.first_name + ' ' + consultant.last_name"
                                         class="img-circle img-responsive img-raised">
                                </div>
                                <div class="name">
                                    <h3 class="title isansFont">
                                        {{consultant.first_name + ' ' + consultant.last_name}}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-md-6 text-justify isansFont">
                            <h4 class="isansFont text-center videoTitle">اطلاعات مشاور</h4>
                            <p class="description">
                                {{consultant.bio}}
                            </p>

                            <p class="description">
                                رشته ها :
                                <br>

                                <span :title="field.description" v-for="field in consultant.field_of_studies">
                                    {{field.name}}
                                    <br>
                                </span>
                                <br>

                                دانشگاه ها :
                                <br>
                                <span :title="university.description" v-for="university in consultant.universities">
                                                    <img style="width:100px;height:100px;border-radius:10px;margin:5px"
                                                         :src="'https://dummyimage.com/200X200/000/fff&text=' + university.slug"
                                                         :alt="university.slug"
                                                         :title="university.description">
                                </span>
                                <br>

                                کشور ها :
                                <br>
                                <span v-for="country in consultant.countries">
                                                    <img style="width:100px;height:100px;border-radius:10px;margin: 5px;"
                                                         :src="'https://dummyimage.com/200X200/000/fff&text=' + country.slug"
                                                         :alt="country.slug"
                                                         :title="country.description">
                                                </span>
                            </p>

                            <p v-if="consultant.resume != null" class="isansFont">
                                فایل رزومه :
                                <a :href="consultant.resume" class="btn btn-rose" target="_blank">
                                    <i class="material-icons">done</i>
                                    دانلود رزومه</a>
                            </p>

                        </div>
                        <div class="col-md-6">
                            <h4 class="isansFont text-center videoTitle">ویدئو معرفی مشاور</h4>
                            <iframe :src="aparatFrameLink" class="aparatFrame"></iframe>
                        </div>
                    </div>

                    <div class="row">
                        <h4 class="videoTitle isansFont text-center">
                            تقویم مشاور
                        </h4>
                        <div class="col-md-12 text-center">
                            <button class="btn btn-info isansFont" @click.prevent="showPrevWeek()">< هفته قبلی</button>
                            <button class="btn btn-info isansFont
" @click.prevent="showNextWeek()">هفته بعدی ></button>
                            <div class="table-responsive">
                                <table class="table table-bordered isansFont " id="myTable" v-html="tableData">

                                </table>
                            </div>
                        </div>
                        <div class="col-md-12 text-center">
                            <button class="btn btn-rose isansFont" @click="addSelectedTimesToCart()" v-if="isLoggedIn">
                                <i class="material-icons" v-if="reserveSuccess.value">done</i>
                                <img src="../../public/webimages/loading.svg" alt="loading icon" class="loadingIcon"
                                     v-if="reserveLoading.value">
                                <i class="material-icons" v-if="reserveFailed.value">block</i>
                                اضافه کردن به سبد خرید
                            </button>
                            <router-link to="/login" class="btn btn-sm btn-warning isansFont" v-else>
                                برای رزرو جلسات باید وارد حساب خود شوید. برای ورود کلیک کنید
                            </router-link>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <h4 class="videoTitle isansFont text-center">نظرات</h4>
                        </div>
                        <div class="col-md-12" v-for="comment in comments">
                            <CommentBlock :config="{'showEdit':true,'showRemove':true,'deleted': false}"
                                          :consultant="consultant"
                                          @update-comments="getConsultantComments(consultant.id)"
                                          :comment="comment"></CommentBlock>
                        </div>
                    </div>
                    <div class="row" v-if="isLoggedIn">
                        <div class="col-md-12">
                            <div class="media media-post">
                                <div class="media-body">
                                    <div class="form-group form-rose is-empty">
                                        <label for="comment" class="isansFont">سوال یا نظری دارید بنویسید :</label>
                                        <textarea id="comment" class="form-control isansFont"
                                                  placeholder="نظرتون رو بنویسید" rows="6"
                                                  v-model="inputComment"></textarea>
                                        <span class="material-input"></span>
                                    </div>
                                    <div class="media-footer">
                                        <button @click.prevet="submitComment()" class="btn btn-rose  isansFont">
                                            <i class="material-icons" v-if="submitCommentFailed.value">block</i>
                                            <i class="material-icons" v-if="submitCommentSuccess.value">done</i>
                                            <img src="../../public/webimages/loading.svg" alt="loading icon" class="loadingIcon"
                                                 v-if="submitCommentLoading.value" style="width:15px;height:15px">
                                            ثبت نظر
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" v-else>
                        <div class="col-md-12 text-center">
                            <router-link to="/login" class="btn btn-sm btn-warning isansFont">
                                برای ثبت نظر باید وارد حساب خود شوید. برای ورود کلیک کنید
                            </router-link>
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
    import CommentBlock from '@/components/StandAlone/CommentBlock';
    import RectNotifBlock from '@/components/NotifBlocks/RectNotifBlock';

    export default {
        name: "ConsultantProfile",
        components: {
            CommentBlock, RectNotifBlock,
        },
        data() {
            return {
                inputComment: '',
                consultant: {},
                comments: [],
                aparatFrameLink: '',
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

                submitCommentSuccess: {
                    value: false,
                    message: 'نظر شما با موفقیت ثبت شد،چند لحظه صبر کنید...'
                },

                submitCommentLoading: {
                    value: false,
                    message:
                        'چند لحظه صبر کنید...'
                },

                submitCommentFailed: {
                    value: false,
                    message: 'مشکلی در ثبت نظر رخ داد...'
                },


            }
        }, computed: {
            isLoggedIn: function () {
                return this.$store.getters.isLoggedIn;
            },
            activeCart: function () {
                return this.$store.getters.getCart;
            },
        },
        created() {
            let consultPromise = this.getConsultantBySlug(this.$route.params.consultantSlug);
            consultPromise.then(response => {
                this.consultant = response.data;
                this.aparatFrameLink = this.getVideoFrameLink(this.consultant.aparat_link);
                let timesPromise = this.getListOfTimesById(this.consultant.id);

                timesPromise.then(timeRes => {
                    window.console.log('slot times:', timeRes.data);
                    this.slots = timeRes.data;
                    this.shownDate = jalali().locale('fa');
                    this.handleWeek(this.shownDate);
                    this.createCalendarTable(this.shownDate);
                    this.$nextTick(function () {
                        this.initDateSelector();
                    });
                    let commentsPromise = this.getConsultantComments(this.consultant.id);
                    commentsPromise.then(response => {
                    }).catch(error => {
                        console.log(error.response);
                    })

                }).catch(timesErr => {
                    console.log(timesErr.response);
                })

            }).catch(error => {
                window.console.log(error.response);
            });

        },
        mounted() {
            scrollTo(0, 0);
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

            getSlotIdByDate(startDate, endDate) {
                for (let i = 0; i < this.slots.length; i++) {
                    if (jalali(this.slots[i].start_time).isSame(jalali(startDate), 'minute') && jalali(this.slots[i].end_time).isSame(jalali(endDate), 'minute'))
                        return this.slots[i].id;
                }
            },

            resetSubmitCommentLogic: function () {
                window.console.log('no loading deploy');
                this.submitCommentLoading.value = false;
                this.submitCommentFailed.value = false;
                this.submitCommentSuccess.value = false;
            },

            startSubmitCommentLogic: function () {
                window.console.log('start loading deploy');
                this.submitCommentLoading.value = true;
                this.submitCommentFailed.value = false;
                this.submitCommentSuccess.value = false;
            },

            failedSubmitCommentLogic: function () {
                window.console.log('failed loading deploy');
                this.submitCommentLoading.value = false;
                this.submitCommentFailed.value = true;
                this.submitCommentSuccess.value = false;
            },

            successSubmitCommentLogic: function () {
                window.console.log('success loading deploy');
                this.submitCommentLoading.value = false;
                this.submitCommentFailed.value = false;
                this.submitCommentSuccess.value = true;
            },

            submitComment: function () {
                this.resetSubmitCommentLogic();
                this.startSubmitCommentLogic();
                if (this.inputComment != null && this.inputComment.length != 0) {
                    console.log('sending request');
                    let payload = {
                        'consultant': this.consultant.id,
                        'message': this.inputComment,
                    };

                    let commitPromise = this.sendSubmitCommentRequest(payload);

                    commitPromise.then((response) => {
                        this.successSubmitCommentLogic();
                        let commentsPromise = this.getConsultantComments(this.consultant.id);
                        commentsPromise.then(response => {
                            console.log(response.data);
                            this.comments = response.data;
                            this.resetSubmitCommentLogic();
                        }).catch(error => {
                            console.log(error.response);
                        });

                        console.log('response:', response.data);
                    }).catch((error) => {
                        if (error.response) {
                            this.submitCommentFailed.message = 'خطایی هنگام ثبت نظر رخ داد. ' + error.response;
                        } else {
                            this.submitCommentFailed.message = 'خطایی هنگام ثبت نظر رخ داد. ';
                        }
                        this.failedSubmitCommentLogic();
                        console.log('error:', error.response);
                    })
                } else {
                    this.submitCommentFailed.message = 'لطفا فیلد نظر را بنویسید.';
                    this.failedSubmitCommentLogic();
                    console.log('comment was empty');
                }


            },

            sendSubmitCommentRequest: function (payload) {
                console.log('request method with payload : ', payload);
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'comment/comments/',
                        method: 'POST',
                        headers: {
                            'Authorization': 'JWT ' + this.$store.getters.getToken,
                            'Content-Type': 'application/json',
                        },
                        data: payload,
                    }).then(response => {
                        console.log('response axios :', response.data);
                        resolve(response);
                    }).catch(error => {
                        console.log('error axios :', error);
                        reject(error);
                    })
                });
            },

            getConsultantComments: function (consultantId) {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'comment/comments/?consultant=' + consultantId,
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(response => {
                        console.log('axios response:', response);
                        console.log(response.data);
                        this.comments = response.data;
                        resolve(response);
                    }).catch(error => {
                        console.log('axios error:', error);
                        reject(error);
                    })
                })
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

            getConsultantBySlug(consultantSlug) {
                return new Promise((resolve, reject) => {
                    axios({
                        url: this.$store.getters.getApi + 'account/consultant-profiles/' + consultantSlug + '/',
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
                    if (cellStartDate.isSame(jalali(this.slots[i].start_time), 'second') && cellEndDate.isSame(jalali(this.slots[i].end_time), 'second')) {
                        return true;
                    }
                }
                return false;
            },
        }

    }

</script>

<style>
    .videoTitle {
        margin-top: 15px;
        margin-bottom: 30px;
    }

    .aparatFrame {
        width: 100%;
        min-height: 400px;
        border: none;
    }

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