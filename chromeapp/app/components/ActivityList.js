import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Row, Col } from './Elements';
import Avatar from 'react-avatar';

const ActivityItem = styled.div`
  padding: 10px;
`;

export default class ActivityList extends Component {

  static propTypes = {};

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    const { activities } = this.props;
    return (
      <div>
        {_.map(activities, (activity) => (
          <ActivityItem>
            <Row>
              <Col>
                {activity.name}
              </Col>
              <Col>
                {activity.hours}
              </Col>
            </Row>
          </ActivityItem>
        ))}
      </div>
    );
  }
}
