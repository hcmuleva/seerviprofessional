import React, { useState } from 'react';
import { List, Card, Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import JobForm from './JobForm';


const JobList = ({ jobs, onAddJob, onEditJob, onDeleteJob }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const userid=localStorage.getItem('userid')

  console.log("userid",userid);

  const showModal = (job) => {
    setEditingJob(job || null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingJob(null);
  };

  const handleSave = (job) => {
    if (editingJob) {
      onEditJob(job);
    } else {
      onAddJob(job);
    }
    setIsModalVisible(false);
    setEditingJob(null);
  };

  return (
    <div>
      <Button icon={<PlusOutlined />} onClick={() => showModal()} style={{ marginBottom: 16 }}>
        Add Job
      </Button>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={jobs}
        renderItem={(job) => (
          <List.Item>
            <Card
              title={job.post}
              extra = {
                <>
                  <Button icon={<EditOutlined />} onClick={() => showModal(job)} />
                  <Button icon={<DeleteOutlined />} onClick={() => onDeleteJob(job.id)} style={{ marginLeft: 8 }} />
                </>
              }
            >
              <p><strong>Organization:</strong> {job.organization}</p>
              <p><strong>Experience:</strong> {job.experience} years</p>
              <p><strong>Type:</strong> {job.type}</p>
              <p><strong>Job Type:</strong> {job.job_type}</p>
              <p><strong>Period:</strong> {job.from} to {job.to}</p>
              <p><strong>Address:</strong> {job.address.village}, {job.address.tehsil}, {job.address.district}, {job.address.state}</p>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title={editingJob ? "Edit Job" : "Add Job"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <JobForm job={editingJob} onSave={handleSave} userid={userid} setIsModalVisible={setIsModalVisible}/>
      </Modal>
    </div>
  );
};

export default JobList;

