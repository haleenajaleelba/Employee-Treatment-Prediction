import React, { Component } from "react";
import "../scss/home.scss";
import tick from "../Images/checked.svg";
import { NavLink } from "react-router-dom";
import partner1 from "../Images/dummy/partner-1.jpg";
import partner2 from "../Images/dummy/partner-2.jpg";
import partner3 from "../Images/dummy/partner-3.jpg";
import partner4 from "../Images/dummy/partner-4.jpg";
import cc1 from "../Images/cor1.jpeg";
import cc2 from "../Images/cor2.jpeg";
import cc3 from "../Images/cor3.jpeg";
import top1 from "../Images/abc.png";
import { Parallax } from "react-parallax";

export default class home extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            backgroundColor: "rgb(0,0,0)",
            height: "60px",
            width: "100%",
            top: "70px",
            opacity: "0.6",
            position: "fixed"
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <p
                style={{
                  paddingLeft: "120px",
                  paddingTop: "13px",
                  fontSize: "20px",
                  color: "white",
                  fontWeight: "700"
                }}
              >
                Are you stressed? Know your mental health
              </p>
            </div>
            <div className="col-md-6">
              <p
                style={{
                  paddingLeft: "160px",
                  paddingTop: "13px",
                  fontSize: "20px",
                  color: "white",
                  fontFamily: "times",
                  fontWeight: "700"
                }}
              >
                Call us now +91-120-406-2000
              </p>
            </div>
          </div>
        </div>

        <div className="background">
          <div className="container-fluid">
            <div className="row">
              <div
                className="col-lg-5"
                style={{
                  marginLeft: "70px",
                  marginTop: "120px",
                  marginBottom: "60px",
                  marginRight: "10px"
                }}
              >
                <div className="bg-text">
                  <h3>Mental health in tech industry</h3>
                  <ul>
                    <li>
                      <img src={tick} alt="tick" />{" "}
                      <b>Tech workers are at least five times more depressed</b>{" "}
                      than the UK average, according to the latest research
                    </li>
                    <li>
                      <img src={tick} alt="tick" /> While two thirds of the
                      3,000 workers questioned said their work made them feel
                      stressed, a worrying{" "}
                      <b>13% experienced this strain on a continual basis</b>
                    </li>
                    <li>
                      <img src={tick} alt="tick" /> Some <b>28%</b> also
                      acknowledged having been{" "}
                      <b>formally diagnosed with a mental health condition</b>
                    </li>
                    <li>
                      <img src={tick} alt="tick" /> <b>More women (32%)</b>{" "}
                      finding themselves in this position than <b>men (23%)</b>
                    </li>
                  </ul>
                  <a
                    className="btn btn-info float-right"
                    style={{ margin: "20px", borderRadius: "18px" }}
                    href="https://diginomica.com/mental-health-awareness-week-tech-industry-crisis-organizations-need-tackle"
                    target={"_blank"}
                  >
                    Learn More
                  </a>
                </div>
              </div>
              <div
                className="col-lg-5"
                style={{
                  marginLeft: "70px",
                  marginTop: "70px",
                  marginBottom: "60px",
                  marginRight: "10px",
                  height: "300px"
                }}
              >
                <img
                  src={top1}
                  className="d-block w-100"
                  alt="cara"
                  style={{ height: "500px" }}
                ></img>
              </div>
            </div>
          </div>
        </div>

        <div
          className="container"
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          <div className="row">
            <div className="col-12 col-lg-4 text-center border-0">
              <div className="card-body">
                <i className="fa fa-check fa-3x circled bg-skin"></i>
                <h4 className="h-bold text-align-center">
                  Make an appointment
                </h4>
                <p className="text-align-center">
                  Explains what stress is, what might cause it and how it can
                  affect you. Includes information about ways you can help
                  yourself and how to get support.
                </p>
              </div>
            </div>
            <div className="col-12  col-lg-4 text-center border-0">
              <div className="card-body">
                <i className="fa fa-list-alt fa-3x circled bg-skin"></i>
                <h4 className="h-bold text-align-center">
                  Choose your package
                </h4>
                <p className="text-align-center">
                  Check out our promotional offers on print and digital
                  booklets, for a limited time only. You can choose our packages
                  for treatment
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-4 text-center border-0">
              <div className="card-body">
                <i className="fa fa-hospital-o fa-3x circled bg-skin"></i>
                <h4 className="h-bold text-align-center">Your Feedback</h4>
                <p className="text-align-center">
                  The Simplest, Smartest way to get Customer Feedback Survey
                  customers, gather insights and get more positive engagement on
                  social media channels.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Parallax
          blur={1}
          bgImage={require("../Images/1.jpg")}
          bgImageAlt="the cat"
          strength={200}
        >
          <h1
            className="text-white container"
            style={{ fontSize: "400%", marginTop: "5%" }}
          >
            Do exercise
            <br />
            &nbsp;&nbsp;&nbsp;Stay fit <br />
            Live young
          </h1>
          <div style={{ height: "80px" }} />
        </Parallax>

        <div className="container" style={{ marginTop: "50px" }}>
          <div className="row">
            <div className="col-md-12">
              <div className="callaction bg-light">
                <div className="row">
                  <div className="col-md-9">
                    <h3>Are you stressed? Know your mental health</h3>
                    <p>
                      The most dangerous thing about stress is how easily it can
                      creep up on you. You get used to it. It starts to feel
                      familiar, even normal. You don’t notice how much it’s
                      affecting you, even as it takes a heavy toll. That’s why
                      it’s important to be aware of the common warning signs and
                      symptoms of stress overload.{" "}
                    </p>
                  </div>
                  <div
                    className="col-md-3 text-align-center"
                    style={{ paddingTop: "20px" }}
                  >
                    <NavLink
                      className="btn btn-info"
                      to="/knowyourstatus"
                      style={{ borderRadius: "18px" }}
                    >
                      Check me out
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container" style={{ marginTop: "30px" }}>
          <div className="row">
            <div className="section-heading text-center">
              <h2 className="h-bold">Our facilities</h2>
              <p className={{ fontFamily: "sans-serif", opacity: "0.5" }}>
                Recovery programs for depression treatment, anger management,
                anxiety and stress
              </p>
            </div>
            <div className="divider-short"></div>
          </div>
        </div>

        <div>
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
            style={{ marginTop: "40px" }}
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
              ></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={cc1}
                  style={{ height: "50%" }}
                  className="d-block w-100"
                  alt="cara"
                />
              </div>
              <div className="carousel-item">
                <img src={cc2} className="d-block w-100" alt="cara" />
              </div>
              <div className="carousel-item">
                <img src={cc3} className="d-block w-100" alt="cara" />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>

        <div id="partner" style={{ marginTop: "100px" }}>
          <div className="container">
            <div className="row">
              <div>
                <div className="section-heading text-center">
                  <h2 className="h-bold">Our partner</h2>
                  <p className="take_charge">
                    Take charge of your health today with our specially designed
                    health packages
                  </p>
                </div>
              </div>
              <div className="divider-short"></div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-3">
                <div className="partner">
                  <a href="hello">
                    <img src={partner1} alt="hello" />
                  </a>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="partner">
                  <a href="hello">
                    <img src={partner2} alt="" />
                  </a>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="partner">
                  <a href="hello">
                    <img src={partner3} alt="" />
                  </a>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="partner">
                  <a href="hello">
                    <img src={partner4} alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer style={{ marginTop: "10%" }}>
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-4">
                <div className="wow fadeInDown" data-wow-delay="0.1s">
                  <div className="widget">
                    <h5>About FreshMinds</h5>
                    <p>
                      A Mental fitness pridicting website for keeping 
                      you mentally fit and healthy.
                    </p>
                  </div>
                </div>
                <div className="wow fadeInDown" data-wow-delay="0.1s">
                  <div className="widget">
                    <h5>Information</h5>
                    <ul>
                      <li>Home</li>
                      <li>Laboratory</li>
                      <li>Medical treatment</li>
                      <li>Terms & conditions</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="wow fadeInDown" data-wow-delay="0.1s">
                  <div className="widget">
                    <h5>FreshMinds center</h5>
                    <p>
                      Provide consultancy and rooms for medication and yoga.
                    </p>
                    <ul>
                      <li>
                        <span className="fa-stack fa-lg">
                          <i className="fa fa-circle fa-stack-2x"></i>
                          <i className="fa fa-phone fa-stack-1x fa-inverse"></i>
                        </span>{" "}
                        +91-120-406-2000
                      </li>
                      <li>
                        <span className="fa-stack fa-lg">
                          <i className="fa fa-circle fa-stack-2x"></i>
                          <i className="fa fa-envelope-o fa-stack-1x fa-inverse"></i>
                        </span>{" "}
                        info@globallogic.com
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="wow fadeInDown" data-wow-delay="0.1s">
                  <div className="widget">
                    <h5>Our location</h5>
                    <p>
                    Tower - 3, Oxygen Business Park SEZ, Sector 144, Noida Expressway, Noida, Uttar Pradesh – 201304
                    </p>
                  </div>
                </div>
                <div className="wow fadeInDown" data-wow-delay="0.1s">
                  <div className="widget">
                    <h5>Follow us</h5>
                    <ul className="company-social">
                      <li className="social-facebook icon-margin">
                        <i className="fa fa-facebook p-2"></i>
                      </li>
                      <li className="social-twitter icon-margin">
                        <i className="fa fa-twitter p-2"></i>
                      </li>
                      <li className="social-google">
                        <i className="fa fa-google-plus p-2"></i>
                      </li>
                      <li className="social-vimeo">
                        <i className="fa fa-vimeo-square p-2"></i>
                      </li>
                      <li className="social-dribble">
                        <i className="fa fa-dribbble p-2"></i>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
