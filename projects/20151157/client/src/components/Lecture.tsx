import React, { FunctionComponent } from 'react';

import { GetLecture_lecture } from '../types/api';
import LectureViewer from './LectureViewer';

export interface LectureProps {
  lecture: GetLecture_lecture;
}

export const Lecture: FunctionComponent<LectureProps> = props => {
  const { lecture } = props;

  return lecture && (
    <LectureViewer title={lecture.title} file={lecture.content}></LectureViewer>
  );
};

export default Lecture;
