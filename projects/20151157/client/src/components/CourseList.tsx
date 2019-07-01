import List, { ListItem, ListItemText } from '@material/react-list';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { getCoursePagePath } from '../pages/CoursePage';
import { GetCourses_courses } from '../types/api';

export interface CourseListProps {
  courses: GetCourses_courses[];
}

export const CourseList: FunctionComponent<CourseListProps> = props => {
  const { courses } = props;

  return (
      <List>
        {courses && courses.map(({ id, name }) => (
          <Link key={id} to={getCoursePagePath({ id })}>
            <ListItem>
              <ListItemText primaryText={name} />
            </ListItem>
          </Link>
        ))}
      </List>
  );
};

export default CourseList;
