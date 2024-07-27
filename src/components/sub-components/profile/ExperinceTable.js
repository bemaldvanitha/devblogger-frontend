import React from 'react';
import { useDispatch } from "react-redux";
import { Button } from "antd";

import { deleteExperince } from "../../../actions/developerAction";

import './ExperinceTable.css';

const ExperinceTable = ({ experience }) => {
    const dispatch = useDispatch();

    const visibleDate = (date) => {
        return date.split('T')[0];
    }

    const deleteClickHandler = async (id) => {
        dispatch(deleteExperince(id));
    }

    return(
        <table className={'experince-table'}>
            <thead>
                <tr className={'experince-table-header-row'}>
                    <th className={'experince-table-header'}>Company</th>
                    <th className={'experince-table-header'}>Title</th>
                    <th className={'experince-table-header'}>Years</th>
                    <th className={'experince-table-header'}>Action</th>
                </tr>
            </thead>
            <tbody>
                {experience.map((exp, index) => {
                    return(
                        <tr key={index}>
                            <td className={'experince-table-detail'}>
                                <p className={'experince-table-data'}>{exp.company}</p>
                            </td>
                            <td className={'experince-table-detail'}>
                                <p className={'experince-table-data'}>{exp.title}</p>
                            </td>
                            <td className={'experince-table-detail'}>
                                <p className={'experince-table-data'}>{visibleDate(exp.from)} - {exp.current ? 'Now' :
                                    visibleDate(exp.to)}</p>
                            </td>
                            <td className={'experince-table-detail'}>
                                <Button type="primary" danger onClick={() => deleteClickHandler(exp._id)}>
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

export default ExperinceTable;