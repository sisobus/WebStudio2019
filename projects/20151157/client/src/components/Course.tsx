import List, { ListItem, ListItemText } from '@material/react-list';
import { Headline5 } from '@material/react-typography';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { getLecturePagePath } from '../pages/LecturePage';
import { GetCourse_course } from '../types/api';

export interface CourseProps {
  course: GetCourse_course;
}

export const Course: FunctionComponent<CourseProps> = props => {
  const { course } = props;

  return course && (
    <div>
      <Headline5>{course.name}</Headline5>
      <List>
        {course.lectures && course.lectures.map(
          ({ id, title }) => (
            <Link key={id} to={getLecturePagePath({ courseId: course.id, lectureId: id })}>
              <ListItem>
                <ListItemText primaryText={title} />
              </ListItem>
            </Link>
          ),
        )}
      </List>
    </div>
  );
};

export default Course;
