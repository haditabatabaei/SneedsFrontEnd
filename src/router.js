import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/views/Home";
import AuthLayout from '@/layouts/AuthLayout'
import Login from '@/views/Auth/Login';
import Register from '@/views/Auth/Register';
import Forget from "@/views/Auth/Forget";

import UserLayout from '@/layouts/UserLayout';
import UserStatus from '@/views/UserStatus';
import UserProfile from '@/views/User/UserProfile';
import UserActiveCart from "@/views/User/UserActiveCart";
import UserOrders from '@/views/User/UserOrders';
import UserOrderItem from '@/views/User/UserOrderItem'

import Error404 from '@/views/Error404';

import ConsultantList from "@/views/Consultant/ConsultantList";
import ConsultManagement from "@/views/Consultant/ConsultManagement";
import ConsultantProfile from "@/views/Consultant/ConsultantProfile";

import UserReservedSessions from "@/views/UserReservedSessions";

import store from './store';
import Payment from "@/views/Payment";
import UserPasswordChange from "@/views/User/UserPasswordChange";

import Chatroom from '@/views/Chatroom';

Vue.use(Router);

const router = new Router({
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
            path : '/auth',
            name : 'auth',
            redirect: '/auth/login',
            component : AuthLayout,
            meta: {
                auth : 'noReq'
            },
            children: [
                {
                    path: 'login',
                    name: 'auth-login',
                    component: Login,
                    meta: {
                        auth: 'noReq'
                    }
                },
                {
                    path: 'register',
                    name: 'auth-register',
                    component: Register,
                    meta: {
                        auth: 'noReq'
                    }
                },
                {
                    path : 'forget',
                    name : 'auth-forget-pass',
                    component : Forget,
                    meta : {
                        auth: 'noReq'
                    }
                }
            ]
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
                    path: 'password',
                    name: 'user-password',
                    component: UserPasswordChange,
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
                    path: 'sessions',
                    name: 'user-reserved-sessions',
                    component: UserReservedSessions,
                    meta: {
                        auth: 'req'
                    }
                },
                {
                    path: 'payment/accept/',
                    name: "user-payment-accept",
                    component: Payment,
                    meta: {
                        auth: 'req'
                    }
                },
                {
                    path: 'orders',
                    name: 'user-orders',
                    component: UserOrders,
                    meta: {
                        auth: 'req'
                    }
                },
                {
                    path : 'orders/:id',
                    name : 'user-orders-item',
                    component : UserOrderItem,
                    meta: {
                        auth : 'req'
                    }
                },
                {
                    path : 'chatroom',
                    name : 'user-chatroom',
                    component : Chatroom,
                    meta : {
                        auth : 'req'
                    }
                }
            ]
        },
        {
            path: '/carts/:id',
            name: 'cart-active',
            component: UserActiveCart,
            meta: {
                auth: 'req'
            }
        },
        {
            path: '/consultants',
            name: 'consultants',
            component: ConsultantList,
            meta : {
                auth : 'optional'
            },
        },
        {
            path: '/consultants/:consultantSlug',
            name: 'consultants-profile',
            component: ConsultantProfile,
            meta : {
                auth : 'optional'
            }
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
    ],
    scrollBehavior () {
        return {x : 0, y: 0}
    }
});

router.beforeEach((to, from, next) => {
    store.commit('setMobileMenuShow', false);
    if (to.meta.auth === 'req') {
        if (store.getters.isLoggedIn) {
            next();
        } else {
            next('/auth/login');
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
