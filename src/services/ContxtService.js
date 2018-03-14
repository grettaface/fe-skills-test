import facilities from '../../test/fixtures/facilities.json';

const contxtSDK = {
  facilities: {
    getAll: function() {
      return new Promise(function (resolve, reject) {
        resolve(facilities);
      })
    }
  },
  auth: {
    isAuthenticated: function(){return true;},
    getProfile: function(){
      return new Promise(function (resolve, reject) {
        resolve({
          nickname: "Test user",
          picture: null
        });
      })
    }
  }
}

export default contxtSDK;
