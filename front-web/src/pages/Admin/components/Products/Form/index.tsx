import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { makePrivateRequest } from '../../../../../core/utils/request';
import BaseForm from '../../BaseForm'

type FormState = {
  name: string;
  price: string;
  description: string;
  imageUrl: string;
}

const Form = () => {

  const {register, handleSubmit, errors} = useForm<FormState>();

  const onSubmit = (data: FormState) => {
    makePrivateRequest({url: '/products', method: 'POST', data})
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <BaseForm title="CADASTRAR UM PRODUTO">
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
                <input
                  ref={register({required: "Campo obrigatório"})}
                  name="price"
                  type="number"
                  className="form-control margin-bottom-30 input-base"
                  placeholder="Preço"
                />
                {errors.price?.message && (
                    <div className="invalid-feedback d-block">
                      Campo obrigatorio
                    </div>
                )}
              </div>
              <div className="margin-bottom-30">
                <input
                  ref={register({required: "Campo obrigatório"})}
                  name="imageUrl"
                  type="text"
                  className="form-control margin-bottom-30 input-base"
                  placeholder="Image do Produto"
                />
                {errors.imageUrl?.message && (
                    <div className="invalid-feedback d-block">
                      Campo obrigatorio
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
                      Campo obrigatorio
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