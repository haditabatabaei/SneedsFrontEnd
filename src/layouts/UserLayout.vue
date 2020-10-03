<template>
    <section class="profileWrapper" :class="[{'no-min-height': hideProfileSidebar }]">
        <div class="user-container" :class="[{'user-container--noSidebar': hideProfileSidebar},{'user-container--mobileChatroom': isChatroom}]">
            <div class="user-sidebar gadugiFont" v-if="!hideProfileSidebar">
                <div class="user-sidebar-title" :class="[{'sidebar-title--centered': userInfo.user_type != 'consultant'}]">
                    <img size="70px" class="user-sidebar-avatar" alt="" v-if="userInfo.user_type === 'consultant'"
                         :src="userInfo.consultant.profile_picture"/>
                    <div class="user-sidebar-name">
                        <h1 class="user-sidebar-name-text" v-if="showFirstName">
                            {{user.first_name}} {{user.last_name}}
                        </h1>
                        <h4 class="user-sidebar-name-notif" v-else>
                            <router-link class="user-sidebar-name-notifLink" to="/user/profile">
                                Please fill and submit your first and last names.
                            </router-link>
                        </h4>
                    </div>
                </div>
                <div class="user-sidebar-menu">
                    <ul class="user-sidebar-menu-items"
                        v-if="userInfo.user_type === 'consultant'">
                        <li class="user-sidebar-menu-item" :class="[{'user-sidebar-menu-item--hasSubmenu' : item.hasSubmenu}]"
                            v-for="(item, index) in consultantSidebarItems" :key="index">
                            <span :class="item.icon"/>
                            <router-link class="user-sidebar-menu-link" :to="item.target">{{item.name}}</router-link>
                            <span class="badge" :style="'background-color:#9038CC'"
                                  v-if="item.tag != 0">{{item.tag}}</span>
                            <ul class="user-sidebar-submenu-items" v-if="item.hasSubmenu">
                                <li class="user-sidebar-submenu-item"
                                    v-for="(subItem, subIndex) in item.submenu" :key="subIndex">
                                    <span :class="subItem.icon"/>
                                    <router-link class="user-sidebar-submenu-link" :to="subItem.target">{{subItem.name}}</router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <ul class="user-sidebar-menu-items"
                        v-else>
                        <li class="user-sidebar-menu-item" :class="[{'user-sidebar-menu-item--hasSubmenu' : item.hasSubmenu}]"
                            v-for="(item, index) in userSidebarItems" :key="index">
                            <span :class="item.icon"/>
                            <router-link class="user-sidebar-menu-link" :to="item.target">{{item.name}}</router-link>
                            <span class="badge" :style="'background-color:#9038CC'"
                                  v-if="item.tag != 0">{{item.tag}}</span>
                            <ul class="user-sidebar-submenu-items" v-if="item.hasSubmenu">
                                <li class="user-sidebar-submenu-item"
                                    v-for="(subItem, subIndex) in item.submenu" :key="subIndex">
                                    <span :class="subItem.icon"/>
                                    <router-link class="user-sidebar-submenu-link" :to="subItem.target">{{subItem.name}}</router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="user-main">
                <router-view :key="$route.fullPath" class="mobile-view"/>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "UserLayout",
        data() {
            return {
                showUserAvatar: false,
                userSidebarItems: [
                    {
                        name: 'User settings',
                        target: '/user/profile',
                        icon: 'circle',
                        tag: 0,
                        hasSubmenu: false,
                        submenu: []
                    },
                    {
                        name: "Consulting sessions",
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
                    {
                        name: "Chatroom",
                        target: '/user/chatroom',
                        icon: 'circle',
                        tag: 0,
                        hasSubmenu: false,
                        submenu: []
                    },
                ],

                consultantSidebarItems: [
                    {
                        name: 'User settings',
                        target: '/user/profile',
                        icon: 'circle',
                        tag: 0,
                        hasSubmenu: false,
                        submenu: []
                    },
                    {
                        name: "Consulting sessions",
                        target: '/user/sessions',
                        icon: 'circle',
                        tag: 0,
                        hasSubmenu: false,
                        submenu: []
                    },
                    {
                        name: "Calendar management",
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
                    name: "Deposit",
                    target: '/user/deposit',
                    icon: 'circle',
                    tag: 0,
                    hasSubmenu: false,
                    submenu: []
                  },
                    {
                        name: "Chatroom",
                        target: '/user/chatroom',
                        icon: 'circle',
                        tag: 0,
                        hasSubmenu: false,
                        submenu: []
                    },
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
        },
        computed: {
            user() {
                return this.$store.getters.getUser;
            },

            showFirstName() {
                return Boolean(this.user.first_name) && Boolean(this.user.last_name);
            },

            userInfo() {
                return this.$store.getters.getUserInfo;
            },

            isChatroom() {
                return this.$route.name === 'user-chatroom';
            },

            hideProfileSidebar() {
                return  this.$route.name === 'user-chatroom' ||
                        this.$route.name === 'user-conspackages-marketplace-detail' ||
                        this.$route.name === 'user-analysis-result';
            }
        },
        async created() {
            try {
                await this.$store.dispatch('getUserWithId', this.$store.getters.getUserInfo.id);
            } catch (e) {
                this.printMessage("خطایی هنگام ارتباط با سرور رخ داد.", "خطا", "error", 3000, "notif")
            } finally {

            }
        },
    }
</script>

<style scoped>

    .profileWrapper {
        width: 100%;
        margin-top: 120px;
        min-height: 100vh;
        display: flex;
        justify-content: center;
    }

    .profileWrapper.no-min-height {
        min-height: initial;
    }

    .user-container {
        width: 100%;
        max-width: 1170px;
        display: grid;
        grid-gap: 15px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: auto;
        grid-template-areas: "sidebar main main main";
        margin-top: 15px;
    }

    .user-container--noSidebar {
        grid-template-areas: "main main main main";
    }

    .user-sidebar {
        grid-area: sidebar;
        height: fit-content;
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        align-items: stretch;
        background-color: white;
    }

    .user-main {
        grid-area: main;
        height: fit-content;
    }

    .user-sidebar-title {
        border-radius: 15px 15px 0 0;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        background-color: #9038CC;
        color: white;
        min-height: 90px;
    }

    .sidebar-title--centered {
        justify-content: center;
    }

    .user-sidebar-avatar {
        width: 70px;
        height: 70px;
        border-radius: 10px;
        margin: 10px;
    }

    .user-sidebar-name {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .user-sidebar-name-text {
        margin: 0;
        font-size: 16px;
    }

    .user-sidebar-name-notif {
        margin: 5px auto 0 0;
        text-align: left;
    }

    .user-sidebar-name-notifLink {
        font-size: 1.2rem;
        color: white;
    }

    .user-sidebar-menu {
        margin: 15px 0;
    }

    .user-sidebar-menu-items {
        display: flex;
        list-style: none;
        padding-left: 0;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
    }

    .user-sidebar-menu-item {
        display: flex;
        align-items: center;
        margin: 0 15px;
        padding: 10px 0;
        border-radius: 20px;
    }

    .user-sidebar-menu-item:hover {
        background-color: #f1f1f1;
    }

    .circle {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: 3px solid #ccc;
        margin: auto 5px auto 10px;
    }

    .square {
        width: 15px;
        height: 15px;
        border-radius: 0;
        border: 3px solid #ccc;
        margin: auto 5px;
    }

    .user-sidebar-menu-link {
        color: #6a6a6a;
        transition: all 0.1s ease-in-out;
    }

    .user-sidebar-menu-item:hover > .user-sidebar-menu-link {
        color: #333;
    }

    .user-sidebar-menu-item:hover > .circle {
        border-color: #333;
    }

    .user-sidebar-menu-item:hover > .square {
        border-color: #333;
    }

    .user-sidebar-menu-item .badge {
        margin-right: 5px;
    }

    .user-sidebar-menu-item--hasSubmenu {
        position: relative;
    }

    .user-sidebar-menu-item--hasSubmenu:hover {
        flex-direction: column;
        align-items: flex-start;
    }

    .user-sidebar-menu-item--hasSubmenu:hover > .user-sidebar-submenu-items {
        display: flex;
    }

    .user-sidebar-menu-item--hasSubmenu:hover > .circle {
        display: none;
    }

    .user-sidebar-menu-item--hasSubmenu:hover > .square {
        display: none;
    }

    .user-sidebar-submenu-items {
        display: none;
        list-style: none;
        padding-left: 0;
        width: calc(100% - 30px);
        margin-top: 5px;
        left: 30px;
        top: 0;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
    }

    .user-sidebar-submenu-item {
        display: flex;
        align-items: center;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .user-sidebar-submenu-link {
        color: #b5b5b5;
    }

    .user-sidebar-submenu-item > .circle {
        width: 5px;
        height: 5px;
    }

    .user-sidebar-submenu-item > .square {
        width: 5px;
        height: 5px;
    }





















    @media only screen and (max-width: 991.8px) {
        .user-container {
            grid-template-columns: 100%;
            grid-template-rows: 300px auto;
            grid-template-areas:
                "sidebar"
                "main"
            ;
        }

        .user-container--mobileChatroom {
            grid-template-areas: "main";
            grid-gap: 0;
        }

        .user-sidebar {
            overflow: paged-x;
            border-radius: 0;
        }

        .user-sidebar-title {
            border-radius: 0;
            height: 240px;
        }

        .user-sidebar-menu {
            overflow: auto;
            white-space: nowrap;
            margin: 0;
        }

        .user-sidebar-menu-items {
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            margin: 15px;
        }

        .user-sidebar-menu-item {
            padding: 10px 5px;
        }

        .circle {
            margin-left: 0;
        }
    }
</style>
