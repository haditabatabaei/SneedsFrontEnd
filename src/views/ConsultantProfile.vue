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
                        <div class="col-md-12">

                            <div class="table-responsive">
                                <table class="table table-bordered isansFont " id="myTable" v-html="tableData">

                                </table>
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

    export default {
        name: "ConsultantProfile",
        data() {
            return {
                consultant: {},
                aparatFrameLink: '',
                slots: [],
                days: [],
                tableData: '',
                selectedDates: [],
            }
        }, created() {


            console.log('we have in consultant free times :', jalali('2019-07-26T08:00:00Z').locale('fa').format());
            console.log('we have in table:', jalali('2019-07-26T07:30:00.291Z').locale('fa').format());

            //2019-07-26T09:00:00Z
            console.log('we have in consultant free times end :', jalali('2019-07-26T09:00:00Z').locale('fa').format());
            console.log('we have in table:', jalali('2019-07-26T08:30:00.291Z').locale('fa').format());



            let consultPromise = this.getConsultantBySlug(this.$route.params.consultantSlug);
            consultPromise.then(response => {
                this.consultant = response.data;
                this.aparatFrameLink = this.getVideoFrameLink(this.consultant.aparat_link);
                let timesPromise = this.getListOfTimesById(this.consultant.id);

                timesPromise.then(timeRes => {
                    window.console.log('slot times:', timeRes.data);
                    this.slots = timeRes.data;
                    let now = jalali().locale('fa');
                    this.handleWeek(now);
                    this.createCalendarTable(now);

                }).catch(timesErr => {
                    console.log(timesErr.response);
                })

            }).catch(error => {
                window.console.log(error.response);
            });

        },
        mounted() {
            this.initDateSelector();
            scroll(0, 0);
        },
        methods: {
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
                this.days.push(this.generateSaturday(now));
                this.days.push(this.generateSunday(now));
                this.days.push(this.generateMonday(now));
                this.days.push(this.generateTuesday(now));
                this.days.push(this.generateWednesday(now));
                this.days.push(this.generateThursday(now));
                this.days.push(this.generateFriday(now));
            },
            createCalendarTable(now) {

                for (let i = 0; i < 16; i++) {
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
                                let dateStartString = this.days[j - 1].clone().hour(i + 7).minute(0).second(0).locale("en").utc().toISOString();
                                let dateEndString = this.days[j - 1].clone().hour(i + 8).minute(0).second(0).locale("en").utc().toISOString();

                                if (this.days[j - 1].clone().hour(i + 7).minute(0).second(0).isBefore(now)) {
                                    this.tableData += '<td class="timeNotAvailable" data-datestart="' + dateStartString + '" data-dateend="' + dateEndString + '"></td>';
                                } else {
                                    if (this.isInConsultantTime(this.days[j - 1].clone().hour(i + 7).minute(0).second(0).locale("en").utc(),this.days[j - 1].clone().hour(i + 8).minute(0).second(0).locale("en").utc())) {
                                        this.tableData += '<td class="timeAvailable" data-datestart="' + dateStartString + '" data-dateend="' + dateEndString + '"></td>';
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
                            if (list[i].classList.contains('timeSelected')) {
                                list[i].classList.remove('timeSelected');
                                this.selectedDates = this.removeElementFromArray(this.selectedDates, list[i].dataset.datestring);
                                console.log(this.selectedDates);
                            } else {
                                list[i].classList.add('timeSelected');
                                this.selectedDates.push(list[i].dataset.datestring);
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
            }, getVideoFrameLink(aparatLink) {
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
                return arr.filter(function (ele) {
                    return ele != value;
                });
            },
            isInConsultantTime(cellStartDate,cellEndDate) {
                for (let i = 0; i < this.slots.length; i++) {
                    if (cellStartDate.isBefore(jalali(this.slots[i].start_time)) && jalali(this.slots[i].end_time).isBefore(cellEndDate)) {
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

    tr td[data-datestart] {

    }

    .timeNotAvailable {
        background-color: #999999;
        color: white;
    }

    .timeAvailable {
        background-color: #4caf50;
        cursor: pointer;
    }

    .timeSelected {
        background-color: orange;
        cursor: pointer;
    }
</style>