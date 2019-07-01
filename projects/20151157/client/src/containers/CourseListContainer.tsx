import React, { FunctionComponent } from 'react';
import { Query } from 'react-apollo';

import { CourseList } from '../components/CourseList';
import { GetCourses as QUERY } from '../queries/course';
import { GetCourses as QueryData } from '../types/api';

export const CourseListContainer: FunctionComponent = () => {
  return (
    <Query<QueryData> query={QUERY}>
      {({ loading, data, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <h1>ERROR</h1>;
        if (!data) return <div>no data</div>;

        const { courses } = data;
        return (
          <CourseList courses={courses}></CourseList>
        );
      }}
    </Query>
  );
};

export default CourseListContainer;
