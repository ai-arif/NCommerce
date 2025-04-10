import { useEffect, useState } from "react";
import { ethers } from "ethers";

const Product = ({ item, provider, account, ncommerce }) => {
  const [order, setOrder] = useState(null);
  const [hasBought, setHasBought] = useState(false);

  const fetchDetails = async () => {
    const events = await ncommerce.queryFilter("Purchase");
    const orders = events.filter(
      (event) =>
        event.args.buyer === account &&
        event.args.itemId.toString() === item.id.toString()
    );

    if (orders.length == 0) return;

    const order = await ncommerce.orders(account, orders[0].args.orderId);
    setOrder(order);
  };

  const buyHandler = async () => {
    const signer = await provider.getSigner();

    let trx = await ncommerce
      .connect(signer)
      .buy(item.id, { value: item.cost });
    await trx.wait();
    setHasBought(true);
  };

  useEffect(() => {
    fetchDetails();
  }, [hasBought]);

  return (
    <div className="product">
      <div className="product_details">
        <div className="product_image">
          <img src={item.image} alt="Product" />
        </div>
        <div className="product_overview">
          <h1>{item.name}</h1>
          {/* <Rating value={item.rating} /> */}

          <hr />
          <p>{item.address}</p>
          {/* <h2>
            {ethers.utils.formatUnits(item.price.toString(), "ether")} ETH
          </h2> */}

          <hr />

          <h2>Overview</h2>
          <p>
            {item.description}
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit
            perferendis, velit explicabo consequatur totam quasi quis sint vel
            veritatis. Blanditiis!
          </p>
        </div>
      </div>
      <div className="product_order">
        {/* <h1>{ethers.utils.formatUnits(item.cost.toString(), "ether")} ETH</h1> */}
        <p>
          Free Delivery <br />
        </p>

        {item.stock > 0 ? <p>In Stcok.</p> : <p>Out of Stock.</p>}

        <button className="product_buy" onClick={buyHandler}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Product;
