import { useEffect, useState } from 'react';
import Select from 'react-select';
import { ReactComponent as Lupa } from '../../assets/images/lupa.svg';
import { Category } from '../../types/Prooduct';
import { makeRequest } from '../../utils/request';
import './styles.scss';

export type FilterForm = {
  name?: string;
  categoryId?: number;
}

type Props = {
  onSearch: (filter: FilterForm) => void;
}

const ProductFilters = ({ onSearch }: Props ) => {

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoaderCategory, setIsLoaderCategory] =  useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    setIsLoaderCategory(true);
    makeRequest({ url: '/categories' })
    .then(response => setCategories(response.data.content))
    .finally(() => setIsLoaderCategory(false))
  }, []);

  const handleChangeName = (name: string) => {
    setName(name);

    onSearch({ name, categoryId: category?.id});
  }

  const handleChangeCategory = (category: Category) => {
    setCategory(category);

    onSearch({ name, categoryId: category?.id});
  }

  const clearFilter = () => {
    setCategory(undefined);
    setName('');

    onSearch({ name: '', categoryId: undefined});
  }

  return (
    <div className="card-base product-filters-container">
      <div className="input-search">
        <input 
          type="text"
          value={name}
          className="form-control" 
          placeholder="Pesquisar produto" 
          onChange={event => handleChangeName(event.target.value)}
        />
        <Lupa />
      </div>
      <Select
        name="categories"
        key={`select-${category?.id}`}
        value={category}
        options={categories}
        isLoading={isLoaderCategory}
        getOptionLabel={(option: Category) => option.name}
        getOptionValue={(option: Category) => String(option.id)}
        className="fliter-select-container"
        classNamePrefix="categories-select"
        placeholder="Filtrar por Categoria"
        onChange={value => handleChangeCategory(value as Category)}
        isClearable
      />
      <button className="btn btn-outline-secondary border-radius-10 btn-edit"
        onClick={clearFilter}
      >
        LIMPAR FILTRO
      </button>
    </div>
  )
}

export default ProductFilters;