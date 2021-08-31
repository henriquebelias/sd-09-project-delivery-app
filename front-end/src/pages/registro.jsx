import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../components/input';
import Button from '../components/button';

function Registro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');

  const history = useHistory();

  useEffect(
    () => {
      const NAME_MIN_LENGTH = 12;
      const PASSWORD_MIN_LENGTH = 6;
      const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/igm;

      const isValidName = name.length >= NAME_MIN_LENGTH;
      const isValidPassword = password.length >= PASSWORD_MIN_LENGTH;
      const isValidEmail = EMAIL_REGEX.test(email);

      if (isValidName && isValidPassword && isValidEmail) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    },
    [name, email, password],
  );

  const handleChange = ({ target: { name: fieldName, value } }) => {
    if (error) setError('');
    switch (fieldName) {
    case 'name':
      return setName(value);
    case 'email':
      return setEmail(value);
    case 'password':
      return setPassword(value);
    default:
      return undefined;
    }
  };

  const handleRegister = async () => {
    const REGISTER_URL = 'http://localhost:3001/api/users/register';
    const payload = { name, email, password, role: 'customer' };

    await axios.post(REGISTER_URL, payload)
      .then(
        (response) => {
          localStorage.setItem('token', JSON.stringify(response.data.token));
          localStorage.setItem('user', JSON.stringify(response.data.user));

          history.push('/customer/products');
        },
        ({ response: { data: { message } } }) => setError(message),
      );
  };

  return (
    <div className="registro">
      <form>
        <div className="form-group">
          <Input
            className="form-control"
            id="exampleInputName"
            aria-describedby="NamelHelp"
            name="name"
            type="Name"
            placeholder="Seu nome"
            data-testid="common_register__input-name"
            onChange={ handleChange }
          />
        </div>
        <div className="form-group">
          <Input
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            type="email"
            placeholder="Seu-email@site.com.br"
            data-testid="common_register__input-email"
            onChange={ handleChange }
          />
        </div>
        <div className="form-group">
          <Input
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            type="password"
            placeholder="*********"
            data-testid="common_register__input-password"
            onChange={ handleChange }
          />
        </div>
        <Button
          className="btn btn-success"
          name="Cadastrar"
          data-testid="common_register__button-register"
          disabled={ disabled }
          onClick={ handleRegister }
        />
        {
          error.length > 0
            && (
              <span data-testid="common_register__element-invalid_register">
                { error }
              </span>
            )
        }
      </form>
    </div>
  );
}

export default Registro;