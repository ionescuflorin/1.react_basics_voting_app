
class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };

    // 7.Bindig this for methods outside the render function
    this.handleProductUpVote = this.handleProductUpVote.bind(this);
  }

  // 5.Getting initial data
  componentDidMount() {
    this.setState({ products: Seed.products });
  }

  // 1. Set a method to pass it to the child as prop
  // We can pass down *functions* as props too.
  handleProductUpVote(productId) {
    // 8.Immutable Update when upvoting

    // 8.1. we use *map()* to traverse the products array. Importantly, map() returns a new array as opposed to modifying the array this.state.products.

    // 8.2. next, we check if the current product matches productId. If it does, we create a new object, copying over the properties from the original product object. We then overwrite the votes property on our new product object. We set it to the incremented vote count. We do this using Object’s assign() method:

    // 8.3. we use Object.assign() a lot for avoiding mutating objects. For more details on the method, check out “Appendix B.”

    // 8.4. if the current product is not the one specified by productId, we return it unmodified

    // 8.5. finally, we use setState() to update the state.
    const nextProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        return Object.assign({}, product, {
          votes: product.votes + 1,
        });
      } else {
        return product;
      }
    });
    this.setState({
      products: nextProducts,
    });
  }

  render() {
    // 6.Grabbing data from state
    const products = this.state.products.sort((a, b) => (
      b.votes - a.votes
    ));
    const productComponents = products.map((product) => (
      <Product
        key={'product-' + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        // 2. Make availabe that method in the child component
        // Child send a signal to the parent
        onVote={this.handleProductUpVote}
      />
    ));
    return (
      <div className='ui unstackable items'>
        {productComponents}
      </div>
    );
  }
}

class Product extends React.Component {
  constructor(props) {
    super(props);

    // So, any time we define our own custom component methods ouside of the render method, we have to manually bind this to the component ourselves.
    this.handleUpVote = this.handleUpVote.bind(this);
  }

  // 3.Make a new method and access the prop and insert logic
  handleUpVote() {
    this.props.onVote(this.props.id);
  }

  render() {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.productImageUrl} />
        </div>
        {/* Inside `render` for Product` */}
        <div className='middle aligned content'>
          <div className='header'>
            {/* 4. Use that prop method logic with an event handler */}
            <a onClick={this.handleUpVote}>
              <i className='large caret up icon' />
            </a>
            {this.props.votes}
          </div>
          <div className='description'>
            <a href={this.props.url}>
              {this.props.title}
            </a>
            <p>
              {this.props.description}
            </p>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img
              className='ui avatar image'
              src={this.props.submitterAvatarUrl}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);
