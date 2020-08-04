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

// eslint-disable-next-line react/no-render-return-value
export const RenderTheApp = () => ReactDOM.render(<App />, document.getElementById('app'));
RenderTheApp();

initApplication();
