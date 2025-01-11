import React, { useEffect, useState } from 'react';
import { Layout, Card, Button, Tabs, Form, Input,Space, Upload, message, Row, Col, Spin } from 'antd';
import { EnvironmentOutlined, UserOutlined, CalendarOutlined, PhoneOutlined, BookOutlined, PlusOutlined, HomeOutlined, LogoutOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router-dom";
import { useLogout, useOne, useUpdate } from "@refinedev/core";
import PhotoComponent from './PhotoComponent';
import ProfileCard from './ProfileCard';
import EditProfile from './EditProfile'
const { Content } = Layout;
const { TabPane } = Tabs;
const { TextArea } = Input;

export default function MyProfile() {
  const [isEditProfile,setIsEditProfile]= useState(false);
  const userid = localStorage.getItem("userid");
  const navigate = useNavigate();
  const {mutate: logout} = useLogout();

  const [images, setImages] = useState([{
    uid: "0",
    name: "0",
    url: "0"
  }]);
  const [profilePhotos,setProfilePhotos]=useState([])
  const [user, setUser] = useState({});
  
  
  //const { id } = useParams();
  const { data, isLoading } = useOne({
    resource: "users",
    id:userid,
    meta: {
      populate: ["photos","profilePicture", "user_setting", "vyaapars"],
    },
  });
  if(isLoading){
    <Spin>
      Page Loading
    </Spin>
  }
  useEffect(() => {
    if (data?.data) {
     
      
      setUser({...data.data});
    }
  }, [data]);

  const [edit, setEdit] = useState(false);

  const handleLogout = () => {
    console.log("sdsfsf")
    localStorage.clear()
    navigate('/login');
    
  }
  
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  console.log("user object", user)  /** 
  Profile has three section:
  1) Image:
      How to take a form component when user can simply call this component
  2) View Profile
  3) Edit Profile


 */

  return (
    <Layout>
      <Content style={{ padding: '10px' }}>
        <Space.Compact>
          <Button color='danger' variant='dashed' onClick={() => navigate(`/dashboard}`)}> <HomeOutlined style={{ fontSize: '15px', color: '#1890ff' }} />
          home</Button>
          {!isEditProfile&&<Button color="danger" variant="dashed"   onClick={()=>{setIsEditProfile(true)}}>
          <EditOutlined style={{ fontSize: '14px', color: '#1890ff' }} />
          Edit
          </Button>}
         {isEditProfile&& <Button color="danger" variant="dashed"   onClick={()=>{setIsEditProfile(false)}}>
         <UserOutlined style={{ fontSize: '15px', color: '#1890ff' }} />
          Profile
          </Button>}
          <Button color='danger' variant='dashed' onClick={handleLogout} ><LogoutOutlined style={{ fontSize: '15px', color: '#ff4d4f' }}  /> 
          Logout
          </Button>
        </Space.Compact>
      
        {!isEditProfile&& <ProfileCard user={user} setIsEditProfile={setIsEditProfile}/>}
        {isEditProfile&&<EditProfile user={user} setIsEditProfile={setIsEditProfile}/>}
       
       
      </Content>
    </Layout>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ marginRight: 8, marginTop: 4 }}>{icon}</div>
      <div>
        <h4 style={{ fontWeight: 'bold', marginBottom: 4 }}>{label}</h4>
        <p>{value}</p>
      </div>
    </div>
  );
}