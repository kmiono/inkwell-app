import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            textAlign: "center",
          },
        }}
      >
        <img src="src/logo.svg" alt="" />
      </Dialog>
    </div>
  );
}

// todo ダイアログ実装に変更
// reference https://qiita.com/hasehiro0828/items/6b57a6296f5387818964 ※importの方法が現行と異なるので注意
