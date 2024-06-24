import { CBreadcrumb, CBreadcrumbItem } from "@coreui/react";
import React from "react";
import "./Breadcrumb.css";

const Breadcrumb = ({ paths }) => {
  const lastIndex = paths.length - 1;
  const url = "/telegaruda-provider";
  return (
    <>
      <CBreadcrumb>
        {paths.map((data, index) => (
          <CBreadcrumbItem
            href={url + data?.to}
            className={`breadcrumb-item-custom ${
              lastIndex === index && "black"
            }`}
          >
            <span className="breadcrumb-label">{data.label}</span>
          </CBreadcrumbItem>
        ))}
      </CBreadcrumb>
    </>
  );
};

export default Breadcrumb;
