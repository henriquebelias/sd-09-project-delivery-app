const validateUserData = (data) => {
  const { name, email, password } = data;
  const minimumNameSize = 12;

  const emailRegex = /^[\S.]+@[a-z]+\.\w{2,3}$/g;
  const passwordRegex = /[\w\D]{6}/g;

  const nameIsValid = name.length >= minimumNameSize;
  const emailIsValid = emailRegex.test(email);
  const passwordIsValid = passwordRegex.test(password);

  if (!nameIsValid || !emailIsValid || !passwordIsValid) {
    return false;
  }

  return true;
};

export default validateUserData;