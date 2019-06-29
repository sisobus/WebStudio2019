import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router-dom";

import { LectureById } from "../containers/LectureById";
import { CoursePagePrefix } from "./CoursePage";

export const LecturePagePrefix = "/lectures"

export const getLecturePagePath = ({ courseId, lectureId }: LecturePageParams) =>
  CoursePagePrefix + "/" + courseId + LecturePagePrefix + "/" + lectureId

export type LecturePageParams = {
  courseId: string
  lectureId: string
}

export const LecturePage: FunctionComponent<RouteComponentProps<LecturePageParams>> = ({ match }) => (
  <LectureById courseId={match.params.courseId} lectureId={match.params.lectureId}></LectureById>
)
