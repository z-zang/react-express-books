import React from 'react'
import BEMHelper from '../utils/BEMHelper'
import './Home.css'

const bem = new BEMHelper('Home')

const Home = () => {
    return (
        <div className={bem('element', ['modifier1', 'modifier2'], 'customClassName')} >
            Home

        </div>
    )
}

export default Home