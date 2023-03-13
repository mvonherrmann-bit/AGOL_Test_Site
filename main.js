require(["esri/config","esri/views/MapView","esri/Map", "esri/layers/FeatureLayer"], 
            (esriConfig,MapView,Map,FeatureLayer) => {

                esriConfig.portalUrl = "https://beta-inc.maps.arcgis.com";

    
                const map = new Map({
                  basemap:"arcgis-streets"
                });
            
                  const template = {
                    title: "Street Name: {StreetName}",
                    content: [
                      {
                        type: "fields", 
                        fieldInfos: [
                          {
                            fieldName: "StreetName",
                            label: "Street Name"
                          },
                          {
                            fieldName: "StreetSegment",
                            label: "Street Segment"
                          },
                          {
                            fieldName: "FromStreet",
                            label: "From Street"
                          },
                          {
                            fieldName: "ToStreet",
                            label: "To Street"
                          },
                          {
                            fieldName: "Length",
                            label: "Length",
                            format: {
                              digitSeparator: true,
                              places: 2
                            }
                          },
                          {
                            fieldName: "Miles",
                            label: "Miles",
                            format: {
                              digitSeparator: true,
                              places: 2
                            }
                          },
                          {
                            fieldName: "Width",
                            label: "Width",
                            format: {
                              digitSeparator: true,
                              places: 2
                            
                          }
                        },
                          {
                            fieldName: "SquareYards",
                            label: "Square Yards",
                            format: {
                              digitSeparator: true,
                              places: 2
                            }
                          },
                          {
                            fieldName: "BenefitValue",
                            label: "Benefit Value",
                            format: {
                              digitSeparator: true,
                              places: 2
                            }
                          },
                          {
                            fieldName: "AdjustedRSR",
                            label: "Adjusted RSR",
                            format: {
                              digitSeparator: true,
                              places: 2
                            }
                          },
                          {
                            fieldName: "RepairMethod",
                            label: "Repair Method"
                          },
                          {
                            fieldName: "Cost",
                            label: "Cost",
                            format: {
                              digitSeparator: true,
                              places: 2
                            }
                          }
                          
              
                          
                        
                        ]
                      }
                    ]
                  }

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
                 
            RepairCategory.when(()=>{
            view.goTo(RepairCategory.fullExtent)});
            
             view.on("immediate-click", (event) => {
            view.hitTest(event).then((response) => {
            const candidate = response.results.find((result) => {
              return (
                result.graphic &&
                result.graphic.layer &&
                result.graphic.layer == RepairCategory
              );
            });
    

          });



      });
            
            
            
            





            });
