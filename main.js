require(["esri/config","esri/views/MapView","esri/Map"], 
            (esriConfig,Mapview,Map) => {

                esriConfig.portalUrl = "https://beta-inc.maps.arcgis.com";

    
                const map = new Map({
                  basemap:"arcgis-streets"
                });

                const RepairCategory = new FeatureLayer({
                    portalItem: {
                      id: "168ebb3f209c480493a4bb48065914b6"
                    },
                    layerId: 1,
                    popupTemplate: template
                    
                  });
                  map.add(RepairCategory);

                const view = new MapView({
                    map: map,
                    container: "Map_Container",
                    zoom:9,
                    center: [42.727,-70.773],
                    popup: {
                        autoOpenEnabled: false
                    }
                  });
                 





            });