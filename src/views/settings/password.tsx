import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Grid, Button } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const Password: React.FC = () => {
  const { changePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      Swal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }

    try {
      console.log('Changing password with:', { currentPassword, newPassword, confirmNewPassword });
    await changePassword(currentPassword, newPassword, confirmNewPassword);
    Swal.fire({
      title: '¡Cambio de contraseña exitoso!',
      text: 'Tu contraseña ha sido cambiada.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al cambiar la contraseña.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  return (
    <div>
      <div className="mb-8 rounded-lg bg-white p-6 shadow" style={{ maxWidth: 'calc(100% - 250px)', marginLeft: '250px' }}>
        <h2 className="mb-4 text-xl font-bold">Cambiar Contraseña</h2>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">Ingrese su contraseña</Typography>
              </Grid>
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Contraseña Actual"
                    fullWidth
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Nueva Contraseña"
                    fullWidth
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Confirmar nueva contraseña"
                    fullWidth
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" onClick={handlePasswordChange}>
                    Cambiar Contraseña
                  </Button>
                </Grid>
              </>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Password;
