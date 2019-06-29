import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from 'antd';
import Menus from "./Menus";

import ContentPage from "./ContentPage";

const { Header} = Layout;

const ContentPages = ({match}) => {
    return (
        <div>
			<Layout className="layout">
		        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: 'none', Height: '0px'}} >
		            <Menus/>
		        </Header>

				<Router>
		           <Route exact path="/content/" render={()=>(<h3>Please select any post</h3>)}/>
			       <Route path="/content/:id" component={ContentPage}/>
		        </Router>

	        </Layout>
        </div>
        );
};
  

export default ContentPages;
