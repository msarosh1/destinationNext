import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";
import "../notes/Notes.css";

const useStyles = makeStyles(() => ({
  note: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(5px)",
    boxShadow: "inset -6px -4px 2px rgba(255, 255, 255, 0.03)",
    borderRadius: "15px",
    border: " 2px solid #00489E",
    color: " #fff",
    padding: "15px 40px",
    minHeight: "180px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    wordWrap: "break-word",
    margin: "0 50px",
  },

  noteContent: {
    whiteSpace: "pre-wrap",
    background: "transparent",
    border: "none",
    color: "black",
    resize: "none",
    fontSize: "16px",
  },

  cardContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: 10,
    cursor: "pointer",
    margin: "0px 10px",
  },

  vertical: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 0,
    marginTop: 0,
  },
  valueText: {
    fontSize: 14,
    marginBottom: 0,
    marginTop: 0,
  },
  "@media (max-width: 500px)": {
    //   loginContainer: {
    //     width: "80%",
    //   },
  },
}));

function Note() {
  const classes = useStyles();
  const [notes, setNotes] = useState();

  useEffect(() => {
    setNotes([
      {
        description: "Description 1",
        title: "",
        address: "Address 1",
      },
      { description: "Description 2", title: "jcndkjv", address: "Address 2" },
      {
        description: "Description 2",
        title: "jcndkjv",
        address: "Address 3",
      },
    ]);
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}></div>
      {notes?.map((note, index) => (
        <div
          className={classes.note}
          style={{ background: "rgba(255, 255, 255, 0)" }}
        >
          <p className={classes.noteContent}>
            <p style={{ margin: 0, fontSize: 18, fontWeight: "bold" }}>
              {note?.address}
            </p>
            <p>{note.description}</p>
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              color: "black",
            }}
          >
            <EditIcon />
            <DeleteIcon />
          </div>
        </div>
      ))}
    </>
  );
}

export default Note;
