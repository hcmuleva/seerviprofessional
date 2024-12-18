import { useState } from "react";
import { Card, Badge, Select, Row, Col } from "antd";

const { Option } = Select;

// Mock data for job types and jobs
const jobTypes = ["All", "Permanent", "Parttime", "Contract", "other"];



export default function JobDisplay({users}) {
    console.log("INSIDE JOBDISPLAY", users)
  const [selectedType, setSelectedType] = useState("All");

  const filteredJobs = selectedType === "All" ? users : users.filter((job) => job.type === selectedType);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
        Job Listings
      </h1>

      {/* Job Type Filter */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <Select
          defaultValue="All"
          onChange={(value) => setSelectedType(value)}
          style={{ width: 200 }}
        >
          {jobTypes.map((type) => (
            <Option key={type} value={type}>
              {type}
            </Option>
          ))}
        </Select>
      </div>

      {/* <div style={{ textAlign: "center" }}>
        <h3>Job Listings</h3>
        {filteredJobs.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {filteredJobs.map((job) => (
              <li key={job.id} style={{ margin: "10px 0" }}>
                <strong>{job.title}</strong> - <em>{job.type}</em>
              </li>
            ))}
          </ul>
        ) : (
          <p>No jobs available for the selected type.</p>
        )}
      </div> */}

      {/* Job Cards */}
      <Row gutter={[16, 16]}>
        {filteredJobs.map((job) => (
          <Col xs={24} sm={12} lg={8} key={job.id}>
            <Card
              title={job.title}
              bordered
              style={{ height: "100%" }}
              extra={<span style={{ color: "#888" }}>{job.location}</span>}
            >
              <p style={{ marginBottom: "8px" }}>
                <strong>Company:</strong> {job.organization}
              </p>
              <p>
              <strong>Job Type:</strong> {job.job_type}
              </p>
              <Badge
                style={{ backgroundColor: "#108ee9", color: "#fff" }}
                count={job.type}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
