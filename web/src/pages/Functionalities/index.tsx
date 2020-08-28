import React, { useCallback, useRef, useEffect, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FiUser, FiLock, FiPenTool, FiEdit, FiTrash2 } from 'react-icons/fi';

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
  FunctionalitiesContainer,
  AnimatedContainer,
  CardFunctionality,
} from './styles';

interface FormData {
  id: string;
  name: string;
  profile: string;
}
const Functionalities: React.FC = () => {
  const [functionalities, setFunctionalities] = useState<FormData[]>([]);
  useEffect(() => {
    api.get('functionalities').then(response => {
      setFunctionalities(response.data);
    });
  }, []);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = UseToast();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          profile: Yup.string().required('Nome Obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('/functionalities', data);

        addToast({
          type: 'success',
          title: 'Cadastro efetuado com sucesso',
          description: `Funcionalidade ${data.name} cadastrada`,
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
          description: 'verifique as informações e tente novamente',
        });
      }
    },
    [addToast],
  );

  async function handleDeleteUser(id: string) {
    try {
      await api.delete(`functionalities/${id}`);
      setFunctionalities(
        functionalities.filter(functionality => functionality.id !== id),
      );
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Falha ao deletar funcionalidade',
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
            <h1>Cadastrar funcionalidade</h1>

            <Input name="name" icon={FiPenTool} placeholder="Funcionalidade" />
            <Input name="profile" icon={FiUser} placeholder="Perfil" />

            <Button type="submit">Cadastrar</Button>
          </Form>
        </AnimatedContainer>

        <FunctionalitiesContainer>
          {functionalities.map(functionality => (
            <CardFunctionality key={functionality.id}>
              <div>
                <button type="button">
                  <FiEdit />
                </button>
                <button
                  onClick={() => {
                    handleDeleteUser(functionality.id);
                  }}
                  type="button"
                >
                  <FiTrash2 />
                </button>
              </div>
              <h1>{functionality.name}</h1>

              <strong>
                Perfil autorizado:
                {functionality.profile}
              </strong>
            </CardFunctionality>
          ))}
        </FunctionalitiesContainer>
      </Content>
    </>
  );
};

export default Functionalities;
