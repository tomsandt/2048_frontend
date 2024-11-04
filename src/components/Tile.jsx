import "../styles/Tile.css";

const Tile = ({ value }) => {
  return (
    <td className={`cell ${value !== 0 ? "filled" : "empty"}`} data-value={value}>
      {value !== 0 ? value : ""}
    </td>
  );
};

export default Tile;
