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
  ProfilesContainer,
  AnimatedContainer,
  CardProfile,
} from './styles';

interface FormData {
  id: string;
  name: string;
}
const Profiles: React.FC = () => {
  const [profiles, setProfiles] = useState<FormData[]>([]);
  useEffect(() => {
    api.get('profiles').then(response => {
      setProfiles(response.data);
    });
  }, [profiles]);

  const formRef = useRef<FormHandles>(null);
  const { addToast } = UseToast();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('/profiles', data);
        setProfiles([...profiles, data]);

        addToast({
          type: 'success',
          title: 'Cadastro efetuado com sucesso',
          description: `Perfil de usuário ${data.name} cadastrado`,
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
          description: 'tente novamente!',
        });
      }
    },
    [addToast],
  );

  async function handleDeleteProfile(id: string) {
    try {
      await api.delete(`profiles/${id}`);
      setProfiles(profiles.filter(profile => profile.id !== id));
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Falha ao deletar perfil',
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
            <h1>Cadastrar perfil</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />

            <Button type="submit">Cadastrar</Button>
          </Form>
        </AnimatedContainer>

        <ProfilesContainer>
          {profiles.map(profile => (
            <CardProfile key={profile.id}>
              <div>
                <button type="button">
                  <FiEdit />
                </button>
                <button
                  onClick={() => {
                    handleDeleteProfile(profile.id);
                  }}
                  type="button"
                >
                  <FiTrash2 />
                </button>
              </div>
              <h1>{profile.name}</h1>
            </CardProfile>
          ))}
        </ProfilesContainer>
      </Content>
    </>
  );
};

export default Profiles;
