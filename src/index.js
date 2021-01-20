import React from 'react';
import ReactDOM from 'react-dom';
import { initApplication } from 'matsumoto/src/core/init';
import App from 'core/app';

window.setPageDirectionFromLS = () => {
    var dir = window.localStorage.getItem('direction');
    if (['ltr', 'rtl'].includes(dir)) {
        document.getElementsByTagName('html')[0].setAttribute('dir', dir);
    }
};
window.setPageDirectionFromLS();

window._renderTheApp = () => {
    ReactDOM.render(<App />, document.getElementById('app'));
};
window._renderTheApp();

initApplication();
