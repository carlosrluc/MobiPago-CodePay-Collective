import { captureRef } from "react-native-view-shot"
import * as MediaLibrary from "expo-media-library"
import * as Sharing from "expo-sharing"
import * as FileSystem from "expo-file-system"

class ComprobanteService {
  // Capturar vista como imagen con mejor configuración
  static async captureView(viewRef, options = {}) {
    try {
      if (!viewRef || !viewRef.current) {
        throw new Error("Referencia de vista no válida")
      }

      const defaultOptions = {
        format: "png",
        quality: 1.0,
        result: "tmpfile",
        height: undefined,
        width: undefined,
        snapshotContentContainer: false,
        ...options,
      }

      console.log("Capturando vista con opciones:", defaultOptions)

      // Esperar un poco para asegurar que la vista esté completamente renderizada
      await new Promise((resolve) => setTimeout(resolve, 500))

      const uri = await captureRef(viewRef.current, defaultOptions)
      console.log("Vista capturada exitosamente:", uri)

      if (!uri) {
        throw new Error("No se pudo generar la imagen")
      }

      return uri
    } catch (error) {
      console.error("Error capturing view:", error)
      throw new Error("No se pudo generar la imagen del comprobante")
    }
  }

  // Guardar imagen en la galería con mejor manejo de permisos
  static async saveToGallery(imageUri, albumName = "MobiPago") {
    try {
      console.log("Solicitando permisos de galería...")

      // Solicitar permisos
      const { status } = await MediaLibrary.requestPermissionsAsync()

      if (status !== "granted") {
        throw new Error("Se requieren permisos para acceder a la galería")
      }

      console.log("Permisos concedidos, guardando imagen...")

      // Verificar que el archivo existe
      const fileInfo = await FileSystem.getInfoAsync(imageUri)
      if (!fileInfo.exists) {
        throw new Error("El archivo de imagen no existe")
      }

      // Crear asset
      const asset = await MediaLibrary.createAssetAsync(imageUri)
      console.log("Asset creado:", asset.id)

      // Crear o encontrar álbum
      let album = await MediaLibrary.getAlbumAsync(albumName)
      if (album == null) {
        console.log("Creando nuevo álbum:", albumName)
        album = await MediaLibrary.createAlbumAsync(albumName, asset, false)
      } else {
        console.log("Agregando a álbum existente:", albumName)
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false)
      }

      console.log("Imagen guardada exitosamente en galería")
      return asset
    } catch (error) {
      console.error("Error saving to gallery:", error)
      throw new Error("No se pudo guardar el comprobante en la galería")
    }
  }

  // Compartir imagen con mejor manejo
  static async shareImage(imageUri, options = {}) {
    try {
      console.log("Iniciando proceso de compartir...")

      // Verificar disponibilidad
      const isAvailable = await Sharing.isAvailableAsync()

      if (!isAvailable) {
        throw new Error("La función de compartir no está disponible")
      }

      // Verificar que el archivo existe
      const fileInfo = await FileSystem.getInfoAsync(imageUri)
      if (!fileInfo.exists) {
        throw new Error("El archivo de imagen no existe")
      }

      const defaultOptions = {
        mimeType: "image/png",
        dialogTitle: "Compartir Comprobante",
        UTI: "public.png",
        ...options,
      }

      console.log("Abriendo diálogo de compartir...")
      await Sharing.shareAsync(imageUri, defaultOptions)
      console.log("Compartir completado")

      return true
    } catch (error) {
      console.error("Error sharing image:", error)
      throw new Error("No se pudo compartir el comprobante")
    }
  }

  // Generar nombre de archivo único
  static generateFileName(transaccionData) {
    const fecha = new Date().toISOString().split("T")[0]
    const hora = new Date().toTimeString().split(" ")[0].replace(/:/g, "")
    const monto = transaccionData.monto.toFixed(2).replace(".", "")

    return `MobiPago_Comprobante_${fecha}_${hora}_${monto}.png`
  }

  // Método principal para descargar comprobante
  static async downloadReceipt(viewRef, transaccionData, options = {}) {
    try {
      console.log("Iniciando descarga de comprobante...")

      // Capturar vista
      const imageUri = await this.captureView(viewRef, options.captureOptions)

      // Guardar en galería
      const asset = await this.saveToGallery(imageUri, options.albumName)

      return {
        success: true,
        asset,
        message: "Comprobante guardado en tu galería",
      }
    } catch (error) {
      console.error("Error en downloadReceipt:", error)
      return {
        success: false,
        error: error.message,
      }
    }
  }

  // Método principal para compartir comprobante
  static async shareReceipt(viewRef, transaccionData, options = {}) {
    try {
      console.log("Iniciando compartir comprobante...")

      // Capturar vista
      const imageUri = await this.captureView(viewRef, options.captureOptions)

      // Compartir imagen
      await this.shareImage(imageUri, options.shareOptions)

      return {
        success: true,
        message: "Comprobante compartido exitosamente",
      }
    } catch (error) {
      console.error("Error en shareReceipt:", error)
      return {
        success: false,
        error: error.message,
      }
    }
  }
}

export default ComprobanteService
