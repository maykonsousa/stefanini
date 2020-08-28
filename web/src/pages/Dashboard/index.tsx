import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiLock, FiPenTool } from 'react-icons/fi';
import Header from '../../components/Header';
import { Container, CardContainer, Card } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Link to="/users">
            <Card className="users">
              <header>
                <h1>Usuários</h1>
                <FiUser />
              </header>
            </Card>
          </Link>
          <Link to="/profiles">
            <Card className="profiles">
              <header>
                <h1>Perfis</h1>
                <FiLock />
              </header>
            </Card>
          </Link>
          <Link to="/functionalities">
            <Card className="functionalities">
              <header>
                <h1>Funcionalidades</h1>
                <FiPenTool />
              </header>
            </Card>
          </Link>
        </CardContainer>
      </Container>
    </>
  );
};

export default Dashboard;
