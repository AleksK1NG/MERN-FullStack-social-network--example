import React from 'react';
import Moment from 'react-moment';

const EducationItem = ({ edu, deleteEducation }) => {
  return (
    <tr>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
        {!edu.to ? ' Now' : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
      </td>
      <td>
        <button onClick={() => deleteEducation(edu._id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default React.memo(EducationItem);
