import logo01d from "../images/01d.png";
import logo01n from "../images/01n.png";
import logo02d from "../images/02d.png";
import logo02n from "../images/02n.png";
import logo09d from "../images/09d.png";
import logo09n from "../images/09n.png";
import logo10d from "../images/10d.png";
import logo10n from "../images/10n.png";
import logo13d from "../images/13d.png";
import logo13n from "../images/13n.png";
import logo11 from "../images/11.png";
import logo50 from "../images/50.png";
import cloudy from "../images/cloudy.png";

const IconConverter = (icon: string) => {
  const short = icon.substring(0, 2);
  if (short === "50") {
    return logo50;
  }
  if (short === "11") {
    return logo11;
  }
  if (short === "03" || short === "04") {
    return cloudy;
  }
  if (short === "01d") {
    return logo01d;
  }
  if (short === "01n") {
    return logo01n;
  }
  if (short === "02d") {
    return logo02d;
  }
  if (short === "02n") {
    return logo02n;
  }
  if (short === "09d") {
    return logo09d;
  }
  if (short === "09n") {
    return logo09n;
  }
  if (short === "10d") {
    return logo10d;
  }
  if (short === "10n") {
    return logo10n;
  }
  if (short === "13d") {
    return logo13d;
  }
  if (short === "13n") {
    return logo13n;
  }
};

export default IconConverter;
