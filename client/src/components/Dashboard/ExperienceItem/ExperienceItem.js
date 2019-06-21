import React from 'react';
import Moment from 'react-moment';

const ExperienceItem = ({ exp, deleteExperience }) => {
  return (
    <tr>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {' '}
        {!exp.to ? ' Now' : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
      </td>
      <td>
        <button onClick={() => deleteExperience(exp._id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default React.memo(ExperienceItem);
