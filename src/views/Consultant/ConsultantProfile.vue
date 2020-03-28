<template>
    <main class="main">
        <section class="container">
            <div class="mobileConsultantMenu">
                <div class="mobileConsultantMenu--links">
                    <button class="mobileConsultantMenu--button" :class="[{'active' : activeSection === 'desc'}]"
                            @click="smoothScrollToPos(getElementOffsetTop('descBlock'))">
                        <i class="material-icons">info</i>
                    </button>
                    <button class="mobileConsultantMenu--button" :class="[{'active' : activeSection === 'calendar'}]"
                            @click="smoothScrollToPos(getElementOffsetTop('calendarBlock'))">
                        <i class="material-icons">date_range</i>
                    </button>
                    <button class="mobileConsultantMenu--button" :class="[{'active' : activeSection === 'comments'}]"
                            @click="smoothScrollToPos(getElementOffsetTop('commentsBlock'))">
                        <i class="material-icons">comment</i>
                    </button>
                </div>
                <div class="mobileConsultantMenu--shop" v-if="stash.length !== 0">
                    <button class="btn btn-round btn-sm btn-rose isansFont--faNum" @click="addSelectedTimesToCart()">
                        رزرو
                        {{stash.length}}
                        زمان انتخاب شده.
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 sideBarBlockSticky">
                    <div class="consultantSidebarBlock">
                        <div class="consultantSidebarBlock--info">
                            <img v-if="activeSection != 'desc' || windowWidth < 991.8" :src="consultant.profile_picture" :alt="consultant.first_name + ' ' + consultant.last_name">
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

                        <button class="btn btn-round btn-bg btn-rose isansFont--faNum addToCartButton"
                                @click="addSelectedTimesToCart()">رزرو جلسات انتخاب شده
                        </button>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="row" id="descBlock">
                        <div class="col-md-12">
                            <div class="meta"></div>
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
    import UserCalendar from '@/components/Consultant/UserCalendar'
    import ConsultantDescTopMeta from "@/components/Consultant/ConsultantDescTopMeta";
    import ConsultantDescBlock from '@/components/Consultant/ConsultantDescBlock'
    import jalali from 'jalali-moment'

    export default {
        name: "ConsultantProfile",
        components: {
            CommentSection, ConsultantDescBlock, UserCalendar, ConsultantDescTopMeta
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
                scrollListener: null
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
              return this.listOfDiscounts.filter(discount => discount.number === (this.stash.length + 1) );
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

        methods: {

            setSlot(slots) {
                this.slots = slots;
            },

            async addSelectedTimesToCart() {
                console.log(this.stash);

                let payload = {"products": []};

                for (let i = 0; i < this.stash.length; i++) {
                    payload.products.push(this.getSlotIdByDate(this.stash[i].datestart, this.stash[i].dateend));
                }

                if(this.isLoggedIn) {
                    if(this.stash.length > 0) {
                        try {
                            this.$loading(true);
                            let result = await axios.post(`${this.$store.getters.getApi}/cart/carts/`, payload, this.$store.getters.httpConfig);
                            console.log(result);
                            this.$router.push(`/carts/${result.data.id}`);
                        } catch (e) {
                            console.log(e);
                            if(e.response) {
                                console.log(e.response)
                            }
                        } finally {
                            this.$loading(false);
                        }
                    }
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

            getElementOffsetTop(elemId) {
                return document.getElementById(elemId).offsetTop + 20;
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


            handleScroll() {
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

            toggleSection(newSec) {
                this.activeSection = newSec;
            },

            async getConsultantBySlug(consultantSlug) {
                this.$loading(true);
                try {
                    let result = await axios.get(`${this.$store.getters.getApi}/account/consultant-profiles/${consultantSlug}/`, this.$store.getters.httpConfig);
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
        margin-bottom: 15px;
        width: 100%;
        height: 100px;
        background-color: #20B8A3;
        border-radius: 0 0 15px 15px;
        box-shadow:0 3px 10px 1px rgba(0,0,0,0.2);
    }

    .consultantSidebarBlock--info img {
        width: 70px;
        height: 70px;
        border-radius: 10px;
        margin-top: 10px;
        margin-right: 10px;
        margin-left: 10px;
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

        .meta {
            display: none;
        }
    }
</style>
