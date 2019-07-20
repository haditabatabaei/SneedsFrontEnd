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
                    <ul class="dropdown-menu dropdown-menu-right left-0 isansFont gadugiFont profileDropDownMenu">
                        <li class="text-right">
                            <router-link to="/user/profile">ناحیه کاربری</router-link>
                        </li>
                        <li class="divider"></li>
                        <li><a @click.prevent="logout()" class="btn btn-rose">خروج</a></li>
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
