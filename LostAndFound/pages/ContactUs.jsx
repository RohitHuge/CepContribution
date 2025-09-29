import React, { useState } from 'react';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import '../src/components/ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <>
      <header>
        <Navbar />
        <div className="heading text-center" style={{ marginTop: '2rem' }}>
          <h1 className="font-weight-bold text-dark">CONTACT US</h1>
        </div>
        <section className="discovery py-5">
          <div className="row align-items-center container mx-auto">
            <div className="img col-lg-6 col-md-6 col-12 w-50">
              <img src="/images/contactus.jpg" alt="image" className="img-fluid" />
            </div>

            <div className="text col-lg-6 col-md-6 col-12 w-50">
              <div className="container mt-4" id="form-container">
                <h2 className="text-center">Feel free to contact us using this form <i className="far fa-smile-beam"></i></h2>
                <form action="contactus.html" className="text-center" onSubmit={handleSubmit}>
                  <div className="input-group mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-primary" id="inputGroup-sizing-default">Name</span>
                    </div>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Name" 
                      className="form-control" 
                      id="name"
                      aria-describedby="emailHelp"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-primary" id="inputGroup-sizing-default">Email</span>
                    </div>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="john@gmail.com" 
                      className="form-control" 
                      id="email"
                      aria-describedby="emailHelp"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-primary" id="inputGroup-sizing-default">Phone No.</span>
                    </div>
                    <input 
                      type="text" 
                      name="phone" 
                      className="form-control" 
                      placeholder="+91 8888 8888"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group mb-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text bg-primary" id="inputGroup-sizing-default">Subject</span>
                    </div>
                    <textarea 
                      name="subject" 
                      className="form-control" 
                      id="desc" 
                      placeholder="Write Here..." 
                      cols="30" 
                      rows="2"
                      value={formData.subject}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-outline-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </header>
      <Footer />
    </>
  );
};

export default ContactUs;
