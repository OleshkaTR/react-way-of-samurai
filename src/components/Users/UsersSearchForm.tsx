import React, {FC, memo} from 'react';
import {Field, Form, Formik} from 'formik';
import {FilterType} from '../../redux/usersReducer';
import { Button } from 'antd';

type PropsType = {
    onFilterChanged: (term: FilterType) => void
    filter: FilterType
};

const UsersSearchForm: FC<PropsType> = memo(({onFilterChanged, filter}) => {
    return <Formik
        enableReinitialize
        initialValues={{term: filter.term, friends: filter.friends}}
        onSubmit={(values, {setSubmitting}) => {
            onFilterChanged(values);
            setSubmitting(false);
        }}
    >
        {({isSubmitting}) => (
            <Form>
                <Field type="text" name="term"/>

                <Field name="friends" as="select">
                    <option value="null">All</option>
                    <option value="true">Only friends</option>
                    <option value="false">Only not friends</option>
                </Field>

                <Button htmlType="submit" disabled={isSubmitting}>
                    Find
                </Button>
            </Form>
        )}
    </Formik>;
});

export default UsersSearchForm;
