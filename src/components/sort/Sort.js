import './_sort.scss';

const Sort = ({category}) => {
  return (
    <section className="sort">
        <h6 className="sort__title">{category}</h6>
        <div className="sort__filters">
            <div className="sort__product">
                <span>Filter Products:</span>
                <select name="size" className="sort__size">
                  <option disabled="disabled">Size</option>
                  <option value="xs">XS</option>
                  <option value="s">S</option>
                  <option value="m">M</option>
                  <option value="l">L</option>
                  <option value="hl">HL</option>
                </select>
            </div>
            <div className="sort__price">
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
