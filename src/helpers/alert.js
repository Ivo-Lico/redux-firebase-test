import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import styles from '../css/alert.module.css'

const AlertExample = ({error}) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert id={styles.alert} color="info" isOpen={visible} toggle={onDismiss}>
      {error}
    </Alert>
  );
}

export default AlertExample;