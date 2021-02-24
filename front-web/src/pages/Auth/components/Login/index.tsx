import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ButtonIcon from '../../../../core/components/ButtonIcon';
import AuthCard from '../Card';
import './styles.scss';

type FormData = {
  email: string;
  password: string;
}
const Login = () => {
  const { register, handleSubmit, errors } = useForm<FormData>(); // initialize the hook

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return ( 
    <AuthCard title="login">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <input 
            name="email" ref={register}
            type="email"
            className="form-control input-base margin-bottom-30"
            placeholder="Email"
          />
          <input 
            name="password" ref={register}
            type="password"
            className="form-control input-base"
            placeholder="Senha"
          />
          <Link to="/admin/auth/recover" className="login-link-recover">
            Esqueci a senha?
          </Link>
          <div className="login-submit">
            <ButtonIcon text= "Logar" />
          </div>
          <div className="text-center">
            <span className="not-registered">Não tem Cadastro?</span>
            <Link to="/admin/auth/register" className="login-link-register">
              CADASTRAR
            </Link>
          </div>
        </form>
    </AuthCard>
  )
}
  
export default Login;
    
    