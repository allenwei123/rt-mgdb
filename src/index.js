import React from 'react';
import { render } from 'react-dom';

import App from './App'
import './style/common.scss'
import './style/a.css'

const renderDom = Component => {
    render(
        <Component />,
        document.getElementById('app')
    )
}

renderDom(App);