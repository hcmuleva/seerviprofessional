import { useList } from "@refinedev/core";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Avatar } from "antd";
import React, { useRef } from "react";
import Header from "./profileView/header/header";

// Avatar Image Component
const AvatarImage = ({ src }) => {
  return <Avatar src={src} size={64} />;
};

// Image Cell Renderer Component
const ImageCellRenderer = (props) => {
  const images = props?.value; // Ensure value is defined
  const firstImageUrl = images?.url || ""; // Fallback if undefined

  return (
    <div className="flex items-center gap-2">
      {firstImageUrl ? <AvatarImage key="image" src={firstImageUrl} /> : "No Image"}
    </div>
  );
};

export default function UserDashboard() {
  const gridRef = useRef(null);

  const { data: usersData, isLoading, isFetching } = useList({
    resource: "users",
    meta: {
      populate: ["profilePicture"],
    },
    filters: [{ field: "org", operator: "eq", value: "SEERVI" }],
    sort: {
      field: "id", 
      order: "desc", 
    },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isFetching) {
    return <h1>Fetching...</h1>;
  }

  // Transform `usersData?.data` if necessary
  const rowData = usersData?.data?.map((user) => ({
    id: user.id,
    profilePicture: user.profilePicture, // Ensure this matches your API structure
    FirstName: user.FirstName,
    LastName: user.LastName,
    Profession: user.Profession,
    State: user.State,
    Country:user.Country,
    City:user.City,
    WorkingCity: user.WorkingCity,
  }));

  const columnDefs = [
    {
      headerName: "Pictures",
      field: "profilePicture",
      cellRenderer: ImageCellRenderer,
      width: 90,
      autoHeight: true,
      cellStyle: { display: "flex", alignItems: "center", padding: "5px" },
    },
    { headerName: "ID", field: "id", width: 120 },
    { headerName: "First Name", field: "FirstName", width: 125 },
    { headerName: "Last Name", field: "LastName", width: 125 },
    { headerName: "Profession", field: "Profession", width: 125 },
     { headerName: "Country", field: "Country", width: 110 },
    { headerName: "State", field: "State", width: 110 },
    { headerName: "City", field: "City", width: 110 },

    { headerName: "Working City", field: "WorkingCity", width: 124 },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true, // Enable filtering
    resizable: true,
    suppressSizeToFit: true,
  };

  return (
    <div className="ag-theme-alpine" style={{ height: "100%", width: "100%" }}>
      <Header/>
      <AgGridReact
        rowData={rowData}
        ref={gridRef}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
        rowHeight={50}
      />
    </div>
  );
}
