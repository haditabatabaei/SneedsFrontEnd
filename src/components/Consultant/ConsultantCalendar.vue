<template>
    <div v-if="consultantId" class="userCalendarWrapper">
        <div class="userCalendarWeekWrapper isansFont--faNum">
            <button @click.prevent="showPrevWeek()">
                <i class="material-icons">keyboard_arrow_right</i>
                هفته قبلی
            </button>
            <button @click.prevent="showNextWeek()">
                هفته بعدی
                <i class="material-icons">keyboard_arrow_left</i>
            </button>
        </div>
        <div class="calendarTopWrapper">

            <div class="calendarGuideWrapper">
                <span class="isansFont text-sm">راهنمایی تقویم :</span>
                <span class="btn btn-round btn-sm btn-sample slot-button--notavailable isansFont">بسته</span>
                <span class="btn btn-round btn-sm btn-sample slot-button--open isansFont">باز</span>
                <span class="btn btn-round btn-sm btn-sample slot-button--selected isansFont">انتخاب شده</span>
            </div>
        </div>
        <div class="myTable isansFont" v-if="days.length != 0">
            <div class="myTableRow firstRow">
                <div class="myTableCell">ساعت / روز</div>
                <div class="myTableCell dayTitleCell" v-for="day in days">
                    <p v-if="isiran">{{day.day.format('dddd')}}</p>
                    <p v-else>{{day.day.format('dddd')}}</p>
                    <p class="monthSmallText" v-if="isiran">{{day.day.format('DD MMMM')}}</p>
                    <p class="monthSmallText" v-else>{{day.day.format('DD MMMM')}}</p>
                </div>
            </div>
            <div class="calendar-wrapper">
                <div class="calendar-hours-column isansFont" :class="[{'isansFont--faNum': isiran}]">
                    <div v-for="hour in 24">
                        <button class="calendar-inside-button calendar-inside-button--disabled" disabled
                                v-if="minutesOffsetFromTehran.toString().length === 2">
                            {{ (hour - 1) + ":" + minutesOffsetFromTehran + " تا " + (hour) + ":" +
                            minutesOffsetFromTehran}}
                        </button>
                        <button class="calendar-inside-button calendar-inside-button--disabled" disabled v-else>
                            {{ (hour - 1) + ":0" + minutesOffsetFromTehran + " تا " + (hour) + ":0" +
                            minutesOffsetFromTehran}}
                        </button>
                    </div>
                </div>
                <div v-for="day in days" class="calendar-day-column">
                    <div v-for="slot in day.slots" class="calendar-day-slot">
                        <button class="slot-button slot-button--notavailable" disabled v-if="slot.where == 'disabled'">
                        </button>
                        <button class="slot-button slot-button--selectable slot-button--open"
                                v-else-if="slot.where.startsWith('opened')" @click="slotClickHandler(slot)"
                                :class="[{'slot-button--selected' : slot.where === 'opened-selected'}]">
                        </button>
                        <button class="slot-button slot-button--selectable" @click="slotClickHandler(slot)"
                                :class="[{'slot-button--selected' : slot.where === 'ready-selected'}]" v-else>
                        </button>
                    </div>
                </div>
            </div>
            <button @click="addTimes()" class="btn btn-success">آزاد کردن زمان های انتخاب شده</button>
            <button @click="removeTimes()" class="btn btn-danger">حذف زمان های انتخاب شده</button>
            <button @click="clearAll()" class="btn btn-info">ریست انتخاب شده ها</button>
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
                slots: [],
                soldSlots: [],
                days: [],
                selectedSlots: [],
                selectedSlotsToRemove: [],
                selectedSlotsToOpen: [],
                shownDate: {},
                justNowDate: {},
                minutesOffsetFromTehran: 0,
                activeWeekOffset: 0,
            }
        },
        computed: {
            isLoggedIn() {
                return this.$store.getters.isLoggedIn;
            },
            isiran() {
                return this.$store.getters.isiran;
            },
            locale() {
                return this.$store.getters.locale;
            }
        },
        async created() {
            this.initComp();
        },

        methods: {
            async initComp() {
                console.log('active time zone', this.$store.getters.timezone);
                let slotsRequest = this.$api.get(`${this.$store.getters.getApi}/store/time-slot-sales/?consultant=${this.consultantId}`, this.$store.getters.httpConfig);
                let soldSlotsRequest = this.$api.get(`${this.$store.getters.getApi}/store/sold-time-slot-sales/?consultant=${this.consultantId}`, this.$store.getters.httpConfig);
                let timezoneRequest = this.$api.get(`${this.$store.getters.getApi}/utils/timezone-time/${this.$store.getters.timezoneSafe}/`);
                //this.$loading(true);
                Promise.all([slotsRequest, soldSlotsRequest, timezoneRequest]).then(([slotsResult, soldSlotsResult, timeZoneResult]) => {
                    this.slots = slotsResult.data.map(slot => {
                        return {
                            "old_slot": slot,
                            "start_time_date": jalali(slot.start_time).locale(this.locale),
                            "end_time_date": jalali(slot.end_time).locale(this.locale),
                        }
                    });
                    this.soldSlots = soldSlotsResult.data.map(slot => {
                        return {
                            "old_slot": slot,
                            "start_time_date": jalali(slot.start_time).locale(this.locale),
                            "end_time_date": jalali(slot.end_time).locale(this.locale),
                        }
                    });
                    this.justNowDate = jalali(timeZoneResult.data.now).locale(this.locale);
                    this.shownDate = this.justNowDate.clone();
                    console.log(this.shownDate.format());
                    let timezone = this.shownDate.format('Z');
                    let sign = timezone[0];
                    let hour = Number(timezone.split(':')[0].split(sign)[1]);
                    let minute = Number(timezone.split(':')[1]);
                    console.log(sign, hour, " ", minute);
                    let offsetInMinuteFromTehran = Number(sign + ((hour * 60) + minute)) - 210;
                    console.log(Number(sign + ((hour * 60) + minute)));
                    console.log(Number("+" + 210));
                    this.minutesOffsetFromTehran = Math.abs(offsetInMinuteFromTehran - (Math.round(offsetInMinuteFromTehran / 60)) * 60);
                    console.log('minutes offset from tehran', this.minutesOffsetFromTehran);
                    console.log('slots', this.slots);
                    this.showWeek(this.activeWeekOffset);
                }).catch(error => {
                    console.log(error);
                }).finally(() => {
                    this.$loading(false);
                })
            },


            handleWeek(now) {
                console.log('is iran?', this.isiran);
                this.days = [];
                this.days.push(this.generateSaturdayNew(now));
                this.days.push(this.generateSundayNew(now));
                this.days.push(this.generateMondayNew(now));
                this.days.push(this.generateTuesdayNew(now));
                this.days.push(this.generateWednesdayNew(now));
                this.days.push(this.generateThursdayNew(now));
                this.days.push(this.generateFridayNew(now));
                console.log(this.days);
            },


            showWeek(numOfWeek) {
                this.handleWeek(this.shownDate.clone().add(Number(numOfWeek) * 7, 'd'));
            },

            showPrevWeek() {
                this.activeWeekOffset--;
                this.showWeek(this.activeWeekOffset);
            },

            showNextWeek() {
                this.activeWeekOffset++;
                this.showWeek(this.activeWeekOffset);
            },

            generateSaturdayNew(date) {
                let day = date.clone().hour(0).minute(0).second(0).millisecond(0).add(0 - date.weekday(), 'd');
                return {
                    day: day,
                    slots: this.generateSlotsByDay(day)
                };
            },

            generateSundayNew(date) {
                let day = date.clone().hour(0).minute(0).second(0).millisecond(0).add(1 - date.weekday(), 'd');
                return {
                    day: day,
                    slots: this.generateSlotsByDay(day)
                };
            },

            generateMondayNew(date) {
                let day = date.clone().hour(0).minute(0).second(0).millisecond(0).add(2 - date.weekday(), 'd');
                return {
                    day: day,
                    slots: this.generateSlotsByDay(day)
                };

            },

            generateTuesdayNew(date) {
                let day = date.clone().hour(0).minute(0).second(0).millisecond(0).add(3 - date.weekday(), 'd');
                return {
                    day: day,
                    slots: this.generateSlotsByDay(day)
                };
            },

            generateWednesdayNew(date) {
                let day = date.clone().hour(0).minute(0).second(0).millisecond(0).add(4 - date.weekday(), 'd');
                return {
                    day: day,
                    slots: this.generateSlotsByDay(day)
                };
            },

            generateThursdayNew(date) {
                let day = date.clone().hour(0).minute(0).second(0).millisecond(0).add(5 - date.weekday(), 'd');
                return {
                    day: day,
                    slots: this.generateSlotsByDay(day)
                };
            },

            generateFridayNew(date) {
                let day = date.clone().hour(0).minute(0).second(0).millisecond(0).add(6 - date.weekday(), 'd');
                return {
                    day: day,
                    slots: this.generateSlotsByDay(day)
                };
            },

            generateSlotsByDay(day) {
                let slots = [];
                for (let i = 0; i < 23; i++) {
                    slots.push({
                        "start_time_date": day.clone().hour(i).minute(this.minutesOffsetFromTehran),
                        "end_time_date": day.clone().hour(i + 1).minute(this.minutesOffsetFromTehran),
                        "selected": false,
                        "where": null
                    });
                    if (this.slotIsNotAvailable(slots[i])) {
                        slots[i].where = 'disabled'
                    } else if (this.slotIsOpen(slots[i])) {
                        slots[i].where = 'opened'
                    } else {
                        slots[i].where = 'ready'
                    }
                }
                console.log(slots);
                return slots;
            },

            slotClickHandler(slot) {
                console.log(slot);
                switch (slot.where) {
                    case 'opened' :
                        slot.where = 'opened-selected';
                        break;
                    case 'opened-selected':
                        slot.where = 'opened';
                        break;
                    case 'ready':
                        slot.where = 'ready-selected';
                        break;
                    case 'ready-selected':
                        slot.where = 'ready';
                        break;
                    default:
                        break;
                }
                console.log(slot);
            },

            getOpenedSlotId(slot) {
                return this.slots.find(s =>
                    s.start_time_date.format() === slot.start_time_date.format()
                    && s.end_time_date.format() === slot.end_time_date.format()
                ).old_slot.id;
            },

            slotIsNotAvailable(slot) {
                return slot.start_time_date.isSameOrBefore(this.justNowDate);
            },

            slotIndexInOpen(slot) {
                return this.slots.findIndex(openedSlot =>
                    openedSlot.start_time_date.format() === slot.start_time_date.format()
                    && openedSlot.end_time_date.format() === slot.end_time_date.format()
                )
            },

            slotIsOpen(slot) {
                return this.slotIndexInOpen(slot) !== -1;
            },

            clearAll() {
                this.selectedSlotsToOpen = [];
                this.selectedSlotsToRemove = [];
            },

            removeTimes() {
                if (window.confirm('برای حذف زمان های باز انتخاب شده مطمئید ؟')) {
                    let removeReqs = [];
                    //this.$loading(true);
                    this.days.forEach(day => {
                        day.slots.forEach(slot => {
                            if (slot.where === 'opened-selected') {
                                removeReqs.push(
                                    this.$api.delete(`${this.$store.getters.getApi}/store/time-slot-sales/${this.getOpenedSlotId(slot)}/`,
                                        this.$store.getters.httpConfig)
                                );
                                slot.where = 'ready';
                            }
                        })
                    });

                    Promise
                        .all(removeReqs)
                        .then(() => {
                            this.initComp();
                        })
                        .catch(error => {
                            console.log(error);
                            this.initComp();
                        })
                        .finally(() => {
                            this.$loading(false);
                        })
                }

            },

            addTimes() {
                let openReqs = [];
                //this.$loading(true);
                this.days.forEach(day => {
                    day.slots.forEach(slot => {
                        if (slot.where === 'ready-selected') {
                            openReqs.push(
                                this.$api.post(`${this.$store.getters.getApi}/store/time-slot-sales/`,
                                    {
                                        "start_time": slot.start_time_date.clone().locale('en').format(),
                                        "end_time": slot.start_time_date.clone().locale('en').format()
                                    },
                                    this.$store.getters.httpConfig)
                            );
                        }
                    })
                });
                Promise
                    .all(openReqs)
                    .then(() => {
                        this.initComp();
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.$loading(false);
                    })
            }
        }
    }
</script>

<style scoped>

    .calendar-wrapper {
        display: flex;
        align-self: stretch;
        justify-content: space-between
    }

    .calendar-hours-column {
        display: flex;
        flex-direction: column;
        width: calc(100% / 8);
    }

    .calendar-day-column {
        display: flex;
        flex-direction: column;
        width: calc(100% / 8);
    }

    .calendar-day-slot {
        width: 100%;
    }

    .calendar-inside-button {
        margin: 5px 0;
        padding: 0 20px;
        height: 30px;
        width: 100%;
        border: none;
        background: none;
    }

    .calendar-inside-button--disabled {
        cursor: default;
    }

    .slot-button {
        margin: 5px 0;
        padding: 0 20px;
        height: 30px;
        font-size: 8px;
        border: none;
        border-radius: 10px;
        width: 100%;
        max-width: 90px;
    }


    .slot-button--notavailable {
        background-color: #9c9c9c;
    }

    .slot-button--open {
        background-color: #4ee367;
    }

    .slot-button--open:hover {
        background-color: #57d06d;
    }

    .slot-button--selected {
        background-color: #ffca18;
    }

    .slot-button--selected:hover {
        background-color: #ffca18;
    }


    .userCalendarWrapper {
        width: 100%;
        background-color: white;
        border: 1.5px solid #ccc;
        min-height: 300px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 10px;
    }

    .userCalendarWeekWrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        width: 100%;
    }

    .userCalendarWeekWrapper button {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        background-color: #f3f3f3;
        border-radius: 10px;
        border: none;
        padding: 5px 15px;
        font-size: 13px;
        color: #666;
    }

    .userCalendarWeekWrapper button:hover {
        background-color: #e1e1e1;
    }

    .userCalendarWeekWrapper button:first-child {
        margin-left: 10px;
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


    .timeReserved {
        border: 2px solid #c9737c;
        color: #c9737c;
        background-color: white;
    }

    .calendarTopWrapper {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-bottom: 20px;
        margin-top: 20px;
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
        width: 100%;
    }


    .myTableRow {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        min-height: 50px;
        width: 100%;
    }

    .myTableRow > div {
        width: calc(100% / 8);
        min-height: 50px;
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
        font-size: 12px;
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

    @media only screen and (max-width: 991.8px) and (min-width: 0) {
        .myTableCell {
            font-size: 10px;
        }

        .calendar-inside-button {
            font-size: 8px;
        }

        .slot-button {
            margin: 5px;
            width: auto;
        }

        .calendar-inside-button--disabled {
            padding: initial;
        }

    }

</style>
