/**
 * Created by sks on 2017/4/28.
 */
const axios = require('axios');
axios.get('http://192.168.50.67:8080/#')
    .then(function(response){
  console.log(response.status, response.data);
}).catch(function(error){
  console.log(error);
});
