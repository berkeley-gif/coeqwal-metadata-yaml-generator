'use client';

import { Button, Paper, Snackbar, Tooltip } from "@mui/material";
import { useState } from "react";

export default function CodeCopyPaper({code}: {code: string}) {

  const [open, setOpen] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setOpen(true);
      setTimeout(() => setOpen(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return <Paper variant="outlined" sx={{ px: 2, position: 'relative' }}>
  <pre>{code}</pre>
  <Tooltip title="Copy to clipboard" sx={{ }}>
    <Button onClick={handleCopy} sx={{minWidth: '30px', position: 'absolute', top: 0, right: 0}}>
      copy
    </Button>
  </Tooltip>
  <Snackbar
    message="Copied to clipboard"
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
    autoHideDuration={2000}
    onClose={() => setOpen(false)}
    open={open}
  />
</Paper>
};