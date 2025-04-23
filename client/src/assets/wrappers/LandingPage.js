import styled from 'styled-components';

const Wrapper = styled.section`
  background: linear-gradient(135deg, var(--background-color) 0%, var(--primary-50) 100%);
  min-height: 100vh;
  padding: 2rem 0;

  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }

  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }

  .info {
    h1 {
      font-weight: 800;
      font-size: 3.5rem;
      line-height: 1.2;
      margin-bottom: 1.5rem;
      background: linear-gradient(135deg, var(--text-color) 0%, var(--primary-500) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      
      span {
        color: var(--primary-500);
        -webkit-text-fill-color: var(--primary-500);
      }
    }

    p {
      line-height: 1.8;
      color: var(--text-secondary-color);
      margin-bottom: 2rem;
      max-width: 35em;
      font-size: 1.1rem;
    }
  }

  .btn-container {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border-radius: var(--borderRadius);
    font-weight: 600;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.9rem;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }

  .register-link {
    background: var(--primary-500);
    color: white;
    
    &:hover {
      background: var(--primary-600);
    }
  }

  .login-link {
    background: transparent;
    border: 2px solid var(--primary-500);
    color: var(--primary-500);
    
    &:hover {
      background: var(--primary-50);
    }
  }

  .main-img {
    display: none;
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;
export default Wrapper;
