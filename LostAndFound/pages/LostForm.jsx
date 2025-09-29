import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/contexts/AuthContext';
import lostItemsService from '../src/services/lostItemsService';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import '../src/components/LostForm.css';

const LostForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    item: '',
    location: '',
    date: '',
    description: '',
    reward: '',
    category: 'other',
    agreeTerms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { user, isAuthenticated } = useAuth();
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
    setSuccess(false);

    if (!isAuthenticated) {
      setError('Please login to report a lost item.');
      return;
    }

    if (!formData.agreeTerms) {
      setError('Please agree to the terms and conditions.');
      return;
    }

    setLoading(true);

    try {
      const itemData = {
        item_name: formData.item,
        description: formData.description,
        location: formData.location,
        lost_date: new Date(formData.date).toISOString(),
        contact_name: formData.name,
        contact_email: formData.email,
        reward: formData.reward,
        category: formData.category,
        user_id: user.$id
      };

      const result = await lostItemsService.createLostItem(itemData);
      
      if (result.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          item: '',
          location: '',
          date: '',
          description: '',
          reward: '',
          category: 'other',
          agreeTerms: false
        });
        
        // Redirect to found page after 2 seconds
        setTimeout(() => {
          navigate('/found');
        }, 2000);
      }
    } catch (error) {
      setError(error.message);
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
              <img src="/images/lost-2.jpg" alt="" />
            </div>

            <div className="container p-5 mt-5" id="form-container">
              <h1 className="text-center">Lost Something?</h1>
              <h3 className="text-center">Help us to help you out!</h3>
              
              {!isAuthenticated && (
                <div className="alert alert-warning" role="alert">
                  <strong>Please login first!</strong> You need to be logged in to report a lost item.
                  <a href="/login" className="alert-link ms-2">Login here</a>
                </div>
              )}
              
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              {success && (
                <div className="alert alert-success" role="alert">
                  <strong>Success!</strong> Your lost item has been reported. Redirecting to found items page...
                </div>
              )}
              
              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="input-group mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-primary" id="inputGroup-sizing-default">Name*</span>
                  </div>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="John Cena" 
                    aria-label="Default" 
                    aria-describedby="inputGroup-sizing-default"
                    name="name"
                    value={formData.name}
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
                    <span className="input-group-text bg-primary" id="inputGroup-sizing-default">Item*</span>
                  </div>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Item Name" 
                    aria-label="Default" 
                    aria-describedby="inputGroup-sizing-default"
                    name="item"
                    value={formData.item}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-primary" id="inputGroup-sizing-default">Category*</span>
                  </div>
                  <select 
                    className="form-control" 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="documents">Documents</option>
                    <option value="accessories">Accessories</option>
                    <option value="books">Books</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="input-group mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-primary" id="inputGroup-sizing-default">Location</span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="If you remember" 
                    className="form-control" 
                    aria-label="Default" 
                    aria-describedby="inputGroup-sizing-default"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-primary" id="inputGroup-sizing-default">Date*</span>
                  </div>
                  <input 
                    type="date" 
                    className="form-control" 
                    aria-label="Default" 
                    aria-describedby="inputGroup-sizing-default"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-primary">Item Description*</span>
                  </div>
                  <textarea 
                    className="form-control" 
                    placeholder="It is black in color..." 
                    aria-label="With textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="input-group mb-5">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-primary" id="inputGroup-sizing-default">Reward</span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Not Necessary" 
                    className="form-control" 
                    aria-label="Default" 
                    aria-describedby="inputGroup-sizing-default"
                    name="reward"
                    value={formData.reward}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-check mb-5">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="exampleCheck1"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">Agree terms and conditions</label>
                </div>
                <div className="submit-button text-center">
                  <button 
                    type="submit" 
                    className="btn btn-outline-primary" 
                    disabled={loading || !isAuthenticated}
                  >
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
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

export default LostForm;
