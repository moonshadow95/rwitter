/* eslint-disable no-unused-vars */
import { dbService } from "fbase";
import react, { useState } from "react";

const Rweet = ({ rweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newRweet, setNewRweet] = useState(rweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure?");
    if (ok) {
      await dbService.doc(`rweets/${rweetObj.id}`).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewRweet(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`rweets/${rweetObj.id}`).update({ text: newRweet });
    setEditing(false);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit Rweet"
              value={newRweet}
              onChange={onChange}
              required
            />
            <input type="submit" value="Update Rweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{rweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Rweet</button>
              <button onClick={toggleEditing}>Edit Rweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Rweet;
