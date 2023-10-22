import { FIREBASE_STORAGE } from "config/firebase";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

export const uriToBlob = uri => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      resolve(xhr.response)
    }
    xhr.onerror = function () {
      reject(new Error('uriToBlob failed'))
    }
    xhr.responseType = 'blob'
    xhr.open('GET', uri, true)

    xhr.send(null)
  })
}

export const uploadFileToStorage = async (filePath, uploadPath) => {
  const storageRef = ref(FIREBASE_STORAGE, uploadPath)
  const blob = await uriToBlob(filePath)

  console.log('Start uploading to ' + uploadPath)
  const uri = uploadBytesResumable(storageRef, blob).then(async snap => {
    console.log(`Uploaded to "${uploadPath}"`)
    return await getDownloadURL(storageRef)
  })

  return uri
}
