import './_product.scss';

const Product = () => {
  return (
    <section className="product">
        <div className="product__logo">
            <img src="https://i.ibb.co/S6qMxwr/jean.jpg" alt="pdoduct"/>
        </div>
        <div className="product__content">
            <div className="product__title">Denim Jumpsuit</div>
            <p className="product__descr">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget tristique tortor pretium ut. Curabitur elit justo, consequat id condimentum ac, volutpat ornare.</p>
            <div className="product__price">$ 20</div>
            <div className="product__features">
                <div className="product__color">
                  <span>Color</span>
                  <div style={{backgroundColor: 'darkblue'}} className="product__circle product__circle_active"></div>
                  <div style={{backgroundColor: 'black'}} className="product__circle"></div>
                  <div style={{backgroundColor: 'gray'}} className="product__circle"></div>
                </div>
                <div className="product__size">
                  <span>Size</span>
                  <select name="select">
                    <option value="xs" selected>XS</option>
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                    <option value="xl">XL</option>
                  </select>
                </div>
            </div>
            <div className="product__send">
                <div className="product__calc">
                    <div className="product__minus">&#8722;</div>
                    <div className="product__sum">1</div>
                    <div className="product__plus">&#43;</div>
                </div>
                <button className="product__submit">Add to cart</button>
            </div>
        </div>
    </section>
  )
};

export default Product;
