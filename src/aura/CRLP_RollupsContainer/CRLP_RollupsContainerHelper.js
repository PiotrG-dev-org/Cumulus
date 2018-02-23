({
    displayRollupsGrid: function(cmp){
        //resets the view assignments and clears detail information
        cmp.set("v.isRollupsGrid", true);
        cmp.set("v.isFilterGroupsGrid", false);
        cmp.set("v.isRollupDetail", false);
        cmp.set("v.isFilterGroupDetail", false);
        cmp.set("v.detailMode", null);
        cmp.set("v.activeRecord", null);

        //checks if we're coming from the detail view
        cmp.set("v.activeRecordId", null);
    },

    displayFilterGroupsGrid: function(cmp){
        //resets the view assignments and clears detail information
        cmp.set("v.isFilterGroupsGrid",true);
        cmp.set("v.isRollupsGrid", false);
        cmp.set("v.isFilterGroupDetail", false);
        cmp.set("v.detailMode", null);
        cmp.set("v.activeRecord", null);

        //checks if we're coming from the detail view
        cmp.set("v.activeRecordId", null);
    },

    filterData: function(cmp, object){
        //filters row data based on user's selection of summary object
        var cachedRollupList = cmp.get("v.cachedRollupList");
        if(object === 'All'){
            cmp.set("v.rollupList", cachedRollupList);
        } else{
            var filteredRollupList = cachedRollupList.filter(function(rollup){
               return rollup.summaryObject === object;
            });
            cmp.set("v.rollupList", filteredRollupList);
        }
    },

    sortData: function(cmp, fieldName, sortDirection){
        //sorts data by user's selected field and field direction
        var data = cmp.get("v.rollupList");
        var reverse = sortDirection !== 'asc';
        //sorts the rows based on the column header that's clicked and in specified direction
        data.sort(this.sortBy(fieldName, reverse));
        cmp.set("v.rollupList", data);
    },

    sortBy: function (field, reverse, primer) {
        //provided by Salesforce lightning:datatable documentation
        var key = primer ?
            function(x) {return primer(x[field])} :
            function(x) {return x[field]};
        //checks if the two rows should switch places
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }
})