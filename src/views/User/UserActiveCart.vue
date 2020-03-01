<template>
        <div class="profile-content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12 cartsWrapper" v-if="cart != undefined">
                        <h2 class="cartsWrapper-title isansFont--faNum">
                            <i class="material-icons text-primary">done</i>
                            پرداخت فاکتور
                        </h2>
                        <p class="cartsWrapper-text isansFont--faNum">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
                        </p>
                        <div class="cartsWrapper-price">
                            <button @click="requestPayment()" class="cartsWrapper-price--button isansFont--faNum">پرداخت فاکتور</button>
                            <p class="cartsWrapper-price--meta isansFont--faNum">
                                مبلغ قابل پرداخت :
                                <strong> {{cart.total}} </strong>
                                ریال
                            </p>
                            <form @submit.prevent="checkDiscountCode()" class="cartsWrapper-price--discount">
                                <input type="text" placeholder="کد تخفیف" class="isansFont--faNum" v-model.trim="inputCode">
                                <button class="isansFont--faNum">اعمال کد</button>
                            </form>
                        </div>
                        <div class="cartsWrapper-discounts isansFont--faNum" v-if="discounts.length > 0">
                            کد تخفیف ثبت شده :
                            <p v-for="(discount, index) in discounts" :key="index">
                                <button class="btn btn-sm btn-simple btn-danger" @click="deleteDiscountById(discount.id)">
                                    <i class="material-icons">close</i>
                                </button>
                                {{discount.code}}
                            </p>
                        </div>
                    </div>
                    <div class="col-md-12 cartsWrapper" v-else>
                        <p class="isansFont--faNum">فاکتوری برای نمایش وجود ندارد</p>
                    </div>

                    <div class="col-md-12 infoWrapper">
                        <p class="text-center" style="direction:ltr">Carts history coming soon</p>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    import axios from 'axios'
    import jalali from 'jalali-moment'
    export default {
        name: "UserActiveCart",
        data() {
            return {
                cart : {},
                cartProducts : [],
                discounts : [],
                inputCode: ''
            }
        },
        created() {
            this.initComp();
        },
        methods: {
            getJalali(date) {
                return jalali(date);
            },

            async initComp() {
                await this.getLastCart();
                await this.getCartProducts();
                await this.getDiscountsOnThisCart();
            },

            async getLastCart() {
                try {
                    this.$loading(true);
                    let result = await axios.get(`${this.$store.getters.getApi}/cart/carts/`,this.$store.getters.httpConfig);
                    console.log(result);
                    this.cart = result.data[result.data.length - 1];
                    console.log('current last cart ', this.cart);
                } catch (e) {
                    console.log(e);
                    if(e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },

            async getCartProducts() {
                try {
                    this.$loading(true);
                    for(let productId of this.cart.products) {
                        let result = await axios.get(`${this.$store.getters.getApi}/store/time-slot-sales/${productId}/`, this.$store.getters.httpConfig);
                        console.log(result);
                        this.cartProducts.push(result.data);
                    }
                } catch (e) {
                    console.log(e);
                    if(e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },

            async checkDiscountCode() {
                try {
                    this.$loading(true);
                    let result = await axios.post(`${this.$store.getters.getApi}/discount/cart-consultant-discounts/`,{"cart" : this.cart.id,"code" : this.inputCode}, this.$store.getters.httpConfig);
                    console.log('code result : ', result);
                    this.inputCode = '';
                    await this.initComp();
                } catch (e) {
                    console.log(e);
                    if(e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },

            async getDiscountsOnThisCart() {
                try {
                    this.$loading(true);
                    let result = await axios.get(`${this.$store.getters.getApi}/discount/cart-consultant-discounts/?cart=${this.cart.id}`, this.$store.getters.httpConfig);
                    console.log('discounts for this cart :', result);
                    this.discounts = result.data;
                } catch (e) {
                    console.log(e);
                    if(e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },

            async deleteDiscountById(id) {
                try {
                    this.$loading(true);
                    let result = await axios.delete(`${this.$store.getters.getApi}/discount/cart-consultant-discounts/${id}`, this.$store.getters.httpConfig);
                    console.log('delete for this cart :', result);
                    await this.initComp();
                } catch (e) {
                    console.log(e);
                    if(e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            },


            getConsultantSlugFromUrl(url) {
                let splitted = url.split("/");
                return splitted[splitted.length - 1];
            },

            async requestPayment() {
                try {
                    this.$loading(true);
                    let result = await axios.post(`${this.$store.getters.getApi}/payment/request/`, {"cartid" : this.cart.id} ,this.$store.getters.httpConfig);
                    console.log(result);
                    window.open(result.data.redirect, '_blank');
                } catch (e) {
                    console.log(e);
                    if(e.response) {
                        console.log(e.response);
                    }
                } finally {
                    this.$loading(false);
                }
            }
        }

    }
</script>

<style scoped>
    .cartsWrapper {
        border-radius: 10px;
        background-color: white;
        box-shadow: 0 0 3px 1px rgba(0,0,0,0.2);
        padding-bottom: 10px;
        padding-top: 10px;
        margin-top: 30px;
    }

    .cartsWrapper-title {
        font-size: 18px;
        display: flex;
        align-items: center;
        margin-top:10px;
        margin-bottom: 10px;
    }

    .cartsWrapper-title i {
        margin-left: 5px;
    }

    .cartsWrapper-text {
        padding-right: 20px;
        padding-left: 20px;
        margin-top:10px;
        margin-bottom:10px;
        line-height:2.5rem;
        font-size: 15px;
        color: #999;
    }

    .cartsWrapper-price {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        flex-direction: row-reverse;
        padding-right: 20px;
        padding-left:20px;
        margin-bottom: 20px;
        margin-top: 20px;
    }

    .cartsWrapper-price--button {
        border: none;
        background-color: #9038CC;
        color: white;
        padding: 10px 25px;
        border-radius: 10px;
    }

    .cartsWrapper-price--discount {
        display: flex;
        position: relative;
    }

    .cartsWrapper-price--discount input {
        border-radius: 0 10px 10px 0;
        border:1px solid #ccc;
        background-color: #e3e3e3;
        height: 40px;
        padding-right: 5px;
    }

    .cartsWrapper-price--discount button {
        border-radius: 10px;
        height: 40px;
        position:absolute;
        border:1px solid #4cc26c;
        left: -20px;
        background-color: white;
        color: #4cc26c;
    }

    .cartsWrapper-price--meta {
        margin:auto auto auto 20px;
        display: flex;
        align-items: center;
    }

    .infoWrapper {
        border-radius: 10px;
        background-color: white;
        box-shadow: 0 0 3px 1px rgba(0,0,0,0.2);
        padding-bottom: 10px;
        padding-top: 10px;
        margin-top: 30px;
    }

    .priceWrapper {
        border-radius: 10px;
        border: 1px solid #999;
        background-color: white;
    }

    .cardConsultBlock--image {
        height: 100px;
        width: 100px;
        border-radius: 10px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        margin-right: 15px;
    }

    .cardConsultBlock {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        margin-top: 20px;
    }

    .cardConsultantBlock--price {
        margin-right: auto;
    }

    .cardConsultantBlock--info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        flex-grow: 2;
        align-self: stretch;
    }

    .cardConsultantBlock--info h4 {
        font-weight: bold;
        margin: 0 10px 0 0;
    }


    .cardConsultantBlock--info p {
        font-size: 15px;
        margin:10px 20px;
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

    .priceWrapper--discountCodeBox {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .priceWrapper--discountCodeBox form {
        display: flex;
        justify-content: center;
    }

    .priceWrapper--discountCodeBox form input[type="text"] {
        border-radius: 30px;
        padding: 5px 10px;
        border: none;
        background-color: #f0f0f0;
        height: 40px;
    }

    .priceWrapper--discountCodeBox form button {
        border-radius: 30px;
        background-color: #22B473;
        color: white;
        border: none;
        height: 40px;
        font-size: 12px;
        padding-right: 10px;
        padding-left: 10px;
        position: relative;
        margin-right: -50px;
    }

    .cartsWrapper-discounts {
        padding-right: 20px;
    }

    .cartsWrapper-discounts button{
        padding: 5px;
        margin-left: 5px;
        margin-top: 0;
        margin-bottom: 0;
    }

    @media only screen and (max-width: 991.8px) and (min-width: 0) {
        .priceWrapper {
            margin-right: 0;
            margin-top: 15px;
        }

        .cardsWrapper {
            margin-right: 0;
        }
    }
</style>
