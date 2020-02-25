<template>
    <main class="main">
        <section class="container">
            <div class="mobileConsultantMenu">
                <div class="mobileConsultantMenu--links">
                    <button class="mobileConsultantMenu--button" :class="[{'active' : activeSection === 'desc'}]"
                            @click="smoothScrollToPos(getElementOffsetTop('descBlock'))">
                        <i class="material-icons">info</i>
                        <!--                        <span v-if="activeSection === 'desc'">مشخصات</span>-->
                    </button>
                    <button class="mobileConsultantMenu--button" :class="[{'active' : activeSection === 'calendar'}]"
                            @click="smoothScrollToPos(getElementOffsetTop('calendarBlock'))">
                        <i class="material-icons">date_range</i>
                        <!--                        <span v-if="activeSection === 'calendar'">تقویم و رزرو</span>-->
                    </button>
                    <button class="mobileConsultantMenu--button" :class="[{'active' : activeSection === 'comments'}]"
                            @click="smoothScrollToPos(getElementOffsetTop('commentsBlock'))">
                        <i class="material-icons">comment</i>
                        <!--                        <span v-if="activeSection === 'comments'">نظرات</span>-->
                    </button>
                </div>
                <div class="mobileConsultantMenu--shop" v-if="stash.length !== 0">
                    <button class="btn btn-round btn-sm btn-rose isansFont--faNum"
                            @click="addSelectedTimesToCart()">
                        اضافه کردن
                        {{stash.length}}
                        زمان انتخاب شده به سبد خرید
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 sideBarBlockSticky">
                    <div class="consultantSidebarBlock">
                        <div class="consultantSidebarBlock--info">
                            <img :src="consultant.profile_picture" alt="">
                            <div class="consultantSidebarBlock--info_detail">
                                <h1 class="isansFont--faNum">
                                    {{consultant.first_name + " " + consultant.last_name}}
                                </h1>
                                <span class="isansFont--faNum" v-if="consultant.rate != null"> امتیاز {{consultant.rate}}</span>
                                <span class="isansFont--faNum" v-else>بدون امتیاز</span>
                            </div>
                        </div>
                        <div class="consultantSidebarBlock--links isansFont--faNum">
                            <ul>
                                <li :class="[{'active' : activeSection === 'desc'}]">
                                    <button @click="smoothScrollToPos(getElementOffsetTop('descBlock'))">مشخصات</button>
                                    <span class="line" />
                                </li>
                                <li :class="[{'active' : activeSection === 'calendar'}]">
                                    <button @click="smoothScrollToPos(getElementOffsetTop('calendarBlock'))">تقویم
                                        مشاور و رزرو
                                    </button>
                                    <span class="line" />
                                </li>
                                <li :class="[{'active' : activeSection === 'comments'}]">
                                    <button @click="smoothScrollToPos(getElementOffsetTop('commentsBlock'))">
                                        نظرات
                                        <sub>{{consultant.comment_number}}</sub>
                                        <span class="line" />
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div class="consultantSidebarBlock--selectedItems isansFont--faNum">
                            <ul class="consultantSidebarBlock--selectedItems_list">
                                <li v-if="stash.length === 0">
                                    زمانی برای اضافه کردن به سبد خرید انتخاب نشده است. حداقل یک زمان از تقویم باید
                                    انتخاب شود.
                                </li>
                                <li v-for="item in stash">
                                    <i class="material-icons" role="button"
                                       @click="$store.commit('removeItemFromStash',item)">close</i>
                                    <span>{{getJalali(item.datestart).locale('fa').format('dddd') + " - " + getJalali(item.datestart).locale('fa').format('HH:mm') + " تا " + getJalali(item.dateend).locale('fa').format('HH:mm') }}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="consultantSidebarBlock--numberDiscounts isansFont--faNum">
                            <ul class="consultantSidebarBlock--numberDiscounts_list">
                                <li v-for="item in listOfDiscounts">
                                    <i class="material-icons">info</i>
                                    <span>
                                        به ازای هر
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

                        <button class="btn btn-round btn-bg btn-rose isansFont--faNum addToCartButton"
                                @click="addSelectedTimesToCart()">اضافه کردن به سبد خرید
                        </button>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="row" id="descBlock">
                        <div class="col-md-12">
                            <consultant-desc-block :consultant="consultant" v-if="consultant.id" />
                        </div>
                    </div>

                    <div class="row" id="calendarBlock">
                        <div class="col-md-12">
                            <user-calendar
                                 v-if="consultant.id"
                                 :consultantId="consultant.id"
                                 @get-slots="setSlot">
                            </user-calendar>
                        </div>
                    </div>

                    <div class="row" id="commentsBlock">
                        <div class="col-md-12">
                            <comment-section :consultant="consultant" v-if="consultant.id" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

</template>

<script>
    import axios from 'axios';
    import CommentSection from '@/components/StandAlone/CommentSection'
    import ConsultantInfoBlock from '@/components/Consultant/ConsultantInfoBlock'
    import ConsultantTitle from '@/components/Consultant/ConsultantTitle'
    import UserCalendar from '@/components/Consultant/UserCalendar'
    import ConsultantDescBlock from '@/components/Consultant/ConsultantDescBlock'
    import jalali from 'jalali-moment'

    export default {
        name: "ConsultantProfile",
        components: {
            CommentSection, ConsultantDescBlock, ConsultantInfoBlock, ConsultantTitle, UserCalendar
        },
        data() {
            return {
                consultant: {},
                activeSection: 'desc',
                listOfDiscounts: [],
                slots: [],
                calendarConfig: {
                    usersConfig: true,
                    managerConfig: false
                },
                descPos: 0,
                calendarPos: 0,
                commentsPos: 0,
                scrollListener: null
            }
        },
        computed: {
            isLoggedIn: function () {
                return this.$store.getters.isLoggedIn;
            },
            activeCart: function () {
                return this.$store.getters.getCart;
            },
            stash: function () {
                return this.$store.getters.getStash;
            }
        },
        created() {
            document.addEventListener('scroll', this.handleScroll, false);
            console.log(this.scrollListener);
            console.log('consultant profile created hook called');
            this.getConsultantBySlug(this.$route.params.consultantSlug);
            this.getListOfNumberDiscounts();
        },
        beforeDestroy() {
            document.removeEventListener('scroll', this.handleScroll, false);
        },
        mounted() {
            scrollTo(0, 0);
        },

        methods: {

            setSlot: function (slots) {
                // console.log('emiited event:', slots);
                this.slots = slots;
            },

            addSelectedTimesToCart: function () {
                console.log(this.stash);

                let payload = {"time_slot_sales": []};

                for (let i = 0; i < this.stash.length; i++) {
                    payload.time_slot_sales.push(this.getSlotIdByDate(this.stash[i].datestart, this.stash[i].dateend));
                }

                console.log("active card is :", this.activeCart);

                if (this.isLoggedIn) {
                    if (this.stash.length > 0) {
                        this.$loading(true);
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
                                this.$store.commit('setStash', []);
                                console.log(response);
                                this.$loading(false);
                                this.$router.push('/user/cart');
                            }).catch(error => {
                                this.$loading(false);
                                console.log(error);
                                if (error.response) {
                                    console.log(error.response);
                                }

                                this.$notify({
                                    group: 'notif',
                                    title: 'خطا',
                                    type: 'error',
                                    text: error.response.data,
                                    closeOnClick: true
                                });
                            });
                        } else {
                            //card doesnt exits
                            //post new items;
                            console.log('post new items in cart');
                            this.$store.dispatch('postCart', payload).then(response => {
                                console.log(response);
                                this.$store.commit('setStash', []);
                                this.$loading(false);
                                this.$router.push('/user/cart');
                            }).catch(error => {
                                console.log(error);
                                this.$loading(false);
                                if (error.response) {
                                    console.log(error.response);
                                }
                                this.$notify({
                                    group: 'notif',
                                    title: 'خطا',
                                    type: 'error',
                                    text: error.response.data,
                                    closeOnClick: true
                                });
                            })
                        }
                    } else {
                        this.$notify({
                            group: 'notif',
                            title: 'خطا',
                            type: 'error',
                            text: 'باید حداقل یک زمان از تقویم را انتخاب کنید.',
                            closeOnClick: true,
                            duration: 2500
                        });
                        console.log('stash is empty');
                    }
                } else {
                    this.$notify({
                        group: 'notif',
                        title: 'خطا',
                        type: 'error',
                        text: 'برای اضافه کردن زمان ها به سبد خرید باید در حساب خود وارد شوید.',
                        closeOnClick: true,
                        duration: 2500
                    });
                }


            },

            getJalali: function (date) {
                return jalali(date);
            },

            getSlotIdByDate(startDate, endDate) {
                for (let i = 0; i < this.slots.length; i++) {
                    if (jalali(this.slots[i].start_time).isSame(jalali(startDate), 'minute') && jalali(this.slots[i].end_time).isSame(jalali(endDate), 'minute'))
                        return this.slots[i].id;
                }
            },

            getElementOffsetTop: function (elemId) {
                return document.getElementById(elemId).offsetTop + 20;
            },

            getListOfNumberDiscounts: async function () {
                this.$loading(true);
                try {
                    let result = await axios.get(`${this.$store.getters.getApi}/discount/time-slot-sale-number-discounts/`);
                    console.log(result);
                    this.listOfDiscounts = result.data;
                } catch (e) {
                    console.log(e.response);
                    this.printMessage("خطایی هنگام ارتباط با سرور رخ داد", "تخفیفات : خطا", "error", 3000, "notif")
                } finally {
                    this.$loading(false);
                }
            },


            handleScroll: function (event) {
                this.descPos = document.getElementById('descBlock').offsetTop;
                this.calendarPos = document.getElementById('calendarBlock').offsetTop;
                this.commentsPos = document.getElementById('commentsBlock').offsetTop;
                if (scrollY >= 0 && scrollY < this.calendarPos) {
                    //desc block insight
                    this.toggleSection('desc')
                } else if (scrollY >= this.calendarPos && scrollY < this.commentsPos) {
                    //calendar block insight
                    this.toggleSection('calendar')
                } else {
                    //comments block insight
                    this.toggleSection('comments')
                }
            },

            smoothScrollToPos(yPos) {
                let step = 10;
                if (scrollY >= yPos)
                    step *= -1;

                let scrollInterval = setInterval(() => {
                    scrollTo(0, scrollY + step);
                    if (Math.abs(yPos - scrollY) <= Math.abs(step)) {
                        clearInterval(scrollInterval);
                    }
                }, 0.1);

            },

            toggleSection: function (newSec) {
                this.activeSection = newSec;
            },

            getConsultantBySlug: async function(consultantSlug) {
                this.$loading(true);
                try {
                    let result = await axios.get(`${this.$store.getters.getApi}/account/consultant-profiles/${consultantSlug}`);
                    this.consultant = result.data;
                    console.log(result);
                } catch(e) {
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
        padding-top: 100px;
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
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;

        margin-top: 30px;
        padding-bottom: 10px;
    }

    .sideBarBlockSticky {
        position: sticky;
        top: 50px;
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

    .consultantSidebarBlock--info img {
        width: 70px;
        height: auto;
        border-radius: 10px;
        margin-top: 10px;
        margin-right: 10px;
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
        border-right: inset 3px #B73EB3;
        font-weight: bold;
        color: #4c4c4c;
        padding-right: 15px;
    }

    .consultantSidebarBlock--links ul li.active button {
        border-right: inset 3px #B73EB3;
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
        margin-right: 10px;
        margin-top: 15px;
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

        padding-right: 0;
        margin-right: 10px;
        margin-top: 20px;
        list-style: none;
    }

    .consultantSidebarBlock--numberDiscounts_list li {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        font-size: 12px;
        font-weight: bold;

        color: #b8b8b8;
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

    .consultantSidebarBlock > button {
        margin-right: auto;
        margin-left: auto;
    }

    .mobileConsultantMenu {
        display: none;
    }

    @media only screen and (min-width: 0) and (max-width: 991.8px) {
        .sticky-top {
            position: static;
            top: initial;
        }

        .sideBarBlockSticky {
            position: static;
            padding-right: 15px;
        }

        .consultantSidebarBlock {
            margin-bottom: 30px;
            margin-top: 0;
        }

        .consultantSidebarBlock--links {
            display: none;
        }

        .consultantSidebarBlock--numberDiscounts {
            display: none;
        }

        .consultantSidebarBlock--selectedItems {
            display: none;
        }

        .addToCartButton {
            display: none;
        }


        .mobileConsultantMenu {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            position: fixed;
            bottom: -2px;
            left: 0;
            width: 100%;
            background-color: white;
            border-radius: 20px 20px 0 0;
            z-index: 999;
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
        }

        .mobileConsultantMenu--links {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            width: 100%;
            height: 70px;
        }

        .mobileConsultantMenu--button {
            background: none;
            border: none;
            padding: 10px;
            margin: 0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .mobileConsultantMenu--button.active {
            background-color: #e91e63;
            color: white;
            box-shadow: 5px 0 10px rgba(0, 0, 0, 0.2);

            flex-direction: column;
            align-items: center;
        }


    }
</style>
