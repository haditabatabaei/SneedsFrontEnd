<template>
    <div class="container-fluid activeCart">
        <package-staging current-stage-value="pay" style="margin-bottom: 20px" v-if="isShowingPackageStaging"/>
        <div class="row">
            <div class="col-md-12">
                <div class="cartsWrapper" v-if="showOrder">
                    <div class="cartsWrapper-title isansFont--faNum">
                        <div class="cartsWrapper-title-consultant">
                            <img
                                    v-if="hasTimeSlot"
                                    :src="firstTimeSlot.consultant.profile_picture" draggable="false"
                                    alt="">
                            <div class="cartsWrapper-title-consultant--info">
                                <h5 class="isansFont--faNum" v-if="hasTimeSlot">
                                    جلسه مشاوره آنلاین
                                </h5>
                                <h5 class="isansFont--faNum" v-if="hasSoldStorePaidPackagePhase">
                                    {{soldPackagePhase.title}}
                                </h5>
                                <h6 class="isansFont--faNum" v-if="hasTimeSlot">
                                    {{`${firstTimeSlot.consultant.first_name}
                                    ${firstTimeSlot.consultant.last_name}`}}</h6>
                                <h6 class="isansFont--faNum" v-if="hasSoldStorePaidPackagePhase">
                                    {{soldPackagePhase.detailed_title}}</h6>
                            </div>
                            <p class="cartsWrapper-discounts-title-consultant--status success isansFont--faNum"
                               v-if="order.status != 'paid'">
                                موفق
                            </p>
                        </div>

                        <div class="cartsWrapper-title-actions" v-if="hasTimeSlot">
                            <router-link
                                    :to="`/consultants/${getConsultantSlugFromUrl(firstTimeSlot.consultant.url)}`">
                                ثبت نظر
                            </router-link>
                        </div>
                        <div class="cartsWrapper-title-actions" v-if="hasSoldStorePaidPackagePhase">
                            <router-link :to="`/user/userpackages/`">
                                مشاهده پکیج ها
                            </router-link>
                            <router-link :to="`/user/userpackages/staging/form`" v-if="isShowingPackageStaging">
                                تکمیل فرم اطلاعات پکیج
                            </router-link>
                        </div>
                    </div>

                    <div class="cartsWrapper-meta isansFont--faNum">
                        <p>
                            <span>شماره سفارش :</span>
                            <span class="gadugiFont">{{order.order_id}}</span>
                        </p>

                        <p>
                            <span>مبلغ سفارش :</span>
                            <span :classs="[{'isansFont' : !$store.getters.isiran}]">{{`${order.total} تومان`}}</span>
                        </p>

                        <p v-if="order.used_discount">
                            <span>تخفیف :</span>
                            <span :classs="[{'isansFont' : !$store.getters.isiran}]">{{`${order.used_discount.amount} تومان`}}</span>
                        </p>

                        <p v-if="order.used_discount">
                            <span>با کد تخفیف :</span>
                            <span class="gadugiFont">{{order.used_discount.code}}</span>
                        </p>

                        <p>
                            <span>تاریخ ثبت سفارش :</span>
                            <span :class="[{'isansFont' : !$store.getters.isiran}]">{{getJalali(order.created).locale($store.getters.locale).format('YYYY/MM/DD HH:mm')}}</span>
                        </p>
                    </div>

                    <div class="cartsWrapper-item" v-for="phase in order.sold_store_paid_package_phases">
                        <p class="cartsWrapper-item--day isansFont">{{phase.title}}</p>

                        <p class="isansFont--faNum cartsWrapper-item-length">
                            وضعیت فعلی {{phase.title}} :
                            <span>{{getPhaseStatusName(phase)}}</span>
                        </p>
                        <p v-if="!!phase.description">
                            توضیحات:
                            <br>
                            {{phase.description}}
                        </p>
                        <p v-else class="isansFont--faNum">
                             توضیحات تکمیلی برای {{phase.title}} تعریف نشده است.
                        </p>
                    </div>

                    <div class="cartsWrapper-item" v-for="(product, index) in order.sold_time_slot_sales" :key="index">
                        <p class="cartsWrapper-item--day"
                           :class="[{'isansFont--faNum' : $store.getters.isiran, 'isansFont' : !$store.getters.isiran}]">
                            {{getJalali(product.start_time).locale($store.getters.locale).format('dddd DD MMMM')}}</p>
                        <p class="isansFont--faNum cartsWrapper-item-length">
                            <i class="material-icons">alarm_on</i>
                            <span :class="[{'isansFont' : !$store.getters.isiran}]">{{getJalali(product.start_time).locale($store.getters.locale).format('HH:mm')}}</span>
                            <span :class="[{'isansFont' : !$store.getters.isiran}]">{{getJalali(product.end_time).locale($store.getters.locale).format('HH:mm')}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import jalali from 'jalali-moment'
    import PackageStaging from "@/components/Packages/PackageStaging";


    export default {
        name: "UserOrderItem",
        components: {
            'package-staging': PackageStaging,
        },
        data() {
            return {
                order: null,
                availablePhaseStatuses: [
                    {value: 'in_progress', name: 'در حال انجام'},
                    {value: 'pay_to_start', name: 'نیازمند پرداخت برای شروع'},
                    {value: 'not_started', name: 'شروع نشده'},
                    {value: 'done', name: 'انجام شده'}
                ],
            }
        },
        created() {
            this.initComp();
        },
        computed: {
            hasTimeSlot() {
                return this.order && this.order.sold_time_slot_sales.length > 0;
            },

            hasSoldStorePaidPackagePhase() {
                return this.order && this.order.sold_store_paid_package_phases.length > 0;
            },

            isShowingPackageStaging() {
                return this.hasSoldStorePaidPackagePhase && this.order.sold_store_paid_package_phases[0].phase_number == 1;
            },

            showOrder() {
                return this.hasTimeSlot || this.hasSoldStorePaidPackagePhase;
            },

            firstTimeSlot() {
                if (this.hasTimeSlot) {
                    return this.order.sold_time_slot_sales[0]
                } else {
                    return null;
                }
            },

            soldPackagePhase() {
                if (this.hasSoldStorePaidPackagePhase) {
                    return this.order.sold_store_paid_package_phases[0]
                } else {
                    return null;
                }
            },
        },
        methods: {
            getJalali(date) {
                return jalali(date);
            },

            getPhaseStatusName(phase) {
                if(this.hasSoldStorePaidPackagePhase) {
                    return (this.availablePhaseStatuses.find(status => status.value === phase.status)).name;
                } else {
                    return '';
                }
            },


            initComp() {
                this.getOrder();
            },

            async getOrder() {
                try {
                    this.order = (await this.$api.get(`${this.$store.getters.getApi}/order/orders/${this.$route.params.id}/`, this.$store.getters.httpConfig)).data;

                    console.log('current order ', this.order);
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                }
            },
            getConsultantSlugFromUrl(url) {
                let splitted = url.split("/");
                if (splitted[splitted.length - 1] == "") {
                    return splitted[splitted.length - 2];
                } else {
                    return splitted[splitted.length - 1];
                }
            },
        }

    }
</script>

<style scoped>

    .activeCart {
        margin-top: 30px;
    }

    .cartsWrapper {
        border-radius: 10px;
        background-color: white;
        box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.2);
        padding: 10px;
    }

    .cartsWrapper:not(:first-child) {
        margin-top: 15px;
    }

    .cartsWrapper-title {
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px;
    }

    .cartsWrapper-discounts-title-consultant--status {
        font-size: 14px;
        font-weight: bold;
    }

    .cartsWrapper-discounts-title-consultant--status.failed {
        background-color: #FCECED;
        border-radius: 15px;
        padding: 5px 25px;
        color: #894E50;
    }

    .cartsWrapper-title-consultant {
        display: flex;
        align-items: center;
    }

    .cartsWrapper-title-consultant img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        margin-left: 10px;
    }

    .cartsWrapper-title-consultant--info {
        display: flex;
        flex-direction: column;
    }

    .cartsWrapper-title-consultant--info h5, h6 {
        margin: 0;
        font-weight: bold;
    }

    .cartsWrapper-title-consultant--info h6 {
        margin-right: 5px;
        font-weight: normal;
    }

    .cartsWrapper-item {
        padding-right: 50px;
        padding-left: 50px;
        margin-bottom: 15px;
    }

    .cartsWrapper-item--day {
        font-size: 12px;
        color: #A0A0A0;
    }

    .cartsWrapper-item-length {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        background-color: #F2F2F2;
        border-radius: 10px;
        padding: 10px 10px;
        color: #767676;
    }

    .cartsWrapper-item-length span:nth-child(2) {
        margin-left: auto;
        margin-right: 10px;
    }

    .cartsWrapper-item-length-price-discount span:nth-child(2) {
        color: #50bc81;
        font-weight: bold;
    }

    .cartsWrapper-item-safe i {
        margin-left: 10px;
    }

    .cartsWrapper-title i {
        margin-left: 5px;
    }

    .cartsWrapper-price--meta {
        margin: auto auto auto 20px;
        display: flex;
        align-items: center;
    }

    .cartsWrapper-price--meta strong {
        margin-right: 5px;
        margin-left: 5px;
        font-size: 20px;
    }

    .cardConsultantBlock--info h4 {
        font-weight: bold;
        margin: 0 10px 0 0;
    }


    .cardConsultantBlock--info p {
        font-size: 15px;
        margin: 10px 20px;
        color: #666;
    }

    .timesCollapse p {
        font-size: 12px;
        text-align: right;
        display: flex;

        align-items: center;
        justify-content: flex-start;
    }

    .timesCollapse button {
        margin: 0;
        padding: 10px;
    }

    .code-text {
        margin-bottom: 0;
        margin-right: 30px
    }

    .code-text.success mark {
        color: #4cc26c;
        background-color: inherit;
        font-weight: bold;
    }

    .code-text.error {
        color: #E46465;
    }

    .cartsWrapper-title-actions {
        display: flex;
        align-items: center;
    }

    .cartsWrapper-title-actions button {
        margin-left: 20px;
        padding: 8px 30px;
        border: none;
        border-radius: 15px;
        background-color: #9038CC;
        color: white;
        font-size: 14px;
    }

    .cartsWrapper-title-actions a {
        margin-right: 20px;
        padding: 8px 30px;
        border: none;
        color: #9038CC;
        font-size: 14px;
    }

    .cartsWrapper-meta {
        margin-top: 20px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        padding-right: 20px;
        padding-left: 20px;
        flex-wrap: wrap;
    }

    .cartsWrapper-meta p span:first-child {
        color: #999;
        margin-left: 5px;
    }

    @media only screen and (max-width: 991.8px) and (min-width: 576.8px) {
        .payWrapper, .cartsWrapper {
            border-radius: 0;
            box-shadow: none;
        }

        .cartsWrapper-title-consultant {
            flex-wrap: wrap;
            justify-content: center;
        }

        .cartsWrapper-item {
            padding-right: 0;
            padding-left: 0;
        }

        .cartsWrapper-title {
            flex-wrap: wrap;
        }
    }

    @media only screen and (max-width: 576.8px) {
        .payWrapper, .cartsWrapper {
            border-radius: 0;
            box-shadow: none;
        }

        .cartsWrapper-title-consultant {
            flex-wrap: wrap;
            justify-content: center;
        }

        .activeCart {
            padding-bottom: 260px;
        }

        .cartsWrapper-item {
            padding-right: 0;
            padding-left: 0;
        }

        .cartsWrapper-title {
            flex-direction: column;
            align-items: center;
        }

        .cartsWrapper-title-actions {
            margin-top: 15px;
        }

        .cartsWrapper-meta {
            flex-wrap: wrap;
        }
    }
</style>
