<template>
    <div class="mobile-cal" :class="[{'mobile-cal--desktop': desktopMode}]"
         v-if="this.days.length !== 0 && activeDay.format">
        <div class="cal-week-switcher isansFont" :class="[{'cal-week-switcher--desktop': desktopMode}]">
            <button class="cal-week-switcher-button" @click="showPrevWeek" v-if="canGoPrev"
                    :class="[{'cal-week-switcher-button--hasfree': hasFreeSlotsInWeek('prev')}]">
                <i class="material-icons">keyboard_arrow_right</i>
                هفته قبل
            </button>
            <button class="cal-week-switcher-button cal-week-switcher-button--disabled" disabled v-else>

            </button>
            <p class="cal-week-switcher-current isansFont" :class="[{'isansFont--faNum': isiran}]"
               v-show="showCurrentSwitcher && days.length > 0">
                {{days[0].format('DD MMMM')}}
                تا
                {{days[days.length -1].format('DD MMMM')}}
            </p>

            <button class="cal-week-switcher-button" @click="showNextWeek"
                    :class="[{'cal-week-switcher-button--hasfree': hasFreeSlotsInWeek('next')}]">
                هفته بعد
                <i class="material-icons">keyboard_arrow_left</i>
            </button>
        </div>
        <div class="cal-week-days" :class="[{'isansFont': desktopMode}]">
            <ul class="cal-days-list" :class="[{'cal-days-list--desktop' : desktopMode}]">
                <li class="cal-days-item" v-for="day in days">
                    <button class="cal-days-toggler"
                            :class="[{'cal-days-toggler--active': day.format() === activeDay.format(), 'cal-days-toggler--hasfree': hasFreeSlotsInDay(day)}]"
                            @click="showDay(day)">
                        {{day.format('dddd')}}
                        <span class="cal-days-toggler-small" :class="[{'isansFont--faNum': isiran}]">
                            {{day.format('MM/DD')}}
                        </span>
                    </button>
                </li>
            </ul>
            <div class="cal-week-days-slots" :class="[{'cal-week-days-slots--desktop': desktopMode}]">
                <p class="cal-week-days-slots-empty" v-if="shownFreeSlots.length === 0">زمانی برای این روز تنظیم نشده
                    است.</p>
                <button class="days-slots-item days-slots-item--free"
                        :class="[{'isansFont--faNum': isiran, 'days-slots-item--desktop' : desktopMode,  'days-slots-item--selected': isSlotSelected(slot)}]"
                        @click="toggleSlotToStash(slot)"
                        v-for="slot in shownFreeSlots">
                    <span v-if="isiran">{{slot.start_time_date.format('DD MMMM')}}</span>
                    <span v-else>{{slot.start_time_date.format('MMMM DD')}}</span>
                    -
                    {{slot.start_time_date.format('HH:mm')}}
                    <span v-if="isiran">تا</span> <span v-else>till</span>
                    {{slot.end_time_date.format('HH:mm')}}
                </button>
                <button class="days-slots-item days-slots-item--sold"
                        :class="[{'isansFont--faNum': isiran, 'days-slots-item--desktop' : desktopMode}]"
                        v-for="slot in shownSoldSlots">
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
        <button class="calendar-reserve-button isansFont--faNum" v-else-if="stash.length != 0 && !desktopMode"
                @click="addSelectedItemsToCart"
                v-else>
            رزرو {{stash.length}} جلسه انتخاب شده
        </button>
    </div>
    <div class="consultantBlock-calendar-warn isansFont" v-else-if="showNoSlotError">
        <i class="material-icons consultantBlock-calendar-warn-icon">
            info
        </i>
        <p>
            متاسفانه این مشاور زمانی برای خود تعیین نکرده است. برای دریافت اطلاعات بیشتر و یا درخواست ایجاد زمان، با
            <a href="http://t.me/sneeds_admin" target="_blank">پشتیبانی اسنیدز</a>
            تماس بگیرید.
        </p>
    </div>
</template>

<script>
    import jalali from 'jalali-moment';

    export default {
        name: "MobileUserCalendar",
        data() {
            return {
                days: [],
                slots: [],
                soldSlots: [],
                activeDay: {},
                justNowDate: null,
                shownDate: {},
                shownFreeSlots: [],
                shownSoldSlots: [],
                minutesOffsetFromTehran: 0,
                activeWeekOffset: 0,
                showCurrentSwitcher: true,
                showNoSlotError: false,
                showCalendar: false,
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
            toggleSlotToStash(slot) {
                if (this.isSlotSelected(slot)) {
                    this.$store.commit('removeItemFromStash', {'itemToRemove': slot, type: 'time-slot'});
                } else {
                    this.$store.commit('addItemToStash', slot);
                }

                console.log('current stash:', this.stash);
            },

            initComp() {
                //this.$loading(true);
                let reqs = [
                    this.$api.get(`${this.$store.getters.getApi}/store/time-slot-sales/?consultant=${this.consultantId}`, this.$store.getters.httpConfig),
                    this.$api.get(`${this.$store.getters.getApi}/store/sold-time-slot-sales-safe/?consultant=${this.consultantId}`, this.$store.getters.httpConfig)
                ];
                Promise
                    .all(reqs)
                    .then(async ([slotsResult, soldSlotResult]) => {
                        this.slots = slotsResult.data.map(slot => {
                            return {
                                "old_slot": slot,
                                "start_time_date": jalali(slot.start_time).locale(this.locale),
                                "end_time_date": jalali(slot.end_time).locale(this.locale)
                            }
                        }).sort((slot1, slot2) => slot1.start_time_date.unix() - slot2.start_time_date.unix());

                        if (this.slots.length === 0) {
                            this.showNoSlotError = true;
                        }
                        this.soldSlots = soldSlotResult.data.map(slot => {
                            return {
                                "old_slot": slot,
                                "start_time_date": jalali(slot.start_time).locale(this.locale),
                                "end_time_date": jalali(slot.end_time).locale(this.locale)
                            }
                        });
                        console.log('slots', this.slots);
                        console.log('sold slots', this.soldSlots);
                        this.justNowDate = this.slots[0].start_time_date.clone();
                        this.shownDate = this.slots[0].start_time_date.clone();
                        this.showWeek(0);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {

                    })
            },

            generateDayByOffset(date, offset) {
                if (this.isiran) {
                    offset++;
                }
                return date.clone().hour(0).minute(0).second(0).millisecond(0).add(offset - date.weekday(), 'd').locale(this.locale);
            },

            showDay(day) {
                this.activeDay = day;
                this.shownFreeSlots = this.slots.filter(slot => {
                    return slot.start_time_date.isSame(this.activeDay, 'day');
                });

                this.shownSoldSlots = this.soldSlots.filter(soldSlot => {
                    return soldSlot.start_time_date.isSame(this.activeDay, 'day');
                });

                console.log('shown free slots for day:', this.shownFreeSlots);
                console.log('shown sold slots for day:', this.shownSoldSlots);
            },

            returnWeek(numOfWeek) {
                let week = [];
                for (let i = -1; i <= 5; i++) {
                    week.push(this.generateDayByOffset(this.justNowDate.clone().add(Number(numOfWeek) * 7, 'd'), i));
                }
                return week;
            },

            showPrevWeek() {
                this.showWeek(-1);
            },

            showNextWeek() {
                this.showWeek(1, 'next');
            },

            handleWeek(now) {
                this.showCurrentSwitcher = false;
                console.log('is iran?', this.isiran);
                this.days = [];

                for (let i = -1; i <= 5; i++) {
                    this.days.push(this.generateDayByOffset(now, i));
                }

                let dayToStart = this.days[0];
                for (let i = 0; i < 7; i++) {
                    if (this.hasFreeSlotsInDay(this.days[i])) {
                        dayToStart = this.days[i];
                        break;
                    }
                }
                this.showDay(dayToStart);
                this.showCurrentSwitcher = true;
            },

            showWeek(numOfWeek) {
                this.activeWeekOffset += numOfWeek;
                this.handleWeek(this.shownDate.add(Number(numOfWeek) * 7, 'd'));
            },

            hasFreeSlotsInDay(day) {
                return this.slots.some(slot => slot.start_time_date.isSame(day, 'day'));
            },

            hasFreeSlotsInWeek(type) {
                switch (type) {
                    case 'prev':
                        return this.returnWeek(this.activeWeekOffset - 1).some(day => this.hasFreeSlotsInDay(day));
                    case 'next' :
                        return this.returnWeek(this.activeWeekOffset + 1).some(day => this.hasFreeSlotsInDay(day));
                }
            },

            isSlotSelected(slot) {
                return this.stash.some(stashSlot => stashSlot.old_slot.start_time === slot.old_slot.start_time && stashSlot.old_slot.end_time === slot.old_slot.end_time);
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

            locale() {
                return this.$store.getters.locale;
            },

            canGoPrev() {
                return this.activeWeekOffset > 0;
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