import Error from '@/components/error/Error.component';
import Loader from '@/components/loader/Loader.component';
import SaveButton from '@/components/saveButton/SaveButton.component';
import Container from '@/layout/container/Container.layout';
import { useUpdateUser, useUser, useUserDetails } from '@/state/auth';
import { useWarnIfUnsavedChanges } from '@/utils/useWarnIfUnsavedChanges';
import { Button, Form } from 'antd';
import React, { useEffect, useState } from 'react';

import SettingsForm from './components/settingsForm/SettingsForm.component';
import styles from './Settings.module.scss';

type Props = {};

const SettingsView = (props: Props) => {
  const { data: loggedInData, error, isLoading } = useUser();
  const {
    data: userDetails,
    isError: userError,
    error: userErrorDetails,
    isLoading: userLoadingDetails,
  } = useUserDetails(loggedInData?.user._id);
  const { mutate: updateUser, isLoading: userUpdateIsLoading } =
    useUpdateUser();
  const [form] = Form.useForm();
  const [unsaved, setUnsaved] = useState(false);
  useWarnIfUnsavedChanges(unsaved, () => {
    return confirm('Warning! You have unsaved changes.');
  });

  const onFinish = (values: any) => {
    updateUser(values);
    setUnsaved(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
      email: userDetails?.email,
      phoneNumber: userDetails?.phoneNumber,
      sex: userDetails?.sex,
      saveAllVideos: userDetails?.saveAllVideos,
      unsubscribeFromEmails: userDetails?.unsubscribeFromEmails,
      hiddenChannel: userDetails?.hiddenChannel,
    });
  }, [userDetails]);

  if (userError) return <Error error={error} />;

  return (
    <div className={styles.container}>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFieldsChange={() => {
          setUnsaved(true);
        }}
      >
        <Container title="Settings">
          {isLoading ? <Loader /> : <SettingsForm />}
        </Container>
        <SaveButton isLoading={userUpdateIsLoading} />
      </Form>
    </div>
  );
};

export default SettingsView;
