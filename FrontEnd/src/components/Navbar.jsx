import { ethers } from "ethers";

const Navbar = ({ account, setAccount }) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  return (
    <nav>
      <div>
        <h1>NCommerce</h1>
      </div>
      <input type="text" />
      {account ? (
        <button>{account.slice(0, 6) + "..." + account.slice(36, 42)}</button>
      ) : (
        <button type="button" onClick={connectHandler}>
          Connect Wallet
        </button>
      )}

      <ul className="nav_links">
        <li>Clothing</li>
        <li>Electronics</li>
        <li>Gaming</li>
      </ul>
    </nav>
  );
};

export default Navbar;
