import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router-dom";

import { CourseById } from "../containers/CourseById";

export const CoursePagePrefix = "/courses"
export const getCoursePagePath = ({ id }: CoursePageParams) =>
  CoursePagePrefix + "/" + id

export type CoursePageParams = {
  id: string
}

export const CoursePage: FunctionComponent<RouteComponentProps<CoursePageParams>> = ({ match }) => (
  <CourseById courseId={match.params.id}></CourseById>
)
