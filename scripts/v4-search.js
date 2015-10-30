$(document).ready(function() {

    // Search page controller
    //
    var searchPageController = new SearchPageController(_params);

    // Region controller
    //
    new RegionController(function(region) {

        searchPageController.setAutoCompletedRegion(region);
        searchPageController.navigate();
    });

    // Charts
    //
    if (_params.regions.length > 0) {

        switch (_params.vector) {

            case 'population':
                searchPageController.drawPopulationData();
                break;
                
            case 'earnings':
                searchPageController.drawEarningsData();
                break;
                
            case 'education':
                searchPageController.drawEducationData();
                break;

            case 'occupations':
                searchPageController.drawOccupationsData();
                break;

            case 'cost_of_living':
                searchPageController.drawCostOfLivingData();
                break;
                
            case 'gdp':
                searchPageController.drawGdpData();
                break;
        }
   }
});
