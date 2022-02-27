import React, { useEffect, useState } from "react";

const useStickyState = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    if (stickyValue !== null || stickyValue !== undefined) {
      try {
        return JSON.parse(stickyValue);
      } catch (e) {
        return e.message;
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

export default useStickyState;
