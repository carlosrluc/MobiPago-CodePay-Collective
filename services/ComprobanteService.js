import { captureRef } from "react-native-view-shot"
import * as MediaLibrary from "expo-media-library"
import * as Sharing from "expo-sharing"
import * as FileSystem from "expo-file-system"

class ComprobanteService {
  // Capturar vista como imagen
  static async captureView(viewRef, options = {}) {
    try {
      const defaultOptions = {
        format: "png",
        quality: 1.0,
        result: "tmpfile",
        height: undefined,
        width: undefined,
        ...options,
      }

      const uri = await captureRef(viewRef.current, defaultOptions)
      return uri
    } catch (error) {
      console.error("Error capturing view:", error)
      throw new Error("No se pudo generar la imagen del comprobante")
    }
  }

  // Guardar imagen en la galería
  static async saveToGallery(imageUri, albumName = "MobiPago") {
    try {
      // Solicitar permisos
      const { status } = await MediaLibrary.requestPermissionsAsync()

      if (status !== "granted") {
        throw new Error("Se requieren permisos para acceder a la galería")
      }

      // Crear asset
      const asset = await MediaLibrary.createAssetAsync(imageUri)

      // Crear o encontrar álbum
      let album = await MediaLibrary.getAlbumAsync(albumName)
      if (album == null) {
        album = await MediaLibrary.createAlbumAsync(albumName, asset, false)
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false)
      }

      return asset
    } catch (error) {
      console.error("Error saving to gallery:", error)
      throw new Error("No se pudo guardar el comprobante en la galería")
    }
  }

  // Compartir imagen
  static async shareImage(imageUri, options = {}) {
    try {
      // Verificar disponibilidad
      const isAvailable = await Sharing.isAvailableAsync()

      if (!isAvailable) {
        throw new Error("La función de compartir no está disponible")
      }

      const defaultOptions = {
        mimeType: "image/png",
        dialogTitle: "Compartir Comprobante",
        UTI: "public.png",
        ...options,
      }

      await Sharing.shareAsync(imageUri, defaultOptions)
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

  // Guardar en directorio de documentos (alternativa)
  static async saveToDocuments(imageUri, fileName) {
    try {
      const documentsDir = FileSystem.documentDirectory
      const newPath = `${documentsDir}${fileName}`

      await FileSystem.copyAsync({
        from: imageUri,
        to: newPath,
      })

      return newPath
    } catch (error) {
      console.error("Error saving to documents:", error)
      throw new Error("No se pudo guardar el archivo")
    }
  }

  // Método principal para descargar comprobante
  static async downloadReceipt(viewRef, transaccionData, options = {}) {
    try {
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
      return {
        success: false,
        error: error.message,
      }
    }
  }

  // Método principal para compartir comprobante
  static async shareReceipt(viewRef, transaccionData, options = {}) {
    try {
      // Capturar vista
      const imageUri = await this.captureView(viewRef, options.captureOptions)

      // Compartir imagen
      await this.shareImage(imageUri, options.shareOptions)

      return {
        success: true,
        message: "Comprobante compartido exitosamente",
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }
}

export default ComprobanteService
