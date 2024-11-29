import React,{useState} from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

import { useNavigate } from "react-router-dom";
import UserDashboard from "./UserDashboard";
import { Menu } from "antd";
import FirstHeader from "./myProfile/header/firstheader";
// import Header from "./myProfile/header/myHeader";
// import MyHeader from "./header";

export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

export default function Controller() {
    console.log("Controller called ")
    const navigate = useNavigate();
    const userState = localStorage.getItem("userstatus");
    const userRole = localStorage.getItem("emeelanrole");
    const token = localStorage.getItem(TOKEN_KEY);
    const userid = localStorage.getItem('userid')
    const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
    const items = [
        {
          label: 'Information',
          key: 'mail',
          icon: <MailOutlined />,
        },
        {
          label: 'Professions',
          key: 'app',
          icon: <AppstoreOutlined />,
          disabled: true,
        },
        {
          label: 'Navigation Three - Submenu',
          key: 'SubMenu',
          icon: <SettingOutlined />,
          children: [
            {
              type: 'group',
              label: 'Item 1',
              children: [
                {
                  label: 'Option 1',
                  key: 'setting:1',
                },
                {
                  label: 'Option 2',
                  key: 'setting:2',
                },
              ],
            },
            {
              type: 'group',
              label: 'Item 2',
              children: [
                {
                  label: 'Option 3',
                  key: 'setting:3',
                },
                {
                  label: 'Option 4',
                  key: 'setting:4',
                },
              ],
            },
          ],
        },
        {
          label: (
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
              Navigation Four - Link
            </a>
          ),
          key: 'alipay',
        },
      ];
    
    return (
        <>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        <UserDashboard/>
        </>
    )
    
  
}
