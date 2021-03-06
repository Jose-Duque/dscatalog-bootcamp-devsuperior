import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ButtonIcon from '../../../../core/components/ButtonIcon';
import AuthCard from '../Card';
import './styles.scss';
import { makeLogin } from '../../../../core/utils/request';
import { useState } from 'react';
import { saveSessionData } from '../../../../core/utils/auth';

type FormState = {
  username: string;
  password: string;
}

type LocationState = {
  from: string;
}

const Login = () => {
  const { register, handleSubmit, errors } = useForm<FormState>(); // initialize the hook
  const [hasError, sethasError] = useState(false);
  const history = useHistory();
  let location = useLocation<LocationState>();

  const { from } = location.state || { from: { pathname: "/" } };

  const onSubmit = (data: FormState) => {
    makeLogin(data)
    .then(response => {
      sethasError(false);
      saveSessionData(response.data);
      history.replace(from);
    })
    .catch(e => sethasError(true))
  }

  return ( 
    <AuthCard title="login">
      {hasError && 
        <div className="alert alert-danger mt-5">
          Usuário ou senha inválidos!
        </div>      
      }
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="margin-bottom-30">
          <input 
            name="username" ref={register({
              required: "Campo obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido"
              }
            })}
            type="email"
            className={`form-control input-base ${errors.username ? 'is-invalid' : ''}`}
            placeholder="Email"
          />
          {errors.username && (
            <div className="invalid-feedback d-block ">
              {errors.username.message}
            </div>
          )}
        </div>
        <div className="margin-bottom-30">
          <input 
            name="password" ref={register({ required: true })}
            type="password"
            className={`form-control input-base ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Senha"
          />
          {errors.password && (
            <div className="invalid-feedback d-block">
              Campo obrigatorio
            </div>
          )}
        </div>
        <Link to="/auth/recover" className="login-link-recover">
          Esqueci a senha?
        </Link>
        <div className="login-submit">
          <ButtonIcon text= "Logar" />
        </div>
        <div className="text-center">
          <span className="not-registered">Não tem Cadastro?</span>
          <Link to="/auth/register" className="login-link-register">
            CADASTRAR
          </Link>
        </div>
      </form>
    </AuthCard>
  )
}
  
export default Login;
    
    