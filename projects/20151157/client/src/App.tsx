import Drawer, { DrawerAppContent, DrawerContent, DrawerHeader, DrawerTitle } from '@material/react-drawer';
import MaterialIcon from '@material/react-material-icon';
import TopAppBar, { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { CourseListContainer as CourseList } from './containers/CourseListContainer';
import { CoursePage } from './pages/CoursePage';
import { LecturePage } from './pages/LecturePage';

import '@material/react-drawer/dist/drawer.css';
import '@material/react-list/dist/list.css';
import '@material/react-material-icon/dist/material-icon.css';
import '@material/react-top-app-bar/dist/top-app-bar.css';
import '@material/react-typography/dist/typography.css';
import './App.css';

class App extends Component {
  state = { open: false };

  render() {
    return (
      <Router>
        <div>
          <Drawer
            dismissible
            open={this.state.open}
          >
            <DrawerHeader>
              <DrawerTitle tag='h2'>
                jane.smith@gmail.com
              </DrawerTitle>
            </DrawerHeader>

            <DrawerContent>
              <CourseList></CourseList>
              <Route path="/courses/:id" component={CoursePage} />
            </DrawerContent>
          </Drawer>
          <DrawerAppContent>
            <TopAppBar
              title="Lecture Platform"
              navigationIcon={
                <button onClick={() => this.setState({ open: !this.state.open })}>
                  <MaterialIcon icon='menu' />
                </button>
              }
            />
            <TopAppBarFixedAdjust>
              <Route exact path="/courses/:id" component={CoursePage} />
              <Route exact path="/courses/:courseId/lectures/:lectureId" component={LecturePage} />
            </TopAppBarFixedAdjust>
          </DrawerAppContent>
        </div>
      </Router>
    );
  }
}

export default App;
