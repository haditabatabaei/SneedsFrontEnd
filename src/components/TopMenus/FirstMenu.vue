<template>
    <div class="container-fullwidth customContainer firstContainer navbar navbar-info navbar-transparent navbar-color-on-scroll" color-on-scroll=" ">
        <div class="row">
            <div class="col-md-4">
                <div class="navbar-header navbar-right pull-right">
                    <Logo></Logo>
                </div>
            </div>
            <div class="col-md-4 col-md-offset-4">
                <div class="dropdown navbar-left pull-left authButton" v-if="showProfileLink">
                    <button href="#" class="dropdown-toggle btn btn-white gadugiFont isansFont"
                            data-toggle="dropdown"
                            aria-expanded="false">
                        <i class="material-icons">account_circle</i>
                        پروفایل
                        <b class="caret"></b>
                        <div class="ripple-container"></div>
                    </button>
                    <router-link to="/user/cart" class="btn btn-rose isansFont">
                        <i class="material-icons">shopping_cart</i>
                        سبد خرید
                    </router-link>
                    <ul class="dropdown-menu dropdown-menu-right left-0 isansFont gadugiFont profileDropDownMenu">
                        <li class="text-right">
                            <router-link to="/user/profile">ناحیه کاربری</router-link>
                        </li>
                        <li class="text-right">
                            <router-link to="/user/profile">جلسات رزرو شده</router-link>
                        </li>
                        <li class="text-right">
                            <router-link to="/user/order">فاکتور های شما</router-link>
                        </li>
                        <li class="divider" v-if="showConsultantsManagerLink"></li>
                        <li class="dropdown-header" v-if="showConsultantsManagerLink">پنل مشاور :</li>
                        <li class="text-right" v-if="showConsultantsManagerLink">
                            <router-link to="/user/consultantmanager">مدیریت جلسات</router-link>
                        </li>
                        <li class="divider"></li>
                        <li><a @click.prevent="logout()" class="btn btn-danger">خروج</a></li>
                    </ul>
                </div>

                <router-link to="/login" class="btn btn-white isansFont authButton navbar-left pull-left" v-else>
                    <i class="material-icons">person</i>
                    ورود | ثبت نام
                </router-link>
            </div>
        </div>
    </div>

</template>

<script>
    import Logo from './LogoComponent';
    export default {
        name: "FirstMenu",
        components : {
            Logo,
        },
        computed:{
            showProfileLink : function(){
                return this.$store.getters.isLoggedIn;
            },
            showConsultantsManagerLink : function(){
                return this.$store.getters.getUserInfo.is_consultant;
            }
        },methods : {
            logout: function () {
              this.$store.dispatch('logout');
              this.$router.push('/login');
            },
        }
    }
</script>

<style scoped>
    .firstContainer {
        box-shadow: none;
        border-radius: 0;
        padding-right: 15px !important;
    }


    .firstContainer .navbar-brand {
        margin: 5px 0;
    }

    .firstContainer .navbar-header {
        margin-right: -9px !important;
    }

    .authButton {
        margin-top: 10px !important;
        margin-left: 15px;
    }


    .profileDropDownMenu {
        min-width: 122px !important;
    }

    .navbar{
        margin-bottom:0;
    }
</style>
