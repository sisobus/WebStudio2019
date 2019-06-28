import React from 'react';
import './App.css';
import PageMain from './component/PageMain';
import { BrowserRouter as Router, Route } from "react-router-dom"
import PageInterview from './component/Interview/PageInterview'
import PageVisual from './component/Visual/PageVisual'
import PageLike from './component/Like/PageLike'
import PageReview from './component/Review/PageReview'
import PageWrite from './component/Write/PageWrite'
import BenchWeReo from './component/Interview/BenchWeReo'
import BLSG from './component/Interview/BLSG'

function App(){
	return(
		<div classname = "App">
			<Router>
				<Route path = '/' exact component={PageMain}/>
				<Route path = '/interview' exact component={PageInterview}/>
				<Route path = '/interview/benchwereo' component={BenchWeReo}/>
				<Route path = '/interview/blsg' component={BLSG}/>

				<Route path = '/visual' component={PageVisual}/>

				<Route path = '/review' component={PageReview}/>

				{/* <Route path = '/like' component={PageLike}/> */}
				<Route path = '/writeInterview' component={PageWrite}/>

			</Router>
		</div>
	);
};

export default App;
