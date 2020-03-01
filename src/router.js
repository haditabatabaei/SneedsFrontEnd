import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/views/Home";
import Login from '@/views/Login';
import Register from '@/views/Register';

import UserLayout from '@/layouts/UserLayout';
import UserStatus from '@/views/UserStatus';
import UserProfile from '@/views/User/UserProfile';
import UserActiveCart from "@/views/User/UserActiveCart";
// import ResetPassword from "@/views/ResetPassword";
import Error404 from '@/views/Error404';

import ConsultantList from "@/views/ConsultantList";
import ConsultManagement from "@/views/ConsultManagement";
import ConsultantProfile from "@/views/ConsultantProfile";

import UserReservedSessions from "@/views/UserReservedSessions";

// import UserCard from "@/views/UserCard";
// import UserOrder from "@/views/UserOrder";

import store from './store';
// import Payment from "@/views/Payment";
// import Messages from "@/views/Messages";

Vue.use(Router);

let router = new Router({
    base: process.env.BASE_URL,
    // mode : 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                auth: 'optional'
            }
        },
        {
            path: '/login',
            name: Login,
            component: Login,
            meta: {
                auth: 'noReq'
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: {
                auth: 'noReq'
            }
        },
        {
            path: '/user',
            redirect: '/user/profile',
            component: UserLayout,
            children: [
                {
                    path: 'status',
                    name: 'user-status',
                    component: UserStatus,
                    meta: {
                        auth: 'req'
                    }
                },
                {
                    path: 'profile',
                    name: 'user-profile',
                    component: UserProfile,
                    meta: {
                        auth: 'req'
                    }
                },
                {
                    path: 'calendar',
                    name: 'user-calendar',
                    component: ConsultManagement,
                    meta: {
                        auth: 'req'
                    }
                },
                {
                    path: 'reserved',
                    name: 'user-reserved-sessions',
                    component: UserReservedSessions,
                    meta: {
                        auth: 'req'
                    }
                },
                {
                    path: 'cart/active',
                    name: 'user-cart-active',
                    component: UserActiveCart,
                    meta: {
                        auth : 'req'
                    }
                },
                {
                    path: 'payment/accept/',
                    name: "user-payment-accept",
                    component: null,
                    meta: {
                        auth: 'req'
                    }
                }
            ]
        },
        // {
        //     path: '/user/cart',
        //     name: 'UserCart',
        //     component: UserCard
        // },
        // {
        //     path: '/user/order',
        //     name: 'UserOrder',
        //     component: UserOrder,
        // },
        // {
        //     path: '/user/password-reset',
        //     name: 'ResetPassword',
        //     component: ResetPassword
        // },
        // {
        //     path: '/user/messages',
        //     name: 'Messages',
        //     component: Messages
        // },
        {
            path: '/consultants',
            name: 'ConsultantList',
            component: ConsultantList,
        },
        {
            path: '/consultants/:consultantSlug',
            name: 'ConsultantProfile',
            component: ConsultantProfile,
        },
        // {
        //     path: '/payment/accept',
        //     name: 'Payment',
        //     component: Payment,
        // },
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
    store.commit('setMobileMenuShow', false);
    if (to.meta.auth === 'req') {
        if (store.getters.isLoggedIn) {
            next();
        } else {
            next('/login');
        }
    } else if (to.meta.auth === 'noReq') {
        if (!store.getters.isLoggedIn) {
            next();
        } else {
            next('/');
        }
    } else {
        next();
    }
});

export default router;
