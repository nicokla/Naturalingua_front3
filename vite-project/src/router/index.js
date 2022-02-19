import { createWebHistory, createRouter } from "vue-router";
// import Home from "../views/Home.vue";
// import Root from "../views/Root.vue";
// import Suite from "../views/Suite.vue";
// import Success from "../views/Success.vue";
// import Cancel from "../views/Cancel.vue";

// https://stackabuse.com/lazy-loading-routes-with-vue-router/

const routes = [
  // { path: '/' , redirect: { name: 'Login' }}
  {
    path: '/',
		name: 'Root',
    component: () => import('../views/Root.vue')
    // children: [
    //   {
    //     path: 'root',
    //     component: Home,
    //     name: 'Root',
    //     children: [
    //       {
    //         path: 'my_songs',
    //         name: 'MySongs',
    //         component: MySongs
    //       },
    //     ]
    //   },
		// ]
	},
	{
    path: '/suite',
    name: 'Suite',
    component: () => import('../views/Suite.vue')
	},
  {
    path: '/success/:email',
    name: 'Success',
    component: () => import('../views/Success.vue'),
		props: true
	},
  {
    path: '/cancel',
    name: 'Cancel',
    component: () => import('../views/Cancel.vue')
	}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
