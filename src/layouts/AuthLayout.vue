<template>
    <div class="authWrapper">
        <div class="authFormWrapper">
            <div class="authFormWrapper-switcher isansFont">
                <router-link to="/auth/login" class="switcher" :class="[{'switcher--active' : $route.name === 'auth-login'}]">ورود</router-link>
                <router-link to="/auth/register" class="switcher" :class="[{'switcher--active' : $route.name === 'auth-register'}]">ثبت نام</router-link>
            </div>
            <router-view :key="$route.fullPath" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "AuthLayout",
    }
</script>

<style scoped>
    .authWrapper {
        width: 100%;
        min-height: calc(100vh - 120px);
        margin-top: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .authFormWrapper {
        width: 450px;
        background-color: white;
        border-radius: 15px;
        padding-bottom: 20px;
        box-shadow:0 0 5px 0 rgba(0,0,0,0.2);
    }

    .authFormWrapper-switcher {
        border-bottom:3px solid #eee;
        min-height: 50px;
        margin: 30px 0 0 0;
        display: flex;
        align-items: stretch;
    }

    .switcher {
        margin-right: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        color: #aaa;
    }

    .switcher--active {
        border-bottom:3px solid #9038CC;
        color: #9038CC;
    }

    @media only screen and (max-width: 767.8px) {
        .authWrapper {
            align-items: flex-start;
            height: calc(100vh - 120px);
            background-color: white;
        }

        .authFormWrapper {
            box-shadow: none;
            width: 100%;
            border-radius: 0;
        }
    }

</style>