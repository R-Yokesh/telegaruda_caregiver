import { CCol, CRow } from "@coreui/react";
import React from "react";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import { Assets } from "../../assets/Assets";

const SearchBar = () => {
  return (
    <>
      <CRow className="mb-2">
        <CCol md={6} className="d-flex flex-column gap-1">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Search
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                placeholder="Enter"
              />
            </div>
          </div>
        </CCol>
        <CCol
          md={3}
          className="d-flex flex-column gap-1 justify-content-end"
          style={{ width: "60px" }}
        >
          <PrimaryButton>
            <div className="d-flex align-items-center gap-2">
              <img src={Assets.search} alt="close" />
            </div>
          </PrimaryButton>
        </CCol>
      </CRow>
    </>
  );
};

export default SearchBar;
