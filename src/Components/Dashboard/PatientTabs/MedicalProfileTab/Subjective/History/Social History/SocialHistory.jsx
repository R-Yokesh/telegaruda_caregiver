import {
  CCard,
  CCardBody,
  CCol,
  CModal,
  CModalBody,
  CRow,
} from "@coreui/react";
import React, { useCallback, useEffect, useState } from "react";
import Pagination from "../../../../../../Pagination/Pagination";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import { Assets } from "../../../../../../../assets/Assets";
import DateSelector from "../../../../../../DateRangePicker/DateSelector";
import BlurBackground from "../../../../../../BlurBackground/BlurBackground";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import MedHistoryForm from "./MedHistoryForm";
import MedicalHistoryTable from "../../../../../../Tables/Subjective/MedicalHistoryTable";
import SocialHistoryTable from "../../../../../../Tables/Subjective/SocialHistoryTable";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import useApi from "../../../../../../../ApiServices/useApi";

const SocialHistory = ({ from, back }) => {
  const { get, post, clearCache, patch, del, loading } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [socialList, setSocialList] = useState({});
  const Data = {
    id: 1,
    smoking: "No",
    alcohol: "No",
    drugs: "No",
  };

  const getSocialLists = useCallback(async () => {
    try {
      const response = await get(
        `resource/patientHistories?slug=social-history&user_id=${data?.user_id}&limit=1&page=1&order_by=id&dir=2` //${data?.user_id}
      );
      const listData = response?.data?.patient_histories[0]; //
      setSocialList(listData);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  }, [data?.user_id, get]);

  const socialEdit = async (answerDatas, selectedId) => {
    try {
      const url = `resource/patientHistories/${selectedId}`; // Replace with your API endpoint
      const body = {
        values: answerDatas,
        patient_id: data?.user_id, //data?.user_id
        slug: "social-history",
      };
      await patch(url, body);
      clearCache();
      await getSocialLists();
      toast.success("Updated successfully");
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };
  const socialAdd = async (answerDatas) => {
    try {
      const url = `resource/patientHistories`; // Replace with your API endpoint
      const body = {
        values: answerDatas,
        patient_id: data?.user_id, //data?.user_id
        slug: "social-history",
      };
      await post(url, body);
      clearCache();
      await getSocialLists();
      toast.success("Added successfully");
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };
  useEffect(() => {
    getSocialLists();
  }, [getSocialLists]);
  return (
    <>
      <CCard className="p-2 cursor-default mb-5">
        <CCardBody className="mb-3">
          {!loading && (
            <MedHistoryForm
              back={back}
              defaultValues={socialList}
              from={from}
              socialAdd={socialAdd}
              socialEdit={socialEdit}
            />
          )}
        </CCardBody>
      </CCard>
    </>
  );
};

export default SocialHistory;
