import { gql } from 'graphql.macro';

export const CourseInfo = gql`
  fragment CourseInfo on Course {
    __typename
    id
    name
    owner {
      name
    }
    lectures {
      id
      title
    }
  }
`;

export const CourseMeta = gql`
  fragment CourseMeta on Course {
    __typename
    id
    name
    owner {
      name
      avatar
    }
  }
`;

export const GetCourse = gql`
  query GetCourse($id: ID!) {
    course(id: $id) {
      ...CourseInfo
    }
  }
  ${CourseInfo}
`;

export const GetCourses = gql`
  query GetCourses {
    courses {
      ...CourseMeta
    }
  }
  ${CourseMeta}
`;
