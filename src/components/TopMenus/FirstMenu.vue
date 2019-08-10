<template>
    <div class="container-fullwidth customContainer firstContainer navbar navbar-info">
        <div class="firstMenu">
            <div class="logoWrapper">
                <div class="navbar-header navbar-right pull-right">
                    <Logo></Logo>
                </div>
            </div>
            <div class="profileWrapper">
                <div class="dropdown authButton" v-if="showProfileLink">
                    <button href="#" class="dropdown-toggle btn btn-white gadugiFont isansFont"
                            data-toggle="dropdown"
                            aria-expanded="false">
                        <i class="material-icons">account_circle</i>
                        <span>پروفایل</span>
                        <b class="caret"></b>
                        <div class="ripple-container"></div>
                    </button>
                    <router-link to="/user/cart" class="btn btn-rose isansFont">
                        <i class="material-icons">shopping_cart</i>
                        <span>پروفایل</span>
                    </router-link>
                    <ul class="dropdown-menu dropdown-menu-right left-0 isansFont gadugiFont profileDropDownMenu">
                        <li class="text-right">
                            <router-link to="/user/profile">ناحیه کاربری</router-link>
                        </li>
                        <li class="text-right">
                            <router-link to="/user/reserved">جلسات رزرو شده</router-link>
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
        components: {
            Logo,
        },
        computed: {
            showProfileLink: function () {
                return this.$store.getters.isLoggedIn;
            },
            showConsultantsManagerLink: function () {
                return this.$store.getters.getUserInfo.is_consultant;
            }
        }, methods: {
            logout: function () {
                this.$store.dispatch('logout');
                this.$router.push('/login');
            },
        }
    }
</script>

<style scoped>

    .navbar.navbar-info .dropdown-menu li > a:hover {
        background-color: #00bcd4 !important;
    }

    .authButton .btn-white {
        margin-left: 5px;
    }

    .firstMenu {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .firstContainer {
        box-shadow: none;
        border-radius: 0;
        padding-right: 15px !important;
    }

    .customContainer .row {
        margin-left: 0;
    }


    .firstContainer .navbar-brand {
        margin: 5px 0;
    }

    .firstContainer .navbar-header {
        margin-right: -9px !important;
    }

    .authButton {
        margin-left: 15px;
    }


    .profileDropDownMenu {
        min-width: 122px !important;
    }

    .navbar {
        margin-bottom: 0;
    }

    .authButton .btn span {
        margin-right: 5px;
    }

    @media only screen and (max-width: 460px) and (min-width: 0) {
        .firstMenu {
            justify-content: space-around;
        }

        .authButton {
            margin-left: 0;
        }

        .authButton .btn span {
            display: none;
        }

        .authButton .btn {
            padding: 5px 20px;
            font-size: 11px;
        }

    }
</style>
