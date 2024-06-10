import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Grid, Button } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import Password from './password';
import Swal from 'sweetalert2';

const Profile: React.FC = () => {
  const { auth, editAuthByID } = useAuth();
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

  const handleSaveChanges = async () => {
    try {
      if (editableAuth) {
        await editAuthByID(editableAuth);
        Swal.fire({
          title: '¡Datos actualizados!',
          text: 'Los datos del administrador han sido actualizados exitosamente.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating auth:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al actualizar los datos.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
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
      <Password/>
    </div>
  );
};

export default Profile;
