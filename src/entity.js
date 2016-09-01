'use strict';

$(document).ready(function() {
    menuMouseHandlers();
    autosuggest();
    drawMap();
    drawCharts();
});

function autosuggest() {
    // Main search bar autosuggest
    new Autosuggest('.region-list')
        .listen('.search-bar-input');

    // Compare this data autosuggest
    // TODO this is using the same autosuggest as the main search bar
    new Autosuggest('.add-region-results')
        .listen('.add-region-input');

    // Mobile autosuggest
    new Autosuggest('.add-region-results-mobile')
        .listen('.add-region-input-mobile');
}

function drawMap() {
    const constraints = _(_data.constraints)
        .map(constraint => [constraint.name, constraint.selected])
        .object()
        .value();

    MapView.create(_data.entities, _data.variable, constraints, {})
        .then(map => map.show('div#map'))
        .catch(error => {
            throw error;
        });
}

function drawCharts() {
    [_data.chartConfig.charts[0]].forEach(config => {
        const chart = new DatasetChart(config);
        chart.getData().then(data => chart.render(data)).catch(error => {
            throw error;
        });
    });

    const container = d3.select('#google-charts-container');
}

function menuMouseHandlers() {
    d3.select('ul.chart-sub-nav')
        .selectAll('li')
        .on('mouseenter', function() {
            if ($(this).children('ul').length) {
                $(this).addClass('selected');
                $(this).children('span').children('i').removeClass('fa-caret-down').addClass('fa-caret-up');
                $(this).children('ul').show();
            }
        })
        .on('mouseleave', function() {
            if ($(this).children('ul').length) {
                $(this).removeClass('selected');
                $(this).children('span').children('i').removeClass('fa-caret-up').addClass('fa-caret-down');
                $(this).children('ul').hide();
            }
        });
}

