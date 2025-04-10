import { useState, useEffect } from "react";
import { ethers } from "ethers";

import Navbar from "./components/Navbar";
import Section from "./components/Section";
import Product from "./components/Product";

import config from "./config.json";

import NCommerce from "./abis/NCommerce.json";
// import { config } from "dotenv";

function App() {
  const [provider, setProvider] = useState(null);
  const [ncommerce, setNCommerce] = useState(null);
  const [account, setAccount] = useState(null);

  const [electronics, setElectronics] = useState(null);
  const [clothing, setClothing] = useState(null);
  const [digitalgoods, setDigitalGoods] = useState(null);

  const [item, setItem] = useState({});

  const loadingBlockchainDAta = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();

    const ncommerce = new ethers.Contract(
      config[network.chainId].ncommerce.address,
      NCommerce,
      provider
    );
    setNCommerce(ncommerce);

    const items = [];

    for (var i = 0; i <= 9; i++) {
      const item = await ncommerce.products[i + 1];
      items.push(item);
    }

    const electronics = items.filter((item) => item.category == "electronics");
    const clothing = items.filter((item) => item.category == "clothing");
    const digitalgoods = items.filter(
      (item) => item.category == "digitalgoods"
    );

    setElectronics(electronics);
    setClothing(clothing);
    setDigitalGoods(digitalgoods);
  };

  useEffect(() => {
    loadingBlockchainDAta();
  }, []);
  return (
    <div>
      <Navbar account={account} setAccount={setAccount} />
      <h2>Our Products</h2>
      {electronics &&
        clothing &&
        digitalgoods(
          <>
            <Section title={"Clothing"} items={clothing} />
            <Section title={"Electronics"} items={electronics} />
            <Section title={"Digital Goods"} items={digitalgoods} />
          </>
        )}
      {
        <Product
          item={item}
          provider={provider}
          account={account}
          ncommerce={ncommerce}
        />
      }
    </div>
  );
}

export default App;
