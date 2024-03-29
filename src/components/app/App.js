import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AppHeader from "../appHeader/AppHeader";
// import { MainPage, ComicsPage, SingleComicPage } from "../pages";
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import('../pages/404'));   // Динамический импорт должен быть после статических
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
// const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/singleComicLayout'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/singleCharacterLayout.js'));
const SinglePage = lazy(() => import('../pages/SinglePage'));


const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/Marvel-on-Hooks" element={<MainPage />} />
                            <Route path="/comics" element={<ComicsPage />} />
                            <Route path="/comics/:id" element={ <SinglePage Component={SingleComicLayout} dataType='comic'/>} />
                            <Route path="/characters/:id" element={<SinglePage Component={SingleCharacterLayout} dataType='character'/>}/>
                            <Route path="*" element={<Page404/>} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;



