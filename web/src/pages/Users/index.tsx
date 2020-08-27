import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiMail, FiUser, FiLock, FiPenTool } from 'react-icons/fi';

import { Form } from '@unform/web';

import { Link } from 'react-router-dom';

import api from '../../services/api';
import { UseToast } from '../../hooks/Toast';
import GetValidationErrors from '../../utils/getValidationErrors';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  CardContainer,
  Card,
  Content,
  UsersContainer,
  AnimatedContainer,
  CardUser,
} from './styles';

interface FormData {
  name: string;
  email: string;
  profile: string;
}
const Users: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = UseToast();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          profile: Yup.string().required('Nome Obrigatório'),
          email: Yup.string()
            .email('Digite um email válido')
            .required('email obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('/users', data);

        addToast({
          type: 'success',
          title: 'Cadastro efetuado com sucesso',
          description: `Usuário ${data.name} cadastrado`,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = GetValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Falha no cadastro',
          description: 'Perfil inexistente',
        });
      }
    },
    [addToast],
  );
  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <a href="http://www.google.com.br">
            <Card className="income">
              <header>
                <h1>Usuários</h1>
                <FiUser />
              </header>
            </Card>
          </a>
          <a href="http://www.google.com.br">
            <Card className="outcome">
              <header>
                <h1>Perfis</h1>
                <FiLock />
              </header>
            </Card>
          </a>
          <a href="http://www.google.com.br">
            <Card className="stock">
              <header>
                <h1>Funcionalidades</h1>
                <FiPenTool />
              </header>
            </Card>
          </a>
        </CardContainer>
      </Container>
      <Content>
        <AnimatedContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Inserir Usuário</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="profile" icon={FiLock} placeholder="Perfil" />

            <Button type="submit">Cadastrar</Button>
          </Form>
        </AnimatedContainer>
        <UsersContainer>
          <CardUser />
        </UsersContainer>
      </Content>
    </>
  );
};

export default Users;
