import React from 'react';
import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/Auth';
import { Container } from './styles';

import Logo from '../../assets/images/logo.png';

interface UserDTO {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}
const Header: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <header>
        <img src={Logo} alt="AlmoxApp" />
        <nav>
          <strong>{user.name}</strong>
          <Link
            to="/"
            onClick={() => {
              signOut();
            }}
          >
            <FiPower />
            Sair
          </Link>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
