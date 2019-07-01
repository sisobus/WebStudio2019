import { gql } from 'graphql.macro';

export const LectureInfo = gql`
  fragment LectureInfo on Lecture {
    __typename
    id
    title
    content
  }
`;

export const GetLecture = gql`
  query GetLecture($courseId: ID!, $lectureId: ID!) {
    lecture(courseId: $courseId, lectureId: $lectureId) {
      ...LectureInfo
    }
  }
  ${LectureInfo}
`;
