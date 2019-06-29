import React, { FunctionComponent } from 'react';
import { Query } from 'react-apollo';

import { Lecture } from '../components/Lecture';
import { GetLecture as QUERY } from '../queries/lecture';
import { GetLecture as QueryData, GetLectureVariables as QueryVariables } from '../types/api';

export interface LectureByIdProps {
  courseId: string;
  lectureId: string;
}

export const LectureById: FunctionComponent<LectureByIdProps> = props => {
  const { courseId, lectureId } = props;

  return (
    <Query<QueryData, QueryVariables> query={QUERY} variables={{ courseId, lectureId }}>
      {({ loading, data, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <h1>ERROR</h1>;
        if (!data) return <div>no data</div>;

        const { lecture } = data;
        return lecture && (
          <Lecture lecture={lecture}></Lecture>
        );
      }}
    </Query>
  );
};

export default LectureById;
