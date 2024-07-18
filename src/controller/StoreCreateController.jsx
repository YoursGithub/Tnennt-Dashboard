import { collection, limit, query, where } from 'firebase/firestore';
import {getDocuments, getDocumentsByQuery , setDocument , updateDocument} from '../Database/db.js';
import { db } from '../../firebase.js';


export const getCreatedStores = async () => {

    const result = await getDocuments("Store")

    return result;
}


export const checkEmail = async ( email ) =>{

    const q= query(collection(db,"Users"),where('email','==',email) , limit(1));

    const result = await getDocumentsByQuery(q)
    
    return result[0] || null;
}



export const createStore = async ( user , storeDetails) =>{

    console.log(storeDetails , user);

    storeDetails.isStoreOpen= true;
    storeDetails.StoreFollowers=[];
     storeDetails.storePhotoURL=user?.photoURL || ''
     storeDetails.userId=user?.id ;

    console.log(storeDetails);

      
  await Promise.all([
          setDocument(`Store/${storeDetails.storeName}`, storeDetails),
          updateDocument(`Users/${user.id}`,{storeName: storeDetails.storeName })
      ]).then((res) => {
            alert("Store Created!!");                
      }).catch((error) => {
        console.log(error);
      });

}
