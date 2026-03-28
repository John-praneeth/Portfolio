import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:johnpraneeth3030@gmail.com" data-cursor="magnetic">
                johnpraneeth3030@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+919493030092" data-cursor="magnetic">
                +91 9493030092
              </a>
            </p>
            <h4>Education</h4>
            <p>B.Tech – Andhra University</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/John-praneeth"
              target="_blank"
              data-cursor="magnetic"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/john-praneeth/"
              target="_blank"
              data-cursor="magnetic"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="mailto:johnpraneeth@outlook.com"
              data-cursor="magnetic"
              className="contact-social"
            >
              Outlook <MdArrowOutward />
            </a>
            <a
              href="https://www.instagram.com/john__praneeth/"
              target="_blank"
              data-cursor="magnetic"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>John Praneeth</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
