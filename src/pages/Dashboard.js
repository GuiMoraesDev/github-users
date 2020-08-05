import React, { useState } from 'react';

import Button from '../components/Button';
import Content from '../components/Content';
import SearchBar from '../components/SearchBar';
import getUsers from '../services/api.services';
import Container from './styles';

function Dashboard() {
  const [loadingState, setLoadingState] = useState({
    init: true,
    loading: false,
    error: false,
    errorMessage: '',
  });

  const [user, setUser] = useState('');
  const [userData, setUserData] = useState([]);

  const handleChangeUser = username => {
    setUser(username);
  };

  const handleSearch = async () => {
    setLoadingState({
      init: false,
      loading: true,
    });

    try {
      const response = await getUsers(user);

      setUserData([...userData, response.data]);

      setLoadingState({
        loading: false,
      });
    } catch (err) {
      setLoadingState({
        loading: false,
        error: true,
        errorMessage: 'Occurred an error on search, please try again',
      });
    }
  };

  return (
    <Container>
      <span>
        <SearchBar user={user} handleChangeUser={handleChangeUser} />
        <Button handleSearch={handleSearch} />
      </span>
      <Content userData={userData} loading={loadingState} />
    </Container>
  );
}

export default Dashboard;
