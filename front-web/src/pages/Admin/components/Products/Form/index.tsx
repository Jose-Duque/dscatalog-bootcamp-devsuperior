import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select'
import { makePrivateRequest, makeRequest } from '../../../../../core/utils/request';
import BaseForm from '../../BaseForm';
import { useHistory, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Category } from '../../../../../core/types/Prooduct';
import './styles.scss';

type FormState = {
  name: string;
  price: string;
  description: string;
  imgUrl: string;
  categories: Category[];
}

type ParamsType = {
  productId: string;
}

const Form = () => {

  const {register, handleSubmit, errors, setValue, control} = useForm<FormState>();
  const history = useHistory();
  const { productId } = useParams<ParamsType>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoaderCategory, setIsLoaderCategory] =  useState(false);
  const isEditing = productId !== 'create';

  useEffect(() => {
    if (isEditing) {
      makeRequest({url: `/products/${productId}`})
      .then(response => {
        setValue('name', response.data.name);
        setValue('price', response.data.price);
        setValue('description', response.data.description);
        setValue('imgUrl', response.data.imgUrl);
        setValue('categories', response.data.categories);
      })
    }
  }, [productId, isEditing, setValue]);

  useEffect(() => {
    setIsLoaderCategory(true);
    makeRequest({ url: '/categories' })
    .then(response => setCategories(response.data.content))
    .finally(() => setIsLoaderCategory(false))
  }, []);

  const onSubmit = (data: FormState) => {
    makePrivateRequest({
      url: isEditing ? `/products/${productId}` : '/products',
      method: isEditing ? 'PUT' : 'POST',
      data})
      .then(() => {
        toast.info("Produto salvo com sucesso!");
        history.push("/admin/products")
      })
      .catch(() => {
        toast.error("Erro ao salvar produto!");
      })
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <BaseForm title={isEditing ? 'Editar produto' : 'Cadastrar umgit  produto'}>
          <div className="row">
            <div className="col-6">
              <div className="margin-bottom-30 ">
                <input
                  name="name"  ref={register({
                    required: "Campo obrigatório",
                    minLength: {value: 5, message: 'O campo deve ter no minimo 5 caracteres'}
                  })}
                  type="text"
                  className="form-control input-base"
                  placeholder="Nome do Produto"
                />
                {errors.name?.message && (
                  <div className="invalid-feedback d-block">
                    Campo obrigatorio
                  </div>
                )}
              </div>
              <div className="margin-bottom-30">
                <Controller
                  as={Select}
                  name="categories"
                  rules={{ required: true }}
                  control={control}
                  options={categories} 
                  getOptionLabel={(option: Category) => option.name}
                  getOptionValue={(option: Category) => String(option.id)}
                  classNamePrefix="categories-select"
                  placeholder="Categoria"
                  isMulti
                />
                   {errors.categories && (
                    <div className="invalid-feedback d-block">
                      Campo obrigatório
                    </div>
                )}
              </div>
              <div className="margin-bottom-30">
                <input
                  ref={register({required: "Campo obrigatório"})}
                  name="price"
                  type="number"
                  className="form-control margin-bottom-30 input-base"
                  placeholder="Preço"
                />
                {errors.price?.message && (
                    <div className="invalid-feedback d-block">
                      Campo obrigatório
                    </div>
                )}
              </div>
              <div className="margin-bottom-30">
                <input
                  ref={register({required: "Campo obrigatório"})}
                  name="imgUrl"
                  type="text"
                  className="form-control margin-bottom-30 input-base"
                  placeholder="Image do Produto"
                />
                {errors.imgUrl?.message && (
                    <div className="invalid-feedback d-block">
                      Campo obrigatório
                    </div>
                )}
              </div>

            </div>
            <div className="col-6">
              <textarea className="form-control input-base"
                ref={register({required: "Campo obrigatório"})}
                name="description"
                cols={30}
                rows={10}
                placeholder="Descrição"
              />
              {errors.description?.message && (
                    <div className="invalid-feedback d-block">
                      Campo obrigatório
                    </div>
              )}
            </div>
          </div>
        </BaseForm>
      </form>
    </div>
  );
}

export default Form;