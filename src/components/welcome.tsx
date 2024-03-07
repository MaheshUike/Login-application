import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { DataGrid } from "@mui/x-data-grid";

const Welcome = () => {
  const signUpFormData = useSelector((state: RootState) => state.form.formData);

  const formFields = Object.entries(signUpFormData);

  const rows = formFields.map(([key, value], index) => ({ id: index + 1, field: key, value }));


  const columns = [
    { field: "field", headerName: "Field", width: 250 },
    { field: "value", headerName: "Value", width: 250 },
  ];

  return (
    <div className="Container">
      <div className="Grid">
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
}

export default Welcome;

