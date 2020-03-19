<template>
    <nav class="topNavWrapper">
        <div class="container navbarContainer">
            <div class="mobileNavbarToggleWrapper">
                <transition name="fade" mode="out-in">
                    <i class="material-icons closeMenuButton" v-if="mobileMenuShow"
                       @click="$store.commit('toggleMobileMenuShow')">close</i>
                    <i class="material-icons openMenuButton" v-if="!mobileMenuShow"
                       @click="$store.commit('toggleMobileMenuShow')">menu</i>
                </transition>
            </div>
            <div class="LogoWrapper">
                <Logo />
            </div>
            <div class="menuWrapper">
                <ul class="menuList isansFont">
                    <li class="menuList--item"
                        v-for="(item, index) in this.topMenuListItems"
                        :key="index"
                        v-bind:class="[{'dropdown':item.hasDropdown}]">
                        <a
                            href="#"
                            v-if="item.hasDropdown && item.type === 'router'"
                            class="dropdown-toggle"
                            data-toggle="dropdown menuList--linkItem">
                            <span>{{item.itemName}}</span>
                            <b class="caret" />
                        </a>

                        <a :href="item.target" v-else-if="item.hasDropdown && item.type === 'hyper'"
                           class="dropdown-toggle menuList--linkItem" target="_blank" data-toggle="dropdown">
                            <span>{{item.itemName}}</span>
                            <b class="caret" />
                        </a>

                        <router-link v-else-if="!item.hasDropdown && item.type === 'router'" :to="item.target"
                                     class="menuList--linkItem">
                            {{item.itemName}}
                        </router-link>

                        <a class="menuList--linkItem" :href="item.target"
                           v-else-if="!item.hasDropdown && item.type === 'hyper'"
                           target="_blank">{{item.itemName}}</a>

                        <ul v-if="item.hasDropdown" class="dropdown-menu customRadius">
                            <li v-for="(dropdownItem, index) in item.dropdownItems"
                                :key="index"
                                v-bind:class="[{'dropdown' : dropdownItem.hasDropdown}]">
                                <router-link v-bind:to="dropdownItem.target" v-if="dropdownItem.type === 'router'">
                                    {{dropdownItem.itemName}}
                                </router-link>
                                <a v-bind:href="dropdownItem.target" v-else-if="dropdownItem.type === 'hyper'" target="_blank">{{dropdownItem.itemName}}</a>
                            </li>
                        </ul>
                    </li>

                </ul>
            </div>
            <div class="profileWrapper">
                <router-link to="/auth/login" class="btn btn-rose isansFont authButton navbar-left" v-if="!isLoggedIn">
                    <i class="material-icons">person</i>
                    ورود | ثبت نام
                </router-link>

                <div class="dropdown authButton" v-else>
                    <button href="#" style="margin-left:5px;"
                            class="dropdown-toggle btn btn-white btn-round gadugiFont isansFont"
                            data-toggle="dropdown"
                            aria-expanded="false">
                        <i class="material-icons">account_circle</i>
                        <span style="margin-right:5px;">پروفایل</span>
                        <b style="margin-right:5px;" class="caret" />
                    </button>
                    <ul class="dropdown-menu dropdown-menu-right left-0 isansFont gadugiFont profileDropDownMenu">
                        <li class="text-right">
                            <router-link to="/user/profile">اطلاعات کاربری</router-link>
                        </li>
                        <li class="text-right">
                            <router-link to="/user/sessions">جلسات مشاوره</router-link>
                        </li>
                        <li class="text-right">
                            <router-link to="/user/packages">پکیج ها</router-link>
                        </li>
                        <li class="text-right" v-if="!isConsultant">
                            <router-link to="/user/orders">پرداخت ها</router-link>
                        </li>
                        <li class="text-right">
                            <router-link to="/user/chatroom">چتروم</router-link>
                        </li>
                        <li class="divider" v-if="isConsultant" />
                        <li class="dropdown-header" v-if="isConsultant">پنل مشاور :</li>
                        <li class="text-right" v-if="isConsultant">
                            <router-link to="/user/calendar">مدیریت تقویم</router-link>
                        </li>
                        <li class="divider" />
                        <li><a @click.prevent="logout()" role="button" class="btn btn-danger">خروج</a></li>
                    </ul>
                </div>
            </div>


            <transition name="slide-fade">
                <div class="mobileMenu" v-if="mobileMenuShow">
                    <div class="mobileMenuListWrapper">
                        <ul class="mobileMenuList isansFont--faNum">
                            <li class="mobileMenuList--item" v-for="(item, index) in this.topMenuListItems" :key="index"
                                v-bind:class="[{'dropdown':item.hasDropdown}]">
                                <a href="#" v-if="item.hasDropdown && item.type === 'router'" class="dropdown-toggle"
                                   data-toggle="dropdown mobileMenuList--linkItem">
                                    <i class="material-icons" v-if="item.icon">{{item.icon}}</i>
                                    <span>{{item.itemName}}</span>
                                    <b class="caret"></b>
                                </a>

                                <a :href="item.target" v-else-if="item.hasDropdown && item.type === 'hyper'"
                                   class="dropdown-toggle mobileMenuList--linkItem" target="_blank"
                                   data-toggle="dropdown">
                                    <i class="material-icons" v-if="item.icon">{{item.icon}}</i>
                                    <span>{{item.itemName}}</span>
                                    <b class="caret"></b>
                                </a>

                                <router-link v-else-if="!item.hasDropdown && item.type === 'router'" :to="item.target"
                                             class="mobileMenuList--linkItem">
                                    <i class="material-icons" v-if="item.icon">{{item.icon}}</i>
                                    {{item.itemName}}
                                </router-link>

                                <a class="mobileMenuList--linkItem" :href="item.target"
                                   v-else-if="!item.hasDropdown && item.type === 'hyper'" target="_blank">
                                    <i class="material-icons" v-if="item.icon">{{item.icon}}</i>
                                    {{item.itemName}}
                                </a>

                                <ul v-if="item.hasDropdown" class="dropdown-menu customRadius">
                                    <li v-for="(dropdownItem, index) in item.dropdownItems" :key="index"
                                        v-bind:class="[{'dropdown' : dropdownItem.hasDropdown}]">
                                        <router-link v-bind:to="dropdownItem.target"
                                                     v-if="dropdownItem.type === 'router'">
                                            {{dropdownItem.itemName}}
                                        </router-link>
                                        <a v-bind:href="dropdownItem.target" v-else-if="dropdownItem.type === 'hyper'"
                                           target="_blank">{{dropdownItem.itemName}}</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="mobileMenuList--item" v-if="!isLoggedIn">
                                <router-link class="mobileMenuList--linkItem special" to="/auth/login">
                                    <i class="material-icons">person</i>
                                    ورود | ثبت نام
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="mobileMenuActionWrapper" v-if="isLoggedIn">
                        <ul class="mobileMenuList isansFont--faNum">
                            <li class="mobileMenuList--item">
                                <router-link to="/user/profile" class="mobileMenuList--linkItem">
                                    <i class="material-icons">keyboard_arrow_left</i>
                                    اطلاعات کاربری
                                </router-link>
                            </li>
                            <li class="mobileMenuList--item">
                                <router-link to="/user/sessions" class="mobileMenuList--linkItem">
                                    <i class="material-icons">keyboard_arrow_left</i>
                                    جلسات مشاوره
                                </router-link>
                            </li>
                            <li class="mobileMenuList--item">
                                <router-link to="/user/packages" class="mobileMenuList--linkItem">
                                    <i class="material-icons">keyboard_arrow_left</i>
                                    پکیج ها
                                </router-link>
                            </li>
                            <li class="mobileMenuList--item" v-if="!isConsultant">
                                <router-link to="/user/orders" class="mobileMenuList--linkItem">
                                    <i class="material-icons">keyboard_arrow_left</i>
                                    پرداخت ها
                                </router-link>
                            </li>
                            <li class="mobileMenuList--item">
                                <router-link to="/user/chatroom" class="mobileMenuList--linkItem">
                                    <i class="material-icons">keyboard_arrow_left</i>
                                    چتروم
                                </router-link>
                            </li>
                            <li class="mobileMenuList--item" v-if="isConsultant">
                                <router-link to="/user/calendar" class="mobileMenuList--linkItem">
                                    <i class="material-icons">keyboard_arrow_left</i>
                                    مدیریت تقویم
                                </router-link>
                            </li>
                            <li class="mobileMenuList--item">
                                <a @click.prevent="logout()" role="button" class="mobileMenuList--linkItem">
                                    <i class="material-icons">keyboard_arrow_left</i>
                                    خروج
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
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
                    {
                        itemName: 'صفحه اصلی',
                        target: '/',
                        type: 'router',
                        hasDropdown: false,
                        dropdownItems: [],
                        icon: 'home'
                    },
                    {
                        itemName: 'مشاوران',
                        target: '/consultants',
                        type: 'router',
                        hasDropDown: false,
                        dropdownItems: [],
                        icon: 'supervisor_account'
                    },
                    {
                        itemName: 'بلاگ',
                        target: 'http://sneeds.ir/%d8%a8%d9%84%d8%a7%da%af/',
                        type: 'hyper',
                        hasDropdown: false,
                        dropdownItems: [],
                        icon: 'table_chart'
                    },
                    {
                        itemName: 'درباره ما',
                        target: '/about',
                        type: 'router',
                        hasDropdown: false,
                        dropdownItems: [],
                        icon: 'info'
                    },
                    {
                        itemName: 'تماس با ما',
                        target: '/contact',
                        type: 'router',
                        hasDropdown: false,
                        dropdownItems: [],
                        icon: 'phone'
                    },
                ],
            }
        },
        computed: {
            isLoggedIn: function () {
                return this.$store.getters.isLoggedIn;
            },
            isConsultant: function () {
                return this.$store.getters.getUserInfo.user_type == 'consultant';
            },
            activeCart: function () {
                return this.$store.getters.getCart;
            },
            mobileMenuShow: function () {
                return this.$store.getters.getMobileMenuShow;
            }

        }, methods: {
            logout: function () {
                this.$store.dispatch('logout');
                this.$router.push('/auth/login');
            },
        }
    }
</script>

<style scoped>


    .topNavWrapper {
        width: 100%;
        position: fixed;
        min-height: 70px;
        top: 0;
        left: 0;
        background-color: white;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .navbarContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

        padding-right: 0;
        padding-left: 0;
        height: 100%;
    }


    .mobileNavbarToggleWrapper {
        display: none;
    }

    .menuWrapper {
        margin: auto;
    }

    .menuList {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-bottom: 0;
        padding-right: 0;

        list-style: none;
    }

    .menuList--item {
        margin-left: 5px;
        margin-right: 5px;
    }


    .menuList--linkItem {
        color: #333;
        padding: 10px 15px;
        border-radius: 5px;
        transition: all 0.1s ease-in-out;
        font-size: 13px;
    }

    .menuList--linkItem.router-link-exact-active {
        background-color: #eee;
    }

    .menuList--linkItem[aria-expanded="true"] {
        background-color: #eee;
    }

    .mobileMenu {
        display: none;
    }


    @media only screen and (max-width: 991.8px) and (min-width: 0) {
        /* Enter and leave animations can use different */
        /* durations and timing functions.              */
        .slide-fade-enter-active {
            transition: all 0.2s ease;
        }

        .slide-fade-leave-active {
            transition: all 0.2s ease;
        }

        .slide-fade-enter, .slide-fade-leave-to /*.slide-fade-leave-active below version 2.1.8 */
        {
            transform: translateX(10px);
            opacity: 0;
        }


        .mobileNavbarToggleWrapper {
            display: block;
            margin-right: 20px;
        }

        .mobileNavbarToggleWrapper i.material-icons {
            cursor: pointer;
        }

        .profileWrapper {
            display: none;
        }

        .menuWrapper {
            display: none;
        }

        .LogoWrapper {
            order: 1;
            margin-right: auto;
            margin-left: 20px;
        }

        .navbarContainer {
            width: 100%;
        }


        .mobileMenu {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            position: fixed;
            top: 0;
            right: 0;
            height: calc(100vh - 120px);
            margin-top: 120px;
            background-color: rgba(255, 255, 255, 1);
            width: 100%;
            z-index: 998;
        }

        .mobileMenuListWrapper {
            width: 50%;
            margin-top: 10px;
        }

        .mobileMenuList {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            width: 100%;

            padding-right: 0;
            list-style: none;
        }

        .mobileMenuList--item {
            align-self: stretch;
            /*border-bottom: 1px solid #333;*/

            display: flex;
            align-items: center;
            justify-content: flex-start;
        }

        .mobileMenuList--linkItem {
            color: #333;
            padding: 10px;
            width: 100%;
            font-size: 13px;
        }

        .mobileMenuList--linkItem:hover {
            background-color: #eee;
        }

        .mobileMenuList--linkItem span {
            margin-right: 0;
        }

        .mobileMenuList--linkItem i.material-icons {
            font-size: 14px;
            margin-left: 5px;
        }

        .mobileMenuList--linkItem.special {
            background-color: #e91e63;
            color: white;
            border-radius: 5px 0 0 5px;
        }

        .mobileMenuList--linkItem.router-link-exact-active {
            background-color: #eee;
        }

        .mobileMenuActionWrapper {
            display: flex;
            width: 50%;
            margin-top: 10px;
        }

        .cartTooltip {
            background-color: #d9534f;
            color:white;
            border-radius:5px;
            font-size:10px;
            padding-right:5px;
            padding-left:5px;
        }
    }
</style>
