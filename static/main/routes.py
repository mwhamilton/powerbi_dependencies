from app import app
import flask
from powerbi_parser.extract import PowerBI


@app.route('/')
def render():
    return flask.render_template('main.html')


@app.route('/api/dependencies', methods=['POST'])
def api_dependencies():
    x = PowerBI('../powerbi_parser/test.pbit')
    data = {
        'measure_sources': [],
        'calc_col_sources': [],
        'visual_sources': [],
        'table_sources': [],
    }
    for table in x.data_model_schema.model.tables:
        data['measure_sources'].extend(table.list_measure_dependencies())
        data['calc_col_sources'].extend(table.list_calc_col_dependencies())
        data['table_sources'].append({
            'name': table.name,
            'dependencies': table.sources
        })
    for visual in x.list_visuals():
        data['visual_sources'].extend(visual.dependencies)
    return flask.jsonify(data)
    print(measure_sources)
    print(calc_col_sources)
    print(visual_sources)
    print(table_sources)