import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../src/contexts/AuthContext';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import '../src/components/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    sex: '',
    year: '',
    branch: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    
    if (!formData.agreeTerms) {
      setError('Please agree to the terms and conditions!');
      return;
    }

    setLoading(true);

    try {
      const result = await register(formData.email, formData.password, formData.fullName);
      if (result.success) {
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <section>
          <div className="container" id="main-container">
            <div className="image">
              <img src="/images/register.jpg" alt="" />
            </div>

            <div className="container p-5 mt-5" id="form-container">
              <h1 className="text-center">Register Here <i className="far fa-smile-beam"></i></h1>
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="input-group mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-primary" id="inputGroup-sizing-default">Full Name*</span>
                  </div>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="John Cena" 
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-primary" id="inputGroup-sizing-default">Email*</span>
                  </div>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="cenajohn@gmail.com"
                    aria-label="Default" 
                    aria-describedby="inputGroup-sizing-default"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
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
                {/* <div className="input-group mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-primary" id="inputGroup-sizing-default">Sex*</span>
                  </div>
                  <select 
                    id="inputState" 
                    className="form-control"
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div> */}
                {/* <div className="input-group mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-primary" id="inputGroup-sizing-default">Year*</span>
                  </div>
                  <select 
                    id="inputState" 
                    className="form-control"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="first">Ⅰ</option>
                    <option value="second">Ⅱ</option>
                    <option value="third">Ⅲ</option>
                    <option value="fourth">Ⅳ</option>
                  </select>
                </div> */}
                {/* <div className="input-group mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-primary" id="inputGroup-sizing-default">Branch*</span>
                  </div>
                  <select 
                    id="inputState" 
                    className="form-control"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="cse">Computer Science Engineering</option>
                    <option value="it">Information Technology</option>
                    <option value="ec">Electronics And Communication Engineering</option>
                    <option value="ee">Electrical Engineering</option>
                    <option value="au">Automobile Engineering</option>
                    <option value="me">Mechanical Engineering</option>
                  </select>
                </div> */}
                <div className="input-group mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-primary" id="inputGroup-sizing-default">Password*</span>
                  </div>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="inputPassword4" 
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-primary" id="inputGroup-sizing-default">Confirm Password*</span>
                  </div>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="inputPassword4" 
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-check mb-3">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="exampleCheck1"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    <a href="#">Agree terms and conditions</a>
                  </label>
                </div>
                <div className="submit-button text-center">
                  <button type="submit" className="btn btn-outline-primary" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Submit'}
                  </button>
                </div>
                <div className="text-center mt-3">
                  <p>Already have an account? <Link to="/login" className="text-primary">Login here</Link></p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Register;
