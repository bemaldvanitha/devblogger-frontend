import React from 'react';
import { useDispatch } from "react-redux";
import { Button } from "antd";

import { deleteEducation } from "../../../actions/developerAction";

import './EducationTable.css';

const EducationTable = ({ education }) => {
    const dispatch = useDispatch();

    const visibleDate = (date) => {
        return date.split('T')[0];
    }

    const deleteClickHandler = async (id) => {
        dispatch(deleteEducation(id));
    }

    return(
        <table className={'education-table'}>
            <thead>
                <tr className={'education-table-header-row'}>
                    <th className={'education-table-header'}>School</th>
                    <th className={'education-table-header'}>Degree</th>
                    <th className={'education-table-header'}>Years</th>
                    <th className={'education-table-header'}>Action</th>
                </tr>
            </thead>
            <tbody>
                {education.map((edu, index) => {
                    return(
                        <tr key={index}>
                            <td className={'education-table-detail'}>
                                <p className={'education-table-data'}>{edu.school}</p>
                            </td>
                            <td className={'education-table-detail'}>
                                <p className={'education-table-data'}>{edu.degree}</p>
                            </td>
                            <td className={'education-table-detail'}>
                                <p className={'education-table-data'}>{visibleDate(edu.from)} - {edu.current ? 'Now' :
                                    visibleDate(edu.to)}</p>
                            </td>
                            <td className={'education-table-detail'}>
                                <Button type="primary" danger onClick={() => deleteClickHandler(edu._id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
)
}

export default EducationTable;