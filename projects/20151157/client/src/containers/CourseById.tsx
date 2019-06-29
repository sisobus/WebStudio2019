import React, { FunctionComponent } from 'react';
import { Query } from 'react-apollo';

import { Course } from '../components/Course';
import { GetCourse as QUERY } from '../queries/course';
import { GetCourse as QueryData, GetCourseVariables as QueryVariables } from '../types/api';

export interface CourseByIdProps {
  courseId: string;
}

export const CourseById: FunctionComponent<CourseByIdProps> = props => {
  const { courseId } = props;

  return (
    <Query<QueryData, QueryVariables> query={QUERY} variables={{ id: courseId }}>
      {({ loading, data, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <h1>ERROR</h1>;
        if (!data) return <div>no data</div>;

        const { course } = data;
        return course && (
          <Course course={course}></Course>
        );
      }}
    </Query>
  );
};

export default CourseById;
