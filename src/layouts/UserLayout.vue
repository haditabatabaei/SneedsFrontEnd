<template>
    <section class="profileWrapper">
        <div class="container">
            <div class="row">
                <div class="col-md-3 sidebarWrapper">
                    <div class="userSidebarBlock">
                        <div class="userSidebarBlock--info">
                            <img src="../../public/sneedsAssets/img/samandehi.png" alt="">
                            <div class="userSidebarBlock--info_detail">
                                <h1 class="isansFont--faNum">
                                    {{user.first_name + " " + user.last_name}}
                                </h1>
                                <h4 class="isansFont--faNum">
                                    <router-link to="/profile/settings">تکمیل اطلاعات ></router-link>
                                </h4>
                            </div>
                        </div>
                        <div class="userSidebarBlock--links isansFont--faNum">
                            <ul class="userSidebarBlock--links-menu">
                                <li class="userSidebarBlock--links-menuitem" :class="[{'hasSubmenu' : item.hasSubmenu}]" v-for="(item, index) in sideBarItems" :key="index">
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
                <div class="col-md-9">
                    <router-view />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "UserLayout",
        data: function () {
            return {
                sideBarItems : [
                    {name : "آخرین وضعیت", target: '/user/stats',  icon : 'circle', tag: 0, hasSubmenu: true, submenu: [
                            {name : 'وضعیت پروسه اپلای', target: '/user/stats/apply', icon : 'circle', tag: 0,},
                            {name : 'وضعیت پروسه رزومه', target: '/user/stats/resume', icon : 'circle', tag : 1},
                        ]},
                    {name : 'اطلاعات کاربری', target: '/user/profile', icon : 'circle', tag: 0, hasSubmenu : false, submenu : []},
                    {name : "ارتباط با مشاور", target: '', icon: 'circle', tag: 1, hasSubmenu: false, submenu: []},
                    {name : "مدارک", target: '', icon: 'circle', tag: 0, hasSubmenu: false, submenu: []},
                ],
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
        },

        mounted() {
            scrollTo(0, 0);
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
        margin-top: 10px;
        margin-bottom: 10px;
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
        .sidebarWrapper  {
            /*padding-right: 0;*/
            /*padding-left: 0;*/
        }
    }
</style>
