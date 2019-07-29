import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/views/Home";
import Login from '@/views/Login';
import Register from '@/views/Register';
import UserProfile from '@/views/UserProfile';
import Error404 from '@/views/Error404';
import ConsultantList from "@/views/ConsultantList";
import ConsultManagement from "@/views/ConsultManagement";

import ConsultantProfile from "@/views/ConsultantProfile";


import store from './store';
import UserCard from "./views/UserCard";

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
    },{
      path : '/user/consultantmanager',
      name : 'ConsultManagement',
      component : ConsultManagement,
    },{
      path : '/user/cart',
      name : 'UserCart',
      component : UserCard
    },
    {
      path : '/consultants',
      name : 'ConsultantList',
      component : ConsultantList,
    },{
      path : '/consultants/:consultantSlug',
      name : 'ConsultantProfile',
      component : ConsultantProfile,
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

  const requiredAuthRoutes = ['/user/profile','/user/consultantmanager' , '/user/cart'];
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