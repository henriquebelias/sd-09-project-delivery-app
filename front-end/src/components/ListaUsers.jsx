import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router';
import { string } from 'prop-types';
import axios from 'axios';

import UsersContext from '../context/UsersContext';
import status from '../utils/status';

const ROLE_CHOICES = {
  customer: 'Cliente',
  seller: 'P. Vendedora',
  administrator: 'Administrador',
};

export default function ListaUsers({ token }) {
  const { users, addUser } = useContext(UsersContext);

  const [isFirstFecth, setFirstFetch] = useState(true);
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(
    () => {
      const GET_USERS_ENDPOINT = 'http://localhost:3001/api/users';
      const config = {
        headers: { Authorization: `${token}` },
      };

      const fetchUsers = async () => {
        await axios.get(GET_USERS_ENDPOINT, config)
          .then(
            ({ data }) => {
              const filteredUsers = data.filter(({ role }) => role !== 'administrator');
              if (filteredUsers.length !== users.length) addUser(...filteredUsers);
              setFirstFetch(false);
            },
            ({ response: { status: errorStatus } }) => {
              if (errorStatus === status.HTTP_401_UNAUTHORIZED) {
                setRedirect(true);
              } else {
                setError('Falha ao listar usuários.');
              }
            },
          );
      };
      if (isFirstFecth) {
        fetchUsers();
      }
    }, [addUser, isFirstFecth, token, users],
  );

  if (redirect) {
    return (<Redirect
      to={ {
        pathname: '/login',
        state: {
          error: 'Sessão expirada',
        },
      } }
    />);
  }

  return (
    <section>
      <h2>Lista de usuários</h2>
      {
        error.length > 0
        && <span>{ error }</span>
      }
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(({ name, email, role }, index) => (
              <tr key={ email }>
                <td
                  data-testid={ `admin_manage__element-user-table-item-number-${index}` }
                >
                  { index + 1 }
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-name-${index}` }
                >
                  { name }
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-email-${index}` }
                >
                  { email }
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-role-${index}` }
                >
                  { ROLE_CHOICES[role] }
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-remove-${index}` }
                >
                  Excluir
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  );
}

ListaUsers.propTypes = {
  token: string.isRequired,
};
