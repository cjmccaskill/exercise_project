import React from "react";

const ConvertDate = (props) => {
  const date = new Date(props.children);
  console.log("Date", typeof date);
  console.log("Date", date);
  const fixDate = `${
    date.getMonth() + 1
  }-${date.getDate()}-${date.getFullYear()}`;
  console.log("Fixdate", fixDate);
  return <span>{fixDate}</span>;
};

export default ConvertDate;
