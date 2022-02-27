import React, { useContext } from "react";

export default function sendAuthTokenHeader(token) {
  const configObj = {
    headers: {
       Authorization: `Bearer ${token}`
   },
  };
  return configObj;
}
