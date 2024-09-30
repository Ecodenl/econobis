import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Field, Form, Formik } from 'formik';
import FormLabel from 'react-bootstrap/FormLabel';
import * as Yup from 'yup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { ClipLoader } from 'react-spinners';
import InputTextDate from '../../../../components/form/InputTextDate';

function RedirectionCoach({ redirectBack, initialQuotationRequest, handleSubmit }) {
    const validationSchema = Yup.object().shape({});

    return (
        <>
            <p>Voor coach verwachten we geen doorverwijzing kansactie</p>
        </>
    );
}

export default RedirectionCoach;
