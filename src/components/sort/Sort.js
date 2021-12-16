import './_sort.scss';

const Sort = () => {
  return (
    <section class="sort">
        <h6 class="sort__title">Dresses</h6>
        <div class="sort__filters">
            <div class="sort__product">
                <span>Filter Products:</span>
                <select name="color" class="sort__color">
                  <option selected="true" disabled="disabled">Color</option>
                  <option value="white">White</option>
                  <option value="black">Black</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="yellow">Yellow</option>
                  <option value="green">Green</option>
                </select>
                <select name="size" class="sort__size">
                  <option selected="true" disabled="disabled">Size</option>
                  <option value="xs">XS</option>
                  <option value="s">S</option>
                  <option value="m">M</option>
                  <option value="l">L</option>
                  <option value="hl">HL</option>
                </select>
            </div>
            <div class="sort__price">
                <span>Sort Products:</span>
                <select name="price" class="sort__new">
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
