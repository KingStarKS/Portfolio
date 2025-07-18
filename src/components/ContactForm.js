import React from 'react';

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thanks! Your message was sent.');
    e.target.reset();
  };

  const containerStyle = {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#f7f9fc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    padding: '1rem',
    boxSizing: 'border-box',
  };

  const formWrapperStyle = {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: '600px',
    padding: '2rem 3rem',
    boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
    border: '1px solid #e0e0e0',
    borderRadius: '0', // sharp corners
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  };

  const inputStyle = {
    padding: '1rem',
    fontSize: '1.1rem',
    border: '1px solid #ccc',
    borderRadius: '0',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  const inputFocusStyle = {
    borderColor: '#0d6efd',
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '140px',
    resize: 'vertical',
  };

  const buttonStyle = {
    padding: '1rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#0d6efd',
    border: 'none',
    borderRadius: '0',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#084ecf',
  };

  const titleStyle = {
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: '700',
    color: '#222',
    marginBottom: '1rem',
  };

  // We'll add React state for input focus styling and button hover
  const [focusedInput, setFocusedInput] = React.useState(null);
  const [btnHover, setBtnHover] = React.useState(false);

  return (
    <div style={containerStyle}>
      <form
        onSubmit={handleSubmit}
        style={formWrapperStyle}
        noValidate
      >
        <h2 style={titleStyle}>Contact Me</h2>

        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          required
          style={{
            ...inputStyle,
            ...(focusedInput === 'first_name' ? inputFocusStyle : {}),
          }}
          onFocus={() => setFocusedInput('first_name')}
          onBlur={() => setFocusedInput(null)}
        />

        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          required
          style={{
            ...inputStyle,
            ...(focusedInput === 'last_name' ? inputFocusStyle : {}),
          }}
          onFocus={() => setFocusedInput('last_name')}
          onBlur={() => setFocusedInput(null)}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          style={{
            ...inputStyle,
            ...(focusedInput === 'email' ? inputFocusStyle : {}),
          }}
          onFocus={() => setFocusedInput('email')}
          onBlur={() => setFocusedInput(null)}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          required
          style={{
            ...textareaStyle,
            ...(focusedInput === 'message' ? inputFocusStyle : {}),
          }}
          onFocus={() => setFocusedInput('message')}
          onBlur={() => setFocusedInput(null)}
        ></textarea>

        <button
          type="submit"
          style={{
            ...buttonStyle,
            ...(btnHover ? buttonHoverStyle : {}),
          }}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
