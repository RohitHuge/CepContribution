import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import '../src/components/AboutUs.css';

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <section className="first" id="first">
          <div className="images">
            <img src="/images/shaking_hand.png" alt="" />
            <img src="/images/cheering.png" alt="" />
            <img src="/images/community.png" alt="" />
          </div>
          <div className="sec_row">
            <div className="gotlost"><img src="/images/logo.png" alt="" /></div>
            <div className="points">
              <ul>
                <li>
                  We are creating a strong and generous community here and we love what we are doing here ! And everybody's welcome..! Hop in fast or someone else will grab your seat!
                </li>
                <li>
                  We all are humans and we love to help each other, the sense of satisfaction it gives us is just immense and I just don't want you to be missing out that feeling ! So join in by
                  <Link to="/">CLICKING HERE</Link>.
                </li>
              </ul>
            </div>
            <div className="rjitLogo"><img src="/images/rjitlogo.png" alt="" /></div>
          </div>
        </section>
        <section className="second" id="second">
          <div className="box">
            <img src="/images/thinking.png" alt="" />
            <div className="heading">
              <h3>You might be thinking about What value do we provide ?</h3>
            </div>
            <div className="content">
              <ol>
                <li>A trustworthy community.</li>
                <li>
                  Trying to increase the count of honest people is our society.(They are kinda rare na?)
                </li>
                <li>
                  Trying to minimise your loss in college years because college is only for happy-fun memories.
                </li>
                <li>
                  Interaction with people who you would've never interacted with otherwise.
                </li>
                <li>There's no communication barrier.</li>
                <li>
                  Accountable people for questioning so that you can trust us without a doubt.
                </li>
              </ol>
            </div>
            <p>
              What we do here is match the lost things to their rightful owners!
            </p>
          </div>
        </section>

        <section className="third" id="third">
          <div className="cheems">
            <p>Did This Ever Happen To You?</p>
            <p id="reply">
              *Haan Vro, Hua Hai. <img src="/images/cheems.jpg" alt="" />
            </p>
          </div>
          <div className="more_points">
            See we all are college students and more often we bring things that hold precious values in our lives to our college for various purposes! Right ?
            <br />
            <br /> And when you loose them unfortunately it becomes really-really very hard for you to face your guardians !! We know we get it we all have been there, when we lost things and we weren't able to face our guardians !!
            <br />
            <br />
            <em>
              <strong>
                So that's why we've thought of a way to help out the learners
                here who have lost their precious belongings within the hostel or
                campus or college to get their things back!
              </strong>
            </em>
            <br />
            <br /> Now you might be thinking how are we gonna do that! But sorry we ain't doing it !!! Yesss! You heard us right! We are not going to do it, instead...
            <br />
            <br />
            <em> <strong> You will be doing it yourself !</strong> </em> You all will be helping out each other !
            <br />
          </div>
          <div className="work">
            <h3>But wait wait! How's that gonna happen ?</h3>
            <div className="answer">
              We have that figured out for you ! We have a lost and a found button on our home page. So ...
              <br />
              <p>
                But first make sure that you are registered in our website and if sadly you are not, then just
                <Link to="/register">HEAD OVER HERE!</Link>
              </p>
            </div>
          </div>
        </section>

        <section className="fourth" id="fourth">
          <div className="found_row">
            <div className="found">
              <h3>Found</h3>
              <p>
                If you've found something that was lying around in the passage or hallway or playground just collect it and click the FOUND button on our home page and submit as much details as you can in the sections over there !
              </p>
            </div>
            <img src="/images/found_animated.jpg" alt="" />
          </div>
          <div className="lost_row">
            <img src="/images/lost_animated.jpg" alt="" />
            <div className="lost">
              <h3>Lost</h3>
              <p>
                And by if any misfortune you've lost something that was precious to you please submit the details regarding it by clicking the LOST button in on our home page and rest assured your precious belonging will find it's path back to you !
              </p>
            </div>
          </div>
        </section>

        <section className="fifth">
          <div className="data">
            <h3>
              This is all the data that we need for our working and nothing else.
            </h3>
            <ol>
              <li>Email Id for the registration part.</li>
              <li>Details of the lost</li>
              <li>Details of the found.</li>
            </ol>
          </div>
          <h3>How do we do what we usually do!</h3>
          <div className="ans">
            <ol>
              <li>
                All of those who have reported a lost item will get a notification about all the found items that are reported withing 14 days.
              </li>
              <li>
                And then there will be a little QnA section between the two people.
              </li>
              <li>
                And if they assure that they are the rightful owner then the item will be handed over to them.
              </li>
            </ol>
            <strong>And even if the rightful owner is not found the property will be
              safe in the vault especially alotted for out LOST-N-FOUND space! So
              just rest assured guysssss!</strong>
          </div>
          <p>This website is officially backed by the students of RJIT.</p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
