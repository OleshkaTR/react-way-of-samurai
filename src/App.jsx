import {connect, Provider} from 'react-redux';
import {compose} from 'redux';
import React, {Component} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {store} from './redux/reduxStore';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Sidebar from './components/Sidebar/Sidebar';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import {initializeApp} from './redux/appReducer';
import Preloader from './components/common/Preloader/Preloader';
import LoginContainer from './components/Login/LoginContainer';
import './App.css';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Sidebar/>
                <main className='app-wrapper__content'>
                    <Routes>
                        <Route path='/dialogs' element={<React.Suspense fallback={<Preloader/>}><DialogsContainer/></React.Suspense>}/>
                        <Route path='/profile' element={<React.Suspense fallback={<Preloader/>}><ProfileContainer/></React.Suspense>}/>
                        <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                        <Route path='/users' element={<UsersContainer/>}/>
                        <Route path='/news' element={<News/>}/>
                        <Route path='/' element={<News/>}/>
                        <Route path='/music' element={<Music/>}/>
                        <Route path='/settings' element={<Settings/>}/>
                        <Route path='/login' element={<LoginContainer/>}/>
                    </Routes>
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

let AppContainer = compose(connect(mapStateToProps, {initializeApp}))(App);

const MainApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
};

export default MainApp;
