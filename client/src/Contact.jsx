import React, { useState } from 'react';
import axios from 'axios';
import './css/Contact.css'; 
import code from "./images/contact1.png";

function Contact() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:3000/contact', { email, name, phone, message });
      alert("Message sent successfully!");

      // Reset form fields
      setEmail('');
      setName('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error("Message sending failed:", error);
      alert("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contactus-container">
      <div className='contactus-wrapper'>
        <div className="contact-header">
          <div className="contact-text">
            <h1>We are here to help</h1>
            <p>Need assistance? Whether you have booking inquiries or feedback after your stay, our team is here to help.</p>
            <div className="contact-details">
              <h3>Email</h3>
              <p>For booking enquiries: booking@thehostelport.com</p>
              <p>For general enquiries: contact@thehostelport.com</p>
            </div>
            <div className='contact-details'>
              <h3>Contact</h3>
              <p>📞 5678432908</p>
              <p>(Timing: 10am - 12am)</p>
            </div>
          </div>
        </div>

        <div className='contact-main'>
          <div className="contact-form-section">
            <h2>Get in touch</h2>
            <p>Just simply fill the form below and the team will be in touch</p>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="input-row">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                placeholder="Enter your message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>

          <div className="contact-image">
            <img src={code} alt="contact" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
