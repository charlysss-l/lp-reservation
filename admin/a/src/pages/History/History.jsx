import { useState, useEffect } from 'react';
import HistoryTable from '../../components/HistoryTable/HistoryTable';

const History = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers(); 
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/admin/history-table');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <div>
            <HistoryTable user={users} />
        </div>
    );
};

export default History;
