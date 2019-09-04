<template>
    <nav id="topNavbar" class="navbar navbar-light navbar-fixed-top">
        <div class="container navbarContainer">
            <Logo></Logo>
            <button type="button" class="navbar-toggle" @click="toggleMobileMenu()">
                <span class="sr-only">Toggle navigation</span>
                <i class="material-icons">menu</i>
            </button>

            <transition name="slide-fade">
                <div id="dropdownTogglerTarget" class="mobileMenu" v-if="mobileMenuShow">
                    <button @click="toggleMobileMenu()" class="closeButton">
                        <i class="material-icons">close</i>
                    </button>
                    <Logo class="mobileLogo"></Logo>
                    <div class="profileWrapper">
                        <div class="dropdown authButton" v-if="showProfileLink">
                            <button href="#" style="margin-left:5px;"
                                    class="dropdown-toggle btn btn-white btn-round gadugiFont isansFont"
                                    data-toggle="dropdown"
                                    aria-expanded="false">
                                <i class="material-icons">account_circle</i>
                                <span style="margin-right:5px;">پروفایل</span>
                                <b style="margin-right:5px;" class="caret"></b>
                            </button>
                            <router-link to="/user/cart" class="btn btn-fab btn-fab-mini isansFont"
                                         :class="[{'btn-white' : !activeCart || activeCart.time_slot_sales.length == 0},{'btn-rose' : activeCart && activeCart.time_slot_sales.length > 0}]">
                                <i class="material-icons">shopping_cart</i>
                            </router-link>
                            <ul class="dropdown-menu dropdown-menu-right left-0 isansFont gadugiFont profileDropDownMenu">
                                <li class="text-right">
                                    <router-link to="/user/profile">ناحیه کاربری</router-link>
                                </li>
                                <li class="text-right">
                                    <router-link to="/user/reserved">جلسات رزرو شده</router-link>
                                </li>
                                <li class="text-right">
                                    <router-link to="/user/order">فاکتور ها</router-link>
                                </li>
                                <li class="text-right">
                                    <router-link to="/user/messages">پیام ها FIXME</router-link>
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

                        <router-link to="/login" class="btn btn-rose isansFont authButton navbar-left" v-else>
                            <i class="material-icons">person</i>
                            ورود | ثبت نام
                        </router-link>
                    </div>
                    <ul class="menuList isansFont">
                        <li class="text-right" v-for="item in this.topMenuListItems"
                            v-bind:class="[{'dropdown':item.hasDropdown}]">
                            <a href="#" v-if="item.hasDropdown && item.type == 'router'" class="dropdown-toggle"
                               data-toggle="dropdown">
                                <span>{{item.itemName}}</span>
                                <b class="caret"></b>
                            </a>

                            <a :href="item.target" v-else-if="item.hasDropdown && item.type == 'hyper'"
                               class="dropdown-toggle" target="_blank" data-toggle="dropdown">
                                <span>{{item.itemName}}</span>
                                <b class="caret"></b>
                            </a>

                            <router-link v-else-if="!item.hasDropdown && item.type == 'router'" :to="item.target">
                                {{item.itemName}}
                            </router-link>

                            <a :href="item.target" v-else-if="!item.hasDropdown && item.type == 'hyper'"
                               target="_blank">{{item.itemName}}</a>

                            <ul v-if="item.hasDropdown" class="dropdown-menu customRadius">
                                <li v-for="dropdownItem in item.dropdownItems"
                                    v-bind:class="[{'dropdown' : dropdownItem.hasDropdown}]">
                                    <router-link v-bind:to="dropdownItem.target" v-if="dropdownItem.type == 'router'">
                                        {{dropdownItem.itemName}}
                                    </router-link>
                                    <a v-bind:href="dropdownItem.target" v-else-if="dropdownItem.type == 'hyper'"
                                       target="_blank">{{dropdownItem.itemName}}</a>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </transition>

            <div id="dropdownTogglerTarget" v-if="!mobileMenuShow">
                <ul class="menuList isansFont">


                    <li class="text-right" v-for="item in this.topMenuListItems"
                        v-bind:class="[{'dropdown':item.hasDropdown}]">
                        <a href="#" v-if="item.hasDropdown && item.type == 'router'" class="dropdown-toggle"
                           data-toggle="dropdown">
                            <span>{{item.itemName}}</span>
                            <b class="caret"></b>
                        </a>

                        <a :href="item.target" v-else-if="item.hasDropdown && item.type == 'hyper'"
                           class="dropdown-toggle" target="_blank" data-toggle="dropdown">
                            <span>{{item.itemName}}</span>
                            <b class="caret"></b>
                        </a>

                        <router-link v-else-if="!item.hasDropdown && item.type == 'router'" :to="item.target">
                            {{item.itemName}}
                        </router-link>

                        <a :href="item.target" v-else-if="!item.hasDropdown && item.type == 'hyper'"
                           target="_blank">{{item.itemName}}</a>

                        <ul v-if="item.hasDropdown" class="dropdown-menu customRadius">
                            <li v-for="dropdownItem in item.dropdownItems"
                                v-bind:class="[{'dropdown' : dropdownItem.hasDropdown}]">
                                <router-link v-bind:to="dropdownItem.target" v-if="dropdownItem.type == 'router'">
                                    {{dropdownItem.itemName}}
                                </router-link>
                                <a v-bind:href="dropdownItem.target" v-else-if="dropdownItem.type == 'hyper'"
                                   target="_blank">{{dropdownItem.itemName}}</a>
                            </li>
                        </ul>
                    </li>

                </ul>
            </div>


            <div class="profileWrapper">
                <div class="dropdown authButton" v-if="showProfileLink">
                    <button href="#" style="margin-left:5px;"
                            class="dropdown-toggle btn btn-white btn-round gadugiFont isansFont" data-toggle="dropdown"
                            aria-expanded="false">
                        <i class="material-icons">account_circle</i>
                        <span style="margin-right:5px;">پروفایل</span>
                        <b style="margin-right:5px;" class="caret"></b>
                    </button>
                    <router-link to="/user/cart" class="btn btn-fab btn-fab-mini isansFont"
                                 :class="[{'btn-white' : !activeCart || activeCart.time_slot_sales.length == 0},{'btn-rose' : activeCart && activeCart.time_slot_sales.length > 0}]">
                        <i class="material-icons">shopping_cart</i>
                    </router-link>
                    <ul class="dropdown-menu dropdown-menu-right left-0 isansFont gadugiFont profileDropDownMenu">
                        <li class="text-right">
                            <router-link to="/user/profile">ناحیه کاربری</router-link>
                        </li>
                        <li class="text-right">
                            <router-link to="/user/reserved">جلسات رزرو شده</router-link>
                        </li>
                        <li class="text-right">
                            <router-link to="/user/order">فاکتور ها</router-link>
                        </li>
                        <li class="text-right">
                            <router-link to="/user/messages">پیام ها FIXME</router-link>
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

                <router-link to="/login" class="btn btn-rose isansFont authButton navbar-left" v-else>
                    <i class="material-icons">person</i>
                    ورود | ثبت نام
                </router-link>
            </div>
        </div>


    </nav>

</template>

<script>
    import Logo from './LogoComponent';


    export default {
        name: "TopMenu",
        components: {
            Logo
        },
        data: function () {
            return {
                topMenuListItems: [
                    {itemName: 'صفحه اصلی', target: '/', type: 'router', hasDropdown: false, dropdownItems: []},
                    {
                        itemName: 'مشاوران',
                        target: '/consultants',
                        type: 'router',
                        hasDropDown: false,
                        dropdownItems: []
                    },
                    {
                        itemName: 'مشاوره اپلای',
                        target: '/consultant/apply',
                        type: 'router',
                        hasDropdown: false,
                        dropdownItems: []
                    },
                    // {itemName: 'مشاوره کسب و کار' , target : '/consultant /business', type : 'router', hasDropdown: false, dropdownItems: []},
                    {
                        itemName: 'بلاگ',
                        target: 'http://sneeds.ir/%d8%a8%d9%84%d8%a7%da%af/',
                        type: 'hyper',
                        hasDropdown: false,
                        dropdownItems: []
                    },
                    {
                        itemName: 'مصاحبه',
                        target: 'http://sneeds.ir/category/conversation/',
                        type: 'hyper',
                        hasDropdown: true,
                        dropdownItems: [
                            {
                                itemName: 'مصاحبه اپلای',
                                target: 'http://sneeds.ir/category/conversation/%d9%85%d8%b5%d8%a7%d8%ad%d8%a8%d9%87-%d8%a7%d9%be%d9%84%d8%a7%db%8c/',
                                type: 'hyper',
                                hasDropdown: false,
                                dropdownItems: []
                            },
                            {
                                itemName: 'مصاحبه ویژه',
                                target: 'http://sneeds.ir/category/conversation/%d9%85%d8%b5%d8%a7%d8%ad%d8%a8%d9%87-%d9%88%db%8c%da%98%d9%87/',
                                type: 'hyper',
                                hasDropdown: false,
                                dropdownItems: []
                            },
                            {
                                itemName: 'لایو اینستاگرامی',
                                target: 'http://sneeds.ir/category/conversation/%d9%84%d8%a7%db%8c%d9%88-%d8%a7%db%8c%d9%86%d8%b3%d8%aa%d8%a7%da%af%d8%b1%d8%a7%d9%85%db%8c/',
                                type: 'hyper',
                                hasDropdown: false,
                                dropdownItems: []
                            },
                        ]
                    },
                    {
                        itemName: 'درباره ما',
                        target: '/in-touch/aboutus',
                        type: 'router',
                        hasDropdown: false,
                        dropdownItems: []
                    },
                    {
                        itemName: 'تماس با ما',
                        target: '/in-touch/contact',
                        type: 'router',
                        hasDropdown: false,
                        dropdownItems: []
                    },
                ],
                mobileMenuShow: false,
                mobileMenuStyle: '',
                mobileMenuWidth: 0,
            }
        },
        watch: {},
        mounted() {
        },
        computed: {
            showProfileLink: function () {
                return this.$store.getters.isLoggedIn;
            },
            showConsultantsManagerLink: function () {
                return this.$store.getters.getUserInfo.is_consultant;
            },
            activeCart: function () {
                return this.$store.getters.getCart;
            }
        }, methods: {
            logout: function () {
                this.$store.dispatch('logout');
                this.$router.push('/login');
            },
            toggleMobileMenu: function () {
                console.log('toggle mobile menu');
                this.mobileMenuShow = !this.mobileMenuShow;
            }
        }
    }
</script>

<style scoped>

    .navbar {
        margin-bottom: 0;
    }

    .navbarContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

        padding-right: 0;
        padding-left: 0;
    }

    .authButton {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .navbar-toggle {
        float: none;
        margin: 0;
        padding-right: 0;
        padding-left: 0;
    }

    #dropdownTogglerTarget {
        margin: auto;
    }

    #dropdownTogglerTarget > ul {
        margin-bottom: 0;
        list-style: none;
        display: flex;
        align-items: center;
        padding: 0;
    }

    #dropdownTogglerTarget ul li {
        margin-left: 5px;
        margin-right: 5px;
    }

    #dropdownTogglerTarget > ul li a {
        color: #333;
        padding: 10px 15px;
        border-radius: 5px;
        transition: all 0.1s ease-in-out;
        font-size: 13px;
    }

    #dropdownTogglerTarget > ul li a.router-link-exact-active {
        background-color: #eee;
    }

    #dropdownTogglerTarget > ul li > a[aria-expanded="true"] {
        background-color: #eee;
    }

    #dropdownTogglerTarget ul.dropdown-menu li:hover > a {
        color: white;
    }

    #dropdownTogglerTarget ul.dropdown-menu {
        flex-direction: column;
        margin-top: 10px;
    }

    #dropdownTogglerTarget ul.dropdown-menu li {
        margin-right: 0;
        margin-left: 0;
    }

    @media only screen and (max-width: 991.8px) and (min-width: 0) {

        /* Enter and leave animations can use different */
        /* durations and timing functions.              */
        .slide-fade-enter-active {
            transition: all 1s ease;
        }

        .slide-fade-leave-active {
            transition: all 1s ease;
        }

        .slide-fade-enter, .slide-fade-leave-to
            /* .slide-fade-leave-active below version 2.1.8 */
        {
            transform: translateX(10px);
            opacity: 0;
        }

        #dropdownTogglerTarget {
            display: none;
        }

        #dropdownTogglerTarget.mobileMenu {
            padding-top: 20px;
            display: flex;
            position: fixed;
            justify-content: center;
            top: 0;
            right: 0;
            height: 100vh;
            width: 100%;
            background-color: white;
            z-index: 999;
            transition: all 0.3s ease-in;
        }

        #dropdownTogglerTarget.mobileMenu .closeButton {
            position: absolute;
            right: 10px;
            top: 20px;
            background-color: white;
            color: #8a8a8a;
            border: none;
            text-align: center;
        }

        #dropdownTogglerTarget.mobileMenu .mobileLogo {
            left: 0;
            top: 10px;
            position: absolute;
        }

        #dropdownTogglerTarget.mobileMenu > ul {
            flex-direction: column;
            margin-top: 30px;
        }

        #dropdownTogglerTarget.mobileMenu > ul li {
            margin-top: 20px;
            margin-right: 0;
            margin-left: 0;
        }

        #dropdownTogglerTarget.mobileMenu > ul li span {
            margin-right: 0;
        }

        #dropdownTogglerTarget.mobileMenu ul.dropdown-menu li {
            margin-top: 5px;
            margin-bottom: 5px;
        }

        #dropdownTogglerTarget.mobileMenu .profileWrapper {
            display: block;
            margin-right: 0;
            margin-top:30px;
        }

        ul.dropdown-menu {
            margin-right: -40px;
        }

        .navbar-toggle {
            order: 0;
            margin-right: 10px;
            margin-left: auto;
            display: block;
        }

        .profileWrapper {
            margin-right: auto;
            order: 1;
            display: none;
        }
    }
</style>