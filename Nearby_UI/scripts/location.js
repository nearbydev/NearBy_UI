(function (global) {
    var map,
        geocoder,
        LocationViewModel,
        app = global.app = global.app || {};
    
    var IMAGE_ROOT = "images/"; 
    
    var merch_list = [
      ['Starsbucks', 22.300867,114.16746, IMAGE_ROOT + "starbucks_logo.png"],
      ['Fortress', 22.300343,114.167872, null],
      ['The Royal Pacific Hotal and Towers', 22.300237,114.168218, null],
      ['Fotomax', 22.277357,114.23942, null],
      ["Mcdonald's",22.282961,114.1564, IMAGE_ROOT + "mcdonald_logo.png"],
      ["Mcdonald's",22.283974,114.157108, IMAGE_ROOT + "mcdonald_logo.png"],
      ["Mcdonald's",22.286257,114.135479, IMAGE_ROOT + "mcdonald_logo.png"],
      ["Mcdonald's",22.282663,114.128526, IMAGE_ROOT + "mcdonald_logo.png"],
      ["Mcdonald's",22.270789,114.149984, IMAGE_ROOT + "mcdonald_logo.png"],
      ["Mcdonald's",22.276034,114.24071, IMAGE_ROOT + "mcdonald_logo.png"],
      ["Pricerite",22.277144,114.177323, IMAGE_ROOT + "pricerite_logo.png"],
      ["Pricerite",22.380119,114.186153, IMAGE_ROOT + "pricerite_logo.png"],
      ["Pricerite",22.445937,114.023739, IMAGE_ROOT + "pricerite_logo.png"],
      ["Pricerite",22.280271,114.185402, IMAGE_ROOT + "pricerite_logo.png"]
    ];
    
    var myDS = new kendo.data.DataSource({
        transport: {
            read: { 
                url: "http://theonlyw.com/nearby_api.php?method=getAllMerchant",
                dataType: "jsonp"
            } 
        },
        sort: {
            field: "merch_name_en",
            dir: "asc"
        }
    });

    LocationViewModel = kendo.data.ObservableObject.extend({
        _lastMarker: null,
        _isLoading: false,

        address: "",
        isGoogleMapsInitialized: false,

        onNavigateHome: function () {
            var that = this,
                position;

            that._isLoading = true;
            that.showLoading();

            navigator.geolocation.getCurrentPosition(
                function (position) {
                    position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    map.panTo(position);
                    that._putMarker(position);
                    
                    //extra marker 22.277191,114.240177
                    
                    //China HK City
                    //==============================
                    //Starsbucks 22.300867,114.16746
                    //Fortress 22.300343,114.167872
                    //The Royal Pacific Hotal and Towers 22.300237,114.168218
                    
                    var i;
                    
                    myDS.fetch(function(){
                      var data = this.data();
                      for (i = 0; i < data.length; i++) { 
                          //console.log(data[i].merch_name_en);
                          if(data[i].marker_image){data[i].marker_image = IMAGE_ROOT + data[i].marker_image;}
                          that._addMarker(new google.maps.LatLng(data[i].lat, data[i].lng),data[i].merch_name_zh,data[i].marker_image);
                      }
                    });
                    
                    
                    /*for (i = 0; i < merch_list.length; i++) {  
                        that._addMarker(new google.maps.LatLng(merch_list[i][1], merch_list[i][2]),merch_list[i][0],merch_list[i][3]);
                    }*/
                    
                    that._isLoading = false;
                    that.hideLoading();
                },
                function (error) {
                    //default map coordinates
                    position = new google.maps.LatLng(43.459336, -80.462494);
                    map.panTo(position);

                    that._isLoading = false;
                    that.hideLoading();

                    navigator.notification.alert("Unable to determine current location. Cannot connect to GPS satellite.",
                        function () { }, "Location failed", 'OK');
                },
                {
                    timeout: 30000,
                    enableHighAccuracy: true
                }
            );
        },

        onSearchAddress: function () {
            var that = this;

            geocoder.geocode(
                {
                    'address': that.get("address")
                },
                function (results, status) {
                    if (status !== google.maps.GeocoderStatus.OK) {
                        navigator.notification.alert("Unable to find address.",
                            function () { }, "Search failed", 'OK');

                        return;
                    }

                    map.panTo(results[0].geometry.location);
                    that._putMarker(results[0].geometry.location);
                });
        },

        showLoading: function () {
            if (this._isLoading) {
                app.application.showLoading();
            }
        },

        hideLoading: function () {
            app.application.hideLoading();
        },

        _putMarker: function (position) {
            var that = this;

            if (that._lastMarker !== null && that._lastMarker !== undefined) {
                that._lastMarker.setMap(null);
            }
            
            var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

            that._lastMarker = new google.maps.Marker({
                map: map,
                position: position,
                icon: IMAGE_ROOT + "blue_dot_circle_v2.png"
            });
            
            var infowindow = new google.maps.InfoWindow({
				content: "You are here"
			});
            
            google.maps.event.addListener(that._lastMarker, 'mousedown', function() {
				infowindow.open(map, that._lastMarker);
			});
        },
        
        _addMarker: function (position, pos_title, marker_path) {
            if(marker_path == null || marker_path == undefined){
                marker_path = IMAGE_ROOT + "default_marker.png";
            }
            
            var temp_marker = new google.maps.Marker({
                map: map,
                position: position,
                title: pos_title,
                icon: marker_path
            });
            
            var infowindow = new google.maps.InfoWindow({
				content: pos_title
			});
            
            google.maps.event.addListener(temp_marker, 'mousedown', function() {
				infowindow.open(map, temp_marker);
			});
        }
    });

    app.locationService = {
        initLocation: function () {
            var mapOptions;

            if (typeof google === "undefined"){
                return;
            } 

            app.locationService.viewModel.set("isGoogleMapsInitialized", true);

            mapOptions = {
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },

                mapTypeControl: false,
                streetViewControl: false
            };

            map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
            //var GeoMarker = new GeolocationMarker(map);
            
            geocoder = new google.maps.Geocoder();
            app.locationService.viewModel.onNavigateHome.apply(app.locationService.viewModel, []);
        },

        show: function () {
            if (!app.locationService.viewModel.get("isGoogleMapsInitialized")) {
                return;
            }

            //show loading mask in case the location is not loaded yet 
            //and the user returns to the same tab
            app.locationService.viewModel.showLoading();

            //resize the map in case the orientation has been changed while showing other tab
            google.maps.event.trigger(map, "resize");
        },

        hide: function () {
            //hide loading mask if user changed the tab as it is only relevant to location tab
            app.locationService.viewModel.hideLoading();
        },

        viewModel: new LocationViewModel()
    };
}
)(window);