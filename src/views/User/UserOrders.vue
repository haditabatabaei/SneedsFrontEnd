<template>
    <div class="container-fluid itemBlock gadugiFont">
        <div class="row">
            <div class="order-table-head gadugiFont">
                <p>
                    Title
                </p>
                <p>
                    Price (Tomans)
                </p>
                <p>
                    Date (DD/MM/YYYY  HH:mm)
                </p>
                <p>
                    Status
                </p>
            </div>
            <div class="order-item" @click="$router.push(`/user/orders/${order.id}`)" v-for="order in orders" :class="[{'success' : order.status == 'paid'}, {'failed' : order.status != 'paid'}]">
                <div class="order-item-title">
                    <i class="material-icons text-rose">alarm_on</i>
                    <p>
                        <span v-if="hasTimeSlot(order)">
                            Online consulting session
                        </span>
                        <span v-else-if="hasSoldStorePaidPackagePhase(order)">
                            {{soldPackagePhase(order).title}}
                        </span>
                        <span v-else>
                            No Data
                        </span>
                        <span v-if="hasTimeSlot(order)">
                            {{firstTimeSlot(order).consultant.first_name + " " + firstTimeSlot(order).consultant.last_name}}
                        </span>
                        <span v-else-if="hasSoldStorePaidPackagePhase(order) && !!soldPackagePhase(order).description">
                            With description
                        </span>
                        <span v-else>
                            Without description
                        </span>
                    </p>
                </div>

                <p class="order-item-price">
                    {{order.total}}
                </p>

                <p class="order-item-date">
                    {{getJalali(order.updated).format('DD/MM/YYYY  HH:mm')}}
                </p>

                <div class="order-item-status gadugiFont">
                    <span class="success" v-if="order.status == 'paid'">Successful</span>
                    <span class="failed" v-else>Not Successful</span>
                    <i class="material-icons">keyboard_arrow_right</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import jalali from 'jalali-moment';

    export default {
        name: "UserOrders",
        data() {
            return {
                orders: []
            }
        },
        created() {
            this.getOrders();
        },
        computed: {

        },
        methods: {

            getJalali(date) {
                return jalali(date);
            },

            hasTimeSlot(order) {
                return order.sold_time_slot_sales.length > 0;
            },

            firstTimeSlot(order) {
                if(this.hasTimeSlot(order)) {
                    return order.sold_time_slot_sales[0]
                } else {
                    return null;
                }
            },

            hasSoldStorePaidPackagePhase(order) {
                return order.sold_store_paid_package_phases.length > 0;
            },

            soldPackagePhase(order) {
                if(this.hasSoldStorePaidPackagePhase(order)) {
                    return order.sold_store_paid_package_phases[0]
                } else {
                    return null;
                }
            },
            async getOrders() {
                try {
                    let result = await this.$api.get(`${this.$store.getters.getApi}/order/orders/`, this.$store.getters.httpConfig);
                    console.log(result);
                    this.orders = result.data;
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response);
                    }
                }
            }
        }
    }
</script>

<style scoped>

    .order-table-head {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        border-bottom: 3px solid #F7F7F7;
    }

    .itemBlock {
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        margin-top: 30px;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .order-item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        padding: 0;
        min-height: 50px;
        margin-top: 10px;
    }

    .order-item.success {
        border-left: 3px solid #4cc26c;
    }

    .order-item.failed {
        border-left: 3px solid #CE8E8F;
    }

    .order-item:hover {
        background-color: #efefef;
        cursor: pointer;
    }

    .order-item p {
        margin-bottom: 0;
    }

    .order-item-title {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        padding: 0;
    }

    .order-item-title p {
        display:flex;
        flex-direction: column;
        margin-left: 20px;
        font-weight: bold;
    }

    .order-item-title p span:nth-child(2) {
        font-size: 13px;
        color: #999;
        font-weight: normal;
    }

    .order-item-status {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .order-item-status span {
        padding:7px 20px;
        border-radius: 20px;
    }

    .order-item-status span.success {
        background-color : #E3FFFF;
        color: #687575;
    }

    .order-item-status span.failed {
        background-color : #FCE8EA;
        color: #BE878A;
    }

</style>
