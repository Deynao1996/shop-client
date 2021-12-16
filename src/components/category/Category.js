import './_category.scss';

const Category = () => {
  return (
    <section className="category">
        <div className="category__items">
            <div className="category__item">
              <img src="https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="bg"/>
                <div className="category__item_content">
                    <div className="category__item_content-title">SHIRT STYLE!</div>
                    <a href="#" className="category__item_content-link">SHOP NOW</a>
                </div>
            </div>

            <div className="category__item">
              <img src="https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="bg"/>
                <div className="category__item_content">
                    <div className="category__item_content-title">LOUNGEWEAR LOVE</div>
                    <a href="#" className="category__item_content-link">SHOP NOW</a>
                </div>
            </div>

            <div className="category__item">
              <img src="https://images.pexels.com/photos/5480696/pexels-photo-5480696.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="bg"/>
                <div className="category__item_content">
                    <div className="category__item_content-title">LIGHT JACKETS</div>
                    <a href="#" className="category__item_content-link">SHOP NOW</a>
                </div>
            </div>
        </div>
    </section>
  )
};

export default Category;
