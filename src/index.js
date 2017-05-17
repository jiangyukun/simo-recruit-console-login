/**
 * Created by jiangyukun on 2017/4/6.
 */
import React from 'react'
import {render} from 'react-dom'

import './css/index.scss'
import 'app-core/style/index.scss'
import configureStore from './store/configureStore'
import Root from './Root'

let store = configureStore()

render(<Root store={store}/>, document.querySelector('#root'))
