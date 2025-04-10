import { ethers } from "ethers";

const Section = ({ title, items }) => {
  return (
    <div className="cards_section">
      <h3 id={title}>{title}</h3>
      <hr />

      <div className="cards">
        {items.map((item, index) => (
          <div className="card" key={index}>
            <div className="cared_image">
              <img src="{item.image}" alt="Image" />
            </div>
            <div className="card_info">
              <h4>{item.name}</h4>
              <p>{ethers.utils.formatUnits(item.cost.toString(), "ether")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
