import React, { useCallback, useRef, useEffect, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import {
  FiMail,
  FiUser,
  FiLock,
  FiPenTool,
  FiEdit,
  FiTrash2,
} from 'react-icons/fi';

import { Form } from '@unform/web';

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
  id: string;
  name: string;
  email: string;
  profile: string;
}
const Users: React.FC = () => {
  const [users, setUsers] = useState<FormData[]>([]);
  useEffect(() => {
    api.get('users').then(response => {
      setUsers(response.data);
    });
  }, [users]);
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

  async function handleDeleteUser(id: string) {
    try {
      await api.delete(`users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Falha ao deletar usuário',
        description: 'tente novamente',
      });
    }
  }
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
          {users.map(user => (
            <CardUser key={user.id}>
              <div>
                <button type="button">
                  <FiEdit />
                </button>
                <button
                  onClick={() => {
                    handleDeleteUser(user.id);
                  }}
                  type="button"
                >
                  <FiTrash2 />
                </button>
              </div>
              <h1>{user.name}</h1>
              <p>{user.email}</p>
              <strong>{user.profile}</strong>
            </CardUser>
          ))}
        </UsersContainer>
      </Content>
    </>
  );
};

export default Users;
