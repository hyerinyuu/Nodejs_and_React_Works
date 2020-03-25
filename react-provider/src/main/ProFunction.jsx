import React, { useContext } from "react";
import MProvider from "../Provider/MessageProvider";

const ProFunction = () => {
  const messageContext = useContext(MProvider);
  return (
    <div>
      <p>나는 함수 component</p>
      <p>{messageContext.message}</p>
    </div>
  );
};

export default ProFunction;
