import { useState } from "react";
import classes from "./Footer.module.css";
import classesFace from "./Face.module.css";
import classesInsta from "./Insta.module.css";
import classesWhat from "./Whatsapp.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const [faceActive, setFaceActive] = useState(false);
  const [instaActive, setInstaActive] = useState(false);
  const [whatActive, setWhatActive] = useState(false);

  const MouseOverFaceHandler = () => {
    setFaceActive(true);
  };
  const MouseOutFaceHandler = () => {
    setFaceActive(false);
  };
  const MouseOverInstaHandler = () => {
    setInstaActive(true);
  };
  const MouseOutInstaHandler = () => {
    setInstaActive(false);
  };

  const MouseOverWhatsaHandler = () => {
    setWhatActive(true);
  };
  const MouseOutWhatsaHandler = () => {
    setWhatActive(false);
  };
  return (
    <footer>
      <ul>
        <li
          className={`${classes.Elemento} ${
            faceActive ? classes.ElementoActiveFace : ""
          }`}
          onMouseEnter={MouseOverFaceHandler}
          onMouseLeave={MouseOutFaceHandler}
        >
          <div
            className={`${classesFace.Facebook} ${
              faceActive ? classesFace.FacebookActive : ""
            }`}
          >
            <span
              className={`${classesFace.vertical} ${
                faceActive ? classesFace.verticalActive : ""
              }`}
            ></span>
            <span
              className={`${classesFace.horizontal} ${
                faceActive ? classesFace.horizontalActive : ""
              }`}
            ></span>
            <span
              className={`${classesFace.diagonal} ${
                faceActive ? classesFace.diagonalActive : ""
              }`}
            ></span>
            <span
              className={`${classesFace.diagonal2} ${
                faceActive ? classesFace.diagonal2Active : ""
              }`}
            ></span>
          </div>
        </li>
        <li
          className={`${classes.ElementoInsta} ${
            instaActive ? classes.ElementoActiveInsta : ""
          }`}
          onMouseEnter={MouseOverInstaHandler}
          onMouseLeave={MouseOutInstaHandler}
        >
          <div
            className={`${classesInsta.Instagram} ${
              instaActive ? classesInsta.InstagramActive : ""
            }`}
          >
            <div
              className={`${classesInsta.InstaFondo} ${
                instaActive ? classesInsta.InstaFondoActive : ""
              }`}
            ></div>
            <span
              className={`${classesInsta.Point} ${
                instaActive ? classesInsta.PointActive : ""
              }`}
            ></span>
          </div>
        </li>
        <li
          className={`${classes.Elemento} ${
            whatActive ? classes.ElementoActiveWasa : ""
          }`}
          onMouseEnter={MouseOverWhatsaHandler}
          onMouseLeave={MouseOutWhatsaHandler}
        >
          <FontAwesomeIcon
            icon={faWhatsapp}
            className={`${classesWhat.Icon} ${
              whatActive ? classesWhat.IconActive : ""
            }`}
          />
        </li>
      </ul>
      <section>
        <div>
          <h2>Telefono</h2>
          <p>Local:27092659</p>
          <p>Celular:098892879</p>
        </div>
      </section>
    </footer>
  );
};
export default Footer;
