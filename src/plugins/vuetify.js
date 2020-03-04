import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#3f51b5',
                secondary: '#e91e63',
                accent: '#673ab7',
                error: '#f44336',
                warning: '#ffc107',
                info: '#00bcd4',
                success: '#4caf50'
            }
        }      
    }
});
