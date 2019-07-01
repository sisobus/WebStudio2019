/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCourse
// ====================================================

export interface GetCourse_course_owner {
  __typename: "User";
  name: string;
}

export interface GetCourse_course_lectures {
  __typename: "Lecture";
  id: string;
  title: string;
}

export interface GetCourse_course {
  __typename: "Course";
  id: string;
  name: string;
  owner: GetCourse_course_owner;
  lectures: GetCourse_course_lectures[];
}

export interface GetCourse {
  course: GetCourse_course | null;
}

export interface GetCourseVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCourses
// ====================================================

export interface GetCourses_courses_owner {
  __typename: "User";
  name: string;
  avatar: string;
}

export interface GetCourses_courses {
  __typename: "Course";
  id: string;
  name: string;
  owner: GetCourses_courses_owner;
}

export interface GetCourses {
  courses: GetCourses_courses[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLecture
// ====================================================

export interface GetLecture_lecture {
  __typename: "Lecture";
  id: string;
  title: string;
  content: string;
}

export interface GetLecture {
  lecture: GetLecture_lecture | null;
}

export interface GetLectureVariables {
  courseId: string;
  lectureId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CourseInfo
// ====================================================

export interface CourseInfo_owner {
  __typename: "User";
  name: string;
}

export interface CourseInfo_lectures {
  __typename: "Lecture";
  id: string;
  title: string;
}

export interface CourseInfo {
  __typename: "Course";
  id: string;
  name: string;
  owner: CourseInfo_owner;
  lectures: CourseInfo_lectures[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CourseMeta
// ====================================================

export interface CourseMeta_owner {
  __typename: "User";
  name: string;
  avatar: string;
}

export interface CourseMeta {
  __typename: "Course";
  id: string;
  name: string;
  owner: CourseMeta_owner;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: LectureInfo
// ====================================================

export interface LectureInfo {
  __typename: "Lecture";
  id: string;
  title: string;
  content: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
