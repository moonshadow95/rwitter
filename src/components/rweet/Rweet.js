import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { formatHashtags } from "hashtagFormatter";

const Rweet = ({ rweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newRweet, setNewRweet] = useState(rweetObj.text);
  const [newHashtag, setNewHashtag] = useState(rweetObj.hashtag);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure?");
    if (ok) {
      await dbService.doc(`rweets/${rweetObj.id}`).delete();
      await storageService.refFromURL(rweetObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onRweetChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewRweet(value);
  };
  const onHashtagChange = (event) => {
    const {
      target: { value },
    } = event;
    const newValue = formatHashtags(value);
    setNewHashtag(newValue);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`rweets/${rweetObj.id}`).update({ text: newRweet });
    await dbService
      .doc(`rweets/${rweetObj.id}`)
      .update({ hashtag: newHashtag });
    setEditing(false);
  };

  return (
    <div className="rweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container rweetEdit">
            <input
              type="text"
              placeholder="Edit Rweet"
              value={newRweet}
              onChange={onRweetChange}
              required
            />
            <input
              type="text"
              value={newHashtag}
              onChange={onHashtagChange}
              placeholder="Hashtag splits by ,"
              maxLength={100}
            />
            {rweetObj.attachmentUrl && (
              <img src={rweetObj.attachmentUrl} alt="" />
            )}
            <input type="submit" value="Update Rweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn calcelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{rweetObj.text}</h4>
          <ul>
            {rweetObj.hashtag &&
              rweetObj.hashtag.map((tag) => (
                <li key={rweetObj.hashtag.indexOf(tag)}>{tag}</li>
              ))}
          </ul>
          {rweetObj.attachmentUrl && (
            <img src={rweetObj.attachmentUrl} alt="" />
          )}
          {isOwner && (
            <div className="rweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faEdit} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Rweet;
