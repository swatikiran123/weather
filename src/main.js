import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);


import moment from 'moment';

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MMMM DD YYYY')
  }
});

import Highcharts from 'highcharts'
import VueHighcharts from 'vue-highcharts'
import highchartsMore from 'highcharts/highcharts-more'

highchartsMore(Highcharts)
Vue.use(VueHighcharts, {Highcharts})


import App from './App.vue';
import CreateItem from './components/CreateItem.vue';
import DisplayItem from './components/DisplayItem.vue';
import EditItem from './components/EditItem.vue';
import Weather from './components/Weather.vue';

const routes = [
  {
        name: 'CreateItem',
        path: '/create/city',
        component: CreateItem
    },
    {
          name: 'DisplayItem',
          path: '/',
          component: DisplayItem
      },
      {
            name: 'EditItem',
            path: '/edit/:id',
            component: EditItem
        },
        {
              name: 'Weather',
              path: '/city/:id',
              component: Weather
          }
];

const router = new VueRouter({ mode: 'history', routes: routes });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');
