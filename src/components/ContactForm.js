import React from 'react';

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! (This is a template)');
    e.target.reset();
  };

  // Outer container: centers the form in the viewport
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f5f5f5', // subtle background for contrast
    padding: '1rem',
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif',
  };

  // The form card itself
  const formCardStyle = {
    width: '100%',
    maxWidth: '500px',
    padding: '2rem',
    background: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  };

  const groupStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const labelStyle = {
    marginBottom: '0.25rem',
    fontWeight: 'bold',
  };

  const inputStyle = {
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1rem',
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
  };

  const buttonStyle = {
    background: '#5eb3fd',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    alignSelf: 'flex-start',
  };

  const titleStyle = {
    marginBottom: '1rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <div style={formCardStyle}>
        <h2 style={titleStyle}>Contact Me</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={groupStyle}>
            <label htmlFor="firstName" style={labelStyle}>First Name:</label>
            <input type="text" id="firstName" name="first_name" required style={inputStyle} />
          </div>

          <div style={groupStyle}>
            <label htmlFor="lastName" style={labelStyle}>Last Name:</label>
            <input type="text" id="lastName" name="last_name" required style={inputStyle} />
          </div>

          <div style={groupStyle}>
            <label htmlFor="email" style={labelStyle}>Email:</label>
            <input type="email" id="email" name="user_email" required style={inputStyle} />
          </div>

          <div style={groupStyle}>
            <label htmlFor="comment" style={labelStyle}>Comment:</label>
            <textarea id="comment" name="message" required style={textareaStyle}></textarea>
          </div>

          <button type="submit" style={buttonStyle}>Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
