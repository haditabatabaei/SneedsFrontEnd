<template>
    <nav class="topNavWrapper" :class="[{'top-0': isNavFixedOnZero}]" id="topnav">
        <div v-if="profileDropdownMenuOpen" class="before-profileDropdown-overlay" @click="toggleProfileDropdown"></div>
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
                <sneeds-logo/>
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
                            <b class="caret"/>
                        </a>

                        <a :href="item.target" v-else-if="item.hasDropdown && item.type === 'hyper'"
                           class="dropdown-toggle menuList--linkItem" target="_blank" data-toggle="dropdown">
                            <span>{{item.itemName}}</span>
                            <b class="caret"/>
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
                                <a v-bind:href="dropdownItem.target" v-else-if="dropdownItem.type === 'hyper'"
                                   target="_blank">{{dropdownItem.itemName}}</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="profileWrapper">
                <router-link to="/auth/login" class="menu-login-button isansFont navbar-left" v-if="!isLoggedIn">
                    <i class="material-icons">person</i>
                    ورود | ثبت نام
                </router-link>

                <div class="dropdown authButton" v-else>
                    <button @click="toggleProfileDropdown" class="profile-menu-button isansFont"
                            :class="[{'profile-menu-button--active' : profileDropdownMenuOpen}]">
                        <i class="material-icons">person_outline</i>
                        <span style="margin-right:5px;">پروفایل</span>
                        <i class="material-icons" v-if="!profileDropdownMenuOpen">keyboard_arrow_down</i>
                        <i class="material-icons" style="margin-right:5px;" v-else>keyboard_arrow_up</i>
                    </button>
                    <ul class="profile-menu-list isansFont" v-if="profileDropdownMenuOpen && !isConsultant"
                        @click.prevent="toggleProfileDropdown">
                        <li class="profile-menu-list-item" v-for="item in userProfileDropDownItems">
                            <router-link class="profile-menu-list-link" :to="item.target">{{item.name}}</router-link>
                        </li>
                        <li class="profile-menu-list-item">
                            <button class="profile-menu-list-link" @click.prevent="logout">خروج</button>
                        </li>
                    </ul>
                    <ul class="profile-menu-list isansFont" v-if="profileDropdownMenuOpen && isConsultant"
                        @click.prevent="toggleProfileDropdown">
                        <li class="profile-menu-list-item" v-for="item in consultantProfileDropDownItems">
                            <router-link class="profile-menu-list-link" :to="item.target">{{item.name}}</router-link>
                        </li>
                        <li class="profile-menu-list-item">
                            <button class="profile-menu-list-link" @click.prevent="logout">خروج</button>
                        </li>
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
                        <ul class="mobileMenuList isansFont--faNum" v-if="isConsultant">
                            <li class="mobileMenuList--item" v-for="item in consultantProfileDropDownItems">
                                <router-link :to="item.target" class="mobileMenuList--linkItem">
                                    <i class="material-icons">keyboard_arrow_left</i>
                                    {{item.name}}
                                </router-link>
                            </li>
                            <li class="mobileMenuList--item">
                                <a @click.prevent="logout()" role="button" class="mobileMenuList--linkItem">
                                    <i class="material-icons">keyboard_arrow_left</i>
                                    خروج
                                </a>
                            </li>
                        </ul>
                        <ul class="mobileMenuList isansFont--faNum" v-else>
                            <li class="mobileMenuList--item" v-for="item in userProfileDropDownItems">
                                <router-link :to="item.target" class="mobileMenuList--linkItem">
                                    <i class="material-icons">keyboard_arrow_left</i>
                                    {{item.name}}
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
    import Logo from '@/components/TopMenus/LogoComponent';

    export default {
        name: "TopMenu",
        components: {
            "sneeds-logo": Logo
        },
        data() {
            return {
                profileDropdownMenuOpen: false,
                isNavFixedOnZero: false,
                userProfileDropDownItems: [
                    {
                        name: 'اطلاعات کاربری',
                        target: '/user/profile',
                        icon: 'circle',
                        tag: 0,
                        hasSubmenu: false,
                        submenu: []
                    },
                    {
                        name: "جلسات مشاوره",
                        target: '/user/sessions',
                        icon: 'circle',
                        tag: 0,
                        hasSubmenu: false,
                        submenu: []
                    },
                    {
                        name: "پرداخت های قبلی",
                        target: '/user/orders',
                        icon: 'circle',
                        tag: 0,
                        hasSubmenu: false,
                        submenu: []
                    },
                    {
                        name: "پکیج ها",
                        target: '/user/userpackages',
                        icon: 'circle',
                        tag: 0,
                        hasSubmenu: false,
                        submenu: []
                    },
                    {name: "چتروم", target: '/user/chatroom', icon: 'circle', tag: 0, hasSubmenu: false, submenu: []},
                ],

                consultantProfileDropDownItems: [
                    {
                        name: 'اطلاعات کاربری',
                        target: '/user/profile',
                        icon: 'circle',
                        tag: 0,
                        hasSubmenu: false,
                        submenu: []
                    },
                    {
                        name: "جلسات مشاوره",
                        target: '/user/sessions',
                        icon: 'circle',
                        tag: 0,
                        hasSubmenu: false,
                        submenu: []
                    },
                    {
                        name: "مدیریت تقویم",
                        target: '/user/calendar',
                        icon: 'circle',
                        tag: 0,
                        hasSubmenu: false,
                        submenu: []
                    },
                    {
                        name: "ایجاد کد تخفیف",
                        target: '/user/discounts',
                        icon: 'circle',
                        tag: 0,
                        hasSubmenu: false,
                        submenu: []
                    },
                    {
                        name: "پکیج ها",
                        target: '/user/conspackages',
                        icon: 'circle',
                        tag: 0,
                        hasSubmenu: false,
                        submenu: []
                    },
                    {name: "چتروم", target: '/user/chatroom', icon: 'circle', tag: 0, hasSubmenu: false, submenu: []},
                ],

                topMenuListItems: [
                    {
                        itemName: 'مشاوران',
                        target: '/consultants',
                        type: 'router',
                        hasDropDown: false,
                        dropdownItems: [],
                        icon: 'supervisor_account'
                    },
                    {
                        itemName: 'پکیج اقتصادی',
                        target: '/packages/economic',
                        type: 'router',
                        hasDropDown: false,
                        dropdownItems: [],
                        icon: 'supervisor_account'
                    },
                    {
                        itemName: 'پکیج کالج',
                        target: '/packages/college',
                        type: 'router',
                        hasDropDown: false,
                        dropdownItems: [],
                        icon: 'supervisor_account'
                    },
                ],
            }
        },
        computed: {
            isLoggedIn() {
                return this.$store.getters.isLoggedIn;
            },
            isConsultant() {
                return this.$store.getters.isConsultant;
            },
            activeCart() {
                return this.$store.getters.getCart;
            },
            mobileMenuShow() {
                return this.$store.getters.getMobileMenuShow;
            }
        },
        mounted() {
            document.addEventListener('scroll', event => {
                // console.log(event);
                console.log(scrollY);
                if(scrollY > 0) {
                    if(!this.isNavFixedOnZero) {
                        this.isNavFixedOnZero = true;
                    }
                } else {
                    if(this.isNavFixedOnZero) {
                        this.isNavFixedOnZero = false;
                    }
                }
            })
        },
        beforeDestroy() {
            document.removeEventListener('scroll', () => {});
        },
        methods: {
            toggleProfileDropdown() {
                this.profileDropdownMenuOpen = !this.profileDropdownMenuOpen;
            },
            logout() {
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
        top: 43px;
        left: 0;
        background-color: white;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 1015;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 100ms ease-in-out;
    }

    .topNavWrapper.top-0 {
        top: 0;
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
        margin: auto 0 auto auto;
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

    .menu-login-button {
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-radius: 25px;
        padding: 7px 30px;
        border: 1.5px solid #8E39CC;
        cursor: pointer;
        color: #8E39CC;
        background-color: white;
        outline: none;
        font-size: 14px;
        transition: all 0.2s ease-in-out;
    }

    .menu-login-button:hover {
        background-color: #8C3DDB;
        color: white;
    }

    .profile-menu-button {
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-radius: 25px;
        padding: 7px 30px;
        border: 1.5px solid #8E39CC;
        cursor: pointer;
        color: #8E39CC;
        background-color: white;
        outline: none;
        font-size: 14px;
        transition: all 0.1s ease;
        z-index: 20;
    }

    .profile-menu-button span {
        margin-left: 10px;
    }

    .profile-menu-button i {
        font-size: 18px;
    }

    .profile-menu-button--active {
        background-color: #8E39CC;
        color: white;
    }

    .profile-menu-list {
        position: absolute;
        background-color: white;
        border-radius: 15px;
        width: 100%;
        top: 40px;
        padding: 0;
        z-index: 10;
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
    }

    .profile-menu-list-item {
        display: flex;
    }

    .profile-menu-list-item:first-child .profile-menu-list-link {
        border-radius: 15px 15px 0 0;
    }

    .profile-menu-list-item:last-child .profile-menu-list-link {
        border-radius: 0 0 15px 15px;
        justify-content: flex-start;
    }

    .profile-menu-list-link {
        display: flex;
        width: 100%;
        font-size: 13px;
        padding: 10px 10px 10px 0;
        color: #666;
        background: none;
        border: none;
    }

    .profile-menu-list-link:hover {
        background-color: #f4f4f4;
    }

    .before-profileDropdown-overlay {
        position: fixed;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 9;
    }


    @media only screen and (max-width: 991.8px) and (min-width: 0) {
        .before-profileDropdown-overlay {
            display: none;
        }

        .slide-fade-enter-active {
            transition: all 0.2s ease;
        }

        .slide-fade-leave-active {
            transition: all 0.2s ease;
        }

        .slide-fade-enter, .slide-fade-leave-to {
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
            height: calc(100vh - 113px);
            margin-top: 113px;
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
    }
</style>
