import React from 'react';
import EducationItem from '../EducationItem/EducationItem';

const Education = ({ education, deleteEducation }) => {
  return (
    <React.Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {education &&
            education.map((edu) => <EducationItem edu={edu} deleteEducation={deleteEducation} key={edu._id} />)}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Education;
