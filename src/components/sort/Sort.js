import {useSearchParams} from 'react-router-dom';

import './_sort.scss';

const Sort = ({category, setCurrentFilter}) => {
  const [searchParams] = useSearchParams();
  const urlParams = searchParams.get('products');

  const sortTitle = urlParams ? 'All products matched by ' + urlParams : 'All products';
  const currentTitle = category ? category.replace(/-/g, " ") : sortTitle;


  return (
    <section className="sort">
        <h6 className="sort__title">{currentTitle}</h6>
        <div className="sort__filters">
            <div className="sort__product">
                <span>Filter Products:</span>
                <select
                  name="size"
                  className="sort__size"
                  onChange={(e) => setCurrentFilter(currentFilter => ({...currentFilter, size: e.target.value}))}>
                    <option disabled="disabled">Size</option>
                    <option value="all">All</option>
                    <option value="xs">XS</option>
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                    <option value="hl">HL</option>
                </select>
            </div>
            <div
              className="sort__price"
              onChange={(e) => setCurrentFilter(currentFilter => ({...currentFilter, price: e.target.value}))}>
                <span>Sort Products:</span>
                <select name="price" className="sort__new">
                  <option value="newest">Newest</option>
                  <option value="asc">Price (asc)</option>
                  <option value="desc">Price (desc)</option>
                </select>
            </div>
        </div>
    </section>
  )
};

export default Sort;
