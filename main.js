require(["esri/config","esri/views/MapView","esri/Map","esri/widgets/Feature", 
"esri/layers/FeatureLayer", "esri/widgets/FeatureTable", "esri/core/reactiveUtils"], 
            (esriConfig,MapView,Map,Feature,FeatureLayer,FeatureTable,reactiveUtils) => {

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

                  RepairCategory.when(()=>{
                    view.goTo(RepairCategory.fullExtent)});

                const view = new MapView({
                    map: map,
                    container: "Map_Container",
                    zoom:9,
                    center: [42.727,-70.773],
                    popup: {
                        autoOpenEnabled: false
                    }
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
                  const featureTable = new FeatureTable({
                    view:view,
                    layer: RepairCategory,
                    multiSortEnabled: true,
                    editingEnabled: true,
                    
                    tableTemplate: {
                        columnTemplates: [
                           
                            {
                              type: "field",
                              fieldName: "StreetName",
                              label: "Street Name",
                              direction: "asc"
                            },
                            {
                              type: "field",
                              fieldName: "StreetSegment",
                              label: "Street Segment",
                              direction: "asc"
                            },
                            {
                              type: "field",
                              fieldName: "FromStreet",
                              label: "From Street",
                              direction: "asc"
                            },
                            {
                              type: "field",
                              fieldName: "ToStreet",
                              label: "To Street",
                              direction: "asc"
                            },
                            
                            {
                              type: "field",
                              fieldName: "Length",
                              labeel: "Length",
                              direction: "asc"
                            },
                            {
                              type: "field",
                              fieldName: "Miles",
                              label: "Miles",
                              direction: "asc"
                            },
                            {
                              type: "field",
                              fieldName: "Width",
                              label: "Width",
                              direction: "asc"
                            },
                            {
                              type: "field",
                              fieldName: "RepairMethod",
                              label: "Repair Method",
                              direction: "asc"
                            },
                            {
                              type: "field",
                              fieldName: "AdjustedRSR",
                              label: "Adjusted RSR",
                              direction: "asc"
                            },
                            {
                              type: "field",
                              fieldName: "BenefitValue",
                              label: "Benefit Value",
                              direction: "asc"
                            },
                            {
                              type: "field",
                              fieldName: "SquareYards",
                              label: "Square Yards",
                              direction: "asc"
                            },
                            {
                              type: "field",
                              fieldName: "ClassCodeLong",
                              label: "Class Code Long",
                              direction: "asc"
                            },
                            {
                              type: "field",
                              fieldName: "PavementTypeLong",
                              label: "PavementType Long",
                              direction: "asc"
                            },
                            
                            
                            
                            
                            {
                              type: "field",
                              fieldName: "Cost",
                              label: "Cost",
                              direction: "asc"
                            }
            
            
                        ]
            
            
                    },
                    container: document.getElementById("Attribute_Table")
            
            
            
                
            
            
            
                });

                
            RepairCategory.watch("loaded", () => {
            reactiveUtils.when(
                  () => view.stationary === false,
                  () => {

              if(view.extent) {

              featureTable.filterGeometry = view.extent; 

              featureTable.on("selection-change", (changes) => {
              console.log(changes);
            });
          }
        }





      );
    });

    featureTable.on("selection-change", (changes) => {

      changes.removed.forEach((item) => {
        const data = features.find((data) => {
          return data.feature === item.feature;
          
        });
        if(data) {
          features.splice(features.indexOf(data), 1);
        }
      });
      changes.added.forEach((item) => {
        const feature = item.feature;
        features.push({
          feature: feature
        });
      })

    });

    
    view.on("immediate-click", (event) => {
      view.hitTest(event).then((response) => {
          const candidate = response.results.find((result) => {
            return (
              result.graphic &&
              result.graphic.layer &&
              result.graphic.layer == RepairCategory
            );
          });
          candidate && featureTable.selectRows(candidate.graphic);

        });



    });


            





            });