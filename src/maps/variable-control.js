
class Navigate {
    static regions(params) {
        const ids = params.regions
            .map(region => region.id)
            .join('-');
        const names = params.regions
            .map(region => region.name)
            .map(Navigate.escapeName)
            .join('-');

        let navigate = [];
        if (params.vector && params.vector !== '') {
            navigate.push(params.vector);
            if (params.metric) navigate.push(params.metric);
            if (params.year) navigate.push(params.year);
        }

        return `/region/${ids}/${names}/${navigate.join('/')}`;
    }

    static search(params) {
        return `/search/${params.vector || 'population'}`;
    }

    static url(params) {
        const path = (params.regions && params.regions.length > 0) ?
            Navigate.regions(params) : Navigate.search(params);
        const search = Navigate.params(params);

        return `${path}?${search}`;
    }

    static params(params) {
        const urlParams = ['categories', 'domains', 'tags', 'debug']
            .concat(params.regions && params.regions.length > 0 ? [] : ['q', 'page']);
        const availableParams = urlParams
            .map(name => [name, params[name]])
            .filter(([name, value]) => (value && (value.constructor != Array || value.length > 0)));

        return $.param(_.object(availableParams), true);
    }

    static escapeName(name) {
        return name.replace(/,/g, '').replace(/[ \/]/g, '_');
    }
}

class VariableControl {
    constructor(source, params, onUpdate) {
        this.source = source;
        this.variables = source.variables;
        this.params = params;
        this.onUpdate = onUpdate;

        this.variable = _.find(this.variables, variable => Navigate.escapeName(variable.name).toLowerCase() === params.metric);
        this.variable = this.variable || this.variables[0];

        params.year = parseInt(params.year);
        this.year = _.contains(this.variable.years, params.year) ?
            params.year : _.max(this.variable.years);
    }

    update() {
        const url = Navigate.url(_.extend(this.params, {
            vector: Navigate.escapeName(this.source.name),
            year: this.year,
            metric: Navigate.escapeName(this.variable.name).toLowerCase()
        }));

        history.replaceState(null, null, url);

        this.onUpdate(this.variable, this.year);
    }

    onAdd(map) {
        this.container = d3.select('ul.chart-sub-nav');

        this.update();

        function optionDatum(select) {
            const value = select.property('value');
            const option = select.select(`option[value='${value}']`);
            return option.datum();
        }


        const variableContainer = this.container.append('li');
        const variableLink = variableContainer.append('a');
        this.variableSelector = variableLink.append('span');
        variableLink.append('i').attr('class', 'fa fa-caret-down');

        const variableList = variableContainer
            .append('ul')
            .attr('class', 'chart-sub-nav-menu')
            .selectAll('li')
            .data(this.variables)
            .enter()
            .append('li')
            .append('a')
            .text(variable => variable.name)
            .on('click', variable => {
                this.variable = variable;
                if (!_.contains(this.variable, this.year)) this.year = _.max(this.variable.years);
                this.update();
                this.updateSelectors();
            });

        const yearContainer = this.container.append('li');
        const yearLink = yearContainer.append('a');
        this.yearSelector = yearLink.append('span');
        yearLink.append('i').attr('class', 'fa fa-caret-down');
        this.yearList = yearContainer
            .append('ul')
            .attr('class', 'chart-sub-nav-menu');

        this.updateSelectors();
    }

    updateSelectors() {
        this.variableSelector.text(this.variable.name);
        this.yearSelector.text(this.year);

        this.yearList.selectAll('li').remove();
        this.yearList
            .selectAll('li')
            .data(this.variable.years)
            .enter()
            .append('li')
            .append('a')
            .text(year => year)
            .on('click', year => {
                this.year = year;
                this.update();
                this.updateSelectors();
            });
    }
}

