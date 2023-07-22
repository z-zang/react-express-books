import { useState } from 'react'
import BEMHelper from '../../utils/BEMHelper'
import './Header.css'

const bem = new BEMHelper('Header')


const Header = () => {
    const [viewSearch, setViewSearch] = useState<boolean>(false)

    const openSearch = () => {
        setViewSearch(prev => !prev)
    }

    return (
        <div className={'headerWrapper'}>

            <header className={bem('header')}>

                <div onClick={openSearch}>searchIcon</div>
                <h1 className={bem('title')}>Bookslist</h1>
                <div>
                    profileIcon
                </div>

            </header>

            <div className={bem('banner')}>
                {viewSearch && (
                    <span className={bem('searchBar')}>
                        <input type="text" name="" id="" placeholder='Search...' />
                        <button>Search</button>
                    </span>
                )}
                <div>
                    Welcome back, name! || Login/Register
                </div>
            </div>



        </div>


    )
}

export default Header