import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import AppHeader from "../appHeader/AppHeader";
import {MainPage, ComicsPage, SingleComicPage} from "../pages";

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Switch> 
                        <Route exact path="/marvel">
                           <MainPage/>
                        </Route>

                        <Route exact path="/comics">
                            <ComicsPage/>
                        </Route>

                        <Route exact path="/singlecomic">
                            <SingleComicPage/>
                        </Route>

                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;