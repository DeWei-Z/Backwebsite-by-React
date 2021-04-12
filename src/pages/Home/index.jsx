import React, { Component } from 'react'
import ReactECharts from 'echarts-for-react'
import {Card} from 'antd'
import { Line } from '@ant-design/charts';

export default class Home extends Component {

       state={
           data:[]
       }
    
        
       asyncFetch =() => {
         fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
         .then((response) => response.json())
         .then((json) => this.setState({data:json}))
         .catch((error) => {
           console.log('fetch data failed', error);
         });
           
        };

        componentDidMount(){
            this.asyncFetch()
           
        }

        


    render() {

        const config = {
            data: this.state.data,
            xField: 'year',
            yField: 'value',
            seriesField: 'category',
            yAxis: {
              label: {
                formatter: function formatter(v) {
                  return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
                    return ''.concat(s, ',');
                  });
                },
              },
            }
          }

          const optionOne = {
            title: {
                text: '2014年二氧化碳排放量来源',
                subtext: '',
                left: 'center',
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    name: 'category',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        {value: 1823, name: 'Gas fuel'},
                        {value: 4117, name: 'Solid fuel'},
                        {value: 568, name: 'Cement production'},
                        {value: 68, name: 'Gas flarinl'},
                        {value: 3280, name: 'Liquid fuel'}
                    ],
                    top:20,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        
        const optionTwo = {
          tooltip: {
              trigger: 'axis',
              axisPointer: {            // Use axis to trigger tooltip
                  type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
              }
          },
          legend: {
              data: ['Gas fuel', 'Solid fuel', 'Cement production', 'Gas flarinl', 'Liquid fuel']
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: {
              type: 'value'
          },
          yAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          series: [
              {
                  name: 'Gas fuel',
                  type: 'bar',
                  stack: 'total',
                  label: {
                      show: true
                  },
                  emphasis: {
                      focus: 'series'
                  },
                  data: [320, 302, 301, 334, 390, 330, 320]
              },
              {
                  name: 'Solid fuel',
                  type: 'bar',
                  stack: 'total',
                  label: {
                      show: true
                  },
                  emphasis: {
                      focus: 'series'
                  },
                  data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                  name: 'Cement production',
                  type: 'bar',
                  stack: 'total',
                  label: {
                      show: true
                  },
                  emphasis: {
                      focus: 'series'
                  },
                  data: [220, 182, 191, 234, 290, 330, 310]
              },
              {
                  name: 'Gas flarinl',
                  type: 'bar',
                  stack: 'total',
                  label: {
                      show: true
                  },
                  emphasis: {
                      focus: 'series'
                  },
                  data: [150, 212, 201, 154, 190, 330, 410]
              },
              {
                  name: 'Liquid fuel',
                  type: 'bar',
                  stack: 'total',
                  label: {
                      show: true
                  },
                  emphasis: {
                      focus: 'series'
                  },
                  data: [820, 832, 901, 934, 1290, 1330, 1320]
              }
          ]
      };
      
        return (
          <>
            <Card >
                <Line {...config} height={250} />
            </Card>

            <div className="card1" style={{display:'inline-block'}}>
            <Card title=''>
               <ReactECharts option={optionOne} style={{height:225,width:'600px'}} />
            </Card>
            </div>

            <div className="card2" style={{display:'inline-block',borderRightStyle:'none'}}>
            <Card title='' style={{borderRightStyle:'none'}}>
               <ReactECharts option={optionTwo} style={{height:225,width:'550px'}} />
            </Card>
            </div>
          </>
        )
    }
}
