const getNames = ({ response }) => {
  response.body = "Listing names";
};

const addName = ({ response }) => {
  response.body = "Adding a name";
};



export { getNames, addName};
