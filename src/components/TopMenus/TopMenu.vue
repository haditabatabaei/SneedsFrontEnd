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
                <ul class="menuList gadugiFont">
                    <li class="menuList-item"
                        v-for="(item, index) in this.topMenuListItems"
                        :key="index"
                        :class="[{'menuList-item--dropdown': item.hasDropdown}]">
                        <router-link :to="item.target" class="menuList-item-link"
                                     v-if="!item.hasDropdown && item.type == 'router'">
                            {{item.itemName}}
                        </router-link>
                        <a :href="item.target" class="menuList-item-link"
                           v-else-if="!item.hasDropdown && item.type == 'hyper'">{{item.itemName}}</a>
                        <a v-else-if="item.hasDropdown" class="menuList-item-link">
                            {{item.itemName}}
                            <i class="material-icons">keyboard_arrow_down</i>
                        </a>
                        <div class="dropdown-megamenu" v-if="item.hasDropdown">
                            <ul class="megamenu-list" v-for="droplist in item.dropdownItems">
                                <li class="megamenu-list-item--title">{{droplist.itemName}}</li>
                                <li class="megamenu-list-item" v-for="listitem in droplist.dropdownItems">
                                    <router-link class="megamenu-list-item-link" :to="listitem.target"
                                                 v-if="listitem.type == 'router'">
                                        {{listitem.itemName}}
                                    </router-link>
                                    <a :href="listitem.target" target="_blank" class="megamenu-list-item-link"
                                       v-else-if="listitem.type == 'hyper'">{{listitem.itemName}}</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="profileWrapper">
                <router-link to="/auth/login" class="menu-login-button gadugiFont navbar-left" v-if="!isLoggedIn">
                    <i class="material-icons">person</i>
                    Login
                </router-link>

                <div class="dropdown authButton" v-else>
                    <button @click="toggleProfileDropdown" class="profile-menu-button gadugiFont"
                            :class="[{'profile-menu-button--active' : profileDropdownMenuOpen}]">
                        <i class="material-icons">person_outline</i>
                        <span style="margin-right:5px;">Profile</span>
                        <i class="material-icons" v-if="!profileDropdownMenuOpen">keyboard_arrow_down</i>
                        <i class="material-icons" style="margin-right:5px;" v-else>keyboard_arrow_up</i>
                    </button>
                    <ul class="profile-menu-list gadugiFont" v-if="profileDropdownMenuOpen && !isConsultant"
                        @click.prevent="toggleProfileDropdown">
                        <li class="profile-menu-list-item" v-for="item in userProfileDropDownItems">
                            <router-link class="profile-menu-list-link" :to="item.target">{{item.name}}</router-link>
                        </li>
                        <li class="profile-menu-list-item">
                            <button class="profile-menu-list-link" @click.prevent="logout">Logout</button>
                        </li>
                    </ul>
                    <ul class="profile-menu-list gadugiFont" v-if="profileDropdownMenuOpen && isConsultant"
                        @click.prevent="toggleProfileDropdown">
                        <li class="profile-menu-list-item" v-for="item in consultantProfileDropDownItems">
                            <router-link class="profile-menu-list-link" :to="item.target">{{item.name}}</router-link>
                        </li>
                        <li class="profile-menu-list-item">
                            <button class="profile-menu-list-link" @click.prevent="logout">Logout</button>
                        </li>
                    </ul>
                </div>
            </div>

            <transition name="slide-fade">
                <div class="mobileMenu" :class="[{'mobileMenu--larger': isNavFixedOnZero}]" v-if="mobileMenuShow">
                    <div class="mobileMenuListWrapper">
                        <ul class="mobileMenuList gadugiFont">
                            <li class="mobileMenuList--item" v-for="item in this.topMenuListItems"
                                :class="[{'dropdown':item.hasDropdown}]">
                                <a v-if="item.hasDropdown" class="dropdown-toggle dropdown mobileMenuList--linkItem"
                                   @click="toggleMobileDropdown(item)">
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
                                <transition name="fade">
                                    <div v-if="item.hasDropdown && item.showDropdown" class="megamenu-mobile">
                                        <ul class="megamenu-mobile-list" v-for="droplist in item.dropdownItems">
                                            <li class="megamenu-mobile-item item--title">{{droplist.itemName}}</li>
                                            <li class="megamenu-mobile-item" v-for="ditem in droplist.dropdownItems">
                                                <router-link class="megamenu-mobile-link" :to="ditem.target" v-if="ditem.type == 'router'">{{ditem.itemName}}</router-link>
                                                <a class="megamenu-mobile-link" target="_blank" :href="ditem.target" v-else-if="ditem.type == 'hyper'">{{ditem.itemName}}</a>
                                            </li>
                                        </ul>
                                    </div>

                                </transition>
                            </li>
                            <li class="mobileMenuList--item" v-if="!isLoggedIn">
                                <router-link class="mobileMenuList--linkItem special" to="/auth/login">
                                    <i class="material-icons">person</i>
                                    Login
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="mobileMenuActionWrapper" v-if="isLoggedIn">
                        <ul class="mobileMenuList gadugiFont" v-if="isConsultant">
                            <li class="mobileMenuList--item" v-for="item in consultantProfileDropDownItems">
                                <router-link :to="item.target" class="mobileMenuList--linkItem">
                                    {{item.name}}
                                    <i class="material-icons">keyboard_arrow_right</i>
                                </router-link>
                            </li>
                            <li class="mobileMenuList--item">
                                <a @click.prevent="logout()" role="button" class="mobileMenuList--linkItem">
                                    Logout
                                    <i class="material-icons">keyboard_arrow_right</i>
                                </a>
                            </li>
                        </ul>
                        <ul class="mobileMenuList gadugiFont" v-else>
                            <li class="mobileMenuList--item" v-for="item in userProfileDropDownItems">
                                <router-link :to="item.target" class="mobileMenuList--linkItem">
                                    {{item.name}}
                                    <i class="material-icons">keyboard_arrow_right</i>
                                </router-link>
                            </li>
                            <li class="mobileMenuList--item">
                                <a @click.prevent="logout()" role="button" class="mobileMenuList--linkItem">
                                    Logout
                                    <i class="material-icons">keyboard_arrow_right</i>
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
                        name: 'User Settings',
                        target: '/user/profile',
                        icon: 'circle',
                        tag: 0,
                        hasSubmenu: false,
                        submenu: []
                    },
                    {
                        name: "Consulting Sessions",
                        target: '/user/sessions',
                        icon: 'circle',
                        tag: 0,
                        hasSubmenu: false,
                        submenu: []
                    },
                    {
                        name: "Orders",
                        target: '/user/orders',
                        icon: 'circle',
                        tag: 0,
                        hasSubmenu: false,
                        submenu: []
                    },
                    // {name: "فرم پکیج و تخمین", target: '/analysis/form', icon: 'circle', tag: 0, hasSubmenu: false, submenu: []},
                    {
                        name: "Packages",
                        target: '/user/userpackages',
                        icon: 'circle',
                        tag: 0,
                        hasSubmenu: false,
                        submenu: []
                    },
                    {name: "Chatroom", target: '/user/chatroom', icon: 'circle', tag: 0, hasSubmenu: false, submenu: []},
                ],

                consultantProfileDropDownItems: [
                    {
                        name: 'User Settings',
                        target: '/user/profile',
                        icon: 'circle',
                        tag: 0,
                        hasSubmenu: false,
                        submenu: []
                    },
                    {
                        name: "Consulting Sessions",
                        target: '/user/sessions',
                        icon: 'circle',
                        tag: 0,
                        hasSubmenu: false,
                        submenu: []
                    },
                    {
                        name: "Calendar Management",
                        target: '/user/calendar',
                        icon: 'circle',
                        tag: 0,
                        hasSubmenu: false,
                        submenu: []
                    },
                    {
                        name: "Discounts",
                        target: '/user/discounts',
                        icon: 'circle',
                        tag: 0,
                        hasSubmenu: false,
                        submenu: []
                    },
                    {
                        name: "Packages",
                        target: '/user/conspackages',
                        icon: 'circle',
                        tag: 0,
                        hasSubmenu: false,
                        submenu: []
                    },
                    {name: "Chatroom", target: '/user/chatroom', icon: 'circle', tag: 0, hasSubmenu: false, submenu: []},
                ],

                topMenuListItems: [
                    {
                        itemName: 'Consultants',
                        target: '/consultants',
                        type: 'router',
                        hasDropdown: false,
                        showDropdown: false,
                        dropdownItems: [],
                        icon: 'supervisor_account'
                    },
                    {
                        itemName: 'Economic Package',
                        target: '/packages/economic',
                        type: 'router',
                        hasDropdown: false,
                        showDropdown: false,
                        dropdownItems: [],
                        icon: 'supervisor_account'
                    },
                    {
                        itemName: 'Free Materials',
                        target: '/',
                        type: 'router',
                        hasDropdown: true,
                        showDropdown: false,
                        dropdownItems: [
                            {
                                itemName: 'Blog',
                                target: '/',
                                type: 'router',
                                hasDropdown: true,
                                showDropdown: false,
                                dropdownItems: [
                                    {
                                        itemName: 'All Posts',
                                        target: 'http://blog.sneeds.ir/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'Apply process',
                                        target: 'http://blog.sneeds.ir/category/%D9%BE%D8%B1%D9%88%D8%B3%D9%87-%D8%A7%D9%BE%D9%84%D8%A7%DB%8C/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'Universities Deadlines',
                                        target: 'http://blog.sneeds.ir/2020/06/%D8%AF%D8%AF%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%A7%D9%86%D8%B4%DA%AF%D8%A7%D9%87/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'Prof Communication',
                                        target: 'http://blog.sneeds.ir/2020/06/%D8%A7%DB%8C%D9%85%DB%8C%D9%84-%D8%A8%D9%87-%D8%A7%D8%B3%D8%A7%D8%AA%DB%8C%D8%AF/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'What is fund?',
                                        target: 'http://blog.sneeds.ir/2020/06/%D8%A7%D9%86%D9%88%D8%A7%D8%B9-%D9%81%D8%A7%D9%86%D8%AF-%D8%AA%D8%AD%D8%B5%DB%8C%D9%84%DB%8C/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    }
                                ]
                            },
                            {
                                itemName: 'Free Courses',
                                target: '/',
                                type: 'router',
                                hasDropdown: true,
                                showDropdown: false,
                                dropdownItems: [
                                    {
                                        itemName: 'Apply Interviews',
                                        target: 'http://blog.sneeds.ir/category/%D9%85%D8%B5%D8%A7%D8%AD%D8%A8%D9%87/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'Instagram Lives',
                                        target: 'http://blog.sneeds.ir/category/%D9%85%D8%B5%D8%A7%D8%AD%D8%A8%D9%87/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'How to apply webinars',
                                        target: 'https://sneeds.ir/%D9%88%D8%A8%DB%8C%D9%86%D8%A7%D8%B1%D9%87%D8%A7%DB%8C-%D8%B1%D8%A7%DB%8C%DA%AF%D8%A7%D9%86/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'Apply to Canada',
                                        target: 'http://blog.sneeds.ir/category/%D8%A7%D9%BE%D9%84%D8%A7%DB%8C-%D8%A8%D9%87-%DA%A9%D8%A7%D9%86%D8%A7%D8%AF%D8%A7/ ',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'Apply to Europe',
                                        target: 'http://blog.sneeds.ir/category/%D8%A7%D9%BE%D9%84%D8%A7%DB%8C-%D8%A8%D9%87-%D8%A7%D8%B1%D9%88%D9%BE%D8%A7/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    }
                                ]
                            }
                        ],
                        icon: 'supervisor_account'
                    },
                    {
                        itemName: 'Webinars and courses',
                        target: '/',
                        type: 'router',
                        hasDropdown: true,
                        showDropdown: false,
                        dropdownItems: [
                            {
                                itemName: 'Webinars',
                                target: '/',
                                type: 'router',
                                hasDropdown: true,
                                showDropdown: false,
                                dropdownItems: [
                                    {
                                        itemName: 'All webinars',
                                        target: 'https://sneeds.ir/%D9%81%DB%8C%D9%84%D9%85-%D9%88%D8%A8%DB%8C%D9%86%D8%A7%D8%B1%D9%87%D8%A7-%D8%A7%D9%BE%D9%84%D8%A7%DB%8C/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'CS & SOP writing',
                                        target: 'http://new.sneeds.ir/videos/product/cv-sop-webinar-2020/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'How to apply?',
                                        target: 'https://sneeds.ir/%D9%88%D8%A8%DB%8C%D9%86%D8%A7%D8%B1how-to-apply-%D8%AE%D8%B1%D8%AF%D8%A7%D8%AF-99/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'Apply costs',
                                        target: 'https://sneeds.ir/%D9%88%D8%A8%DB%8C%D9%86%D8%A7%D8%B1-%D9%87%D8%B2%DB%8C%D9%86%D9%87-%D9%87%D8%A7%DB%8C-%D8%A7%D9%BE%D9%84%D8%A7%DB%8C-%D8%A8%D9%87-%D8%AA%D9%81%DA%A9%DB%8C%DA%A9-%D9%82%D8%A8%D9%84-%D9%88-%D8%A8/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'Buy recorded webinars',
                                        target: 'https://sneeds.ir/%D9%81%DB%8C%D9%84%D9%85-%D9%88%D8%A8%DB%8C%D9%86%D8%A7%D8%B1%D9%87%D8%A7-%D8%A7%D9%BE%D9%84%D8%A7%DB%8C/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    }
                                ]
                            },
                            {
                                itemName: 'Apply courses',
                                target: '/',
                                type: 'router',
                                hasDropdown: true,
                                showDropdown: false,
                                dropdownItems: [
                                    {
                                        itemName: 'All courses',
                                        target: 'https://sneeds.ir/%DA%A9%D9%84%D8%A7%D8%B3%E2%80%8C%D9%87%D8%A7%DB%8C-%D8%A7%D9%BE%D9%84%D8%A7%DB%8C/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'Getting visa, Zero to Hero',
                                        target: 'https://sneeds.ir/%DA%A9%D9%84%D8%A7%D8%B3-%D9%88%DB%8C%D8%B2%D8%A7-%D8%A8%D8%A7-%D9%85%D8%AD%D9%85%D8%AF-%D8%AA%D9%88%D9%84%D8%A7%DB%8C%DB%8C/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'Essay writing',
                                        target: 'https://sneeds.ir/%DA%A9%D9%84%D8%A7%D8%B3-%D9%85%D9%82%D8%A7%D9%84%D9%87-%D9%86%D9%88%DB%8C%D8%B3%DB%8C-%DA%A9%D8%A7%D9%88%D9%87-%D8%B1%D9%88%D8%B4%D9%86-%D8%A8%DB%8C%D9%86-%D9%81%D8%B1/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                ]
                            },
                            {
                                itemName: 'Free webinars',
                                target: '/',
                                type: 'router',
                                hasDropdown: true,
                                showDropdown: false,
                                dropdownItems: [
                                    {
                                        itemName: 'All free webinars',
                                        target: 'https://sneeds.ir/%D9%88%D8%A8%DB%8C%D9%86%D8%A7%D8%B1%D9%87%D8%A7%DB%8C-%D8%B1%D8%A7%DB%8C%DA%AF%D8%A7%D9%86/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'How to choose university and prof',
                                        target: 'https://sneeds.ir/%D8%AB%D8%A8%D8%AA%E2%80%8C%D9%86%D8%A7%D9%85-%D8%B1%D8%A7%DB%8C%DA%AF%D8%A7%D9%86-%D9%88%D8%A8%DB%8C%D9%86%D8%A7%D8%B1-%D8%A7%D9%86%D8%AA%D8%AE%D8%A7%D8%A8-%D8%A7%D8%B3%D8%AA%D8%A7%D8%AF-%D9%88/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'Education experience abroad',
                                        target: 'https://sneeds.ir/%D9%88%D8%A8%DB%8C%D9%86%D8%A7%D8%B1-%D9%85%D9%82%D8%A7%DB%8C%D8%B3%D9%87-%D8%A7%D9%BE%D9%84%D8%A7%DB%8C-%D9%88-%D8%B2%D9%86%D8%AF%DA%AF%DB%8C-%D8%AF%D8%B1-%D8%A7%D8%B1%D9%88%D9%BE%D8%A7%D8%8C%DA%A9/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'Apply for college',
                                        target: 'https://sneeds.ir/%D9%88%D8%A8%DB%8C%D9%86%D8%A7%D8%B1%D9%87%D8%A7/%D9%88%D8%A8%DB%8C%D9%86%D8%A7%D8%B1-%D8%A7%D9%BE%D9%84%D8%A7%DB%8C-%DA%A9%D8%A7%D9%84%D8%AC-%D8%B3%D9%84%D9%81-%D9%81%D8%A7%D9%86%D8%AF/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                ]
                            },
                            {
                                itemName: 'Self learning apply videos',
                                target: '/',
                                type: 'router',
                                hasDropdown: true,
                                showDropdown: false,
                                dropdownItems: [
                                    {
                                        itemName: 'All videos',
                                        target: 'https://sneeds.ir/%D9%81%DB%8C%D9%84%D9%85-%D9%87%D8%A7%DB%8C-%D8%AE%D9%88%D8%AF-%D8%A2%D9%85%D9%88%D8%B2-%D8%A2%D9%85%D9%88%D8%B2%D8%B4-%D8%A7%D9%BE%D9%84%D8%A7%DB%8C/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'Video packages',
                                        target: 'https://sneeds.ir/%D9%BE%DA%A9%E2%80%8C%D9%87%D8%A7%DB%8C-%D9%81%DB%8C%D9%84%D9%85-%D8%A7%D9%BE%D9%84%D8%A7%DB%8C/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'Prof communication',
                                        target: 'https://sneeds.ir/%DA%A9%D9%84%D8%A7%D8%B3-%D8%A7%DB%8C%D9%85%DB%8C%D9%84-%D8%A8%D9%87-%D8%A7%D8%B3%D8%A7%D8%AA%DB%8C%D8%AF-%DA%A9%D8%A7%D9%88%D9%87-%D8%B1%D9%88%D8%B4%D9%86-%D8%A8%DB%8C%D9%86/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'IELTS for apply',
                                        target: 'https://sneeds.ir/%DA%A9%D9%84%D8%A7%D8%B3-%D8%B2%D8%A8%D8%A7%D9%86-ielts/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                ]
                            }
                        ],
                        icon: 'supervisor_account'
                    },
                    {
                        itemName: 'Services',
                        target: '/',
                        type: 'router',
                        hasDropdown: true,
                        showDropdown: false,
                        dropdownItems: [
                            {
                                itemName: 'Apply with education packages',
                                target: '/',
                                type: 'router',
                                hasDropdown: true,
                                showDropdown: false,
                                dropdownItems: [
                                    {
                                        itemName: 'Economic',
                                        target: '/packages/economic',
                                        type: 'router',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'Zero to hero',
                                        target: 'https://sneeds.ir/%D9%BE%DA%A9%DB%8C%D8%AC-%D8%B5%D9%81%D8%B1-%D8%AA%D8%A7-%D8%B5%D8%AF/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'College',
                                        target: '/packages/college',
                                        type: 'router',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'Visa',
                                        target: 'https://sneeds.ir/%D9%BE%DA%A9%DB%8C%D8%AC-%D9%88%DB%8C%D8%B2%D8%A7/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                ]
                            },
                            {
                                itemName: 'Documents review',
                                target: '/',
                                type: 'router',
                                hasDropdown: true,
                                showDropdown: false,
                                dropdownItems: [
                                    {
                                        itemName: 'CV / Resume',
                                        target: 'https://sneeds.ir/%D9%86%DA%AF%D8%A7%D8%B1%D8%B4-cv-%D8%B1%D8%B2%D9%88%D9%85%D9%87/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'SOP',
                                        target: 'https://sneeds.ir/%D9%86%DA%AF%D8%A7%D8%B1%D8%B4-sop-%D8%A7%D9%86%DA%AF%DB%8C%D8%B2%D9%87%E2%80%8C%D9%86%D8%A7%D9%85%D9%87/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                    {
                                        itemName: 'Cover letter',
                                        target: 'https://sneeds.ir/%D8%AA%D8%B5%D8%AD%DB%8C%D8%AD-%DA%A9%D8%A7%D9%88%D8%B1%D9%84%D8%AA%D8%B1/',
                                        type: 'hyper',
                                        hasDropdown: false,
                                        showDropdown: false,
                                        dropdownItems: []
                                    },
                                ]
                            }
                        ],
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
                if (scrollY > 0) {
                    if (!this.isNavFixedOnZero) {
                        this.isNavFixedOnZero = true;
                    }
                } else {
                    if (this.isNavFixedOnZero) {
                        this.isNavFixedOnZero = false;
                    }
                }
            })
        },
        beforeDestroy() {
            document.removeEventListener('scroll', () => {
            });
        },
        methods: {
            toggleProfileDropdown() {
                this.profileDropdownMenuOpen = !this.profileDropdownMenuOpen;
            },
            toggleMobileDropdown(item) {
                item.showDropdown = !item.showDropdown
                this.topMenuListItems.forEach(mitem => {
                    if(mitem != item) {
                        mitem.showDropdown = false;
                    }
                })
                console.log(item, 'toggled', item.showDropdown);
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
        margin: auto auto auto 0;
    }

    .menuList {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 30px 0 0;
        padding-left: 0;
        list-style: none;
    }

    .menuList-item {
        margin: 0 30px 0 0;
        display: flex;
        align-items: center;
        transition: all 100ms ease-in-out;
    }

    .menuList-item:last-child {
        margin-right: 0;
    }

    .menuList-item:hover {
        padding-bottom: 3px;
        border-bottom: 3px solid #A347FF;
        margin-top: 3px;
    }

    .menuList-item.menuList-item--dropdown {
        position: relative;
        transition: all 100ms ease-in-out;
        cursor: pointer;
    }

    .dropdown-megamenu {
        position: absolute;
        background-color: white;
        box-shadow: 0 0 12px #00000029;
        border-radius: 8px;
        display: none;
        top: 30px;
        left: 0;
        padding: 30px;
        transition: all 100ms ease-in-out;
        cursor: default;
    }

    .menuList-item--dropdown:hover > .dropdown-megamenu {
        display: flex;
        justify-content: center;
        transition: all 100ms ease-in-out;
    }

    .megamenu-list {
        padding: 0;
        display: flex;
        flex-direction: column;
        list-style: none;
        margin-right: 50px;
        min-width: max-content;
        transition: all 100ms ease-in-out;
    }

    .megamenu-list:last-child {
        margin-right: 0;
    }


    .megamenu-list-item--title {
        color: #374957;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 15px;
    }

    .megamenu-list-item {
        margin-top: 5px;
    }

    .megamenu-list-item-link {
        color: #585858;
        font-size: 14px;
    }

    .menuList-item-link {
        color: #333;
        border-radius: 5px;
        transition: all 0.1s ease-in-out;
        font-size: 13px;
        display: flex;
        align-items: center;
    }

    .menuList-item-link.router-link-exact-active {
        color: #A347FF;
    }

    .megamenu-list-item-link.router-link-exact-active {
        color: #A347FF;
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

    .megamenu-list-item-link:hover {
        color: #A347FF;
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
        padding: 10px 0 10px 10px;
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
            order: 1;
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
            overflow:  scroll;
        }

        .mobileMenu.mobileMenu--larger {
            height: calc(100vh - 70px);
            margin-top: 70px;
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
            padding-left: 0;
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
            display: flex;
            align-items: center;
        }

        .mobileMenuList--linkItem:hover {
            background-color: #eee;
        }

        .mobileMenuList--linkItem span {
            margin-right: 0;
        }

        .mobileMenuList--linkItem i.material-icons {
            font-size: 14px;
            margin-right: 5px;
        }

        .mobileMenuList--linkItem.special {
            background-color: #e91e63;
            color: white;
            border-radius: 0 5px 5px 0;
        }

        .mobileMenuList--linkItem.router-link-exact-active {
            background-color: #eee;
        }

        .mobileMenuActionWrapper {
            display: flex;
            width: 50%;
            margin-top: 10px;
        }

        .mobileMenuList--item.dropdown {
            display: flex;
            flex-direction: column;
            align-items: stretch;
        }

        .megamenu-mobile {
            padding-left: 30px;
            font-size: 13px;
        }

        .megamenu-mobile-list {
            padding: 0;
            list-style: none;
            margin-bottom: 10px;
        }

        .megamenu-mobile-list:first-child {
            margin-top: 10px;
        }

        .megamenu-mobile-item.item--title {
            font-weight: bold;
            margin-bottom: 5px;
        }

        .megamenu-mobile-item {
            display: flex;
        }

        .megamenu-mobile-link {
            margin: 5px 0;
        }
    }
</style>
