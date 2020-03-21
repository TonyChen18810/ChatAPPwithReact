import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

import * as chartActions from '../../modules/chart';
import './chart.css';

class Chart extends Component {

  componentDidMount() {
    this.props.chartActions.geData();
  }

  render() {
    const { chart } = this.props;

    if(chart.isFetched) {
      const groupingUnits = [[
        'week', 
        [1]
      ], [
        'month',
        [1, 2, 3, 4, 6]
      ]];

      const charts = {
        chart: {
          height: 800
        },
        rangeSelector: {
          selected: 2
        },

        title: {
          text: 'AAPL Historical',
          style: {
            color: '#ffffff'
          }
          
        },

        yAxis: [{
          labels: {
            align: 'right',
            x: -3,
            style: {
              color: '#ffffff'
           }
          },
          title: {
            text: 'AAPL Stock Price'
          },
          height: '60%',
          lineWidth: 2,
          resize: {
            enabled: true
          }
        }, {
          labels: {
            align: 'right',
            x: -3
          },
          title: {
              text: 'Volume'
          },
          top: '65%',
          height: '35%',
          offset: 0,
          lineWidth: 2
        }],

        tooltip: {
          split: true
        },
        plotOptions: {
          series: {
            dataLabels: {
                color: '#B0B0B3'
            },
            marker: {
             lineColor: '#333'
            }
          },
          boxplot: {
            fillColor: '#505053'
          },
          candlestick: {
           lineColor: 'white'
          },
          errorbar: {
            color: 'white'
          }
        },
        series: [{
            type: 'candlestick',
            name: 'AAPL Stock Price',
            data: chart.data.stockChart,
            id: "aapl",
            dataGrouping: {
              units: groupingUnits
            }
          },
          {
            type: 'column',
            name: 'Volume',
            data: chart.data.volume,
            id: 'vlm-series',
            yAxis: 1,
            color: '#1d8489',
            dataGrouping: {
              units: groupingUnits
            }
          },
          {
            name: 'SMA 5',
            data: chart.data.sma_50,
            color: Highcharts.getOptions().colors[4],
            fillColor: '#FFE102',
            tooltip: {
              valueDecimals: 2,
              split: true
            },
          },
          {
            name: 'SMA 20',
            data: chart.data.sma_20,
            color: Highcharts.getOptions().colors[2],
            fillColor: '#FFE102',
            tooltip: {
                valueDecimals: 2,
                split: true
            }
          },
          {
            type: 'flags',
            data: chart.data.flag,
            onSeries: 'cs-series',
            color: Highcharts.getOptions().colors[0],
            fillColor: '#FFE102',
            shape: 'circlepin'
          }
        ]
      };
      return (
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={charts}
          />

        </div>
      );
    } else {
      return null;
    }    
  }
}

function mapStateToProps(state) {
  return {
    chart: state.chart
  }
}

function mapDispatchToProps(dispatch) {
  return {
    chartActions: bindActionCreators(chartActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart)