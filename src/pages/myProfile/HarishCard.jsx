import React from 'react';
import { Avatar, Card, Progress, Tabs, Typography, Button, Row, Col, List, Tag } from 'antd';
import { EditOutlined, EnvironmentOutlined, BankOutlined, GlobalOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;


const ProfilePage = () => {
  const profileInfo = {
    name: "Anna Adame",
    title: "Owner & Founder",
    location: "California, United States",
    company: "Themesbrand",
    followers: "24.3K",
    following: "1.3K",
    about: `Hi I'm Anna Adame, It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is European languages are members of the same family.

    You always want to make sure that your fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play around with the fonts that you already have in the software you're working with reputable font websites. This may be the most commonly encountered tip I received from the designers I spoke with. They highly encourage that you use different fonts in one design, but do not over-exaggerate and go overboard.`,
    fullName: "Anna Adame",
    mobile: "+1 987 6543",
    email: "daveadame@velzon.com",
    joiningDate: "24 Nov 2021",
    designation: "Lead Designer / Developer",
    website: "www.velzon.com"
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
                <Avatar
                  size={120}
                  src="/placeholder.svg?height=120&width=120"
                  style={{ marginBottom: '16px' }}
                />
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
                <Button type="primary" icon={<EditOutlined />}>
                  Edit Profile
                </Button>
              </div>

              <Tabs defaultActiveKey="1">
                <TabPane tab="Overview" key="1">
                  <Row gutter={[24, 24]}>
                    {/* Complete Profile Card */}
                    <Col xs={24} lg={12}>
                      <Card 
                        title="Complete Your Profile" 
                        extra={<Tag color="blue">30%</Tag>}
                        bordered={false}
                      >
                        <Progress percent={30} showInfo={false} strokeColor="#4863A0" />
                      </Card>
                    </Col>

                    {/* Info Card */}
                    <Col xs={24} lg={12}>
                      <Card title="Info" bordered={false}>
                        <List
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
                        />
                      </Card>
                    </Col>

                    {/* About Card */}
                    <Col span={24}>
                      <Card title="About" bordered={false}>
                        <Paragraph style={{ marginBottom: 0 }}>
                          {profileInfo.about}
                        </Paragraph>
                      </Card>
                    </Col>

                    {/* Designation & Website */}
                    <Col span={24}>
                      <Card bordered={false}>
                        <Row gutter={24}>
                          <Col xs={24} sm={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <UserOutlined />
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
                <TabPane tab="Activities" key="2">
                  <Card bordered={false}>
                    <Text type="secondary">Activities content</Text>
                  </Card>
                </TabPane>
                <TabPane tab="Projects" key="3">
                  <Card bordered={false}>
                    <Text type="secondary">Projects content</Text>
                  </Card>
                </TabPane>
                <TabPane tab="Documents" key="4">
                  <Card bordered={false}>
                    <Text type="secondary">Documents content</Text>
                  </Card>
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;

