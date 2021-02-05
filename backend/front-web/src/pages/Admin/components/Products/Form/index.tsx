import React from 'react';
import BaseForm from '../../BaseForm'

const Form = () => {
  return (
    <div>
      <BaseForm title="CADASTRAR UM PRODUTO">
        <div className="row">
          <div className="col-6">
            <input type="text" className="form-control"/>
          </div>
        </div>
      </BaseForm>
    </div>
  );
}

export default Form;