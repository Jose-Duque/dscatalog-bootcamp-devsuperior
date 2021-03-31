import React from 'react';
import './styles.scss';
import { ReactComponent as UploadPlaceholder } from '../../../../../core/assets/images/upload-placeholder.svg';
import { makePrivateRequest } from '../../../../../core/utils/request';

const ImageUpload = () => {
  const uploadImage = (selectedImage: File) => {
    const payload = new FormData();
    payload.append('file', selectedImage);

    makePrivateRequest({
      url: '/products/image',
      method: 'POST',
      data: payload
    })
    .then(() => {
      console.log('Sucesso');
    })
    .catch(() => {
      console.log('Erro');
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    
    if(selectedImage) {
      uploadImage(selectedImage);
    }
  }

  return (
    <div>
      <div className="col-6">
        <div className="upload-button-container">
          <input 
            type="file"
            id="upload"
            onChange={handleChange}
            hidden 
            accept="image/png, image/jpg"
            />
          <label htmlFor="upload">ADICIONAR IMAGEM</label>
        </div>
        <small className="upload-text">
          A imagem deve ser JPG ou PNG e não deve ultrapassar <strong>5 mb</strong> 
        </small>
      </div>
      <div className="col-6 upload-placeholder">
        <UploadPlaceholder />
        <div className=" upload-progress-container">
          <div className="upload-progress">

          </div>
        </div>
      </div> 
    </div>
  )
}

export default ImageUpload;