import React, { useState } from 'react';
import { makeRequest } from '../../../../../core/utils/request';
import BaseForm from '../../BaseForm'

type FormState = {
  name: string,
  category: string,
  price: string,
  description: string
}

type FormEvent =  React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const Form = () => {

  const [formData, setFormData] = useState<FormState>({
    name:'',
    category:'',
    price:'',
    description:''
  });

  const handleOnChange = (event: FormEvent) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({...data, [name]: value}));
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payLoad = {
      ...formData,
      imgUrl: 'https://ibcdn.canaltech.com.br/Pg_65nZzPDSOQ4ZhbJ2ZSm63bJo=/fit-in/400x400/filters:fill(transparent):watermark(wm/prd.png,-32p,center,1,none,15)/i413842.png',
      categories: [{id: formData.category}]
    }
    makeRequest({url: '/products', method: 'POST', data: payLoad})
    console.log(payLoad)
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <BaseForm title="CADASTRAR UM PRODUTO">
          <div className="row">
            <div className="col-6 mt-5">
              <input
                value={formData.name}
                name="name"
                type="text"
                className="form-control mb-4"
                onChange={handleOnChange}
                placeholder="Nome do Produto"
              />
              <select 
                value={formData.category}
                name="category" 
                className="form-control mb-4"
                onChange={handleOnChange}>
                <option value="3">Computadores</option>
                <option value="2">Eletrônicos</option>
                <option value="1">Livros</option>
              </select>
              <input
                value={formData.price}
                name="price"
                type="text"
                className="form-control"
                onChange={handleOnChange}
                placeholder="Preço"
              />
            </div>
            <div className="col-6">
              <textarea className="form-control"
                name="description"
                value={formData.description}
                cols={30}
                rows={10}
                onChange={handleOnChange}
              />
            </div>
          </div>
        </BaseForm>
      </form>
    </div>
  );
}

export default Form;