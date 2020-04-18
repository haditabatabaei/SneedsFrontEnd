<template>
    <main class="main">
        <section class="container">
            <div class="row">
                <div class="col-md-9">
                    <div class="row" id="descBlock">
                        <div class="col-md-12 consultantBlock">
                            <div class="meta">
                                <div class="meta-overlap"></div>
                            </div>
                            <consultant-desc-block :consultant="consultant" v-if="consultant.id"/>
                            <user-calendar
                                    v-if="consultant.id && windowWidth > 991.8"
                                    :consultantId="consultant.id"
                                    @get-slots="setSlot">
                            </user-calendar>
                            <comment-section :consultant="consultant" v-if="consultant.id"/>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 sideBarBlockSticky">
                    <div class="consultantSidebarBlock">
                        <div class="consultantSidebarBlock--info">
                            <transition name="fade">
                                <img v-if="showSidebarAvatar" :src="consultant.profile_picture"
                                     :alt="consultant.first_name + ' ' + consultant.last_name">

                            </transition>
                            <div class="consultantSidebarBlock--info_detail">
                                <h1 class="isansFont--faNum">
                                    {{consultant.first_name + " " + consultant.last_name}}
                                </h1>
                                <span class="isansFont--faNum" v-if="consultant.rate != null"> امتیاز {{consultant.rate}}</span>
                                <span class="isansFont--faNum" v-else>بدون امتیاز</span>
                            </div>
                        </div>
                        <div class="consultantSidebarBlock--selectedItems isansFont--faNum">
                            <ul class="consultantSidebarBlock--selectedItems_list">
                                <li v-if="stash.length === 0">
                                    زمانی برای رزرو انتخاب نشده است. حداقل یک زمان از تقویم باید
                                    انتخاب شود.
                                </li>
                                <li v-for="(item, index) in stash" :key="index">
                                    <i class="material-icons" role="button"
                                       @click="$store.commit('removeItemFromStash',item)">close</i>
                                    <span v-if="$store.getters.isiran">{{getJalali(item.datestart).locale('fa').format('dddd') + " - " + getJalali(item.datestart).locale('fa').format('HH:mm') + " تا " + getJalali(item.dateend).locale('fa').format('HH:mm') }}</span>
                                    <span v-else class="isansFont">{{getJalali(item.datestart).locale('en').format('dddd') + " - " + getJalali(item.datestart).locale('en').format('HH:mm') + " till " + getJalali(item.dateend).locale('en').format('HH:mm') }}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="consultantSidebarBlock--numberDiscounts isansFont--faNum">
                            <ul class="consultantSidebarBlock--numberDiscounts_list">
                                <li v-for="(item, index) in shownDiscounts" :key="index">
                                    <i class="material-icons">info</i>
                                    <span>
                                        با اضافه کردن 1 جلسه دیگر و با داشتن
                                        <mark>
                                            {{item.number}}
                                            جلسه ،
                                        </mark>
                                        <mark>
                                            {{item.discount}}
                                            درصد تخفیف
                                        </mark>
                                        اتوماتیک محاسبه خواهد شد.
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <button class="isansFont--faNum addToCartButton"
                                @click="addSelectedTimesToCart()">رزرو جلسات انتخاب شده
                        </button>
                    </div>
                </div>
            </div>

            <div class="consultant-mobile-calendar isansFont"
                 :class="[{'consultant-mobile-calendar--round' : showMobileCalendar}]">
                <button @click="toggleMobileCalendar" class="mobile-calendar-toggler" v-if="!showMobileCalendar">رزرو
                    وقت مشاوره
                </button>
                <div class="mobile-calendar-header" v-if="showMobileCalendar">
                    <button @click="toggleMobileCalendar" class="mobile-calendar-close">
                        <i class="material-icons">
                            close
                        </i>
                    </button>
                </div>
                <mobile-user-calendar :consultant-id="consultant.id" v-if="consultant.id && showMobileCalendar"/>
            </div>
        </section>
    </main>

</template>

<script>
    import axios from 'axios';
    import CommentSection from '@/components/StandAlone/CommentSection'
    import UserCalendar from '@/components/Consultant/UserCalendar'
    import MobileUserCalendar from "@/components/Consultant/MobileUserCalendar";
    import ConsultantDescBlock from '@/components/Consultant/ConsultantDescBlock'
    import jalali from 'jalali-moment'

    export default {
        name: "ConsultantProfile",
        components: {
            CommentSection, ConsultantDescBlock, UserCalendar, MobileUserCalendar
        },
        data() {
            return {
                consultant: {},
                activeSection: 'desc',
                listOfDiscounts: [],
                slots: [],
                descPos: 0,
                calendarPos: 0,
                commentsPos: 0,
                scrollListener: null,
                showMobileCalendar: false,
                showSidebarAvatar: false,
            }
        },
        computed: {
            isLoggedIn() {
                return this.$store.getters.isLoggedIn;
            },
            stash() {
                return this.$store.getters.getStash;
            },
            shownDiscounts() {
                return this.listOfDiscounts.filter(discount => discount.number === (this.stash.length + 1));
            },
        },
        created() {
            document.addEventListener('scroll', this.scrollEnoughToShowAvatar, false);
            console.log(this.scrollListener);
            console.log('consultant profile created hook called');
            this.getConsultantBySlug(this.$route.params.consultantSlug);
            this.getListOfNumberDiscounts();
        },

        beforeDestroy() {
            document.removeEventListener('scroll', this.scrollEnoughToShowAvatar, false);
        },

        methods: {
            scrollEnoughToShowAvatar() {
                this.showSidebarAvatar = window.scrollY >= 150 && this.windowWidth > 991.8;
            },

            toggleMobileCalendar() {
                this.showMobileCalendar = !this.showMobileCalendar;
            },

            setSlot(slots) {
                this.slots = slots;
            },

            async addSelectedTimesToCart() {
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
                            this.$router.push(`/carts/${result.data.id}`);
                        } catch (e) {
                            console.log(e);
                            if (e.response) {
                                console.log(e.response)
                            }
                        } finally {
                            this.$loading(false);
                        }
                    } else {
                        this.printMessage("زمانی برای رزرو انتخاب نشده است.", "رزرو : اخطار", "warn", 7000, "notif")
                    }
                } else {
                    this.printMessage(" برای رزرو باید در حساب کاربری خود وارد شوید(زمان های انتخاب شده برایتان ذخیره می شود).", "رزرو : اخطار", "warn", 10000, "notif")
                }
            },

            getJalali(date) {
                return jalali(date);
            },

            getSlotIdByDate(startDate, endDate) {
                for (let i = 0; i < this.slots.length; i++) {
                    if (jalali(this.slots[i].start_time).isSame(jalali(startDate), 'minute') && jalali(this.slots[i].end_time).isSame(jalali(endDate), 'minute'))
                        return this.slots[i].id;
                }
            },

            async getListOfNumberDiscounts() {
                this.$loading(true);
                try {
                    let result = await axios.get(`${this.$store.getters.getApi}/discount/time-slot-sale-number-discounts/`, this.$store.getters.httpConfig);
                    console.log(result);
                    this.listOfDiscounts = result.data;
                } catch (e) {
                    console.log(e.response);
                    this.printMessage("خطایی هنگام ارتباط با سرور رخ داد", "تخفیفات : خطا", "error", 3000, "notif")
                } finally {
                    this.$loading(false);
                }
            },

            async getConsultantBySlug(consultantSlug) {
                this.$loading(true);
                try {
                    let result = await axios.get(`${this.$store.getters.getApi}/account/consultant-profiles/${consultantSlug}/`, this.$store.getters.httpConfig);
                    this.consultant = result.data;
                    console.log(result);
                } catch (e) {
                    console.log(e.response);
                    this.printMessage("خطایی هنگام ارتبا با سرور رخ داد.", "مشاور :‌ خطا", "error", 3000, "notif");
                } finally {
                    this.$loading(false);
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
        }
    }
</script>

<style scoped>

    .main {
        min-height: 100vh;
        padding-bottom: 40px;
        background-color: #f2f2f2;
    }

    .nav-pills.nav-pills-white > li.active > a {
        background-color: white;
        color: #555555;
        box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2);
    }

    .consultantSidebarBlock {
        background-color: white;
        width: 100%;
        border-radius: 15px;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        margin-top: 130px;
    }

    .sideBarBlockSticky {
        position: sticky;
        top: 120px;
        padding-right: 0;
    }

    .consultantSidebarBlock--info {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .consultantSidebarBlock--info_detail {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-right: 10px;
    }

    .consultantSidebarBlock--info_detail h1 {
        font-size: 1.5rem;
        margin-right: 10px;
    }

    .consultantSidebarBlock--info_detail span {
        font-size: 12px;
        background-color: #f0f0f0;
        color: #bababa;
        border-radius: 30px;
        padding: 3px 20px;
    }

    .meta {
        width: 100%;
        height: 115px;
        border-radius: 0 0 15px 15px;
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
        position: relative;
        background: url('/sneedsAssets/img/consultant-profile-top-bg.png') no-repeat 0 -300px / cover;
    }

    .meta-overlap {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(32, 184, 163, 0.8);
        border-radius: 0 0 15px 15px;
    }

    .consultantSidebarBlock--info img {
        width: 70px;
        height: 70px;
        border-radius: 10px;
        margin: 10px;
    }

    .consultantSidebarBlock--links {
        width: 100%;
        margin-top: 15px;
    }

    .consultantSidebarBlock--links ul {
        display: flex;
        list-style: none;
        padding-right: 0;

        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }

    .consultantSidebarBlock--links ul li button {
        background: none;
        border: none;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-right: 10px;
        margin-top: 5px;
        color: #b2b2b2;
        transition: all 0.1s ease-in-out;
    }

    .consultantSidebarBlock--links ul li button:hover {
        border-right: inset 3px #8C3DDB;
        font-weight: bold;
        color: #4c4c4c;
        padding-right: 15px;
    }

    .consultantSidebarBlock--links ul li.active button {
        border-right: inset 3px #8C3DDB;
        font-weight: bold;
        color: #4c4c4c;
        padding-right: 15px;
    }

    .consultantSidebarBlock--selectedItems_list {
        list-style: none;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        padding-right: 0;
        font-size: 13px;
        margin-top: 5px;
    }

    .consultantSidebarBlock--selectedItems_list li {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 15px;
        color: #333;
    }

    .consultantSidebarBlock--selectedItems_list li span {
        margin-right: 5px;
    }

    .consultantSidebarBlock--links_list li i {
        font-size: 20px;
    }

    .consultantSidebarBlock--numberDiscounts_list {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin-top: 20px;
        padding: 0 10px;
        list-style: none;
    }

    .consultantSidebarBlock--numberDiscounts_list li {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 12px;
        font-weight: bold;
        color: #b8b8b8;
        margin-top: 15px;
    }

    .consultantSidebarBlock--numberDiscounts_list li i {
        font-size: 20px;
        margin-left: 5px;
    }

    .consultantSidebarBlock--numberDiscounts_list mark {
        color: #3faf54;
        background: none;
        border-radius: 50%;
        width: 10px;
        height: 10px;
        font-weight: bold;
        font-size: 13px;
    }

    .addToCartButton {
        align-self: stretch;
        border-radius: 0 0 15px 15px;
        border: none;
        font-size: 14px;
        padding-top: 15px;
        padding-bottom: 15px;
        color: white;
        background-color: #8C3DDB;
        outline: none;
    }

    .consultant-mobile-calendar {
        display: none;
    }

    @media only screen and (min-width: 0) and (max-width: 991.8px) {
        .main {
            padding-bottom: 50px;
            width: 100%;
            border-radius: 0;
        }

        .meta {
            border-radius: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-position: center;
        }

        .meta-overlap {
            border-radius: 0;
        }

        .sideBarBlockSticky {
            position: static;
            padding-right: 15px;
        }

        .consultantSidebarBlock {
            display: none;
        }

        .container {
            padding-right: 0;
            padding-left: 0;
        }

        .row {
            margin-right: 0;
            margin-left: 0;
        }

        .col-md-9 {
            padding-right: 0;
            padding-left: 0;
        }

        .col-md-12 {
            padding-right: 0;
            padding-left: 0;
        }

        .consultant-mobile-calendar {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            flex-direction: column;
            min-height: 65px;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: white;
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        }

        .consultant-mobile-calendar--round {
            border-radius: 15px 15px 0 0;
        }

        .mobile-calendar-toggler {
            color: white;
            background-color: #8C3DDB;
            border: none;
            width: 100%;
            height: 65px;
        }

        .mobile-calendar-close {
            width: 25px;
            height: 25px;
            padding: 0;
            margin: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            border-radius: 50%;
            border: 1px solid #B3B3B3;
            color: #B3B3B3;
            background-color: white;
        }

        .mobile-calendar-close i {
            font-size: 12px;
        }

    }
</style>
