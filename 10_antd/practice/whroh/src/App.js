import React from 'react'
import { Row, Col, Typography } from 'antd'
import '../node_modules/antd/dist/antd.min.css'
import { StyledContainer } from './styles'
import Traits from './Traits'
import BirthTime from './BirthTime'

const { Text, Title } = Typography

function App() {
  return (
    <StyledContainer>
      <Row as="header">
        <Col>
          <Title level="1">우현고사</Title>
          <Text>정말 쉽습니다</Text>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Traits />
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <BirthTime />
        </Col>
      </Row>
    </StyledContainer>
  )
}

export default App
