import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import {routerMode} from './config/env'
import './config/rem'

// for better click experience, in normal click event, it will delay 300 ms to response, FastClick will remove it
import FastClick from 'fastclick'

// when DOM loaded, attach FastClick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(VueRouter)

// TODO need to view router configuration
const router = new VueRouter({
	routes,
    // TODO mode?
	mode: routerMode,
    // TODO strict?
	strict: process.env.NODE_ENV !== 'production',
    // for scroll behavior
	scrollBehavior (to, from, savedPosition) {
        // if has savedPosition, go savedPosition
	    if (savedPosition) {
		    return savedPosition
		} else {
            
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})

new Vue({
	router,
	store,
}).$mount('#app')

