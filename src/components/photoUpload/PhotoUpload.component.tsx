import { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Form,
  Modal,
  Upload,
  message,
  Input,
  FormInstance,
} from 'antd';
import type {
  RcFile,
  UploadProps,
  UploadChangeParam,
  UploadFile,
} from 'antd/lib/upload';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Cropper from 'antd-img-crop';
import Loader from '../loader/Loader.component';

type Props = {
  default?: string;
  label?: string;
  name?: string;
  listType?: 'picture-card' | 'text' | 'picture-circle';
  action?: string;
  placeholder?: string;
  tooltip?: string;
  isAvatar?: boolean;
  imgStyle?: React.CSSProperties;
  form: FormInstance;
};

const PhotoUpload = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(props.default);
  const inputRef = useRef<any>();

  const beforeUpload = async (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file');
      return false;
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('Images must smaller than 10MB');
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (props.default) {
      setImageUrl(props.default);
    }
  }, [props.default]);

  const handleChange: UploadProps['onChange'] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
    }
    if (info.file.status === 'done') {
      setLoading(false);

      // Get this url from response to display image preview
      setImageUrl(info.file.response.imageUrl);
      props.form.setFieldValue(
        props.name || 'image',
        info.file.response.imageUrl
      );

      message.success('Image Uploaded');
    }
    if (info.file.status === 'error') {
      setLoading(false);
      message.error('Image Upload Failed');
    }
  };

  return (
    <>
      <Form.Item
        label={props.label ? props.label : 'Image'}
        name={props.name ? props.name : 'image'}
        tooltip={props.tooltip ? props.tooltip : undefined}
      >
        <Cropper
          cropShape={props.isAvatar ? 'round' : 'rect'}
          aspect={props.isAvatar ? 1 : 16 / 9}
          beforeCrop={beforeUpload}
        >
          <Upload
            id="image"
            listType={props.listType ? props.listType : 'picture-card'}
            showUploadList={false}
            type={'drag'}
            onChange={handleChange}
            action={
              props.action
                ? props.action
                : 'https://api.truthcasting.com/api/v1/upload'
            }
            headers={{
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            }}
          >
            {loading ? (
              <Loader />
            ) : imageUrl ? (
              props.isAvatar ? (
                <div
                  style={{
                    ...props.imgStyle,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Avatar size={200} src={imageUrl} />
                </div>
              ) : (
                <img
                  src={imageUrl}
                  style={props.imgStyle || { width: '100%' }}
                />
              )
            ) : (
              <div style={props.imgStyle}>
                {props.placeholder ? props.placeholder : 'Upload an Image'}
              </div>
            )}
          </Upload>
        </Cropper>
      </Form.Item>
    </>
  );
};

export default PhotoUpload;
