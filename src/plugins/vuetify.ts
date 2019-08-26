import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from "vuetify/lib/util/colors";
Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'md',
    },
    theme: {
        themes: {
            light: {
                primary: colors.green.darken3, // #E53935
                secondary: colors.green.accent3, // #FFCDD2
                accent: colors.green.base, // #3F51B5
                disabled: colors.green.lighten4
            },
            dark: {
                primary: colors.green.lighten4, // #E53935
                secondary: colors.green.accent3, // #FFCDD2
                accent: colors.green.base, // #3F51B5
                disabled: colors.green.lighten4
            },
        },
    },
});