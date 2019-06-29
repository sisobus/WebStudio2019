import React from 'react'
import { Layout } from 'antd'
import Nav from './Nav'
import SideMenu from './SideMenu'
import Foot from './Foot.jsx'
import { Table } from 'antd';

const columns = [
  {
    title: 'Title',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Rating',
    dataIndex: 'age',
    key: 'age',
    width: '12%',
  },
  {
    title: 'genre',
    dataIndex: 'address',
    width: '30%',
    key: 'address',
  },
];

const data = [
  {
    key: 1,
    name: 'Annabelle',
    age: '60%',
    address: 'Horror',
  },
  {
    key: 2,
    name: 'Conjuring',
    age: '76%',
    address: 'Horror',
  },
];

// rowSelection objects indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const { Content } = Layout;


class MarkedPage extends React.Component {
  render() {
    return (
    <Layout>
      <SideMenu/>
      <Layout style={{ marginLeft: 200 }}>
        <Nav />
        <Content>
          <h2>Hello! Time to cross off the list!<br/><br/></h2>
          <h4>This is your movie Wish List</h4>
          <p><Table columns={columns} rowSelection={rowSelection} dataSource={data} 
          style={{
            float:'left',
            width:'100%'
          }}/></p>
        </Content>
        <Foot/>
        </Layout>
    </Layout>
    );
  }
}

export default MarkedPage;