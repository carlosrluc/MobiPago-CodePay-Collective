import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, StatusBar } from "react-native"
import { perfiles, agregarPerfil } from "../data/dummy-data"
import Perfil from "../models/perfil" // Asegúrate de importar el modelo


export default function CrearCuenta({ navigation }) {
  const [correo, setCorreo] = useState("")
  const [nombre, setNombre] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [telefono, setTelefono] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [repetirContrasena, setRepetirContrasena] = useState("")

  const handleCrearCuenta = () => {
    if (!correo || !nombre || !apellidos || !telefono || !contrasena || !repetirContrasena) {
      Alert.alert("Error", "Completa todos los campos")
      return
    }
    if (contrasena !== repetirContrasena) {
      Alert.alert("Error", "Las contraseñas no coinciden")
      return
    }
    if (perfiles.some(p => p.usuario === correo)) {
      Alert.alert("Error", "Ya existe una cuenta con este correo")
      return
    }
    // Crear nuevo perfil usando el modelo Perfil
    const nuevoPerfil = new Perfil(
      perfiles.length + 1,
      nombre,
      apellidos,
      correo,
      contrasena,
      [],
      telefono,
      null
    )
    agregarPerfil(nuevoPerfil)
    Alert.alert("Cuenta creada", "Tu cuenta ha sido creada exitosamente", [
      { text: "OK", onPress: () => navigation.navigate("Login") }
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#257beb" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={{ color: "#fff", fontSize: 24 }}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Crear cuenta</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Correo</Text>
        <TextInput style={styles.input} value={correo} onChangeText={setCorreo} autoCapitalize="none" />
        <Text style={styles.label}>Nombre</Text>
        <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />
        <Text style={styles.label}>Apellido</Text>
        <TextInput style={styles.input} value={apellidos} onChangeText={setApellidos} />
        <Text style={styles.label}>Telefono</Text>
        <TextInput style={styles.input} value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />
        <Text style={styles.label}>Contrasena</Text>
        <TextInput style={styles.input} value={contrasena} onChangeText={setContrasena} secureTextEntry />
        <Text style={styles.label}>Repetir Contrasena</Text>
        <TextInput style={styles.input} value={repetirContrasena} onChangeText={setRepetirContrasena} secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={handleCrearCuenta}>
          <Text style={styles.buttonText}>Crear Cuenta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { backgroundColor: "#257beb", padding: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, flexDirection: "row", alignItems: "center" },
  backButton: { marginRight: 10 },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  form: { margin: 20, backgroundColor: "#e0f7fa", borderRadius: 15, padding: 20 },
  label: { fontWeight: "bold", marginTop: 10 },
  input: { backgroundColor: "#fff", borderRadius: 8, padding: 10, marginTop: 5, borderWidth: 1, borderColor: "#ccc" },
  button: { backgroundColor: "#257beb", borderRadius: 10, marginTop: 20, padding: 15, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
})