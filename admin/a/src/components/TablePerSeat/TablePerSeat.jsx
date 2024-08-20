import './TablePerSeat.css';

const TablePerSeat = ({ tableNumber, style }) => {
  return (
    <div className="main-container-table" style={{ position: style.position, top: style.top, left: style.left }}>
      <button className="table" style={{ width: style.width, height: style.height }}>
        {tableNumber} 
      </button>
    </div>
  );
}

export default TablePerSeat;
