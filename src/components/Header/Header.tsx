import React, {FC} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button, Col, Layout, Menu, MenuProps, Row} from 'antd';
import Avatar from 'antd/es/avatar/avatar';
import {UserOutlined} from '@ant-design/icons';

import {useDispatch, useSelector} from 'react-redux';
import {AppStateType, TypeDispatch} from '../../redux/reduxStore';
import {getAuth, getLogin} from '../../redux/selectors/authSelectors';
import {logOut} from '../../redux/authReducer';
import {developersArray} from '../../helpers/constants';

const Header: FC = (props) => {

    const navigate = useNavigate();
    const login = useSelector(getLogin);
    const isAuth = useSelector(getAuth);
    const dispatch = useDispatch<TypeDispatch<AppStateType>>();

    const logout = () => {
        dispatch(logOut());
        navigate('/login', {replace: true});
    };

    const {Header} = Layout;

    const items: MenuProps['items'] = developersArray.map(
        (el, index) => {
            const key = String(index + 1);

            return {
                key: `sub${key}`,
                label: <Link to={el.path}>{el.title}</Link>,
            };
        },
    );

    return (
        <Header className="header">
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" items={items}/>
                </Col>
                {isAuth ?
                    <>
                        <Col span={1}>
                            <Avatar alt={login || ''} style={{background: '#87d068'}} icon={<UserOutlined/>}/>
                        </Col>
                        <Col span={5}>
                            <Button onClick={logout}>Log out</Button>
                        </Col>
                    </>
                    :
                    <Col span={1}>
                        <Button>
                            <Link to='/login'>Login</Link>
                        </Button>
                    </Col>
                }
            </Row>
        </Header>
    );
};

export default Header;
