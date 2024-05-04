(function () {
  "use strict";

  angular
    .module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .directive("foundItems", FoundItems)
    .constant(
      "menuUrl",
      "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
    );

  

  /**
   * Encapsulates the code that fetches and filters the menu data
   *
   * @param $http - service used to retrieve menu items before they  are filtered
   * @param menuUrl - A constant defining the URL from which to retrieve the menu
   *                  of Chinese food
   */
  MenuSearchService.$inject = ["$http", "menuUrl"];
  function MenuSearchService($http, menuUrl) {
    this.getMenuItems = function () {
      let response = $http({
        method: "GET",
        url: menuUrl,
      });

      return response;
      
    };

    this.filterItems = function(searchTerm) {

    };
  }

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    let myThis = this;
    myThis.found = [];
    let response = MenuSearchService.getMenuItems();

    response.then(function (res) {
        const retlist = [];
        for (let obj in res.data) {
          let items = res.data[obj].menu_items;
          for (let i = 0; i < items.length; i++) {
            retlist.push(items[i]);
          }
        }
        myThis.found = retlist;
      });
  }

  /**
   * Creates the <found-items> tag
   *
   * @returns items, a directive definition object
   */
  function FoundItems() {
    let tag = {
      templateUrl: "foundItems.html",
      scope: {
        items: "<found",
      },
    };

    return tag;
  }
})();
