import { useState, useEffect } from "react";
import { ethers } from "ethers";

import Navbar from "./components/Navbar";
import Section from "./components/Section";
import Product from "./components/Product";

// import config from "./config.json";
const contractAddress = "0x7aaeb2a76b5d8eefa4509a524e66270829c1eede";

import NCommerce from "./abis/NCommerce.json";

function App() {
  const [provider, setProvider] = useState(null);
  const [ncommerce, setNCommerce] = useState(null);
  const [account, setAccount] = useState(null);

  const [electronics, setElectronics] = useState(null);
  const [clothing, setClothing] = useState(null);
  const [digitalgoods, setDigitalGoods] = useState(null);

  const [item, setItem] = useState({});

  const loadingBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    // const network = await provider.getNetwork();

    const ncommerce = new ethers.Contract(
      contractAddress,
      NCommerce.abi,
      provider
    );

    setNCommerce(ncommerce);

    console.log(ncommerce.owner);

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
    loadingBlockchainData();
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
