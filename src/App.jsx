import { useState } from 'react';
import './App.css';
import './css/vqm-porfolio.css';
import logo from './css/VQM-logo.png';
import { SiGmail, SiLinkedin, SiGithub } from "react-icons/si";
import ColorSwitcher from './ColorSwitcher'; // Import the new component

const VqmLogo = () => {
  return (
    <div className="vqm-logo">
      <a href="https://revoloero.github.io">VQM</a>
    </div>
  );
};

const WelcomeMessage = () => {
  return (
    <div className="message-wrap">
      <span></span>
    </div>
  );
};

const ContactBar = () => {
  return (
    <div className="contact-bar">
      <a href="mailto: vuongquyenmai@gmail.com"><SiGmail /></a>
      <a href="https://www.linkedin.com/in/vuong-quyen-mai/"><SiLinkedin /></a>
      <a href="https://github.com/RevoloerO"><SiGithub /></a>
      <ColorSwitcher /> {/* Use the new component */}
    </div>
  );
};

const Title = () => (
  <div className="title">
    <h1> &lt;Vuong Quyen Mai&gt;</h1>
    <h3 id="type1"> &lt; Blockchain & Full-stack Web Developer &gt; </h3>
    <h3 id="type2"> &lt; Master's degree in Information Systems &gt;</h3>
    <h3 id="type3"> &lt; Bachelor's degree in Computer Science &gt;</h3>
  </div>
);

const Introduction = () => (
  <div className="introduction">
    <p> As a MERN full-stack web developer, I am driven by a passion for crafting innovative and efficient
      web solutions that cater to the needs of both individuals and businesses. <br /> Armed with my proficiency
      in MERN stack development, I possess the skills and expertise to create dynamic web applications that
      are tailored to your unique requirements. My ultimate goal is to work collaboratively with you to
      transform your ideas into reality and empower your enterprise to flourish in the digital realm. </p>
    <a href="https://revoloero.github.io/vqm-porfolio-v3/">[[ Resume & Porfolio V3 ]]</a>
    <a href="https://revoloero.github.io/vqm-porfolio-v2/">[[ Resume & Porfolio V2 ]]</a>
    <a href="https://revoloero.github.io/vqm-countries-info/">[[ Country Info App ]]</a>
  </div>
);

const Banner = () => {
  return (
    <div className="banner">
      <ContactBar />
      <div className="banner-welcome">
        <VqmLogo />
        <WelcomeMessage />
      </div>
      <div className="banner-title">
        <Title />
      </div>
      <div className="banner-detail">
        <Introduction />
      </div>
      <div className="footer">
        <img src={logo} alt="vqm-logo-img" id="footer-img" />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <>
      <Banner />
    </>
  );
};

export default App;
