
function cat_list() {
    	
        var myDS = new kendo.data.DataSource({
            transport: {
                read: { 
                    url: "http://theonlyw.com/nearby_api.php?method=getAllCategory",
                    dataType: "jsonp"
                } 
            },
            sort: {
                field: "cat_desc",
                dir: "asc"
            },
            pageSize: 50
        });
    
    	$("#cat_list_view").kendoMobileListView({ 
            dataSource: myDS,
            template: $("#cat_list-template").text(),
            
       	});
    }