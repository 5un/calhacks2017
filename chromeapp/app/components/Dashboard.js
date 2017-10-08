import React, { Component, PropTypes } from 'react';
import styled from 'styled-components'
import _ from 'lodash'
import { Row, Col } from './Elements'
import { AreaChart, defs, linearGradient, stop, XAxis, YAxis, CartesianGrid, Tooltip, Area,
          BarChart, Legend, Bar } from 'recharts';
import DashboardNav from './DashboardNav'

const DashboardContainer = styled.section`
  margin-top: -20px;
`;

const VisualizationContainer = styled.div`
  padding: 20px;
`;

export default class Dashboard extends Component {

  static propTypes = {};

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    // const {} = this.state;
    const data = [
      {name: 'Read', attention: 4000, focus: 2400, amt: 2400},
      {name: 'Read nyt.com', attention: 3000, focus: 1398, amt: 2210},
      {name: 'Facebook', attention: 2000, focus: 9800, amt: 2290},
      {name: 'Doing math', attention: 2780, focus: 3908, amt: 2000},
      {name: 'Facebook', attention: 1890, focus: 4800, amt: 2181},
      {name: 'Read Kafka', attention: 2390, focus: 3800, amt: 2500},
      {name: 'Read 61B', attention: 3490, focus: 4300, amt: 2100},
    ];

    const dataPreviousSession = [
      {name: '1', attention: 4000 },
      {name: '2', attention: 3000 },
      {name: '3', attention: 2000 },
      {name: '4', attention: 2780 },
      {name: '5', attention: 1890 },
      {name: '6', attention: 2390 },
      {name: '7', attention: 3490 },
      {name: '8', attention: 4000 },
      {name: '9', attention: 3000 },
      {name: '10', attention: 2000 },
      {name: '11', attention: 2780 },
      {name: '12', attention: 1890 },
      {name: '13', attention: 2390 },
      {name: '14', attention: 3490 },
      {name: '15', attention: 4000 },
      {name: '16', attention: 3000 },
      {name: '17', attention: 2000 },
      {name: '18', attention: 2780 },
      {name: '19', attention: 1890 },
      {name: '20', attention: 2390 },
      {name: '21', attention: 3490 },

    ];

    return (
      <DashboardContainer>
        <DashboardNav />
        <VisualizationContainer>
          <h2>Attention</h2>
          <Row>
            <Col>
              <AreaChart width={800} height={300} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                {/* <YAxis /> */}
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <Tooltip />
                <Area type="monotone" dataKey="attention" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                <Area type="monotone" dataKey="focus" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
              </AreaChart>
            </Col>
            <Col>
              Test2
            </Col>
          </Row>
          <Row>
            <h2>Previous Sessions</h2>
            <BarChart width={730} height={200} data={dataPreviousSession}>
              <XAxis dataKey="name" />
              <Tooltip />
              <Legend />
              <Bar dataKey="attention" fill="#8884d8" />
            </BarChart>
          </Row>
        </VisualizationContainer>
      </DashboardContainer>
    );
  }
}
