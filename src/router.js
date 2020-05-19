import Vue from 'vue'
import Router from 'vue-router'
import store from './store';

Vue.use(Router);

const router = new Router({
    base: process.env.BASE_URL,
    // mode : 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            redirect: '/consultants',
            component: () => import("@/views/Home"),
            meta: {
                auth: 'optional'
            }
        },
        {
            path: '/policy',
            name: 'Policy',
            component: () => import("@/views/Policy"),
            meta: {
                auth: 'optional'
            }
        },
        {
            path: '/auth',
            name: 'auth',
            redirect: '/auth/login',
            component: () => import("@/layouts/AuthLayout"),
            meta: {
                auth: 'noReq'
            },
            children: [
                {
                    path: 'login',
                    name: 'auth-login',
                    component: () => import("@/views/Auth/Login"),
                    meta: {
                        auth: 'noReq'
                    }
                },
                {
                    path: 'register',
                    name: 'auth-register',
                    component: () => import("@/views/Auth/Register"),
                    meta: {
                        auth: 'noReq'
                    }
                },
                {
                    path: 'forget',
                    name: 'auth-forget-pass',
                    component: () => import("@/views/Auth/Forget"),
                    meta: {
                        auth: 'noReq'
                    }
                }
            ]
        },
        {
            path: '/consultants',
            name: 'consultants',
            component: () => import("@/layouts/ConsultantListLayout"),
            meta: {
                auth: 'optional'
            }
        },
        {
            path: '/user',
            redirect: '/user/profile',
            component: () => import("@/layouts/UserLayout"),
            children: [
                {
                    path: 'profile',
                    name: 'user-profile',
                    component: () => import("@/views/User/UserProfile"),
                    meta: {
                        auth: 'req'
                    }
                },
                {
                    path: 'password',
                    name: 'user-password',
                    component: () => import("@/views/User/UserPasswordChange"),
                    meta: {
                        auth: 'req'
                    }
                },
                {
                    path: 'calendar',
                    name: 'user-calendar',
                    component: () => import("@/views/Consultant/ConsultManagement"),
                    meta: {
                        auth: 'req'
                    }
                },
                {
                    path: 'sessions',
                    name: 'user-reserved-sessions',
                    component: () => import("@/views/UserReservedSessions"),
                    meta: {
                        auth: 'req'
                    }
                },
                {
                    path: 'payment/accept/',
                    name: "user-payment-accept",
                    component: () => import("@/views/Payment"),
                    meta: {
                        auth: 'req'
                    }
                },
                {
                    path: 'orders',
                    name: 'user-orders',
                    component: () => import("@/views/User/UserOrders"),
                    meta: {
                        auth: 'req'
                    }
                },
                {
                    path: 'orders/:id',
                    name: 'user-orders-item',
                    component: () => import("@/views/User/UserOrderItem"),
                    meta: {
                        auth: 'req'
                    }
                },
                {
                    path: 'chatroom',
                    name: 'user-chatroom',
                    component: () => import("@/views/Chatroom"),
                    meta: {
                        auth: 'req'
                    }
                },
                {
                    path: 'package/form',
                    component: () => import("@/views/Package/PackageForm"),
                    meta: {
                        auth: 'req'
                    }
                },
            ]
        },
        {
            path: '/carts/:id',
            name: 'cart-active',
            component: () => import("@/views/User/UserActiveCart"),
            meta: {
                auth: 'req'
            }
        },
        {
            path: '/consultants',
            name: 'consultants',
            component: () => import("@/views/Consultant/ConsultantList"),
            meta: {
                auth: 'optional'
            },
        },
        {
            path: '/consultants/:consultantSlug',
            name: 'consultants-profile',
            component: () => import("@/views/Consultant/ConsultantProfile"),
            meta: {
                auth: 'optional'
            }
        },
        {
            path: '/404',
            name: 'Error404',
            component: () => import("@/views/Error404"),
        },
        {
            path: '*',
            redirect: '/404',
        }
    ],
    scrollBehavior() {
        return {x: 0, y: 0}
    }
});

router.beforeEach((to, from, next) => {
    store.commit('setMobileMenuShow', false);
    if (to.meta.auth === 'req') {
        if (store.getters.isLoggedIn) {
            next();
        } else {
            store.dispatch('logout');
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
