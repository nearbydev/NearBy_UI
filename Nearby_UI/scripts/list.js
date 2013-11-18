window.marchants = [ "Shop 1", "Shop 2", "Shop 3", "Shop 4", "Shop 5", "Shop 6", "Shop 7", "Shop 8", "Shop 9", "Shop 10", "Shop 11", "Shop 12" ];

function march_list() {
        var dataSource = new kendo.data.DataSource({
            type: "odata",
            transport: {
                read: {
                    url: "http://demos.kendoui.com/service/Northwind.svc/Products"
                }
            },
            sort: {
                field: "ProductName",
                dir: "asc"
            },
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true,
            pageSize: 50
        });

        $("#march-listview").kendoMobileListView({
            dataSource: dataSource,
            template: $("#march_list-template").text(),
            filterable: {
                field: "ProductName",
                operator: "startswith"
            },
            endlessScroll: true
        });
    }