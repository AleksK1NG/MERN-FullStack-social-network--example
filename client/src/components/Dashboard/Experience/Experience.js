import React from 'react';
import ExperienceItem from '../ExperienceItem/ExperienceItem';

const Experience = ({ experience, deleteExperience }) => {
  return (
    <React.Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {experience.map((exp) => (
            <ExperienceItem key={exp._id} exp={exp} deleteExperience={deleteExperience} />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Experience;
