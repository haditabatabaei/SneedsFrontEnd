<template>
    <div class="mobile-cal" :class="[{'mobile-cal--desktop': desktopMode}]">
        <div class="cal-week-switcher isansFont" :class="[{'cal-week-switcher--desktop': desktopMode}]">
            <button class="cal-week-switcher-button" @click="showPrevWeek">
                <i class="material-icons">keyboard_arrow_right</i>
                هفته قبل
            </button>
            <p class="cal-week-switcher-current isansFont" :class="[{'isansFont--faNum': isiran}]"
               v-if="days.length > 0">
                {{days[0].format('DD MMMM')}}
                تا
                {{days[days.length -1].format('DD MMMM')}}
            </p>
            <button class="cal-week-switcher-button" @click="showNextWeek">
                هفته بعد
                <i class="material-icons">keyboard_arrow_left</i>
            </button>
        </div>
        <div class="cal-week-days" :class="[{'isansFont': desktopMode}]">
            <ul class="cal-days-list" :class="[{'cal-days-list--desktop' : desktopMode}]">
                <li class="cal-days-item" v-for="(day, index) in days">
                    <button class="cal-days-toggler"
                            :class="[{'cal-days-toggler--active': day.format() === activeDay.format()}]"
                            @click="showDay(day)">

                        {{day.format('dddd')}}
                        <sup class="cal-days-toggler--hasTime" v-if="hasFreeSlotsInDay(day)">
                            *
                        </sup>
                    </button>
                </li>
            </ul>
            <div class="cal-week-days-slots" :class="[{'cal-week-days-slots--desktop': desktopMode}]">
                <p class="cal-week-days-slots-empty" v-if="shownFreeSlots.length === 0">زمانی برای این روز تنظیم نشده
                    است.</p>
                <button class="days-slots-item days-slots-item--free"
                        :class="[{'isansFont--faNum': isiran, 'days-slots-item--desktop' : desktopMode,  'days-slots-item--selected': isSlotSelected(slot)}]"
                        @click="toggleSlotToStash(slot)"
                        v-for="(slot, index) in shownFreeSlots">
                    <span v-if="isiran">{{slot.start_time_date.format('DD MMMM')}}</span>
                    <span v-else>{{slot.start_time_date.format('MMMM DD')}}</span>
                    -
                    {{slot.start_time_date.format('HH:mm')}}
                    <span v-if="isiran">تا</span> <span v-else>till</span>
                    {{slot.end_time_date.format('HH:mm')}}
                </button>
                <button class="days-slots-item days-slots-item--sold"
                        :class="[{'days-slots-item--desktop' : desktopMode}]" v-for="(slot, index) in shownSoldSlots">
                    {{slot.start_time_date.format('DD MMMM')}}-
                    {{slot.start_time_date.format('HH:mm')}}
                    <span v-if="isiran">تا</span> <span v-else>till</span>
                    {{slot.end_time_date.format('HH:mm')}}
                </button>
            </div>
        </div>
        <button disabled v-if="stash.length == 0 && !desktopMode"
                class="calendar-reserve-button calendar-reserve-button--disabled">
            برای رزرو، حداقل یک جلسه انتخاب کنید.
        </button>
        <button class="calendar-reserve-button isansFont--faNum" v-else-if="stash.length != 0 && !desktopMode" @click="addSelectedItemsToCart"
                v-else>
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
                slotsDates: [],
                soldSlots: [],
                soldSlotsDates: [],
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
                return jalali(date);
            },
            showDay(day) {
                this.activeDay = day;
                this.shownFreeSlots = this.slotsDates.filter(slotDate => {
                    return slotDate.start_time_date.isSame(this.activeDay, 'day');
                });

                this.shownSoldSlots = this.soldSlotsDates.filter(slotDate => {
                    return slotDate.start_time_date.isSame(this.activeDay, 'day');
                });

                console.log('shown free slots for day:', this.shownFreeSlots);
                console.log('shown sold slots for day:', this.shownSoldSlots);
            },

            toggleSlotToStash(slot) {
                if (this.isSlotSelected(slot)) {
                    this.$store.commit('removeItemFromStash', {'itemToRemove': slot, type: 'time-slot'});
                } else {
                    this.$store.commit('addItemToStash', slot);
                }

                console.log('current stash:', this.stash);
            },

            async initComp() {
                try {
                    this.$loading(true);
                    this.slots = (await this.$api.get(`${this.$store.getters.getApi}/store/time-slot-sales/?consultant=${this.consultantId}`, this.$store.getters.httpConfig)).data;
                    this.soldSlots = (await this.$api.get(`${this.$store.getters.getApi}/store/sold-time-slot-sales-safe/?consultant=${this.consultantId}`, this.$store.getters.httpConfig)).data;
                    this.justNowDate = jalali(((await this.$api.get(`${this.$store.getters.getApi}/utils/timezone-time/${this.$store.getters.timezoneSafe}/`)).data).now);
                    this.shownDate = this.justNowDate.clone();
                    console.log('slots', this.slots);
                    console.log('sold slots', this.soldSlots);
                    console.log('just now date', this.justNowDate.format());

                    this.slotsDates = this.slots.map(slot => {
                        return {
                            "old_slot": slot,
                            "start_time_date": jalali(slot.start_time).locale(this.locale),
                            "end_time_date": jalali(slot.end_time).locale(this.locale)
                        }
                    });
                    this.soldSlotsDates = this.soldSlots.map(slot => {
                        return {
                            "old_slot": slot,
                            "start_time_date": jalali(slot.start_time).locale(this.locale),
                            "end_time_date": jalali(slot.end_time).locale(this.locale)
                        }
                    });

                    console.log('mapped slots:', this.slotsDates);
                    console.log('mapped sold slots:', this.soldSlotsDates);
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
                this.stash.forEach(item => {
                    payload.products.push(item.old_slot.id);
                });

                if (this.isLoggedIn) {
                    if (this.stash.length > 0) {
                        try {
                            this.$loading(true);
                            let result = await this.$api.post(`${this.$store.getters.getApi}/cart/carts/`, payload, this.$store.getters.httpConfig);
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

            generateSaturdayNew(date) {
                let offset = 0;
                if (this.isiran) {
                    offset = -1;
                }
                return date.clone().hour(0).minute(0).second(0).millisecond(0).add(offset - date.weekday(), 'd').locale(this.locale);
            },

            generateSundayNew(date) {
                let offset = 1;
                if (this.isiran) {
                    offset = 0;
                }
                return date.clone().hour(0).minute(0).second(0).millisecond(0).add(offset - date.weekday(), 'd').locale(this.locale);
            },

            generateMondayNew(date) {
                let offset = 2;
                if (this.isiran) {
                    offset = 1;
                }
                return date.clone().hour(0).minute(0).second(0).millisecond(0).add(offset - date.weekday(), 'd').locale(this.locale);
            },

            generateTuesdayNew(date) {
                let offset = 3;
                if (this.isiran) {
                    offset = 2;
                }
                return date.clone().hour(0).minute(0).second(0).millisecond(0).add(offset - date.weekday(), 'd').locale(this.locale);
            },

            generateWednesdayNew(date) {
                let offset = 4;
                if (this.isiran) {
                    offset = 3;
                }
                return date.clone().hour(0).minute(0).second(0).millisecond(0).add(offset - date.weekday(), 'd').locale(this.locale);
            },

            generateThursdayNew(date) {
                let offset = 5;
                if (this.isiran) {
                    offset = 4;
                }
                return date.clone().hour(0).minute(0).second(0).millisecond(0).add(offset - date.weekday(), 'd').locale(this.locale);
            },

            generateFridayNew(date) {
                let offset = 6;
                if (this.isiran) {
                    offset = 5;
                }
                return date.clone().hour(0).minute(0).second(0).millisecond(0).add(offset - date.weekday(), 'd').locale(this.locale);
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
                return this.slotsDates.findIndex(slotDate => slotDate.start_time_date.isSame(day, 'day')) !== -1;
            },

            isSlotSelected(slot) {
                return this.stash.filter(stashSlot => stashSlot.old_slot.start_time === slot.old_slot.start_time && stashSlot.old_slot.end_time === slot.old_slot.end_time).length !== 0;
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
            
            locale() {
                return this.$store.getters.locale;
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

    .mobile-cal--desktop {
        background-color: white;
    }

    .cal-week-switcher {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    .cal-week-switcher--desktop {
        padding: 15px 0;
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
        padding: 7px 10px;
        background: none;
        border: none;
        font-size: 14px;
        border-radius: 20px;
    }

    .days-slots-item--desktop {
        margin: 10px;
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