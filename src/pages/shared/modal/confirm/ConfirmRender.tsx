import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

interface Props {
  title?: React.ReactNode;
  content?: React.ReactNode;
  buttonRender?: React.ReactNode;

  handleConfirm?: () => void;
  handleCancel?: () => void;

  okText?: string;
  cancelText?: string;
}

const { confirm } = Modal;

const ConfirmRender = ({
  title,
  content,
  buttonRender,
  handleConfirm,
  handleCancel,
  okText,
  cancelText,
}: Props) => {
  const t = useTranslations();
  const handleShowConfirm = () => {
    confirm({
      title: title,
      icon: <ExclamationCircleFilled className="confirm-delete-icon" />,
      content: content,
      onOk: handleConfirm,
      onCancel: handleCancel,
      okText: okText || t('confirm.delete'),
      cancelText: cancelText || t('confirm.cancel'),
    });
  };

  return (
    <>
      <div style={{ cursor: 'pointer' }} onClick={handleShowConfirm}>
        {buttonRender}
      </div>
    </>
  );
};

export default ConfirmRender;
