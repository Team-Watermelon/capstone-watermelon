const cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'capstonewatermelon', 
    api_key: '376898195976316', 
    api_secret: '1WTQSu9AbzkN3BOAq9fpWLXeuoQ' 
  });

  export default cloudinary;