import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { FiUpload, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, Background, AnimatedContainer } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import LogoImg from '../../assets/images/logo.png';
import GetValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { UseToast } from '../../hooks/Toast';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = UseToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          email: Yup.string()
            .email('Digite um email válido')
            .required('email obrigatório'),
          password: Yup.string().min(6, 'mínimo 6 dígitos'),
          ConfirmPassword: Yup.string().oneOf(
            [Yup.ref('password')],
            'senha não confere',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('/users', data);
        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro efetuado com sucesso',
          description: 'Entre com o seu login',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = GetValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Falha no login',
          description: 'Verifique suas credenciais',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimatedContainer>
          <img src={LogoImg} alt="AlmoxApp" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu Cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Input
              name="ConfirmPassword"
              icon={FiLock}
              type="password"
              placeholder="Confirme a senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiUpload />
            Já sou cadastrado
          </Link>
        </AnimatedContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
