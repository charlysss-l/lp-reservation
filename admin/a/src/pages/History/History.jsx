import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../../components/HistoryTable/HistoryTable';
import './History.css'
const History = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get('http://localhost:3000/allproducts');
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="history-con">
      {loading && <div>Loading...</div>}
      {!loading && (
        <Table products={data} />
      )}
    </div>
  );
};

export default History 
