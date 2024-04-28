(function() {
    "use strict";

    angular.module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListService", ShoppingListService);

    ToBuyController.$inject = ["ShoppingListService"];
    function ToBuyController(ShoppingListService) {
        let tobuy = this;
        tobuy.items = ShoppingListService.getUnboughtItems();
        tobuy.buyItem = function($index) { 
            return ShoppingListService.buyItem($index);
        };
    }

    AlreadyBoughtController.$inject = ["ShoppingListService"];
    function AlreadyBoughtController(ShoppingListService) {
        let bought = this;
        bought.items = ShoppingListService.getBoughtItems();
    }

    function ShoppingListService() {
        let service = this;
        service.unboughtItems = [{count: 10, name: "cookies"},
                              {count: 2, name: "bottles of milk"},
                              {count: 4, name: "ice cream cones"},
                              {count: 5, name: "lollipops"}];
        service.boughtItems = [];

        service.getUnboughtItems = function() {
            return service.unboughtItems;
        };

        service.getBoughtItems = function() {
            return service.boughtItems;
        };
        
        service.buyItem = function(index) {
           let item = service.unboughtItems.splice(index, 1);
           service.boughtItems.push(item[0]);
        };
    }   
})();
