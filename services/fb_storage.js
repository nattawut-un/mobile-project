import { FIREBASE_STORAGE } from "config/firebase";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'

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

export const deleteFileFromStorage = async uri => {
  const fileRef = ref(FIREBASE_STORAGE, extractStoragePathFromUri(uri))
  deleteObject(fileRef).then(() => console.log('File deleted.'))
}

//* Utils
const extractStoragePathFromUri = path => {
  var p1 = path.replace('%2F', '/')
  var p2 = p1.substr(0, p1.indexOf('?'))
  var p3 = p2.split('/')
  var p4 = JSON.parse(JSON.stringify(p3)).splice(7, 2)
  var p5 = p4.join('/')

  // console.log(p1)
  // console.log(p2)
  // console.log(p3)
  // console.log(p4)
  console.log(p5)

  return p5
}
