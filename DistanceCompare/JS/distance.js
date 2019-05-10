require([
    "esri/WebMap",
    "esri/views/MapView",
    "esri/widgets/Search",
    "esri/geometry/Point",
    "esri/Graphic",
    "esri/geometry/geometryEngine",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/geometry/Polyline",
    "esri/symbols/SimpleLineSymbol"
], function (
    WebMap,
    MapView,
    Search,
    Point,
    Graphic, geometryEngine, SimpleMarkerSymbol ,Polyline, SimpleLineSymbol
) {
        // Create a map and add it to a MapView
        var webmap = new WebMap({
            portalItem: {
                id: "e905fb50f2054a13b968c2e5fdc53aaa"
            }
        });
        var view = new MapView({
            container: "viewDiv",
            map: webmap,
            center: [-51.2287, -30.0277,],
            zoom: 12

        });

    
        var search = new Search({
            view: view,


        });
        var search2 = new Search({
            view: view,

        });
        var cond1 = null;
        var cond2 = null;
        var cansearch = null;
        var name1,name2;
        view.ui.add(search, "top-right");

        
        
        var startpoint = new Point({

        })
        var endpoint = new Point({

        })
        
        
        
        var cont=1
            
        search.on("search-clear", function(evente){
            console.log("Search input textbox was cleared.");
            
            
          });
        search.on("search-start", function (getSearchSpatialReference) {
            
            console.log("Search started.");
            
            
             
        });
        search2.on("search-start", function (getSearch2SpatialReference) {
            console.log("Search2 started.");
            
            
        });
        /*if(search.searchTerm!=null && search2.searchTerm!=null && cont>1){
            search.clear();
            search2.clear();
            polyline.path.clear();
            cont--;
           }   */ 
           
       
        search.on("select-result", function(getSearchcoordinates){
                cont++;
              
            console.log("The selected search result: ", getSearchcoordinates); 
            startpoint.latitude = getSearchcoordinates.result.feature.geometry.latitude;
            startpoint.longitude = getSearchcoordinates.result.feature.geometry.longitude;
            startpoint.geometry = getSearchcoordinates.result.feature.geometry;
            startpoint.spatialReference = getSearchcoordinates.result.extent.spatialReference;
            name1= getSearchcoordinates.result.name;
            console.log("The selected search coordinates: ", startpoint.latitude," , ",startpoint.longitude,", nome",name1);
            view.ui.add(search2, "top-right");
                
            
          });
            search2.on("select-result", function(getSearch2Results){
            
            //console.log("The selected search result: ", getSearchcoordinates);  *View all the informations about the selected result.
            endpoint.latitude = getSearch2Results.result.feature.geometry.latitude;
            endpoint.longitude = getSearch2Results.result.feature.geometry.longitude;
            endpoint.geometry = getSearch2Results.result.feature.geometry;
            endpoint.spatialReference = getSearch2Results.result.extent.spatialReference;   
            name2= getSearch2Results.result.name; 
            console.log("The second selected search coordinates: ",endpoint.latitude,",",endpoint.longitude,", nome",name2);    
            drawnLine();
            search2.clear();
            view.ui.remove(search2);
            
            
                
            
    
            
        });
        
        var markerSymbol = new SimpleMarkerSymbol({
            color: [226, 119, 40],
            outline: {
                color: [255, 255, 255],
                width: 1
            }
        });
        
        var i=0;
        
        function drawnLine(){
            
           view.ui.remove(polylineGraphic);
           
           
           
           
              
     
             
            //console.log(Distance.toFixed(2));
           
            
            var polyline = new Polyline({
                paths: [
                  [startpoint.longitude, startpoint.latitude],
                  [endpoint.longitude, endpoint.latitude]
                ]
              });
            
              // Create a symbol for drawing the line
              var lineSymbol = new SimpleLineSymbol({
                color: "#EB0E5B",
                width: 3
              });
              var distance = geometryEngine.distance(endpoint.geometry, startpoint.geometry,"kilometers");
              var att = {
                Distancia: distance
            };
            
            var popupTemplate = {
                title: "Distância entre : " ,
                content:  "<br>"+ name1+". e"+" " + name2 + "<br>"+ "<strong>Distância: </strong>"+ (distance.toFixed(2))+ " km"
              };
              // Create a line graphic
              var polylineGraphic = new Graphic({
                geometry: polyline,
                symbol: lineSymbol,
                att: att,
                popupTemplate: popupTemplate
              })
              b =search.searchTerm;
              // Add the graphic to the view
              
              view.graphics.add(polylineGraphic);
              i++;
            }
              
            
     
              
        
    });

