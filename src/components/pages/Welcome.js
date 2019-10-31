import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { register, login } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Welcome = ({ register, login, auth: { isAuth } }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    mob: '',
    password: ''
  });

  const showLogin = () => {
    const loginBtn = document.querySelector('#login');
    const registerBtn = document.querySelector('#register');
    const loginCard = document.querySelector('.login');
    const registerCard = document.querySelector('.register');
    const intro = document.querySelector('.intro');
    const cta = document.querySelector('.cta');
    if (window.screen.width <= 640) {
      registerBtn.style.display = 'block';
      loginBtn.style.display = 'none';
      cta.style.top = 'calc(50% + 175px)';
      cta.style.gap = '0';
      cta.style.gridTemplateColumns = '1fr';
      cta.style.gridTemplateRows = '1fr';
      registerBtn.style.gridColumn = '1/3';
    }
    if (window.screen.width <= 400) {
      cta.style.top = 'calc(50% + 235px)';
    }
    if (window.screen.width <= 350) {
      cta.style.top = 'calc(50% + 160px)';
    }
    if (window.screen.height > 680) {
      intro.style.top = '5%';
    } else {
      intro.style.top = '2%';
    }
    // Hide register card
    registerCard.style.right = '-100%';
    registerBtn.removeAttribute('disabled');
    registerBtn.style.opacity = '1';
    registerBtn.style.cursor = 'pointer';
    // Show login card
    loginBtn.setAttribute('disabled', 'true');
    loginBtn.style.cursor = 'auto';
    loginBtn.style.opacity = '0';
    loginCard.style.left = '0';
  };

  const showRegister = () => {
    const loginBtn = document.querySelector('#login');
    const registerBtn = document.querySelector('#register');
    const loginCard = document.querySelector('.login');
    const registerCard = document.querySelector('.register');
    const intro = document.querySelector('.intro');
    const cta = document.querySelector('.cta');

    if (window.screen.width <= 640) {
      loginBtn.style.display = 'block';
      registerBtn.style.display = 'none';
      cta.style.top = 'calc(50% + 175px)';
      cta.style.gap = '0';
      cta.style.gridTemplateColumns = '1fr';
      cta.style.gridTemplateRows = '1fr';
      registerBtn.style.gridColumn = '1/3';
    }
    if (window.screen.width <= 400) {
      cta.style.top = 'calc(50% + 235px)';
    }
    if (window.screen.width <= 350) {
      cta.style.top = 'calc(50% + 160px)';
    }
    if (window.screen.height > 680) {
      intro.style.top = '5%';
    } else {
      intro.style.top = '2%';
    }
    // Hide login card
    loginCard.style.left = '-100%';
    loginBtn.removeAttribute('disabled');
    loginBtn.style.opacity = '1';
    loginBtn.style.cursor = 'pointer';

    // Show register card
    registerBtn.setAttribute('disabled', 'true');
    registerBtn.style.cursor = 'auto';
    registerBtn.style.opacity = '0';
    registerCard.style.right = '0';
  };

  const loginTyper = e => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const registerTyper = e => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const submitLogin = e => {
    e.preventDefault();
    // Login user
    login(loginData);
  };
  const submitRegister = e => {
    e.preventDefault();
    // Register user
    register(registerData);
  };

  // Redirect if auth
  if (isAuth) {
    return <Redirect to='/' />;
  }

  const mobs = [
    'Web White Whales',
    '2Pack',
    'Fantastic4',
    'TechCrackerz',
    'Itchy',
    'LTE4',
    'Kamel()'
  ];

  return (
    <div className='Home'>
      <div className='overlay'>
        <div className='intro'>
          <h1>
            <span id='welcome'>Welcome to </span>
            <span style={{ textDecoration: 'underline' }}>Retros</span>
          </h1>
          <h2>A retrospectives management tool</h2>
        </div>

        <div className='cta'>
          <button id='login' onClick={showLogin}>
            Login
          </button>
          <button id='register' onClick={showRegister}>
            Sign up
          </button>
        </div>
        <div className='wrapper'>
          <div className='login card'>
            <div className='title'>Login</div>
            <form onSubmit={submitLogin}>
              <input
                type='text'
                name='email'
                placeholder='Email'
                value={loginData.email}
                onChange={loginTyper}
              />
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={loginData.password}
                onChange={loginTyper}
              />
              <button>Login</button>
            </form>
          </div>
          <div className='register card'>
            <div className='title'>Register</div>
            <form onSubmit={submitRegister}>
              <input
                type='text'
                name='name'
                placeholder='Name'
                value={registerData.name}
                onChange={registerTyper}
              />
              <input
                type='text'
                name='email'
                placeholder='Email'
                value={registerData.email}
                onChange={registerTyper}
              />
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={registerData.password}
                onChange={registerTyper}
              />
              <select
                name='mob'
                value={registerData.mob}
                onChange={registerTyper}
              >
                <option disabled value=''>
                  Select your mob..
                </option>
                {mobs.map(mob => (
                  <option key={mob} value={mob}>
                    {mob}
                  </option>
                ))}
              </select>
              <button>Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
Welcome.propTypes = {
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { register, login }
)(Welcome);
