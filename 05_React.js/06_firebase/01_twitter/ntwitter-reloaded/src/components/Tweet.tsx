// import styled from "styled-components";
// import { ITweet } from "./Timeline";
// import { auth, db, storage } from "../routes/Firebase";
// import { deleteDoc, doc } from "firebase/firestore";
// import { deleteObject, ref } from "firebase/storage";
// import { useState } from "react";

// const Wrapper = styled.div`
//   display: grid;
//   grid-template-columns: 3fr 1fr;
//   padding: 20px;
//   border: 1px solid rgba(255, 255, 255, 0.5);
//   border-radius: 15px;
// `;

// const Column = styled.div``;

// const Photo = styled.img`
//   width: 100px;
//   height: 100px;
//   border-radius: 15px;
// `;

// const Username = styled.span`
//   font-weight: 600;
//   font-size: 15px;
// `;

// const Payload = styled.p`
//   margin: 10px 0px;
//   font-size: 18px;
// `;

// const EditButton = styled.button`
//   background-color: tomato;
//   color: white;
//   font-weight: 600;
//   border: 0;
//   font-size: 12px;
//   padding: 5px 10px;
//   text-transform: uppercase;
//   border-radius: 5px;
//   cursor: pointer;
//   margin-right: 8px;
// `;

// function Tweet({ username, photo, tweet, userId, id }: ITweet) {
//   const [isEditing, setIsEditing] = useState(false);
//   const user = auth.currentUser;
//   const onDelete = async () => {
//     const ok = confirm("Are you sure you want to delte this tweet?");

//     if (!ok || user?.uid !== userId) return;
//     try {
//       await deleteDoc(doc(db, "tweets", id));
//       if (photo) {
//         const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
//         await deleteObject(photoRef);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   const onEdit = () => setIsEditing((prev) => !prev);
//   return (
//     <Wrapper>
//       <Column>
//         <Username>{username}</Username>
//         <Payload>{tweet}</Payload>
//         {user?.uid === userId ? (
//           <>
//             <EditButton onClick={onDelete}>Delete</EditButton>
//             <EditButton onClick={onEdit}>
//               {isEditing ? "cancel" : "edit"}
//             </EditButton>
//           </>
//         ) : null}
//       </Column>
//       <Column>{photo ? <Photo src={photo} /> : null}</Column>
//     </Wrapper>
//   );
// }

// export default Tweet;

import styled from "styled-components";
import { ITweet } from "./Timeline";
import { auth, db, storage } from "../routes/Firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useState } from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;
const Column = styled.div``;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;
const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const EditingArea = styled.textarea`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid white;
  border-radius: 10px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  &::placeholder {
    font-size: 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
  }
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
  margin-left: 5px;
  margin-bottom: 10px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  margin-right: 5px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const EditButton = styled.button`
  background-color: #2d06f1;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  margin-right: 5px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  background-color: #2d06f1;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  margin-right: 5px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background-color: lightgray;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  margin-right: 5px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const AttachEditedFileButton = styled.label`
  /* width: 100%; */
  /* align-content: end; */
  background-color: #a915e3;
  color: white;
  font-weight: 600;
  font-size: 12px;
  padding: 5px 10px;
  /* text-align: center; */
  border-radius: 5px;
  cursor: pointer;
`;
const AttachEditedFileInput = styled.input`
  display: none;
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const [editing, isEditing] = useState(false);
  const [newtweet, setNewTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  //   const [isEdited, setIsEdited] = useState(false);
  //   let isEdited = false;
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
      //
    }
  };

  const onEdit = () => {
    isEditing(true);
    console.log(tweet);
    console.log(`Edit state?: ${editing}`);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTweet(e.target.value);
  };

  const onEditedFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(`file: ${file}`);
    const { files } = e?.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };

  const onSubmit = async () => {
    // isEdited = true;
    // setIsEdited(true);
    isEditing(false);
    const user = auth.currentUser;
    if (!user) return;
    try {
      await updateDoc(doc(db, "tweets", id), {
        tweet: newtweet ? newtweet : tweet,
        // photo: file ? file : ,
      });

      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc(db, "tweets", id), {
          photo: url,
        });
        // await deleteDoc(doc(db, "tweets", id));

        console.log(`photo: `, photo);
        setFile(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCancel = () => {
    isEditing(false);
    photo ? console.log(`photo: ${photo}`) : null;
  };

  return (
    <Wrapper>
      <Column>
        <Username>
          {username}
          {/* {isEdited ? "수정됨🖋" : ""} */}
        </Username>
        {editing ? (
          <EditingArea
            required
            rows={2}
            maxLength={180}
            onChange={onChange}
            value={newtweet}
            placeholder={tweet}
          ></EditingArea>
        ) : (
          <Payload>{tweet}</Payload>
        )}
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
      <Column>
        {editing ? null : user?.uid === userId ? (
          <EditButton onClick={onEdit}>Edit</EditButton>
        ) : null}
        {editing ? null : user?.uid === userId ? (
          <DeleteButton onClick={onDelete}>Delete</DeleteButton>
        ) : null}
        {editing ? (
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
        ) : null}
        {editing ? (
          <ConfirmButton onClick={onSubmit}>Confirm</ConfirmButton>
        ) : null}
      </Column>
      <Column>
        {editing ? (
          <>
            <AttachEditedFileButton htmlFor="editfile">
              {file ? "Photo Added ✅" : "Change photo"}
            </AttachEditedFileButton>
            <AttachEditedFileInput
              onChange={onEditedFileChange}
              type="file"
              id="editfile"
              accept="image/*"
            />
          </>
        ) : null}
      </Column>
    </Wrapper>
  );
}

// import { styled } from "styled-components";
// import { ITweet } from "./Timeline";
// import { auth, db, storage } from "../routes/Firebase";
// import { deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";
// import {
//   deleteObject,
//   ref,
//   getDownloadURL,
//   uploadBytes,
// } from "firebase/storage";
// import { useState } from "react";

// const Wrapper = styled.div`
//   display: grid;
//   grid-template-columns: 3fr 100px;
//   margin-top: 20px;
//   padding: 20px;
//   border: 1px solid rgba(255, 255, 255, 0.5);
//   border-radius: 15px;
//   &:first-of-type {
//     margin-top: 30px;
//   }
// `;

// const Column = styled.div``;

// const ColumnFile = styled.div`
//   position: relative;
//   &:hover {
//     & > div {
//       display: block;
//     }
//   }
// `;

// const Photo = styled.img`
//   width: 100px;
//   height: 100px;
//   border-radius: 10px;
// `;

// const Username = styled.span`
//   font-weight: 600;
//   font-size: 15px;
// `;

// const Payload = styled.p`
//   margin: 10px 0px;
//   font-size: 18px;
// `;

// const DeleteButton = styled.button`
//   margin-top: 10px;
//   background-color: tomato;
//   color: white;
//   font-weight: 400;
//   border: 0;
//   font-size: 10px;
//   padding: 5px 10px;
//   text-transform: uppercase;
//   border-radius: 4px;
//   cursor: pointer;
// `;

// const EditButton = styled.button`
//   margin-top: 10px;
//   margin-left: 10px;
//   background-color: transparent;
//   color: #fff;
//   font-weight: 400;
//   border: 0;
//   font-size: 10px;
//   padding: 5px 10px;
//   text-transform: uppercase;
//   border: 1px solid rgba(255, 255, 255, 0.5);
//   border-radius: 4px;
//   cursor: pointer;
//   &.done {
//     background-color: #fff;
//     color: #000;
//   }
// `;

// const TextArea = styled.textarea`
//   margin-top: 10px;
//   padding: 10px;
//   border: 0;
//   border-radius: 0;
//   font-size: 16px;
//   color: white;
//   background-color: rgba(255, 255, 255, 0.15);
//   width: 100%;
//   resize: none;
//   font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
//     Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
//   &::placeholder {
//     font-size: 16px;
//   }
//   &:focus {
//     outline: none;
//     border-color: #1d9bf0;
//   }
// `;

// const EditFileArea = styled.div`
//   display: none;
// `;

// const EditFile = styled.div`
//   position: absolute;
//   top: -14px;
//   right: 25px;
//   input {
//     display: none;
//   }
//   label {
//     display: inline-block;
//     width: 25px;
//     height: 25px;
//     font-size: 0;
//     background: rgba(0, 0, 0, 0.8)
//     background-size: 18px 18px;
//     cursor: pointer;
//   }
// `;

// const DeleteFile = styled.div`
//   position: absolute;
//   top: 0px;
//   right: 0;
//   width: 25px;
//   height: 25px;
//   font-size: 0;
//   background: rgba(255, 51, 28, 0.8)
//   background-size: cover;
//   cursor: pointer;
//   span {
//     display: none;
//   }
// `;

// export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
//   const [edit, setEdit] = useState(false);
//   const [editedTweet, setEditedTweet] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [disable, setDisable] = useState(false);
//   const user = auth.currentUser;
//   const photoRef = ref(storage, `tweets/${user?.uid}/${id}`);

//   const MAX_SIZE = 1 * 1024 * 1024;
//   const onDelete = async () => {
//     const ok = confirm("Are you sure you want to delete this tweet?");
//     if (!ok || user?.uid !== userId) return;
//     try {
//       await deleteDoc(doc(db, "tweets", id));
//       if (photo) {
//         await deleteObject(photoRef);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setEditedTweet(e.target.value);
//   };
//   const onEdit = async () => {
//     if (user?.uid !== userId) return;
//     try {
//       await updateDoc(doc(db, "tweets", id), {
//         tweet: editedTweet,
//       });
//     } catch (e) {
//       console.log(e);
//     }
//     setEdit(false);
//   };
//   const onEditFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { files } = e.target;
//     //max file size is 1MB
//     if (files && files.length === 1 && files[0].size < MAX_SIZE) {
//       setFile(files[0]);
//       try {
//         if (user && photo) {
//           const result = await uploadBytes(photoRef, files[0]);
//           const url = await getDownloadURL(result.ref);
//           await updateDoc(doc(db, "tweets", id), {
//             photo: url,
//           });
//         }
//       } catch (e) {
//         console.log(e);
//       }
//     }
//     if (files && files[0].size > maxFileSizeInKB) {
//       alert(`1mb 이하의 사진만 첨부 가능합니다.`);
//       setDisable(true);
//     } else {
//       alert("File uploaded successfully!");
//       setDisable(false);
//     }
//   };
//   const onDeleteFile = async () => {
//     if (user?.uid !== userId) return;
//     try {
//       if (photo) {
//         await deleteObject(photoRef);
//         await updateDoc(doc(db, "tweets", id), {
//           photo: deleteField(),
//         });
//         location.reload();
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   return (
//     <Wrapper>
//       <Column>
//         <Username>{username}</Username>
//         {edit ? (
//           <TextArea defaultValue={tweet} onChange={onChange} />
//         ) : (
//           <Payload>{tweet}</Payload>
//         )}
//         {user?.uid === userId ? (
//           <>
//             <DeleteButton onClick={onDelete}>Delete</DeleteButton>
//             {edit ? (
//               <EditButton onClick={onEdit} className="done" disabled={disable}>
//                 Done
//               </EditButton>
//             ) : (
//               <EditButton onClick={() => setEdit(true)}>Edit</EditButton>
//             )}
//           </>
//         ) : null}
//       </Column>
//       {photo ? (
//         <ColumnFile>
//           <Photo src={photo} />
//           <EditFileArea>
//             <EditFile>
//               <label htmlFor="tweetFile">edit</label>
//               <input
//                 type="file"
//                 id="tweetFile"
//                 accept="image/*"
//                 onChange={onEditFile}
//               />
//             </EditFile>
//             <DeleteFile onClick={onDeleteFile}>
//               <span>delete</span>
//             </DeleteFile>
//           </EditFileArea>
//         </ColumnFile>
//       ) : null}
//     </Wrapper>
//   );
// }
