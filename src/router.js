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
            path: '/packages/college',
            name: 'landing-packages-college',
            component: () => import("@/views/Package/Landing"),
            meta: {
                auth: 'optional'
            }
        },
        {
            path: '/packages/economic',
            name: 'landing-packages-economic',
            component: () => import("@/views/Package/LandingEconomic"),
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
                        title: 'وضعیت تاهل'
                    }
                },
                {
                    path: 'militaryservice',
                    name: 'analysis-form-militaryservice',
                    component: () => import("@/views/Form/MilitaryServiceInput"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'militaryservice',
                        title: 'وضعیت سربازی'
                    }
                },
                {
                    path: 'educationalgap',
                    name: 'analysis-form-educationalgap',
                    component: () => import("@/views/Form/EducationalGapInput"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'educationalgap',
                        title: 'وقفه تحصیلی'
                    }
                },
                {
                    path: 'gender',
                    name: 'analysis-form-gender',
                    component: () => import("@/views/Form/GenderInput"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'gender',
                        title: 'سن جنسیت'
                    }
                },
                {
                    path: 'workexperience',
                    name: 'analysis-form-workexperience',
                    component: () => import("@/views/Form/WorkExperienceInput"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'workexperience',
                        title: 'سابقه کار مرتبط'
                    }
                },
                {
                    path: 'lasteducationallevel',
                    name: 'analysis-form-lasteducationallevel',
                    component: () => import("@/views/Form/LastEducationalLevelInput"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'lasteducationallevel',
                        title: 'افزودن مقطع تحصیلی'
                    }
                },
                {
                    path: 'educationallevelsitems',
                    name: 'analysis-form-educationallevelsitems',
                    component: () => import("@/views/Form/EducationalLevelsItems"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'educationallevelsitems',
                        title: 'بازبینی مقاطع تحصیلی'
                    }
                },
                {
                    path: 'paper',
                    name: 'analysis-form-paper',
                    component: () => import("@/views/Form/PaperInput"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'paper',
                        title: 'افزودن مقاله'
                    }
                },
                {
                    path: 'paperitems',
                    name: 'analysis-form-paperitems',
                    component: () => import("@/views/Form/PaperItems"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'paperitems',
                        title: 'بازبینی مقالات'
                    }
                },
                {
                    path: 'powerfulrecom',
                    name: 'analysis-form-powerfulrecom',
                    component: () => import("@/views/Form/PowerfulRecommendation"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'powerfulrecom',
                        title: 'توصیه نامه قوی'
                    }
                },
                {
                    path: 'languagecerts',
                    name: 'analysis-form-languagecerts',
                    component: () => import("@/views/Form/LanguageCertificateInput"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'languagecerts',
                        title: 'افزودن مدرک زبان'
                    }
                },
                {
                    path: 'languagecertsitems',
                    name: 'analysis-form-languagecertsitems',
                    component: () => import("@/views/Form/LanguageCertificateItems"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'languagecertsitems',
                        title: 'بازبینی مدارک زبان'
                    }
                },
                {
                    path: 'destination',
                    name: 'analysis-form-destination',
                    component: () => import("@/views/Form/DestinationInput"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'destination',
                        title: 'افزودن و بازبینی مقاصد اپلای'
                    }
                },
                {
                    path: 'funds',
                    name: 'analysis-form-funds',
                    component: () => import("@/views/Form/FundsInput"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'funds',
                        title: 'توانایی مالی و فاند'
                    }
                },
                {
                    path: 'otherinformation',
                    name: 'analysis-form-otherinformation',
                    component: () => import("@/views/Form/OtherInformationInput"),
                    meta: {
                        auth: 'optional',
                        formPartName: 'otherinformation',
                        title: 'سایر اطلاعات'
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
                    path: 'userpackages/staging/form',
                    name: 'user-userpackages-staging-form',
                    component: () => import("@/views/Package/PackageStagingForm"),
                    meta: {
                        auth: 'req'
                    }
                },
                {
                    path: 'userpackages',
                    name: 'user-userpackages',
                    component: () => import("@/views/Package/UserPackages"),
                    meta: {
                        auth: 'req',
                    }
                },
                {
                    path: 'conspackages',
                    name: 'user-conspackages',
                    component: () => import("@/views/Package/ConsPackages"),
                    meta: {
                        auth: 'req',
                    }
                },
                {
                    path: 'userpackages/requestlist/:packageId',
                    component: () => import("@/views/Package/PackageRequestList"),
                    name: 'user-userpackages-requestlist',
                    meta: {
                        auth: 'req'
                    }
                },
                {
                    path: 'userpackages/requestlist/:packageId/:reqId',
                    component: () => import("@/views/Package/PackageRequestListItem"),
                    name: 'user-userpackages-requestlist-iteminfo',
                    meta: {
                        auth: 'req'
                    }
                },
                {
                    path: 'userpackages/manager/:packageId',
                    component: () => import("@/views/Package/UserPackagesManager"),
                    name: 'user-userpackages-manager',
                    meta: {
                        auth: 'req'
                    }
                },
                {
                    path: 'conspackages/marketplace/:id',
                    name: 'user-conspackages-marketplace-detail',
                    component: () => import("@/views/Package/ConsideringPackageDetail"),
                    meta: {
                        auth: 'req'
                    }
                },
                {
                    path: 'conspackages/manager/:packageId',
                    component: () => import("@/views/Package/ConsPackagesManager"),
                    name: 'user-conspackages-manager',
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
