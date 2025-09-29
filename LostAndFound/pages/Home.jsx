import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import '../src/components/Home.css';

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <section className="discovery container section-1">
          <div className="text col-lg-6 col-md-6 col-12 w-50 d-flex flex-column align-items-center justify-content-center">
            <h1 className="got-lost-heading mb-3">GOT LOST</h1>
            <p>
              Something lost it's way and came to you just to show the world how
              honest you are!
            </p>
            <p className="mb-5">
              Or if you've lost something just chill! People here are damnnn cool!
            </p>
            <div className="shrink">
              <Link className="learn-more" to="/register">Register Now</Link>
            </div>
          </div>

          <div className="img col-lg-6 col-md-6 col-12">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center"
              alt="Lost and Found Hero Image"
              className="img-fluid lost-found"
            />
          </div>
        </section>

        <section className="discovery-col-ak section-2">
          <div className="container">
            <div className="img col-lg-6 col-md-6 col-12 w-50 pt-5 pb-5">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&crop=center"
                alt="Community Image"
                className="img-fluid border-top-20"
              />
            </div>
            <div className="text col-lg-6 col-md-6 col-12 w-50 pt-5 pb-5">
              <h2 className="title mb-3">
                WHAT WE DO
                <hr />
              </h2>
              <p className="mb-5">
                We try to reduce students stress somewhat by helping them if they
                lost something precious on the college/hostel grounds. <br />
                There are two sections where you can go to one is the
                <b><Link to="/lost">LOST</Link></b> section and the
                other is the
                <b><Link to="/found">FOUND</Link></b> section. You can
                inform other people about what precious belonging you've lost and
                ask your fellow students for help and if you've found something
                then you can be of help to somebody else. Both the sections have
                their respective instructions. <br />
                And the faculty involvement in this procedure is about nill, so it
                also helps in creating a strong bond between the kids and also to
                maintain transparency.
              </p>
              <div className="shrink d-inline-block">
                <Link className="learn-more px-5" to="/about">Learn More</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="service section-3">
          <div className="col mx-auto align-items-center pt-5">
            <div className="heading text-center mb-5 pt-3">
              <h2 className="heading">
                OUR SERVICES
                <div className="d-flex justify-content-center">
                  <hr />
                </div>
              </h2>
            </div>
            <div className="d-flex flex-row-reverse justify-content-between container">
              <div className="card-image w-50 col-lg-6 col-md-3 col-12 text-right">
                <img className="img-fluid w-100" src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center" alt="Lost Service Card" />
              </div>
              <div className="one col-lg-6 col-md-3 col-12 w-50 m-2 align-items-center lost-found-card">
                <h5 className="card-title">Lost</h5>
                <ul className="my-3">
                  <li className="text-left mb-3">
                    Only the property lost on College or Hostel can be reported.
                  </li>
                  <li className="text-left mb-3">
                    Maximum time for filing any lost report should be 2 days.
                  </li>
                  <li className="text-left mb-3">
                    Try to be as much detailed as you can be.
                  </li>
                  <li className="text-left mb-5">
                    Head towards the form below if you have lost your property.
                  </li>
                </ul>
                <div className="shrink">
                  <Link className="learn-more px-5" to="/lost">Next</Link>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-between container mt-5 pb-5">
              <div className="card-image w-50 col-lg-6 col-md-3 col-12 text-left">
                <img className="img-fluid w-100" src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center" alt="Found Service Card" />
              </div>
              <div className="one col-lg-6 col-md-3 col-12 w-50 m-2 align-items-center lost-found-card">
                <h5 className="card-title">Found</h5>
                <ul className="my-3">
                  <li className="text-left mb-3">
                    Below is the form, if you've found a lost property on
                    college/hostel.
                  </li>
                  <li className="text-left mb-3">
                    Please try to report as soon as possible so that you can help
                    someone in need.
                  </li>
                  <li className="text-left mb-3">
                    The involvement of faculty will be kept as minimum as possible
                    by our side, so that this might also help in student's ability
                    to build connections.
                  </li>
                  <li className="text-left mb-5">
                    If nobody comes forward for the property you found, only then
                    the faculty will get involved.
                  </li>
                </ul>
                <div className="shrink">
                  <Link className="learn-more px-5" to="/found">Next</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RECENT RETURNS */}
        <section className="section-4">
          <div className="heading text-center mb-4 pt-5">
            <h2 className="heading pt-5">
              RECENT RETURNS
              <div className="d-flex justify-content-center">
                <hr />
              </div>
            </h2>
          </div>
          <div className="container">
            <div className="card-group">
              <div className="card">
                <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&crop=center" className="card-img-top" alt="Cellphone" />
                <div className="card-body">
                  <h5 className="card-title">CELLPHONE</h5>
                  <p className="card-text">
                    Return By : <strong>Ishan Mishra</strong>
                  </p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </div>
              </div>
              <div className="card mx-2">
                <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&crop=center" className="card-img-top" alt="Wrist Watch" />
                <div className="card-body">
                  <h5 className="card-title">WRIST WATCH</h5>
                  <p className="card-text">
                    Return By : <strong>Rawat Senpai</strong>
                  </p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">Last updated 2 days ago</small>
                </div>
              </div>
              <div className="card">
                <img
                  src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop&crop=center"
                  className="card-img-top"
                  alt="Water Bottle"
                />
                <div className="card-body">
                  <h5 className="card-title">WATER BOTTLE</h5>
                  <p className="card-text">
                    Return By : <strong>Srishti Shukla</strong>
                  </p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">Last updated 3 days ago</small>
                </div>
              </div>
            </div>
            <div className="card-group mt-2">
              <div className="card">
                <img src="https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=300&fit=crop&crop=center" className="card-img-top" alt="AirPods" />
                <div className="card-body">
                  <h5 className="card-title">AIRPPODS</h5>
                  <p className="card-text">
                    Return By : <strong>MR. PALINDROME</strong>
                  </p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">Last updated 5 days ago</small>
                </div>
              </div>
              <div className="card mx-2">
                <img src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop&crop=center" className="card-img-top" alt="Football" />
                <div className="card-body">
                  <h5 className="card-title">FOOTBALL</h5>
                  <p className="card-text">Return By : <strong>MESSI</strong></p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">Last updated 7 days ago.</small>
                </div>
              </div>
              <div className="card">
                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&crop=center" className="card-img-top" alt="Headphone" />
                <div className="card-body">
                  <h5 className="card-title">HEADPHONE</h5>
                  <p className="card-text">
                    Return By : <strong>CHRISTENSON</strong>
                  </p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">Last updated 8 days ago</small>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom text-center mt-5 pb-5">
            <div className="shrink">
              <Link className="learn-more px-5" to="/gallery">View More</Link>
            </div>
          </div>
        </section>

        <section className="service section-5">
          <div className="row align-items-center container mx-auto py-5">
            <div className="img col-lg-6 col-md-6 col-12 w-75">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&crop=center" alt="Mission Image" className="img-fluid" />
            </div>
            <div className="text col-lg-6 col-md-6 col-12 w-75">
              <h2 className="title mb-3">
                OUR MISSION
                <hr />
              </h2>
              <p className="mb-5">
                Our mission is to make the students community more trustworthy and
                faithful and this place a safe space for all of your precious
                belongings. <br />
                We all know the students have to bring many sorts of precious
                belongings to college for many reasons and there are many chances
                of loosing it which might give the students some permanent scars
                because who knows what insane amount of value a little thing might
                hold in a person's life but don't worry that's where our page and
                your fellow collegemates come forward to help you ! We don't want
                you to be stressed if you've lost something on the college and
                hostel grounds we just want you to fill the form under the
                <b><Link to="/lost">LOST</Link></b> section so that we
                can get you out of this stress ASAP. <br />
                Even this page is created and managed by some of the students, so
                your fellow collegemates have already started helping you in a
                way.
              </p>
              <div className="shrink d-inline-block">
                <Link className="learn-more" to="/about">Learn More</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-primary t-bordered section-6">
          <div className="heading text-center mb-4">
            <h2 className="heading">
              TESTIMONIALS
              <div className="d-flex justify-content-center">
                <hr />
              </div>
            </h2>
          </div>
          <div className="container pb-5">
            <div className="row testimonial-three testimonial-three--col-three">
              <div className="col-md-4 testimonial-three-col">
                <div className="testimonial-inner">
                  <div className="testimonial-image" itemprop="image">
                    <img
                      width="180"
                      height="180"
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt=""
                    />
                  </div>
                  <div className="testimonial-meta mb-2">
                    <strong className="testimonial-name" itemprop="name">
                      Rawat Senpai
                    </strong>
                  </div>
                  <div className="testimonial-content">
                    <p>
                      Not gonna lie friends, it really worked for me, I lost my
                      watch and was abe to retrieve it within a week. And the
                      relief i got after that was just immense. Can't thank you
                      guys enough.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 testimonial-three-col">
                <div className="testimonial-inner">
                  <div className="testimonial-image" itemprop="image">
                    <img
                      width="180"
                      height="180"
                      src="https://bootdey.com/img/Content/avatar/avatar2.png"
                      alt=""
                    />
                  </div>
                  <div className="testimonial-meta mb-2">
                    <strong className="testimonial-name" itemprop="name">
                      Ishan Mishra
                    </strong>
                  </div>
                  <div className="testimonial-content">
                    <p>
                      Here to share this wonderful experience when i lost my book
                      and luckily a senior from the course same as mine returned
                      it to me and they also help me with my acedemics very often
                      now. Thanks a lot fot this.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 testimonial-three-col">
                <div className="testimonial-inner">
                  <div className="testimonial-image" itemprop="image">
                    <img
                      width="180"
                      height="180"
                      src="https://bootdey.com/img/Content/avatar/avatar6.png"
                      alt=""
                    />
                  </div>
                  <div className="testimonial-meta mb-2">
                    <strong className="testimonial-name" itemprop="name">
                      Srishti Shukla
                    </strong>
                  </div>
                  <div className="testimonial-content">
                    <p>
                      At first i didn't put so much faith in this, but later when
                      I got back my Headphone I can't express how good I felt. And
                      I never imagined that i'll get it back but i was wrong and i
                      got it back. And i never knew that my collegemates were so
                      good and helpful. Thanks guys it means a lot.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
