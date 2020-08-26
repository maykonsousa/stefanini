import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, Background, AnimatedContainer } from './styles';
import LogoImg from '../../assets/images/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import GetValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/Auth';
import { UseToast } from '../../hooks/Toast';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();

  const { addToast } = UseToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string().email().required('E-mail Obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({
          email: data.email,
          password: data.password,
        });
        history.push('/dashboard');
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
    [signIn, addToast, history],
  );
  return (
    <Container>
      <Content>
        <AnimatedContainer>
          <img src={LogoImg} alt="AlmoxApp" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu Login</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>
          </Form>

          <Link to="/signUp">
            <FiLogIn />
            Registrar
          </Link>
        </AnimatedContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
