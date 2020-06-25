<template>
    <section class="col-md-12 infoBlock">
        <h1 class="discounts-title isansFont">
            ایجاد کد تخفیف
        </h1>
        <div class="discounts-create isansFont--faNum">
            <label for="users" class="discounts-options">
                کاربر مورد نظر را انتخاب کنید :
                <select name="users" id="users" class="discounts-options-items" v-model="selectedUserId">
                    <option v-for="user in users" :value="user.id">{{`${user.first_name} ${user.last_name}`}}</option>
                </select>
            </label>
            <p class="discounts-amount">
                میزان تخفیف:
                <mark>100 درصد قیمت جلسه فعلی</mark>
            </p>
            <button class="discounts-add-button" @click="createNewDiscountCode">
                ایجاد کد تخفیف
            </button>
        </div>
        <div class="discounts-list">
            <table class="discounts-table">
                <thead>
                <tr class="discount-row--head isansFont">
                    <th>کد تخفیف</th>
                    <th>مقدار</th>
                    <th>تاریخ ایجاد</th>
                    <th>برای</th>
                    <th>استفاده شده؟</th>
                </tr>
                </thead>
                <tbody>
                <tr class="discount-row" v-for="discount in discounts">
                    <td class="discount-code-col isansFont--faNum">
                        <code>{{discount.code}}</code>
                    </td>
                    <td class="discount-price-col isansFont--faNum">
                        {{discount.amount}}
                    </td>
                    <td class="isansFont" :class="[{'isansFont--faNum': $store.getters.isiran}]">
                        {{getJalali(discount.created).locale($store.getters.locale).format('dddd DD MMMM YYYY')}}
                    </td>
                    <td>
                        <span v-for="user in discount.users">
                            {{`${user.first_name} ${user.last_name}`}}
                        </span>
                    </td>
                    <td>
                        <i class="material-icons" v-if="discount.is_used">done</i>
                        <i class="material-icons" v-else>close</i>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
    import jalali from 'jalali-moment';
    export default {
        name: "ConsultantDiscount",
        data() {
            return {
                users: [],
                discounts: [],
                selectedUserId: null,
            }
        },
        methods: {
            getJalali(date) {
                return jalali(date);
            },

            async getInteractingUsersRequest() {
                return this.$api.get(`${this.api}/discount/consultant-interact-users/`, this.httpConfig);
            },

            getCurrentDiscountsRequest() {
                return this.$api.get(`${this.api}/discount/consultant-discounts/`, this.httpConfig);
            },

            loadCreationData() {
                //this.$loading(true);
                Promise
                    .all([this.getInteractingUsersRequest(), this.getCurrentDiscountsRequest()])
                    .then(([usersRes, currentDiscountsRes]) => {
                        console.log('users res', usersRes, ' current discount res', currentDiscountsRes)
                        this.users = usersRes.data.interact_users;
                        this.discounts = currentDiscountsRes.data;
                    })
                    .catch(error => {
                        console.log(error);
                        if (error.response) {
                            console.log(error.response)
                        }
                    })
                    .finally(() => {

                    })
            },

            async createNewDiscountCode() {
                try {
                    if(this.selectedUserId) {
                        let payload = {
                            "users": [this.selectedUserId]
                        };
                        let createDiscountResult = await this.$api.post(`${this.api}/discount/consultant-discounts/`,payload  ,this.httpConfig);
                        console.log(createDiscountResult);
                        this.loadCreationData();
                    } else {
                    }
                } catch (e) {
                    if(e.response) {
                        console.log(e.response);
                    }
                }
            }
        },
        computed: {
            api() {
                return this.$store.getters.getApi;
            },
            httpConfig() {
                return this.$store.getters.httpConfig;
            }
        },
        created() {
            this.loadCreationData();
        }
    }
</script>

<style scoped>
    .infoBlock {
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        margin-top: 30px;
        padding-bottom: 15px;
    }

    .discounts-title {
        font-size: 18px;
        color: #303143;
        margin: 15px;
        font-weight: bold;
    }

    .discounts-create {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-wrap: wrap;
        width: 100%;
    }

    .discounts-options {
        display: flex;
        align-items: center;
        margin: 0;
    }

    .discounts-amount {
        margin: 0;
    }

    .discounts-add-button {
        padding: 0;
        margin: 0;
    }

    .discounts-options-items {
        width: 200px;
        height: 35px;
        border-radius: 5px;
        margin-right: 10px;
    }

    .discounts-amount {
        font-size: 14px;
    }

    .discounts-amount mark {
        padding: 0;
        background: none;
    }

    .discounts-add-button {
        padding: 8px 25px;
        border-radius: 5px;
        background-color: #8C3DDB;
        color: white;
        border: none;
    }

    .discounts-list {
        width: 100%;
    }

    .discounts-table {
        margin-top: 40px;
        width: 100%;
    }

    .discount-row--head {
        height: 50px;
    }

    .discount-row {
        border-top: 1px solid #ccc;
    }

    .discount-code-col {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }

    .discount-row code {
        padding: 5px 20px;
        margin: 10px 0;
    }

</style>