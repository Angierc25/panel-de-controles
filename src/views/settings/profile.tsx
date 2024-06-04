import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Grid, Button } from '@mui/material';
import useAuth from '../../hooks/useAuth';

const Profile: React.FC = () => {
  const { auth } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [editableAuth, setEditableAuth] = useState(auth);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableAuth(prevAuth => ({
      ...prevAuth!,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Lógica para guardar los cambios realizados
    console.log('Changes saved:', editableAuth);
    setIsEditing(false);
  };

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handlePasswordChange = () => {
    // Lógica para manejar el cambio de contraseña
    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
    console.log('Confirm New Password:', confirmNewPassword);
    // Aquí puedes llamar a una función para cambiar la contraseña
  };

  return (
    <div>
      <div className="mb-8 rounded-lg bg-white p-6 shadow" style={{ maxWidth: 'calc(100% - 250px)', marginLeft: '250px' }}>
        <h2 className="mb-4 text-xl font-bold">Perfil</h2>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">Información personal</Typography>
              </Grid>
              {editableAuth && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      label="Nombre"
                      name="nombre"
                      fullWidth
                      value={editableAuth.nombre}
                      onChange={handleAuthChange}
                      InputProps={{
                        readOnly: !isEditing,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Correo electrónico"
                      name="email"
                      fullWidth
                      value={editableAuth.email}
                      onChange={handleAuthChange}
                      InputProps={{
                        readOnly: !isEditing,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Número de teléfono"
                      name="telefono"
                      fullWidth
                      value={editableAuth.telefono}
                      onChange={handleAuthChange}
                      InputProps={{
                        readOnly: !isEditing,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="País"
                      name="pais"
                      fullWidth
                      value={editableAuth.pais}
                      onChange={handleAuthChange}
                      InputProps={{
                        readOnly: !isEditing,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {isEditing ? (
                      <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                        Guardar
                      </Button>
                    ) : (
                      <Button variant="contained" color="secondary" onClick={handleEditToggle}>
                        Editar
                      </Button>
                    )}
                  </Grid>
                </>
              )}
            </Grid>
          </CardContent>
        </Card>
      </div>
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

export default Profile;
