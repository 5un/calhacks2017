import React, { Component, PropTypes } from 'react';
import styled from 'styled-components'
import _ from 'lodash'
import { Row, Col } from './Elements'
import Avatar from 'react-avatar'

const DashboardNavContainer = styled.section`
  background-color: rgba(255,255,255,0.1);
  height: 70px;
  color: white;
  padding: 0 50px;
`;

const UserIdentity = styled.div`
  float: right;
  padding: 10px;
`;

const UserAvatar = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const UserName = styled.div`
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
`;

const Branding = styled.h1`
  color: white !important;
  font-size: 18px;
  letter-spacing: 10px;
  line-height: 70px;
`;

export default class Dashboard extends Component {

  static propTypes = {};

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {

    return (
      <DashboardNavContainer>
        <UserIdentity> 
          <UserAvatar>
            <Avatar size={50} round={true} src="https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg" />
          </UserAvatar>
          <UserName>
            Devin
          </UserName>
        </UserIdentity>
        <Branding>FOCUS</Branding>
      </DashboardNavContainer>
    );
  }
}
