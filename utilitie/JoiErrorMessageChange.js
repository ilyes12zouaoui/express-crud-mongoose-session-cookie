const joiErrorMessageChange = joiResult => {
  if (!joiResult.error) return null;

  const errorsArray = joiResult.error.details.map(obj => {
    const array = obj.message.split('"');
    const key = array[1];
    const message = array.join("");

    return { [key]: message };
  });

  let errors = {};

  errorsArray.forEach(obj => {
    errors = Object.assign(errors, obj);
  });

  return errors;
};

module.exports = joiErrorMessageChange;
