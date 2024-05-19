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
   * This is our main controller. It contains an entry field for search terms,
   * a button which triggers the search and a list of filtered search items.
   */
  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    let ctrl = this;
    ctrl.found = [];
    ctrl.searchStr = "";

    ctrl.doSearch = function () {
      MenuSearchService.getMenuItems(ctrl.searchStr, ctrl);
    };

    ctrl.onRemove = function(index) {
        ctrl.found.splice(index, 1);
    }
  }

  /**
   * Encapsulates the code that fetches and filters the menu data
   *
   * @param $http - service used to retrieve menu items before they  are filtered
   * @param menuUrl - A constant defining the URL from which to retrieve the menu
   *                  of Chinese food
   */
  MenuSearchService.$inject = ["$http", "menuUrl"];
  function MenuSearchService($http, menuUrl) {
    let service = this;
    this.lowercase = function (str) {
      let retstr = "";
      for (let i = 0; i < str.length; i++) {
        let code = str.charAt(i).codePointAt(0);
        if (code < 97) {
          code += 32;
        }
        retstr += String.fromCharCode(code);
      }

      return retstr;
    };

    this.getMenuItems = function (searchStr, controller) {
      let lowSearch = this.lowercase(searchStr);
      $http({
        method: "GET",
        url: menuUrl,
      }).then(function (res) {
        const retlist = [];
        for (let obj in res.data) {
          let items = res.data[obj].menu_items;
          for (let i = 0; i < items.length; i++) {
            let lowerName = service.lowercase(items[i].name);
            if (lowerName.includes(lowSearch)) {
              retlist.push(items[i]);
            }
          }
        }
        controller.found = retlist;
      });
    };
  }
  /**
   * Creates the <found-items> tag
   *
   * @returns tag, a directive definition object
   */
  function FoundItems() {
    let tag = {
      templateUrl: "foundItems.html",
      scope: {
        items: "<found",
        onRemove: "&"
      }
    };

    return tag;
  }
})();
