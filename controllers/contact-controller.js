const Contact = require('../models/contact');
const myPath = require('../helpers/mypath');

const getContacts = (req, res) => {
  const title = 'Contacts';
  Contact
    .find()
    .then(contacts => res.render(myPath('contacts'), { contacts, title }))
    .catch((error) => {
      console.log(error);
      res.render(myPath('error'), { title: 'Error' });
    });
}

module.exports = {
  getContacts,
};
