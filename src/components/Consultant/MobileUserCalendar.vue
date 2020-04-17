<template>
    <div class="mobile-cal">
        <div class="cal-week-switcher isansFont">
            <button class="cal-week-switcher-button" @click="showPrevWeek">
                <i class="material-icons">keyboard_arrow_right</i>
                هفته قبل
            </button>
            <p class="cal-week-switcher-current isansFont" :class="[{'isansFont--faNum': isiran}]"
               v-if="days.length > 0">
                {{days[0].locale($store.getters.locale).format('DD MMMM')}}
                تا
                {{days[days.length -1].locale($store.getters.locale).format('DD MMMM')}}
            </p>
            <button class="cal-week-switcher-button" @click="showNextWeek">
                هفته بعد
                <i class="material-icons">keyboard_arrow_left</i>
            </button>
        </div>
        <div class="cal-week-days">
            <ul class="cal-days-list">
                <li class="cal-days-item" v-for="(day, index) in days">
                    <button class="cal-days-toggler"
                            :class="[{'cal-days-toggler--active': day.format() === activeDay.format()}]"
                            @click="showDay(day)">

                        {{day.locale($store.getters.locale).format('dddd')}}
                        <sup class="cal-days-toggler--hasTime" v-if="hasFreeSlotsInDay(day)">
                            *
                        </sup>
                    </button>
                </li>
            </ul>
            <div class="cal-week-days-slots">
                <p class="cal-week-days-slots-empty" v-if="shownFreeSlots.length === 0">زمانی برای این روز تنظیم نشده است.</p>
                <button class="days-slots-item days-slots-item--free"
                        :class="[{'isansFont--faNum': isiran, 'days-slots-item--selected': isSlotSelected(slot)}]"
                        @click="toggleSlotToStash(slot)"
                        v-for="(slot, index) in shownFreeSlots">
                    <span v-if="isiran">{{getJalali(slot.start_time).locale($store.getters.locale).format('DD MMMM')}}</span>
                    <span v-else>{{getJalali(slot.start_time).locale($store.getters.locale).format('MMMM DD')}}</span>
                    -
                    {{getJalali(slot.start_time).locale($store.getters.locale).format('HH')}}
                    <span v-if="isiran">تا</span> <span v-else>till</span>
                    {{getJalali(slot.end_time).locale($store.getters.locale).format('HH')}}
                </button>
                <button class="days-slots-item days-slots-item--sold" v-for="(slot, index) in shownSoldSlots">
                    {{getJalali(slot.start_time).locale($store.getters.locale).format('DD MMMM')}}-
                    {{getJalali(slot.start_time).locale($store.getters.locale).format('HH')}}
                    <span v-if="isiran">تا</span> <span v-else>till</span>
                    {{getJalali(slot.end_time).locale($store.getters.locale).format('HH')}}
                </button>
            </div>
        </div>
        <button disabled v-if="stash.length == 0" class="calendar-reserve-button calendar-reserve-button--disabled">
            برای رزرو، حداقل یک جلسه انتخاب کنید.
        </button>
        <button class="calendar-reserve-button isansFont--faNum" @click="addSelectedItemsToCart" v-else>
            رزرو {{stash.length}} جلسه انتخاب شده
        </button>
    </div>
</template>

<script>
    import axios from "axios";
    import jalali from 'jalali-moment';

    export default {
        name: "MobileUserCalendar",
        data() {
            return {
                days: [],
                slots: [],
                soldSlots: [],
                activeDay: {},
                justNowDate: {},
                shownDate: {},
                shownFreeSlots: [],
                shownSoldSlots: [],
                minutesOffsetFromTehran: 0,
            }
        },
        props: {
            consultantId: {
                type: Number || String
            }
        },
        created() {
            this.initComp();
        },
        methods: {
            getJalali(date) {
                return jalali(date);
            },
            showDay(day) {
                this.activeDay = day;
                this.shownFreeSlots = this.slots.filter(slot => {
                    return this.getJalali(slot.start_time).locale(this.$store.getters.locale).isSame(this.activeDay.locale(this.$store.getters.locale), 'day');
                });

                this.shownSoldSlots = this.soldSlots.filter(slot => {
                    return this.getJalali(slot.start_time).locale(this.$store.getters.locale).isSame(this.activeDay.locale(this.$store.getters.locale), 'day');
                });

                console.log('shown free slots for day:', this.shownFreeSlots);
                console.log('shown sold slots for day:', this.shownSoldSlots);
            },

            toggleSlotToStash(slot) {
                if (this.isSlotSelected(slot)) {
                    this.$store.commit('removeItemFromStash', {datestart: slot.start_time, dateend: slot.end_time});
                } else {
                    this.$store.commit('addItemToStash', {datestart: slot.start_time, dateend: slot.end_time});
                }

                console.log('current stash:', this.stash);
            },

            async initComp() {
                try {
                    this.$loading(true);
                    this.slots = (await axios.get(`${this.$store.getters.getApi}/store/time-slot-sales/?consultant=${this.consultantId}`, this.$store.getters.httpConfig)).data;
                    this.soldSlots = (await axios.get(`${this.$store.getters.getApi}/store/sold-time-slot-sales-safe/?consultant=${this.consultantId}`, this.$store.getters.httpConfig)).data;
                    this.justNowDate = this.getJalali(((await axios.get(`${this.$store.getters.getApi}/utils/timezone-time/${this.$store.getters.timezoneSafe}/`)).data).now);
                    this.shownDate = this.justNowDate.clone();
                    let timezone = this.justNowDate.format('Z');
                    let sign = timezone[0];
                    let hour = Number(timezone.split(':')[0].split(sign)[1]);
                    let minute = Number(timezone.split(':')[1]);
                    let offsetInMinuteFromTehran = Number(sign + ((hour * 60) + minute)) - 210;
                    this.minutesOffsetFromTehran = Math.abs(offsetInMinuteFromTehran - (Math.round(offsetInMinuteFromTehran / 60)) * 60);

                    console.log('slots', this.slots);
                    console.log('sold slots', this.soldSlots);
                    console.log('just now date', this.justNowDate.format());
                    this.handleWeek(this.shownDate)
                } catch (e) {
                    console.log(e);
                } finally {
                    this.$loading(false);
                }
            },

            async addSelectedItemsToCart() {
                console.log(this.stash);
                let payload = {"products": []};
                for (let i = 0; i < this.stash.length; i++) {
                    payload.products.push(this.getSlotIdByDate(this.stash[i].datestart, this.stash[i].dateend));
                }

                if (this.isLoggedIn) {
                    if (this.stash.length > 0) {
                        try {
                            this.$loading(true);
                            let result = await axios.post(`${this.$store.getters.getApi}/cart/carts/`, payload, this.$store.getters.httpConfig);
                            console.log(result);
                            this.$store.commit('setStash', []);
                            this.$router.push(`/carts/${result.data.id}`);
                        } catch (e) {
                            console.log(e);
                            if (e.response) {
                                console.log(e.response)
                            }
                        } finally {
                            this.$loading(false);
                        }
                    }
                } else {
                    this.printMessage("برای رزرو باید در حساب خود وارد شوید.", "رزرو :‌اخطا", "warn", 3000, "notif");
                }
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


            getSlotIdByDate(startDate, endDate) {
                for (let i = 0; i < this.slots.length; i++) {
                    if (jalali(this.slots[i].start_time).isSame(jalali(startDate), 'minute') && jalali(this.slots[i].end_time).isSame(jalali(endDate), 'minute'))
                        return this.slots[i].id;
                }
            },


            generateSaturdayNew(date) {
                let offset = 0;
                if (this.isiran) {
                    offset = -1;
                }
                return date.clone().hour(0).minute(0).second(0).millisecond(0).clone().add(offset - date.weekday(), 'd');
            },

            generateSundayNew(date) {
                let offset = 1;
                if (this.isiran) {
                    offset = 0;
                }
                return date.clone().hour(0).minute(0).second(0).millisecond(0).clone().add(offset - date.weekday(), 'd');
            },

            generateMondayNew(date) {
                let offset = 2;
                if (this.isiran) {
                    offset = 1;
                }
                return date.clone().hour(0).minute(0).second(0).millisecond(0).clone().add(offset - date.weekday(), 'd');
            },

            generateTuesdayNew(date) {
                let offset = 3;
                if (this.isiran) {
                    offset = 2;
                }
                return date.clone().hour(0).minute(0).second(0).millisecond(0).clone().add(offset - date.weekday(), 'd');
            },

            generateWednesdayNew(date) {
                let offset = 4;
                if (this.isiran) {
                    offset = 3;
                }
                return date.clone().hour(0).minute(0).second(0).millisecond(0).clone().add(offset - date.weekday(), 'd');
            },

            generateThursdayNew(date) {
                let offset = 5;
                if (this.isiran) {
                    offset = 4;
                }
                return date.clone().hour(0).minute(0).second(0).millisecond(0).clone().add(offset - date.weekday(), 'd');
            },

            generateFridayNew(date) {
                let offset = 6;
                if (this.isiran) {
                    offset = 5;
                }
                return date.clone().hour(0).minute(0).second(0).millisecond(0).clone().add(offset - date.weekday(), 'd');
            },

            showWeek(numOfWeek, siblingStatus) {
                if (siblingStatus === 'prev') {
                    this.handleWeek(this.shownDate.subtract(Number(numOfWeek) * 7, 'd'));
                } else if (siblingStatus === 'next') {
                    this.handleWeek(this.shownDate.add(Number(numOfWeek) * 7, 'd'));
                }
            },

            showPrevWeek() {
                this.showWeek(1, 'prev');
            },

            showNextWeek() {
                this.showWeek(1, 'next');
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
                for (let i = 0; i < this.days.length; i++) {
                    console.log(this.days[i].format());
                }
                this.showDay(this.days[0]);
            },

            hasFreeSlotsInDay(day) {
                return this.slots.findIndex(slot => jalali(slot.start_time).locale(this.$store.getters.locale).isSame(day, 'day')) != -1;
            },

            isSlotSelected(slot) {
                return this.stash.filter(stashSlot => stashSlot.datestart === slot.start_time && stashSlot.dateend === slot.end_time).length != 0;
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
            }
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

    .cal-week-switcher {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .cal-week-switcher-button {
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #F8F8F8;
        border: none;
        padding: 2px 8px;
        color: #585858;
        font-size: 12px;
    }

    .cal-week-switcher-button:first-child {
        border-radius: 15px 0 0 15px;
    }

    .cal-week-switcher-button:not(:first-child) {
        border-radius: 0 15px 15px 0;
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
    }

    .cal-week-days {
        width: 100%;
    }

    .cal-days-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px solid #ccc;
        list-style: none;
        margin: 10px 0;
        padding: 0;
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

    .days-slots-item {
        margin: 10px auto;
        padding: 7px 10px;
        background: none;
        border: none;
        font-size: 14px;
        border-radius: 20px;
    }

    .days-slots-item--free {
        border: 2px solid #3CAEA3;
        color: #3CAEA3;
    }

    .days-slots-item--selected {
        color: white;
        background-color: #3CAEA3;
    }

    .cal-days-toggler--hasTime {
        color: #3CAEA3;
    }

    .cal-week-days-slots-empty {
        font-size: 12px;
        text-align: center;
        margin: auto;
    }

    .days-slots-item--sold {
        border: 2px solid #B82020;
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

    .calendar-reserve-button--disabled {
        cursor: not-allowed;
        background-color: #622593;
    }
</style>