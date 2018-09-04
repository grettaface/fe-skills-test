import { uniq, sortBy } from "underscore";

const orgService = {
  unique(facilities) {
    // returns an array of organizations from facilities
    // utilizes underscore uniq method to only contain organizations with a unique id
    // sorts by id
    return sortBy(
      uniq(
        facilities.map(({ organization }) => {
          organization.label = organization.name;
          organization.value = organization.id;
          return organization;
        }),
        function(item) {
          return item.id;
        }
      ),
      "id"
    );
  }
};

export default orgService;
