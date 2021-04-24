import React from "react";

const IconConverter = (icon: string) => {
  const short = icon.substring(0, 2);
  if (short == "50") {
    return "50";
  }
  if (short == "11") {
    return "11";
  }
  if (short == "03" || short == "04") {
    return "cloudy";
  }
  return icon;
};

export default IconConverter;
