import facilities from "../../test/fixtures/facilities";

const contxtSDK = {
  facilities: {
    getAll: function() {
      return new Promise(function(resolve, reject) {
        resolve(facilities);
      });
    }
  },
  organizations: {
    getUniques: function(facilities) {
      let organizations = [];
      for (let facility of facilities) {
        if (
          !organizations.find(org => {
            return org.id === facility.organization.id;
          })
        ) {
          facility.organization.label = facility.organization.name;
          facility.organization.value = facility.organization.id;
          organizations.push(facility.organization);
        }
      }
      return organizations;
    }
  },
  auth: {
    isAuthenticated: function() {
      return true;
    },
    getProfile: function() {
      return new Promise(function(resolve, reject) {
        resolve({
          nickname: "Test user",
          picture: null
        });
      });
    }
  }
};

export default contxtSDK;
