import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import POIs from './views/POIs.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Users from './views/Users.vue'
import POIDetail from './views/POIDetail.vue'
import QuestionDetail from './views/QuestionDetail.vue'
import UserModule from './UserModule'

Vue.use(Router)
var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/(home)?',
      name: 'home',
      component: Home,
      meta: {
        title:"GeoTrivia"
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title:"Iniciar Sesión"
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title:"Registrarse"
      }
    },
    {
      path: '/pois',
      name: 'pois',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: POIs,
      meta: {
        requiresAuth: true,
        title:"POIs Actuales"
      }
    },
    {
      path: '/pois/:id',
      name: 'detail',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: POIDetail,
      meta: {
        requiresAuth: true,
        title:"Detalle de POI"
      }
    },
    {
      path: '/pois/:id/questions/:questionId',
      name: 'question',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: QuestionDetail,
      meta: {
        requiresAuth: true,
        title:"Detalle de pregunta"
      }
    },
    {
      path: '/users',
      name: 'users',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Users,
      meta: {
        requiresAuth: true,
        title:"Usuarios Registrados"
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !UserModule.logged) {
    next({
      path: '/login',
    })
  }
  else {
    next();
  }
});
export default router;