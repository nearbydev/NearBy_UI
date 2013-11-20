
function march_list() {
    	// create a template using the above definition
        //var template = kendo.template($("#march_list-template").html());
    
        var merch_list = [
           	{ name: "Mcdonld's",  address: "Basement, Yu To Sang Building, 37 Queen's Road Central, Hong Kong",  phone: "25263770" },
			{ name: "Mcdonld's",  address: "Shop C (Portion) & D on G/F and Portion of 1/F, Man Kwong Court, 12F-12G Smithfield, Kennedy Town, Hong Kong",  phone: "25234310" },
			{ name: "Mcdonld's",  address: "496 (G/F) & 484-496 (M/F), 484-496 Queen's Rd West, Sai Ying Pun, Hong Kong",  phone: "25407710" },
			{ name: "Mcdonld's",  address: "Shop C (Portion) & D on G/F and Portion of 1/F, Man Kwong Court, 12F-12G Smithfield, Kennedy Town, Hong Kong",  phone: "28174130" },
			{ name: "Mcdonld's",  address: "Shop 11 & 12, Level 2, Peak Galleria, 118 Peak Road, The Peak, Hong Kong",  phone: "28495787" },
			{ name: "Pricerite",  address: "177-179 Wanchai Road, first floor (Cross Lane entrance)",  phone: "28930514" },
			{ name: "Pricerite",  address: "Hilton Plaza Hilton Plaza, No. 3-9 Shatin Centre Street, ground and first floor",  phone: "26933731" },
			{ name: "Pricerite",  address: "Yuen Long Main Road, No. 130-132 G/F-2/F",  phone: "24767049" },
			{ name: "Pricerite",  address: "Yee Wo Street, Causeway Bay, Hong Kong Mansion Basement",  phone: "29237010" }
        ];
    
    	
        var myDS = new kendo.data.DataSource({
            data: merch_list,
            sort: {
                field: "name",
                dir: "asc"
            }
        });
        
    
        // read data from the "merch_list" array
        //dataSource.read();
    
     	$("#march_list_view").kendoMobileListView({ 
            dataSource: myDS,
            template: $("#march_list-template").text(),
            
            filterable: {
                field: "name",
                operator: "contains"
            }
       	});
        
    
        /*
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
        */
    }