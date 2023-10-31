import {Link, NavLink} from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/marvel">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink exact activeStyle={{'color': 'green'}} to="/marvel">Characters</NavLink></li>
                    /
                    <li><NavLink exact activeStyle={{'color': 'green'}} to="/comics">Comics</NavLink></li>
                    /
                    <li><NavLink exact activeStyle={{'color': 'green'}} to="/singlecomic">SingleComic</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;