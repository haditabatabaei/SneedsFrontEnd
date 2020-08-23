<template>
    <div class="mobile-cal" :class="[{'mobile-cal--desktop': desktopMode}]"
         v-if="days.length !== 0 && !!activeDay">
        <p class="timezone-desc isansFont--faNum">
            تقویم به وقت محلی منطقه زمانی
            {{$store.getters.timezone}}
            است.
        </p>
        <div class="cal-week-switcher isansFont" :class="[{'cal-week-switcher--desktop': desktopMode}]">
            <button class="cal-week-switcher-button" @click="showPrevWeek"  :class="[{'cal-week-switcher-button--hasfree': prevWeekHasSlots}]" v-if="activeWeekOffset > 0">
                <i class="material-icons">keyboard_arrow_right</i>
                هفته قبل
            </button>
            <button class="cal-week-switcher-button cal-week-switcher-button--disabled" disabled v-else>

            </button>
            <p class="cal-week-switcher-current isansFont" :class="[{'isansFont--faNum': isiran}]"
               v-if="days.length > 0">
                {{days[0].day.locale(locale).format('DD MMMM')}}
                تا
                {{days[6].day.locale(locale).format('DD MMMM')}}
            </p>

            <button class="cal-week-switcher-button" @click="showNextWeek" :class="[{'cal-week-switcher-button--hasfree': nextWeekHasSlots}]">
                هفته بعد
                <i class="material-icons">keyboard_arrow_left</i>
            </button>
        </div>
        <div class="cal-week-days" :class="[{'isansFont': desktopMode}]">
            <ul class="cal-days-list" :class="[{'cal-days-list--desktop' : desktopMode}]">
                <li class="cal-days-item" v-for="day in days">
                    <button class="cal-days-toggler"
                            :class="[{'cal-days-toggler--active': day.day.locale(locale).format() === activeDay.day.locale(locale).format(), 'cal-days-toggler--hasfree': day.slots.length > 0}]"
                            @click="activeDay = day">
                        {{day.day.format('dddd')}}
                        <span class="cal-days-toggler-small" :class="[{'isansFont--faNum': isiran}]">
                            {{day.day.format('MM/DD')}}
                        </span>
                    </button>
                </li>
            </ul>
            <moon-loader class="loading-icon" style="align-self:center;margin:20px auto;" color="purple" :loading="tempLoading" :size="20" sizeUnit="px"/>

            <div class="cal-week-days-slots" :class="[{'cal-week-days-slots--desktop': desktopMode}]" v-if="!tempLoading">
                <p class="cal-week-days-slots-empty" v-if="activeDay.slots.length === 0">زمانی برای این روز تنظیم نشده
                    است.</p>

                <button class="days-slots-item days-slots-item--free"
                        :class="[{'isansFont--faNum': isiran, 'days-slots-item--desktop' : desktopMode,  'days-slots-item--selected': !!slot.selected}]"
                        @click="toggleSlotToStash(slot)"
                        v-for="slot in activeDay.slots">
                    <span v-if="isiran">{{getJalaliLocale(slot.start_time).format('DD MMMM')}}</span>
                    <span v-else>{{getJalaliLocale(slot.start_time).format('MMMM DD')}}</span>
                    <span  style="margin: 0 5px">-</span>
                    {{getJalaliLocale(slot.start_time).format('HH:mm')}}
                    <span v-if="isiran" style="margin:0 5px">تا</span> <span v-else style="margin:0 5px">till</span>
                    {{getJalaliLocale(slot.end_time).format('HH:mm')}}
                </button>
<!--                <button class="days-slots-item days-slots-item&#45;&#45;sold"-->
<!--                        :class="[{'isansFont&#45;&#45;faNum': isiran, 'days-slots-item&#45;&#45;desktop' : desktopMode}]"-->
<!--                        v-for="slot in shownSoldSlots">-->
<!--                    {{slot.start_time_date.format('DD MMMM')}}- -->
<!--                    {{slot.start_time_date.format('HH:mm')}}-->
<!--                    <span v-if="isiran">تا</span> <span v-else>till</span>-->
<!--                    {{slot.end_time_date.format('HH:mm')}}-->
<!--                </button>-->
            </div>
        </div>
        <button disabled v-if="stash.length == 0 && !desktopMode"
                class="calendar-reserve-button calendar-reserve-button--disabled">
            برای رزرو، حداقل یک جلسه انتخاب کنید.
        </button>
        <button class="calendar-reserve-button isansFont--faNum" v-else-if="stash.length != 0 && !desktopMode"
                @click="addSelectedItemsToCart"
                v-else>
            رزرو {{stash.length}} جلسه انتخاب شده
        </button>
    </div>

    <div class="cal-loading" v-else style="width: 100%;background-color:white;display:flex;align-items:center;justify-content: center">
        <moon-loader class="loading-icon" style="align-self:center;margin:20px auto;" color="purple" :size="20" sizeUnit="px"/>
    </div>
</template>

<script>
    import jalali from 'jalali-moment';
    import {MoonLoader} from "@saeris/vue-spinners";

    export default {
        name: "MobileUserCalendar",
        components: {
            "moon-loader": MoonLoader
        },
        data() {
            return {
                tempLoading: false,
                timerStart: null,
                timerEnd: null,
                days: [],
                slots: [],
                soldSlots: [],
                activeDay: null,
                activeWeekOffset: 0,
                firstLoad: true,
                anchorDay: null,
                shownDate: null,
                nextWeekHasSlots: false,
                prevWeekHasSlots: false,
            }
        },
        props: {
            consultantId: {
                type: Number || String
            },
            desktopMode: {
                type: Boolean,
                default: () => false
            },
        },
        created() {
            this.initComp();
        },
        methods: {
            getJalali(date) {
                return jalali(date)
            },

            getJalaliLocale(date) {
                return jalali(date).locale(this.locale)
            },

            toggleSlotToStash(slot) {
                if (!!slot.selected) {
                    slot.selected = false;
                    this.$store.commit('removeItemFromStash', {'itemToRemove': slot, type: 'time-slot'});
                } else {
                    slot.selected = true;
                    this.$store.commit('addItemToStash', slot);
                }

                console.log('current stash:', this.stash);
            },

            async initComp() {
                this.tempLoading = true;
                this.timerStart = Date.now();
                if(this.firstLoad) {
                    this.anchorDay = jalali((await this.$api.get(`${this.api}/utils/timezone-time/${this.timezoneSafe}/`, this.httpConfig)).data.now)
                    this.shownDate = this.anchorDay;
                    this.firstLoad = false;
                } else {
                    this.shownDate = this.anchorDay.clone().add(this.activeWeekOffset, 'weeks');
                }
                this.days = []
                for(let i = 0; i <= 6 ; i++) {
                    let offset = i;
                    if(this.isiran) {
                        offset--;
                    }
                    this.days.push({
                        day: this.shownDate.clone().add(offset - this.shownDate.weekday(), 'days'),
                        slots: []
                    })
                }
                console.log(this.days[0].day.format('YYYY-MM-DD'));
                console.log(this.days[6].day.format());
                let startTimeToQuery = this.days[0].day.format('YYYY-MM-DD')
                let endTimeQuery = this.days[6].day.format('YYYY-MM-DD')

                let nextStartTimeToQuery = this.days[0].day.clone().add(1, 'weeks').format('YYYY-MM-DD')
                let nextEndTimeToQuery = this.days[6].day.clone().add(1, 'weeks').format('YYYY-MM-DD')

                let prevStartTimeToQuery = this.days[0].day.clone().add(-1, 'weeks').format('YYYY-MM-DD')
                let prevEndTimeToQuery = this.days[6].day.clone().add(-1, 'weeks').format('YYYY-MM-DD')
                console.log(startTimeToQuery, '->', endTimeQuery);
                console.log((Date.now() - this.timerStart) / 1000, 'seconds...')

                console.log(`${this.api}/store/time-slot-sales/?consultant=${this.consultantId}&start_time=${startTimeToQuery}&end_time=${endTimeQuery}`)
                let reqs = [
                    this.$api.get(`${this.api}/store/time-slot-sales/?consultant=${this.consultantId}&start_time=${startTimeToQuery}T00:00:00&end_time=${endTimeQuery}T23:59:59&ordering=start_time`, this.httpConfig),
                    this.$api.get(`${this.api}/store/time-slot-sales-exists/?consultant=${this.consultantId}&start_time=${nextStartTimeToQuery}T00:00:00&end_time=${nextEndTimeToQuery}T23:59:59`, this.httpConfig),
                    this.$api.get(`${this.api}/store/time-slot-sales-exists/?consultant=${this.consultantId}&start_time=${prevStartTimeToQuery}T00:00:00&end_time=${prevEndTimeToQuery}T23:59:59`, this.httpConfig),
                ];
                Promise
                    .all(reqs)
                    .then( ([slotsResult, nextWeekHasSlots, prevWeekHasSlots]) => {
                        console.log( (Date.now() - this.timerStart) / 1000, 'seconds...')
                        console.log('nweek', nextWeekHasSlots);
                        console.log(prevWeekHasSlots)
                        console.log(slotsResult.data);
                        this.nextWeekHasSlots = nextWeekHasSlots.data.number > 0;
                        this.prevWeekHasSlots = prevWeekHasSlots.data.number > 0;
                        let activeDaySetted = false;
                        for(let i = 0; i <= 6 ; i++) {
                            this.days[i].slots = slotsResult.data.filter(slot => {
                                return jalali(slot.start_time).isSame(this.days[i].day, 'day');
                            })
                            if(!activeDaySetted) {
                                if(this.days[i].slots.length > 0) {
                                    this.activeDay = this.days[i];
                                    activeDaySetted = true;
                                }
                            }
                            console.log(this.days[i].day.clone().locale(this.locale).format('YYYY MM DD MMMM dddd'), '=>' , this.days[i].slots.length)
                        }

                        if(!activeDaySetted) {
                            this.activeDay = this.days[0];
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.tempLoading = false;
                        this.timerEnd = Date.now();
                        console.log((this.timerEnd - this.timerStart) / 1000, 'seconds')
                    })
            },

            showPrevWeek() {
                this.showWeek(-1);
            },

            showNextWeek() {
                this.showWeek(1);
            },

            showWeek(numOfWeek) {
                this.activeWeekOffset += numOfWeek;
                if(this.activeWeekOffset >= 0) {
                    this.initComp();
                }
            },

            addSelectedItemsToCart() {
                this.$emit('add-times-to-cart');
            },

            printMessage(text, title, type, duration, group) {
                this.$notify({
                    group: group,
                    text: text,
                    title: title,
                    type: type,
                    duration: duration
                })
            },
        },
        computed: {
            stash() {
                return this.$store.getters.getStash;
            },

            isiran() {
                return this.$store.getters.isiran;
            },

            isLoggedIn() {
                return this.$store.getters.isLoggedIn;
            },

            httpConfig() {
                return this.$store.getters.httpConfig;
            },

            api() {
                return this.$store.getters.getApi;
            },

            locale() {
                return this.$store.getters.locale;
            },

            timezoneSafe() {
                return this.$store.getters.timezoneSafe;
            },
        },
    }
</script>

<style scoped>
    .mobile-cal {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-self: flex-start;
    }

    .mobile-cal--desktop {
        background-color: white;
    }

    .cal-week-switcher {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-top: 45px;
    }

    .cal-week-switcher--desktop {
        padding: 15px 0;
    }

    .cal-week-switcher-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #F8F8F8;
        border: none;
        padding: 2px 8px;
        color: #585858;
        font-size: 12px;
        max-width: 250px;
        width: 100%;
    }

    .cal-week-switcher-button:first-child {
        border-radius: 15px 0 0 15px;
    }

    .cal-week-switcher-button:not(:first-child) {
        border-radius: 0 15px 15px 0;
    }

    .cal-week-switcher-button--hasfree {
        background-color: #3CAEA3;
        color: white;
    }

    .cal-week-switcher-button i {
        margin: 5px;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        font-size: 16px;
    }

    .cal-week-switcher-current {
        margin: 0;
        font-size: 12px;
        text-align: center;
        width: 100%;
    }

    .cal-week-days {
        width: 100%;
    }

    .cal-days-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px solid #f7f7f7;
        list-style: none;
        margin: 20px 0 15px 0;
        padding: 0;
    }

    .cal-days-list--desktop {
        justify-content: space-evenly;
    }

    .cal-days-item {
        font-size: 13px;
        font-weight: bold;
        color: #9B9999;
    }

    .cal-days-toggler {
        background: none;
        border: none;
        padding: 5px;
        position: relative;
        font-weight: 100;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .cal-days-toggler--hasfree {
        color: #3CAEA3;
        font-weight: bold;
    }

    .cal-days-toggler--active {
        color: #8C3DDB;
        border-bottom: 3px solid #8C3DDB;
        padding-bottom: 2px;
    }

    .cal-week-days-slots {
        max-height: 150px;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
    }

    .cal-week-days-slots--desktop {
        max-height: 300px;
    }

    .days-slots-item {
        margin: 10px auto;
        padding: 7px 12px;
        background: none;
        border: none;
        font-size: 14px;
        border-radius: 20px;
    }

    .cal-days-toggler-small {
        font-size: 12px;
    }

    .days-slots-item--desktop {
        margin: 10px;
    }

    .days-slots-item--free {
        border: 1.5px solid #3CAEA3;
        color: #3CAEA3;
    }

    .days-slots-item--selected {
        color: white;
        background-color: #3CAEA3;
    }

    .cal-days-toggler--hasTime {
        color: #3CAEA3;
        position: absolute;
        top: 10px;
        left: 1px;
    }

    .cal-week-days-slots-empty {
        font-size: 12px;
        text-align: center;
        margin: 10px auto;
    }

    .days-slots-item--sold {
        border: 1.5px solid #B82020;
        color: #B82020;
        cursor: default;
    }

    .calendar-reserve-button {
        margin: 15px;
        padding: 15px;
        background: #8C3DDB;
        width: calc(100% - 30px);
        color: white;
        border-radius: 15px;
        border: none;
    }

    .cal-week-switcher-button--disabled {
        min-height: 34px;
        background-color: white;
    }

    .calendar-reserve-button--disabled {
        cursor: not-allowed;
        background-color: #622593;
    }

    .consultantBlock-calendar-warn {
        background-color: #FCE8E8;
        color: #B82020;
        display: flex;
        align-items: center;
        padding: 15px;
    }

    .consultantBlock-calendar-warn-icon {
        color: #B82020;
        margin-left: 10px;
    }

    .timezone-desc {
        background-color: #FFFCF4;
        color: #a28220;
        border-radius: 5px;
        font-size: 14px;
        padding: 5px 10px;
        margin: 15px;
    }

    @media only screen and (max-width: 767.8px) {
        .cal-days-toggler-small {
            margin-right: 0;
        }
    }

    @media only screen and (max-width: 564.8px) {
        .cal-days-toggler {
            font-size: 12px;
        }

        .cal-days-toggler-small {
            font-size: 10px;
        }
    }

    @media only screen and (max-width: 360px) {
        .cal-days-toggler {
            font-size: 10px;
        }

        .cal-days-toggler-small {
            font-size: 8px;
        }
    }

</style>