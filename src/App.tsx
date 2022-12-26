import {connect, Provider} from 'react-redux';
import {compose} from 'redux';
import React, {Component, FC, lazy} from 'react';
import {BrowserRouter, Link, Navigate, Route, Routes} from 'react-router-dom';

import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu} from 'antd';

import {AppStateType, store} from './redux/reduxStore';
import {initializeApp} from './redux/appReducer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersPage from './components/Users/UsersPage';
import Header from './components/Header/Header';
import Preloader from './components/common/Preloader/Preloader';
import LoginPage from './components/Login/LoginPage';
import NotFound from './components/NotFound/NotFound';
import './App.css';

import {developersArray, myProfileArray, otherArray} from './helpers/constants';

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));
const ChatPage = lazy(() => import('./Pages/Chat/ChatPage'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

const {Content, Footer, Sider} = Layout;

const returningArray = (index: number) => {
    return index === 0 ? myProfileArray : index === 1 ? developersArray : otherArray;
};

const items: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);
        const array = returningArray(index);

        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: array.length === 2 ? `My Profile` : array.length === 1 ? 'Developers' : 'Other',
            children: array.map((el, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: <Link to={el.path}>{el.title}</Link>
                };
            })
        };
    },
);

class App extends Component<MapPropsType & DispatchPropsType> {

    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert('Some error occured');
    };

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    redirect() {
        return <Navigate to='/profile'/>;
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>;
        }

        return (
            <Layout style={{background: '#e7e5ea'}}>
                <Header/>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout style={{color: 'black'}}>
                        <Sider width={200}>
                            <Menu mode="inline"
                                  style={{height: '100%'}}
                                  items={items}/>
                        </Sider>
                        <Content style={{ background: '#e7e5ea', padding: '0 24px', minHeight: 280}}>
                            <Routes>
                                <Route path='/' element={this.redirect()}/>
                                <Route path='/dialogs'
                                       element={
                                           <React.Suspense
                                               fallback={<Preloader/>}><DialogsContainer/>
                                           </React.Suspense>}/>

                                <Route path='/profile'
                                       element={<React.Suspense
                                           fallback={<Preloader/>}><ProfileContainer/>
                                       </React.Suspense>}/>
                                <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                                <Route path='/developers' element={<UsersPage pageTitle={'Samurais'}/>}/>
                                <Route path='/news' element={<News/>}/>
                                <Route path='/music' element={<Music/>}/>
                                <Route path='/settings' element={<Settings/>}/>
                                <Route path='/login' element={<LoginPage/>}/>
                                <Route path='/chat' element={
                                    <React.Suspense
                                        fallback={<Preloader/>}><ChatPage/>
                                    </React.Suspense>}/>

                                <Route path='*' element={<NotFound/>}/>
                            </Routes>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Samurai Social Network ©2022 Created by Oleshka</Footer>
            </Layout>
            // <div className="app-wrapper">
            //     <HeaderContainer/>
            //     <Sidebar/>
            //     <main className='app-wrapper__content'>

            //     </main>
            // </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
});

let AppContainer = compose(connect(mapStateToProps, {initializeApp}))(App);

const MainApp: FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>;
};

export default MainApp;
