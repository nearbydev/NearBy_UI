
function fav_list() {
        var dataSource = new kendo.data.DataSource({
            type: "odata",
            transport: {
                read: {
                    url: "http://demos.kendoui.com/service/Northwind.svc/Products"
                }
            },
            sort: {
                field: "UnitPrice",
                dir: "desc"
            },
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true,
            pageSize: 50
        });

        $("#fav-listview").kendoMobileListView({
            dataSource: dataSource,
            template: $("#fav_list-template").text(),
            filterable: {
                field: "ProductName",
                operator: "startswith"
            },
            endlessScroll: true
        });
    }