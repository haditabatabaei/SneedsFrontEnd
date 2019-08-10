import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/views/Home";
import Login from '@/views/Login';
import Register from '@/views/Register';
import UserProfile from '@/views/UserProfile';
import ResetPassword from "@/views/ResetPassword";
import Error404 from '@/views/Error404';

import ConsultantList from "@/views/ConsultantList";
import ConsultManagement from "@/views/ConsultManagement";
import ConsultantProfile from "@/views/ConsultantProfile";

import UserReservedSessions from "@/views/UserReservedSessions";

import UserCard from "@/views/UserCard";
import UserOrder from "@/views/UserOrder";

import store from './store';
import Payment from "@/views/Payment";

Vue.use(Router);

let router = new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        }, {
            path: '/login',
            name: Login,
            component: Login,
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
        },
        {
            path: '/user/profile',
            name: 'UserProfile',
            component: UserProfile,
        }, {
            path: '/user/consultantmanager',
            name: 'ConsultManagement',
            component: ConsultManagement,
        }, {
            path: '/user/cart',
            name: 'UserCart',
            component: UserCard
        },
        {
            path: '/user/order',
            name: 'UserOrder',
            component: UserOrder,
        },
        {
            path: '/user/reserved',
            name: 'UserReservedSessions',
            component: UserReservedSessions
        }, {
            path: '/user/password-reset',
            name: 'ResetPassword',
            component: ResetPassword
        },
        {
            path: '/consultants',
            name: 'ConsultantList',
            component: ConsultantList,
        }, {
            path: '/consultants/:consultantSlug',
            name: 'ConsultantProfile',
            component: ConsultantProfile,
        },
        {
            path: '/payment/accept',
            name: 'Payment',
            component: Payment,
        },
        {
            path: '/404',
            name: 'Error404',
            component: Error404,
        },
        {
            path: '*',
            redirect: '/404',
        }
    ]
});

router.beforeEach((to, from, next) => {

    const requiredAuthRoutes = ['/user/profile', '/user/consultantmanager', '/user/cart', '/user/order', '/user/reserved', '/payment/accept'];
    const requiredNotAuth = ['/login', '/register'];

    window.console.log(to.path);

    if (requiredAuthRoutes.includes(to.path)) {
        window.console.log(to.path + " requires auth");
        if (store.getters.isLoggedIn) {
            window.console.log("auth good going in");
            next();
        } else {
            window.console.log("auth not good going login");
            next('/login');
        }
    } else if (requiredNotAuth.includes(to.path)) {
        window.console.log(to.path + " requires not auth");
        if (!store.getters.isLoggedIn) {
            window.console.log("is not auth good going in");
            next();
        } else {
            window.console.log("is not auth not good do nothing");
            next('/');
        }
    } else {
        window.console.log("not condition going in");
        next();
    }
});

export default router;