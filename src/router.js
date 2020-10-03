import Vue from 'vue'
import Router from 'vue-router'
import store from './state/store';

Vue.use(Router);

const router = new Router({
    base: process.env.BASE_URL,
    // mode : 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
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
            path: '/admitresult',
            name: 'AdmitResult',
            component: () => import("@/views/AdmitResult"),
            meta: {
                auth: 'optional'
            }
        },
        {
            path: '/analysis/form',
            name: 'analysis-form',
            component: () => import("@/layouts/AnalysisFormLayout"),
            redirect: '/analysis/form/marriage',
            meta: {
                auth: 'optional'
            },
            children: [
                {
                    path: 'marriage',
                    name: 'analysis-form-marriage',
                    component: () => import("@/views/Form/MarriageInput"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'marriage',
                        title: 'Marriage'
                    }
                },
                {
                    path: 'militaryservice',
                    name: 'analysis-form-militaryservice',
                    component: () => import("@/views/Form/MilitaryServiceInput"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'militaryservice',
                        title: 'Military service'
                    }
                },
                {
                    path: 'educationalgap',
                    name: 'analysis-form-educationalgap',
                    component: () => import("@/views/Form/EducationalGapInput"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'educationalgap',
                        title: 'Academic gap'
                    }
                },
                {
                    path: 'gender',
                    name: 'analysis-form-gender',
                    component: () => import("@/views/Form/GenderInput"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'gender',
                        title: 'Age and gender'
                    }
                },
                {
                    path: 'workexperience',
                    name: 'analysis-form-workexperience',
                    component: () => import("@/views/Form/WorkExperienceInput"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'workexperience',
                        title: 'Related work experience'
                    }
                },
                {
                    path: 'lasteducationallevel',
                    name: 'analysis-form-lasteducationallevel',
                    component: () => import("@/views/Form/LastEducationalLevelInput"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'lasteducationallevel',
                        title: 'Add an academic degree'
                    }
                },
                {
                    path: 'educationallevelsitems',
                    name: 'analysis-form-educationallevelsitems',
                    component: () => import("@/views/Form/EducationalLevelsItems"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'educationallevelsitems',
                        title: 'Review academic degrees'
                    }
                },
                {
                    path: 'paper',
                    name: 'analysis-form-paper',
                    component: () => import("@/views/Form/PaperInput"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'paper',
                        title: 'Add a paper'
                    }
                },
                {
                    path: 'paperitems',
                    name: 'analysis-form-paperitems',
                    component: () => import("@/views/Form/PaperItems"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'paperitems',
                        title: 'Review papers'
                    }
                },
                {
                    path: 'powerfulrecom',
                    name: 'analysis-form-powerfulrecom',
                    component: () => import("@/views/Form/PowerfulRecommendation"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'powerfulrecom',
                        title: 'Important recommendation'
                    }
                },
                {
                    path: 'languagecerts',
                    name: 'analysis-form-languagecerts',
                    component: () => import("@/views/Form/LanguageCertificateInput"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'languagecerts',
                        title: 'Add a certificate'
                    }
                },
                {
                    path: 'languagecertsitems',
                    name: 'analysis-form-languagecertsitems',
                    component: () => import("@/views/Form/LanguageCertificateItems"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'languagecertsitems',
                        title: 'Review certificates'
                    }
                },
                {
                    path: 'destination',
                    name: 'analysis-form-destination',
                    component: () => import("@/views/Form/DestinationInput"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'destination',
                        title: 'Add and review destinations'
                    }
                },
                {
                    path: 'funds',
                    name: 'analysis-form-funds',
                    component: () => import("@/views/Form/FundsInput"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'funds',
                        title: 'Funding status'
                    }
                },
                {
                    path: 'otherinformation',
                    name: 'analysis-form-otherinformation',
                    component: () => import("@/views/Form/OtherInformationInput"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'otherinformation',
                        title: 'Other information'
                    }
                },
            ]
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
                    path: 'discounts',
                    name: 'user-discounts',
                    component: () => import("@/views/Consultant/ConsultantDiscount"),
                    meta: {
                        auth: 'req'
                    }
                },
                {
                    path: 'deposit',
                    name: 'user-deposit',
                    component: () => import("@/views/Consultant/ConsultantDeposit"),
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
            ]
        },
        {
            path: '/analysis/result',
            name: 'user-analysis-result',
            component: () => import("@/views/Form/Result"),
            meta: {
                auth: 'req',
            }
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
            path: '/analysis/landing',
            name: 'AdmitChance',
            component: () => import("@/views/AdmitChanceLanding"),
            meta: {
                auth : 'optional'
            }
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
            path: '/notfound',
            name: 'Error404',
            component: () => import("@/views/Error404"),
        },
        {
            path: '/contactus',
            name: "ConactUs",
            component: () => import("@/views/ContactUs")
        },
        {
            path: '*',
            redirect: '/notfound',
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
