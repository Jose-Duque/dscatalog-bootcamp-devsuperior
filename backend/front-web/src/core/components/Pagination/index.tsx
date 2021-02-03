
import React from 'react';
import { ReactComponent as SetaImage} from '../../assets/images/Seta.svg'
import { generetList } from '../../utils/list';
import './styles.scss';

type Props = {
  totalPage: number;
  activePage: number;
  onchange: (item: number) => void;
}

const Pagination = ({totalPage, activePage, onchange}: Props) => {
  const items = generetList(totalPage);
  const previousClass = totalPage > 0 && activePage > 0 ? 'page-active' : 'page-inactive';
  const nextClass = (activePage + 1) < totalPage ? 'page-active' : 'page-inactive';

  return (
    <div className="pagination-container">
      <SetaImage className={`pagination-previous ${previousClass}`}
      onClick={() => onchange(activePage - 1)}
      />
      {items.map(item => (
           <div
           key={item}
           className={`pagination-item ${item === activePage ? 'active' : ''}`}
           onClick={() => onchange(item)}
           >
            {item + 1}
          </div>
      ))}   
      <SetaImage className={`pagination-next ${nextClass}`}
      onClick={() => onchange(activePage + 1)}
      />
    </div>
  )
}

export default Pagination;