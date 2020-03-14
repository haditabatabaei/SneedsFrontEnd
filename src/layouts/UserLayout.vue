<template>
    <section class="profileWrapper">
        <div class="container" v-if="windowWidth > 991.8">
            <div class="row">
                <div class="col-md-3 sidebarWrapperDesktop" v-if="$route.name != 'user-chatroom'">
                    <div class="userSidebarBlock">
                        <div class="userSidebarBlock--info">
                            <img v-if="userInfo.user_type == 'consultant'" :src="userInfo.consultant.profile_picture">
                            <img v-else src="https://picsum.photos/id/0/75/75">
                            <div class="userSidebarBlock--info_detail">
                                <h1 class="isansFont--faNum" v-if="showFirstName">
                                    {{`${user.first_name} ${user.last_name}`}}
                                </h1>
                                <h4 class="isansFont--faNum text-sm" v-else>
                                    <router-link to="/user/profile">لطفا نام و نام خانوادگی خود را تکمیل کنید.</router-link>
                                </h4>
                            </div>
                        </div>
                        <div class="userSidebarBlock--links isansFont--faNum">
                            <ul class="userSidebarBlock--links-menu" v-if="userInfo.user_type === 'user' || userInfo.user_type === 'student'">
                                <li class="userSidebarBlock--links-menuitem" :class="[{'hasSubmenu' : item.hasSubmenu}]" v-for="(item, index) in userSidebarItems" :key="index">
                                    <span :class="item.icon" />
                                    <router-link :to="item.target">{{item.name}}</router-link>
                                    <span class="badge" :style="'background-color:#9038CC'" v-if="item.tag != 0">{{item.tag}}</span>
                                    <ul class="userSidebarBlock--links-submenu" v-if="item.hasSubmenu">
                                        <li class="userSidebarBlock--links-submenuitem" v-for="(subItem, subIndex) in item.submenu" :key="subIndex">
                                            <span :class="subItem.icon" />
                                            <router-link :to="subItem.target">{{subItem.name}}</router-link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <ul class="userSidebarBlock--links-menu" v-else-if="userInfo.user_type === 'consultant'">
                                <li class="userSidebarBlock--links-menuitem" :class="[{'hasSubmenu' : item.hasSubmenu}]" v-for="(item, index) in consultantSidebarItems" :key="index">
                                    <span :class="item.icon" />
                                    <router-link :to="item.target">{{item.name}}</router-link>
                                    <span class="badge" :style="'background-color:#9038CC'" v-if="item.tag != 0">{{item.tag}}</span>
                                    <ul class="userSidebarBlock--links-submenu" v-if="item.hasSubmenu">
                                        <li class="userSidebarBlock--links-submenuitem" v-for="(subItem, subIndex) in item.submenu" :key="subIndex">
                                            <span :class="subItem.icon" />
                                            <router-link :to="subItem.target">{{subItem.name}}</router-link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div :class="[{'col-md-12' : $route.name == 'user-chatroom'}, {'col-md-9' : $route.name != 'user-chatroom'}]">
                    <div class="row">
                        <router-view :key="$route.fullPath" class="mobile-view" />
                    </div>
                </div>
            </div>
        </div>

        <div class="mobile" v-else>
            <div class="mobile-info">
                <img src="https://picsum.photos/id/0/75/75" alt="">
                <h1 class="isansFont--faNum" v-if="showFirstName">
                    {{user.first_name + " " + user.last_name}}
                </h1>
                <h4 class="isansFont--faNum" v-else>
                    لطفا نام و نام خانوداگی خود را تکمیل کنید.
                </h4>

                <h4 class="isansFont--faNum">
                    <router-link to="/user/profile">تکمیل اطلاعات ></router-link>
                </h4>
            </div>
            <div class="mobile-menu">
                <ul class="userSidebarBlock--links-menu" v-if="userInfo.user_type === 'user' || userInfo.user_type === 'student'">
                    <li class="userSidebarBlock--links-menuitem" :class="[{'hasSubmenu' : item.hasSubmenu}]" v-for="(item, index) in userSidebarItems" :key="index">
                        <router-link :to="item.target">{{item.name}}</router-link>
                        <span class="badge" :style="'background-color:#9038CC'" v-if="item.tag != 0">{{item.tag}}</span>
                        <ul class="userSidebarBlock--links-submenu" v-if="item.hasSubmenu">
                            <li class="userSidebarBlock--links-submenuitem" v-for="(subItem, subIndex) in item.submenu" :key="subIndex">
                                <router-link class="isansFont--faNum" :to="subItem.target">{{subItem.name}}</router-link>
                            </li>
                        </ul>
                    </li>
                </ul>

                <ul class="userSidebarBlock--links-menu" v-else-if="userInfo.user_type === 'consultant'">
                    <li class="userSidebarBlock--links-menuitem" :class="[{'hasSubmenu' : item.hasSubmenu}]" v-for="(item, index) in consultantSidebarItems" :key="index">
                        <router-link :to="item.target">{{item.name}}</router-link>
                        <span class="badge" :style="'background-color:#9038CC'" v-if="item.tag != 0">{{item.tag}}</span>
                        <ul class="userSidebarBlock--links-submenu" v-if="item.hasSubmenu">
                            <li class="userSidebarBlock--links-submenuitem" v-for="(subItem, subIndex) in item.submenu" :key="subIndex">
                                <router-link class="isansFont--faNum" :to="subItem.target">{{subItem.name}}</router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <router-view class="mobile-view" :key="$route.fullPath" />
        </div>
    </section>
</template>

<script>
    export default {
        name: "UserLayout",
        data: function () {
            return {
                userSidebarItems : [
                    {name : 'اطلاعات کاربری', target: '/user/profile', icon : 'circle', tag: 0, hasSubmenu : false, submenu : []},
                    {name : "جلسات مشاوره", target: '/user/sessions', icon: 'circle', tag: 0, hasSubmenu: false, submenu: []},
                    {name : "پکیج ها", target: '/user/packages', icon: 'circle', tag: 0, hasSubmenu: false, submenu: []},
                    {name : "پرداخت های قبلی", target: '/user/orders',  icon : 'circle', tag: 0, hasSubmenu: false, submenu: []},
                    {name : "چتروم", target: '/user/chatroom',  icon : 'circle', tag: 0, hasSubmenu: false, submenu: []},
                    {name : "ویرایش رمز عبور", target : "/user/password", icon : "circle", tag : 0, hasSubmenu: false, submenu: []}
                ],

                consultantSidebarItems : [
                    {name : 'اطلاعات کاربری', target: '/user/profile', icon : 'circle', tag: 0, hasSubmenu : false, submenu : []},
                    {name : "جلسات مشاوره", target: '/user/sessions', icon: 'circle', tag: 0, hasSubmenu: false, submenu: []},
                    {name : "پکیج ها", target: '/user/packages', icon: 'circle', tag: 0, hasSubmenu: false, submenu: []},
                    {name : "چتروم", target: '/user/chatroom',  icon : 'circle', tag: 0, hasSubmenu: false, submenu: []},
                    {name : "مدیریت تقویم" , target: '/user/calendar', icon : 'circle', tag : 0, hasSubmenu : false, submenu : []},
                    {name : "ویرایش رمز عبور", target : "/user/password", icon : "circle", tag : 0, hasSubmenu: false, submenu: []}
                ]
            }
        },
        methods: {
            printMessage(text, title, type, duration, group) {
                this.$notify({
                    group: group,
                    text: text,
                    title: title,
                    type: type,
                    duration: duration
                })
            },
        }, computed: {
            user: function () {
                return this.$store.getters.getUser;
            },

            showFirstName() {
                return Boolean(this.user.first_name) && Boolean(this.user.last_name);
            },

            userInfo: function() {
                return this.$store.getters.getUserInfo;
            }
        },

        mounted() {
        },

        async created() {
            this.$loading(true);
            try {
                await this.$store.dispatch('getUserMeta');
                await this.$store.dispatch('getUserWithId', this.$store.getters.getUserInfo.id);
            } catch (e) {
                this.printMessage("خطایی هنگام ارتباط با سرور رخ داد.", "خطا", "error", 3000, "notif")
            } finally {
                this.$loading(false);
            }
        },
    }
</script>

<style scoped>

    .profileWrapper {
        width : 100%;
        margin-top:70px;
        min-height:100vh;
    }

    .userSidebarBlock {
        background-color:white;
        width: 100%;
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        margin-top: 30px;
        padding-bottom: 10px;
    }

    .userSidebarBlock--info {
        width: 100%;
        border-radius:15px 15px 0 0;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        background-color: #9038CC;
        color:white;
        min-height: 90px;
    }

    .userSidebarBlock--info_detail {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
    }

    .userSidebarBlock--info_detail h1 {
        font-size: 1.5rem;
        margin : 0;
    }

    .userSidebarBlock--info_detail h4 {
        margin: 5px 0 0 auto;
        text-align:right;
    }

    .userSidebarBlock--info_detail h4 a {
        font-size : 1.2rem;
        color: white;
    }

    .userSidebarBlock--info_detail span {
        font-size: 12px;
        background-color: #f0f0f0;
        color: #bababa;
        border-radius: 30px;
        padding: 3px 20px;
    }

    .userSidebarBlock--info img {
        width: 70px;
        height: auto;
        border-radius: 10px;
        margin: 10px;
    }

    .userSidebarBlock--links {
        width: 100%;
        margin-top: 15px;
    }

    .userSidebarBlock--links-menu {
        display: flex;
        list-style: none;
        padding-right: 0;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
    }

    .userSidebarBlock--links-menuitem {
        display: flex;
        align-items:center;
        margin-right:15px;
        margin-left:15px;
        padding-top:10px;
        padding-bottom:10px;
        border-radius: 20px;
        padding-right: 20px;
    }

    .circle {
        width: 15px;
        height: 15px;
        border-radius:50%;
        border:3px solid #ccc;
        margin-left: 5px;
        margin-right: 5px;
    }

    .square {
        width: 15px;
        height: 15px;
        border-radius : 0;
        border:3px solid #ccc;
        margin-left: 5px;
        margin-right: 5px;
    }

    .userSidebarBlock--links-menuitem > a {
        color: #6a6a6a;
        transition: all 0.1s ease-in-out;
    }

    .userSidebarBlock--links-menuitem.hasSubmenu {
        position: relative;
    }

    .userSidebarBlock--links-menuitem.hasSubmenu:hover {
        flex-direction: column;
        align-items: flex-start;
    }

    .userSidebarBlock--links-menuitem.hasSubmenu:hover > .userSidebarBlock--links-submenu {
        display: flex;
    }

    .userSidebarBlock--links-menuitem.hasSubmenu:hover > .circle {
        display: none;
    }

    .userSidebarBlock--links-menuitem.hasSubmenu:hover > .square {
        display: none;
    }

    .userSidebarBlock--links-menuitem:hover {
        background-color: #f1f1f1;
    }

    .userSidebarBlock--links-menuitem:hover > a {
        color: #333;
    }

    .userSidebarBlock--links-menuitem:hover > .circle {
        border-color:#333;
    }

    .userSidebarBlock--links-menuitem:hover > .square {
        border-color:#333;
    }

    .userSidebarBlock--links-menuitem .badge {
        margin-right: 5px;
    }

    .userSidebarBlock--links-submenu {
        display: none;
        list-style: none;
        padding-right: 0;
        width: calc(100% - 30px);
        margin-top:5px;
        right: 30px;
        top: 0;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
    }

    .userSidebarBlock--links-submenuitem {
        display: flex;
        align-items:center;
        margin-top:5px;
        margin-bottom:5px;
    }

    .userSidebarBlock--links-submenuitem > a {
        color: #b5b5b5;
    }

    .userSidebarBlock--links-submenuitem > .circle {
        width: 5px;
        height: 5px;
    }

    .userSidebarBlock--links-submenuitem > .square {
        width: 5px;
        height: 5px;
    }

    @media only screen and (max-width: 991.8px) {
        .mobile {
            display: flex;
            flex-direction: column;
            width: 100%;
            background-color: white;
        }

        .mobile-info {
            display: flex;
            width: 100%;
            height: 300px;
            background-color: #9038CC;
            flex-direction: column;
            align-items:center;
            justify-content: center;
        }

        .mobile-info h1 {
            font-size: 1.7rem;
            margin : 0;
            color: white;
            font-weight: bold;
        }

        .mobile-info h4 {
            margin-top:10px;
            font-weight: bold;
        }

        .mobile-info h4 a {
            font-size : 1.2rem;
            color: white;
        }

        .mobile-info span {
            font-size: 12px;
            background-color: #f0f0f0;
            color: #bababa;
            border-radius: 30px;
            padding: 3px 20px;
        }

        .mobile-info img {
            width: 100px;
            height: auto;
            border-radius: 10px;
            margin-top: 10px;
            margin-bottom: 10px;
        }

        .mobile-menu {
            width: 100%;
            overflow: auto;
            white-space: nowrap;
        }

        .mobile-menu::-webkit-scrollbar {
            height: 3px;
        }

        /* Track */
        .mobile-menu::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        /* Handle */
        .mobile-menu::-webkit-scrollbar-thumb {
            background: #888;
        }

        /* Handle on hover */
        .mobile-menu::-webkit-scrollbar-thumb:hover {
            background: #555;
        }

        .userSidebarBlock--links-menu {
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            margin-top: 10px;
        }

        .userSidebarBlock--links-menuitem {
            padding-right: 20px;
            padding-left:20px;
            font-family: "IRANSansWebFaNum Medium",serif;
        }

        .mobile-view {
            width: 100%;
        }
    }
</style>
