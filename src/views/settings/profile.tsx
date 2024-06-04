import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Typography, TextField, Button, Grid } from '@mui/material';
import useAuth from '../../hooks/useAuth'; // Assuming you have useAuth hook

const Profile: React.FC = () => {
  // ... other component code

  return (
    <div className="mb-8 rounded-lg bg-white p-6 shadow" style={{ maxWidth: 'calc(100% - 250px)', marginLeft: '250px' }}>
      <h2 className="mb-4 text-xl font-bold">Perfil</h2>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Información personal</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                fullWidth 
                // ... other TextField props
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo electrónico"
                fullWidth 
                // ... other TextField props
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Numero de telefono"
                fullWidth 
                // ... other TextField props
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Pais"
                fullWidth // Add fullWidth prop
                // ... other TextField props
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Button variant="contained" color="primary" className="mt-4">
        Editar perfil
      </Button>
    </div>
  );
};

export default Profile;
