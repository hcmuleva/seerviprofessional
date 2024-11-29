import React, { useEffect, useState } from 'react';
import { Avatar,Button,Layout,Card, Progress, Tabs, Typography, Row, Col, List, Tag, Spin,Input,Space, } from 'antd';
import { EditOutlined, EnvironmentOutlined, BankOutlined, GlobalOutlined, UserOutlined ,PlusOutlined,HomeOutlined, } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router-dom";
import { useLogout, useOne, useUpdate } from "@refinedev/core";
import ProfileCard from './ProfileCard';
import EditProfile from './EditProfile'
import MyProfile from '.';
import JobManager from './profession/JobManager';
import AddressDetails from './addresses'
const { Content } = Layout;
const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;


const ProfilePage = () => {
  const [isEditProfile,setIsEditProfile]= useState(false);
  const userid = localStorage.getItem("userid");
  const navigate = useNavigate();
  const {mutate: logout} = useLogout();

  const [images, setImages] = useState([{
    uid: "0",
    name: "0",
    url: "0"
  }]);

  const [profilePhotos,setProfilePhotos]=useState([]);

  
  
  //const { id } = useParams();
  const { data, isLoading } = useOne({
    resource: "users",
    id: String(userid),
    meta: {
      populate: ["photos"],
    },
  });
  const user = data?.data;
  if(isLoading){
    <Spin>
      Page Loading
    </Spin>
  }


  // const [edit, setEdit] = useState(false);

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

  const sections = [
    { key: "overview", label: "Overview" },
    { key: "personalInfo", label: "Personal" },
    { key: "contactInfo", label: "Contact " },
    { key: "professional", label: "Professional" },
    { key: "address", label: "Address" },
    { key: "project", label: "Project" },
    { key: "activities", label: "Activities" },
    { key: "subscriptions", label: "Subscription" },
    { key: "familyDetails", label: "Family" },
    { key: "addressInfo", label: "Address" },
    { key: "educationInfo", label: "Educational" },
    { key: "professionalInfo", label: "Professional" },
    { key: "lifestyle", label: "Lifestyle" },
    { key: "preferences", label: "Preferences" },
  ];
  
  console.log("user? object", user);

  const profileInfo = {
    name:`${user?.username}`,
    title: `${user?.Profession}`,
    location: `${user?.City}`+" "+`${user?.State}`,
    company: `${user?.CompanyName}`,
    followers: "24.3K",
    following: "1.3K",
    about: `Hi I'm Anna Adame, It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is European languages are members of the same family.

    You always want to make sure that your fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play around with the fonts that you already have in the software you're working with reputable font websites. This may be the most commonly encountered tip I received from the designers I spoke with. They highly encourage that you use different fonts in one design, but do not over-exaggerate and go overboard.`,
    fullName: `${user?.fullName}`,
    mobile: `${user?.mobile}`,
    email: `${user?.email}`,
    joiningDate: "24 Nov 2021",
    designation: "Lead Designer / Developer",
    website: "www.velzon.com"
  };
  const renderField = (label, value) => {
    if (label === "Have Children") {
      return (
        <Text>
          <strong>{label}:</strong> {value ? "Yes" : "No"}
        </Text>
      );
    }
    return (
      <Text>
        <strong>{label}:</strong> {value || "N/A"}
      </Text>
    );
  };

  const calculateCompletionPercentage = () => {
    const allFields = [
      // Personal Info
      user?.FirstName,
      user?.LastName,
      user?.DOB,
      user?.Sex,
      user?.birth_time,
      user?.birth_place,
      user?.Height,
      user?.MeritalStatus,
      user?.have_child,

      // Contact Info
      user?.mobile,
      user?.FatherMobileNumber,
      user?.MamajiMobileNumber,

      // Family Details
      user?.FatherName,
      user?.MotherName,
      user?.father_occupation,
      user?.GrandFatherName,
      user?.myrelative,
      user?.Gotra,
      user?.NanajiName,
      user?.NanijiName,
      user?.MamajiName,
      user?.MaternalGotra,

      // Address Info
      user?.Address,
      user?.City,
      user?.State,
      user?.Country,
      user?.postalcode,

      // Education Info
      user?.education_level,
      user?.HighestDegree,
      user?.AdditionalQualification,
      user?.LastCollege,

      // Professional Info
      user?.Profession,
      user?.CompanyName,
      user?.Designation,
      user?.WorkingCity,
      user?.Income,
      user?.PreProfession,

      // Lifestyle
      user?.LifeStyle,
      user?.Horoscope,
      user?.Hobbies,

      // Preferences
      user?.PreMinAge,
      user?.PreMaxAge,
      user?.PreMinHeight,
      user?.PreMaxHeight,
      user?.PreDescription,
    ];

    const totalFields = allFields.length;
    const filledFields = allFields.filter(
      (field) => field && field !== "N/A" && field !== ""
    ).length;

    return Math.round((filledFields / totalFields) * 100);
  };

  const completionPercentage = calculateCompletionPercentage();


  const renderContent = (activeSection) => {
    switch (activeSection) {
      case "overview":
        return (
          <>
            <h1></h1>
          </>
        );
      case "personalInfo":
        return (
          <Space direction="vertical" size="small">
            {renderField("First Name", user?.FirstName)}
            {renderField("Last Name", user?.LastName)}
            {renderField("Date of Birth", user?.DOB)}
            {renderField("Sex", user?.Sex)}
            {renderField("Birth Time", user?.birth_time)}
            {renderField("Birth Place", user?.birth_place)}
            {renderField("Height", user?.Height)}
            {renderField("Marital Status", user?.MeritalStatus)}
            {renderField("Have Children", user?.have_child)}
          </Space>
        );
       case "professional":
        return(
          <>
          <Card bordered={false}>
                   <JobManager user={profileInfo}/>
          </Card>
          </>
        );
        case "address":
        return(
          <>
          <Card bordered={false}>
                    <Text type="secondary">Address</Text>
                    <AddressDetails/>
          </Card>
          </>
        );
        case "project":
        return(
          <>
          <Card bordered={false}>
                    <Text type="secondary">Project</Text>
          </Card>
          </>
        );
        case "activities":
        return(
          <>
          <Card bordered={false}>
                    <Text type="secondary">Activites</Text>
          </Card>
          </>
        );
        case "subscriptions":
        return(
          <>
          <Card bordered={false}>
                    <Text type="secondary">Subscriptions</Text>
          </Card>
          </>
        );

      case "contactInfo":
        return (
          <Space direction="vertical" size="small">
            {renderField("Mobile Number", user?.mobile)}
            {renderField("Father's Mobile", user?.FatherMobileNumber)}
            {renderField("Mamaji's Mobile", user?.MamajiMobileNumber)}
          </Space>
        );
      case "familyDetails":
        return (
          <Space direction="vertical" size="small">
            {renderField("Father's Name", user?.FatherName)}
            {renderField("Mother's Name", user?.MotherName)}
            {renderField("Father's Profession", user?.father_occupation)}
            {renderField("Grandfather's Name", user?.GrandFatherName)}
            {renderField("Sibling", user?.myrelative)}
            {renderField("Gotra", user?.Gotra)}
            {renderField("Nanaji's Name", user?.NanajiName)}
            {renderField("Naniji's Name", user?.NanijiName)}
            {renderField("Mamaji's Name", user?.MamajiName)}
            {renderField("Maternal Gotra", user?.MaternalGotra)}
          </Space>
        );
      case "addressInfo":
        return (
          <Space direction="vertical" size="small">
            {renderField("Home Address", user?.Address)}
            {renderField("City", user?.City)}
            {renderField("State", user?.State)}
            {renderField("Country", user?.Country)}
            {renderField("Postal Code", user?.postalcode)}
          </Space>
        );
      case "educationInfo":
        return (
          <Space direction="vertical" size="small">
            {renderField("Education", user?.education_level)}
            {renderField("Highest Degree", user?.HighestDegree)}
            {renderField("Additional Qualification", user?.AdditionalQualification)}
            {renderField("Last College", user?.LastCollege)}
          </Space>
        );
      case "professionalInfo":
        return (
          <Space direction="vertical" size="small">
            {renderField("Your Profession", user?.Profession)}
            {renderField("Company Name", user?.CompanyName)}
            {renderField("Designation", user?.Designation)}
            {renderField("Working City", user?.WorkingCity)}
            {renderField("Income", user?.Income)}
            {renderField("Previous Profession", user?.PreProfession)}
          </Space>
        );
      case "lifestyle":
        return (
          <Space direction="vertical" size="small">
            {renderField("LifeStyle", user?.LifeStyle)}
            {renderField("Horoscope", user?.Horoscope)}
            {renderField("Hobbies", user?.Hobbies)}
          </Space>
        );     
      case "preferences":
        return (
          <Space direction="vertical" size="small">
            {renderField("Preferred Min Age", user?.PreMinAge)}
            {renderField("Preferred Max Age", user?.PreMaxAge)}
            {renderField("Preferred Min Height", user?.PreMinHeight)}
            {renderField("Preferred Max Height", user?.PreMaxHeight)}
            {renderField("Preferences Description", user?.PreDescription)}
          </Space>
        );
      default:
        return null;
    }
  };
  return (
    <div style={{ background: '#f0f2f5', minHeight: '100vh', padding: '1px' }}>
      <div style={{ 
        background: 'linear-gradient(to bottom, #4863A0 50%, #f0f2f5 50%)',
        padding: '1px',
        borderRadius: '1px'
      }}>
        <Card bordered={false}>
          <Row gutter={[24, 24]}>
            {/* Profile Header */}
            <Col xs={24} md={8}>
              <div style={{ textAlign: 'center' }}>
              <Avatar src={user?.photo?.formats?.thumbnail?.url} size={64} />
                <Title level={4} style={{ marginBottom: '4px' }}>{profileInfo.name}</Title>
                <Text type="secondary">{profileInfo.title}</Text>
                <div style={{ marginTop: '1px' }}>
                  <Text type="secondary">
                    <EnvironmentOutlined /> {profileInfo.location}
                  </Text>
                  <br />
                  <Text type="secondary">
                    <BankOutlined /> {profileInfo.company}
                  </Text>
                </div>
              </div>
            </Col>

            {/* Main Content */}
            <Col xs={24} md={16}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <Title level={3} style={{ marginBottom: '0' }}>{profileInfo.followers}</Title>
                  <Text type="secondary">Followers</Text>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Title level={3} style={{ marginBottom: '0' }}>{profileInfo.following}</Title>
                  <Text type="secondary">Following</Text>
                </div>
                <Button type="primary" icon={<EditOutlined />} onClick={()=>{setIsEditProfile(true)}}>
                  Edit Profile
                </Button>
              </div>
              {/* {!isEditProfile&& <ProfileCard user?={user?} setIsEditProfile={setIsEditProfile}/>} */}
              {isEditProfile&&<EditProfile user={user} setIsEditProfile={setIsEditProfile}/>}
              <Tabs defaultActiveKey="1">
                {sections.map( (section) => (
                  <TabPane tab={section.label} key={section.key}>
                  <Row gutter={[24, 24]}>
                    {/* Complete Profile Card */}
                    <Col xs={24} lg={12}>
                      <Card 
                        title="Complete Your Profile" 
                        extra={<Tag color="blue">{completionPercentage}%</Tag>}
                        bordered={false}
                      >
                        <Progress percent={completionPercentage} showInfo={true} strokeColor="#4863A0" />
                      </Card>
                    </Col>

                    {/* Info Card */}
                    <Col xs={24} lg={12}>
                      <Card title={`${section.label}`+" "+"Info"} bordered={false}>
                         {renderContent(section.key)}
                        {/* <List
                          itemLayout="horizontal"
                          split={false}
                          dataSource={[
                            { label: 'Full Name', value: profileInfo.fullName },
                            { label: 'Mobile', value: profileInfo.mobile },
                            { label: 'E-mail', value: profileInfo.email },
                            { label: 'Location', value: profileInfo.location },
                            { label: 'Joining Date', value: profileInfo.joiningDate }
                          ]}
                          renderItem={item => (
                            <List.Item>
                              <Row style={{ width: '100%' }}>
                                <Col span={8}>
                                  <Text type="secondary">{item.label} :</Text>
                                </Col>
                                <Col span={16}>
                                  <Text>{item.value}</Text>
                                </Col>
                              </Row>
                            </List.Item>
                          )}
                        /> */}
                      </Card>
                    </Col>

                    {/* About Card */}
                    <Col span={24}>
                      <Card title="About" bordered={false}>
                        <Paragraph style={{ marginBottom: 0 }}>
                          {user?.AboutMe}
                        </Paragraph>
                      </Card>
                    </Col>

                    {/* Designation & Website */}
                    <Col span={24}>
                      <Card bordered={false}>
                        <Row gutter={24}>
                          <Col xs={24} sm={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <userOutlined />
                              <div>
                                <Text type="secondary">Designation :</Text>
                                <div>{profileInfo.designation}</div>
                              </div>
                            </div>
                          </Col>
                          <Col xs={24} sm={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <GlobalOutlined />
                              <div>
                                <Text type="secondary">Website :</Text>
                                <div>{profileInfo.website}</div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    </Col>

                    {/* Recent Activity */}
                    <Col span={24}>
                      <Card 
                        title="Recent Activity"
                        extra={
                          <div>
                            <Button type="text">Today</Button>
                            <Button type="text">Weekly</Button>
                            <Button type="text">Monthly</Button>
                          </div>
                        }
                        bordered={false}
                      >
                        <List
                          itemLayout="horizontal"
                          dataSource={[{
                            avatar: '/placeholder.svg?height=40&width=40',
                            title: 'Jacqueline Steve',
                            description: 'We has changed 2 attributes on 05:16PM'
                          }]}
                          renderItem={item => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={item.title}
                                description={item.description}
                              />
                            </List.Item>
                          )}
                        />
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
                ))}
              </Tabs>
            </Col>
          </Row>
         
          {/* <ProfileCard/> */}
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;