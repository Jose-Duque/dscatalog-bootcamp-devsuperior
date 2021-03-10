import ProductPrice from '../../../../../core/components/ProductPrice';
import  './styles.scss';

const Card = () => {
  return (
    <div className="card-base product-card-admin">
      <div className="row">
        <div className="col-2 text-center border-right py-3">
          <img 
            src="https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/3-big.jpg" 
            alt="test"
            className="product-card-image-admin"
          />
        </div>
        <div className="col-7">
          <h3 className="product-card-name-admin py-3">
            computador
          </h3>
          <ProductPrice price={25}/>
          <div>
            <span className="badge rounded-pill bg-secondary mr-2">Secondary</span>
          </div>
        </div>
        <div className="col-3 pt-3 pr-5">
          <button 
            type="button"
            className="btn btn-outline-secondary btn-block border-radius-10 mb-3 btn-edit"
          >
            EDITAR
          </button>
          <button 
            type="button"
            className="btn btn-outline-danger btn-block border-radius-10 "
          >
            EXCLUIR
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;