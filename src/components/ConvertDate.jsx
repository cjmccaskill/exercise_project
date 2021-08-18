import React from "react";

const ConvertDate = (props) => {
  const date = new Date(props.children);
  const fixDate = `${
    date.getMonth() + 1
  }-${date.getDate()}-${date.getFullYear()}`;
  return <span>{fixDate}</span>;
};

export default ConvertDate;
