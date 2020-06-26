<template>
    <div v-if="consultantId" class="userCalendarWrapper">
        <p class="calendar-tutor isansFont--faNum">
            آموزش استفاده از تقویم:
            <br>
            <span class="calendar-tutor-bold">
            {{user.first_name}} {{user.last_name}}
            عزیز، سلام، لطفاً در صورت امکان حتما توضیحات زیر را یکبار مطالعه بفرمایید.
            </span>
            <br>
            در تقویم زیر می توانید زمان هایی را که برای مشاوره در نظر دارید وارد کنید.
            <br>
            تقویم با توجه به timezone شما به صورت اتوماتیک به روزرسانی میشود و زمان ها بر حسب وقت محلی شما و تاریخ
            میلادی (اگر خارج ایران باشید) نشان داده می شود.
            <br>
            زمان هایی که قبل از لحظه فعلی تا 24 ساعت بعد هستند به جهت سیاست های شرکت اسنیدز قفل هستند و انتخاب آنها
            امکان پذیر نیست. این به این دلیل است که مشاور و کاربر وقت کافی برای آماده سازی و اطلاع رسانی از طرف اسنیدز
            را داشته باشند.
            <br>
            <br>
            در تقویم زیر وضعیت هر زمان با یک رنگ مشخص شده است.
            شما میتوانید از بین این زمان ها، هر تعدادی که مد نظر دارید انتخاب کنید:
            <br>
            1.رنگ <span class="desc-color slot-button--notavailable" style="color:white">خاکستری تیره</span> نشان دهنده
            قفل بودن زمان برای انتخاب است و شما امکان انتخاب این زمان را ندارید.
            <br>
            2.رنگ <span class="desc-color" style="background-color:rgb(239, 239, 239);color:black">خاکستری کمرنگ</span>
            نشان دهنده امکان انتخاب این زمان است.
            <br>
            4.رنگ <span class="desc-color slot-button--open" style="color:white">سبز</span> نشان دهنده زمان هایی هستند
            که شما قبلاً آنها را ایجاد کرده اید.
            <br>
            5.رنگ <span class="desc-color slot-button--selected">زرد</span> نشان دهنده زمان هایی است که شما در حال حاضر
            آنها را برای عملیات بعدی انتخاب کرده اید.
            <br>
            <br>
            بدیهی است که اگر زمان(هایی) سبز بود(ند)، میتوانید با انتخاب آنها و سپس کلیک بر روی گزینه "<span
                style="color:red">حذف زمان های انتخابی</span>" آنها را به حالت عادی برگردانید و از تقویم شما حذف خواهند
            شد.
            <br>
            <br>
            طبیعتا اگر زمانی از قبل توسط شما باز نشده باشد می توانید با کلیک بر روی آنها و کلیک بر روی گزینه "<span
                style="color:green">ایجاد زمان های جدید</span>" آنها را به تقویم خود اضافه کنید.
            <br>
            <br>
            به جهت ماهیت مشاوره به صورت مداوم و در جهت رفاه حال شما، می توانید تایم هایی که در یک هفته باز کرده اید را
            برای تعداد هفته های بعدی نیز کپی کنید.
            مثلا اگر شما هر هفته روزهای چهارشنبه و پنجشنبه ساعت های 10 تا 12 در هر روز (اعداد تصادفی هستند) امکان مشاوره
            دارید و نمیخواهید هر دفعه این ها را وارد تقویم کنید، در هر هفته ای که دوست دارید زمان هارا انتخاب کنید،
            سپس با استفاده از ویژگی کپی کردن زمان ها در هفته های بعدی، هم، زمان هارا به هفته جاری و هم این زمان ها را در
            تعداد هفته
            های آتی که شما مشخص میکنید، کپی کنید.
            <br>
            <br>
            با توجه به سیاست های اسنیدز تعداد هفته هایی که میخواهید زمان های هفته فعلی در آنها کپی شود، حداقل 1 هفته و
            حداکثر 8 هفته ( حدود 2 ماه ) خواهد بود.
            این به آن معناست که شما میتوانید یکباره برای 2 ماه آینده خود یک تایم مشخص را وارد تقویم کنید بدون اینکه به
            صورت جدا وارد هر هفته شده و زمان ها را انتخاب کنید.
            <br>
            حالت پیشفرض: حالت پیشفرض تقویم، 24 ساعت بعد از زمان فعلی است.
            <br>
            هفته بعدی: شما یک هفته به جلو برده می شوید.
            <br>
            هفته قبلی:شما یک هفته به عقب بازگردانده می شوید.
            <br>
            ایجاد زمان های انتخاب شده: زمان هایی که انتخاب کردید و با رنگ زرد مشخص شده اند، به لیست زمان های فعال برای
            رزرو اضافه می شوند.
            <br>
            حذف زمان های انتخاب شده: زمان هایی که انتخاب کردید و با رنگ زرد مشخص شده اند، اگر قبلا توسط شما آماده رزرو
            کاربران باشند، از این لیست حذف خواهند شد.
            <br>
            کپی کردن زمان های این هفته برای x هفته بعدی: زمان هایی که در هفته فعلی ایجاد شده اند و سبز هستند، در تعداد
            هفته های آتی که شما مشخص میکنید کپی می شوند.
        </p>

        <div class="myTable isansFont" v-if="days.length != 0">
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
            <div class="calendar-actions">
                <button @click="addTimes()" class="addButton" :disabled="isLoadingAdd">
                    ایجاد زمان های انتخاب شده
                    <moon-loader class="loading-icon" color="#fff" :loading="isLoadingAdd" :size="15" sizeUnit="px"/>
                </button>
                <button @click="removeTimes()" class="removeButton" :disabled="isLoadingRemove">
                    حذف زمان های انتخاب شده
                    <moon-loader class="loading-icon" color="#fff" :loading="isLoadingRemove" :size="15" sizeUnit="px"/>
                </button>
            </div>

            <form @submit.prevent="duplicateCurrentWeekTime" class="duplication-form isansFont--faNum">
                <p>
                    اضافه کردن + کپی کردن زمان ها به این هفته و به تعداد هفته های بعدی:
                </p>
                <label for="weeksDuplicatorAmount">
                <span>
                    تعداد هفته(های) آینده (حداقل 1 و حداکثر 8):
                </span>
                    <input v-model="weeksDuplicatorAmount" id="weeksDuplicatorAmount" type="number" min="1" max="8">
                </label>
                <button :disabled="isLoadingCopy">
                    کپی کردن زمان های این هفته برای {{weeksDuplicatorAmount}} هفته بعدی
                    <moon-loader class="loading-icon" color="#fff" :loading="isLoadingCopy" :size="15" sizeUnit="px"/>
                </button>
                <br>
                <p class="important-text">
                    عملیات کپی و اضافه کردن زمان به تقویم در صورت بالا بودن تعداد زمان ها ممکن است لحظاتی طول بکشد. لطفاً شکیبا بوده و از فشردن چند باره دکمه ها به شدت خودداری کنید.
                </p>
            </form>
        </div>
    </div>
</template>

<script>
    import jalali from 'jalali-moment'
    import {required, between, numeric} from 'vuelidate/lib/validators'
    import {MoonLoader} from '@saeris/vue-spinners'


    export default {
        name: "Calendar",
        components: {'moon-loader': MoonLoader},
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
                weeksDuplicatorAmount: 1,
                shownDate: {},
                justNowDate: {},
                minutesOffsetFromTehran: 0,
                activeWeekOffset: 0,
                isLoadingAdd: false,
                isLoadingRemove: false,
                isLoadingCopy: false,
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
            },
            user() {
                return this.$store.getters.getUser
            }
        },
        async created() {
            this.initComp();
        },

        methods: {
            loading(val, type) {
                switch (type) {
                    case 'add':
                        this.isLoadingAdd = !!val;
                        break;
                    case 'remove':
                        this.isLoadingRemove = !!val;
                        break;
                    case 'copy':
                        this.isLoadingCopy = !!val;
                        break;
                }
            },
            async duplicateCurrentWeekTime() {
                //console.log('duplicate current weeks times for ', this.weeksDuplicatorAmount, ' week(s).');
                if (this.weeksDuplicatorAmount >= 1 && this.weeksDuplicatorAmount <= 8) {
                    let populatedSlots = [];
                    for (let i = 0; i < this.days.length; i++) {
                        for (let j = 0; j < this.days[i].slots.length; j++) {
                            if (this.days[i].slots[j].where.endsWith('selected')) {
                                for (let k = 0; k <= this.weeksDuplicatorAmount; k++) {
                                    populatedSlots.push({
                                        "start_time_date": this.days[i].slots[j].start_time_date.clone().add(k, 'weeks'),
                                        "end_time_date": this.days[i].slots[j].end_time_date.clone().add(k, 'weeks')
                                    })
                                }
                            }
                        }
                    }
                    // //console.log('populated slots', populatedSlots)
                    // populatedSlots.forEach(slot => //console.log(slot.start_time_date.format() + '=>' + slot.end_time_date.format()));
                    if (populatedSlots.length > 0) {
                        this.addAndDuplicateTimes(populatedSlots);
                    } else {
                        this.$notify({
                            group: 'notif',
                            type: 'warn',
                            title: 'تقویم: اخطار',
                            text: ' زمانی برای اضافه کردن و کپی انتخاب نکرده اید.',
                            duration: 5000
                        })
                    }
                } else {
                    this.$notify({
                        group: 'notif',
                        type: 'warn',
                        title: 'تقویم: اخطار',
                        text: 'تعداد هفته های آینده باید حداقل 1 و حداکثر 8 هفته (معادل 2 ماه) باشد.',
                        duration: 5000
                    })
                }
            },


            async initComp() {
                //console.log('active time zone', this.$store.getters.timezone);
                let slotsRequest = this.$api.get(`${this.$store.getters.getApi}/store/time-slot-sales/?consultant=${this.consultantId}`, this.$store.getters.httpConfig);
                let soldSlotsRequest = this.$api.get(`${this.$store.getters.getApi}/store/sold-time-slot-sales/?consultant=${this.consultantId}`, this.$store.getters.httpConfig);
                let timezoneRequest = this.$api.get(`${this.$store.getters.getApi}/utils/timezone-time/${this.$store.getters.timezoneSafe}/`);
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
                    this.justNowDate = jalali(timeZoneResult.data.now).locale(this.locale).add('26', 'hours');
                    this.shownDate = this.justNowDate.clone();
                    //console.log(this.shownDate.format());
                    let timezone = this.shownDate.format('Z');
                    let sign = timezone[0];
                    let hour = Number(timezone.split(':')[0].split(sign)[1]);
                    let minute = Number(timezone.split(':')[1]);
                    //console.log(sign, hour, " ", minute);
                    let offsetInMinuteFromTehran = Number(sign + ((hour * 60) + minute)) - 210;
                    //console.log(Number(sign + ((hour * 60) + minute)));
                    //console.log(Number("+" + 210));
                    this.minutesOffsetFromTehran = Math.abs(offsetInMinuteFromTehran - (Math.round(offsetInMinuteFromTehran / 60)) * 60);
                    //console.log('minutes offset from tehran', this.minutesOffsetFromTehran);
                    //console.log('slots', this.slots);
                    this.showWeek(this.activeWeekOffset);
                }).catch(error => {
                    //console.log(error);
                })
            },


            handleWeek(now) {
                //console.log('is iran?', this.isiran);
                this.days = [];
                this.days.push(this.generateSaturdayNew(now));
                this.days.push(this.generateSundayNew(now));
                this.days.push(this.generateMondayNew(now));
                this.days.push(this.generateTuesdayNew(now));
                this.days.push(this.generateWednesdayNew(now));
                this.days.push(this.generateThursdayNew(now));
                this.days.push(this.generateFridayNew(now));
                //console.log(this.days);
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
                for (let i = 0; i < 24; i++) {
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
                //console.log(slots);
                return slots;
            },

            slotClickHandler(slot) {
                //console.log(slot);
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
                //console.log(slot);
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

            removeTimes() {
                if (window.confirm('برای حذف زمان های باز انتخاب شده مطمئید ؟')) {
                    let removeReqs = [];
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
                    if (removeReqs.length > 0) {
                        this.loading(true, 'remove');
                        Promise
                            .all(removeReqs)
                            .then(() => {
                                this.$notify({
                                    group: 'notif',
                                    type: 'success',
                                    title: 'تقویم: موفق',
                                    text: 'زمان های انتخاب شده با موفقیت حذف شدند.',
                                    duration: 7000
                                })
                            })
                            .catch(error => {
                                this.$notify({
                                    group: 'notif',
                                    type: 'error',
                                    title: 'تقویم: خطا',
                                    text: 'خطایی هنگام حذف کردن زمان های انتخاب شده رخ داد.',
                                    duration: 4000
                                })
                            })
                            .finally(() => {
                                this.initComp();
                                this.loading(false, 'remove');
                            })
                    } else {
                        this.$notify({
                            group: 'notif',
                            type: 'warn',
                            title: 'تقویم: اخطار',
                            text: 'برای حذف زمان، باید حداقل یک زمان از تقویم انتخاب کنید.',
                            duration: 5000
                        })
                    }

                }

            },


            addAndDuplicateTimes(slots) {
                let openReqs = [];
                let timesHttpConfig = this.$store.getters.httpConfig;
                timesHttpConfig.timeout = 0;
                this.loading(true, 'copy');
                slots.forEach(slot => {
                    openReqs.push(
                        this.$api.post(`${this.$store.getters.getApi}/store/time-slot-sales/`,
                            {
                                "start_time": slot.start_time_date.clone().locale('en').format(),
                                "end_time": slot.start_time_date.clone().locale('en').format()
                            },
                            timesHttpConfig)
                    );
                });
                slots = []
                Promise.all(openReqs)
                    .finally(async () => {
                        await this.initComp()
                        this.loading(false, 'copy')
                        this.$notify({
                            group: 'notif',
                            type: 'success',
                            title: 'تقویم: موفق',
                            text: 'زمان های انتخاب شده با موفقیت برای رزرو باز شدند و در هفته های انتخاب شده ثبت شدند.',
                            duration: 7000
                        })
                    })
            },

            addTimes() {
                let openReqs = [];
                let timesHttpConfig = this.$store.getters.httpConfig;
                timesHttpConfig.timeout = 0;

                this.days.forEach(day => {
                    day.slots.forEach(slot => {
                        if (slot.where === 'ready-selected') {
                            openReqs.push(
                                this.$api.post(`${this.$store.getters.getApi}/store/time-slot-sales/`,
                                    {
                                        "start_time": slot.start_time_date.clone().locale('en').format(),
                                        "end_time": slot.start_time_date.clone().locale('en').format()
                                    },
                                    timesHttpConfig)
                            );
                        }
                    })
                });
                this.loading(true, 'add');
                if (openReqs.length > 0) {
                    Promise
                        .all(openReqs)
                        .then(() => {

                        })
                        .catch(error => {
                            // //console.log(error);
                        })
                        .finally(async () => {
                            openReqs = [];
                            await this.initComp();
                            this.loading(false, 'add');
                            this.$notify({
                                group: 'notif',
                                type: 'success',
                                title: 'تقویم: موفق',
                                text: 'زمان های انتخاب شده با موفقیت برای رزرو باز شد.',
                                duration: 7000
                            })
                        })
                } else {
                    this.$notify({
                        group: 'notif',
                        type: 'warn',
                        title: 'تقویم: اخطار',
                        text: 'برای ایجاد زمان، باید حداقل یک زمان از تقویم انتخاب کنید.',
                        duration: 15000
                    })
                }

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
        transition: all 0.1s ease-in-out;
    }

    .duplication-form {
        color: #222;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 15px;
        margin-bottom: 15px;
    }

    .duplication-form p {
        color: #222;
        font-size: 13px;
    }

    .duplication-form label {
        font-size: 13px;
        color: #222;
    }

    .duplication-form input {
        border-radius: 5px;
        border: 1px solid #ccc;
        margin-right: 5px;
        padding: 5px 12px;
    }

    .duplication-form button {
        border-radius: 5px;
        border: 1px solid #3CAEA3;
        background-color: #3CAEA3;
        color: white;
        font-size: 13px;
        margin-right: 5px;
        padding: 5px 12px;
    }

    .duplication-form button:hover {
        background-color: #00bfa5;
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
        position: sticky;
        top: 70px;
        height: 50px;
        background-color: white;
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
        top: 120px;
        box-shadow: 0 40px 40px rgba(0, 0, 0, 0.2);
        border-radius: 0 0 10px 10px;
    }

    .calendar-tutor {
        font-size: 14px;
        line-height: 26px;
    }

    .desc-color {
        padding: 1px 10px;
        border-radius: 5px;
    }

    .calendar-tutor-bold {
        font-weight: bold;
    }

    .calendar-actions {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    .calendar-actions button {
        margin: 10px;
    }

    .addButton {
        background-color: #3CAEA3;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 5px 12px;
        font-weight: normal;
        transition: box-shadow 0.1s ease-in-out;
    }

    .addButton:hover {
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    }

    .removeButton {
        background-color: #c9737c;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 5px 12px;
        font-weight: normal;
        transition: box-shadow 0.1s ease-in-out;
    }

    .removeButton:hover {
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    }

    .duplication-form p.important-text {
        font-weight: bold;
        font-size: 20px;
        padding: 5px 10px;
        border-radius: 5px;
        background-color: black;
        color: white;
        text-align: center;
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
