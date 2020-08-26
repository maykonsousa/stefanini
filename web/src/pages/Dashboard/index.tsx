import React from 'react';

import income from '../../assets/images/income.svg';
import outcome from '../../assets/images/outcome.svg';
import stock from '../../assets/images/total.svg';

import Header from '../../components/Header';

import { Container, CardContainer, Card, TableContainer } from './styles';
import api from '../../services/api';

const response = api.get('/moviments');
const Dashboard: React.FC = () => {
  console.log(response);
  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card className="income">
            <header>
              <h1>ENTRADA</h1>
              <img src={income} alt="Income" />
            </header>
          </Card>
          <Card className="outcome">
            <header>
              <h1>SAÍDA</h1>
              <img src={outcome} alt="Outcome" />
            </header>
          </Card>
          <Card className="stock">
            <header>
              <h1>ESTOQUE</h1>
              <img src={stock} alt="Total" />
            </header>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Documento</th>
                <th>Produto</th>
                <th>Descrição</th>
                <th>Qnt</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>teste</td>
                <td>teste</td>
                <td>teste</td>
                <td>teste</td>
                <td>teste</td>
                <td>teste</td>
              </tr>
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
