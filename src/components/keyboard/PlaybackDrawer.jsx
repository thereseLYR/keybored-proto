import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import React, { Fragment, useState } from "react";

export default function PlaybackDrawer({ setSongTitle, setInput }) {
  const [state, setState] = useState({
    right: false,
  });
  const [songs, setSongs] = useState([]);

  const onPlaylistSongClick = (song) => {
    console.log(song);
    console.log("item clicked");
    setSongTitle(song.title);
    setInput(song.songData);
  };

  const getSongsPlaylist = () => {
    axios
      .get("/api/songs")
      .then((res) => {
        console.log(res.data.result);
        setSongs(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  const toggleDrawer = (anchor, open) => (event) => {
    // 1. fetch for songs in db
    getSongsPlaylist();
    // 2. set drawer state
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 350 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {songs.map((song, index) => (
          <ListItem
            key={song.id}
            disablePadding
            onClick={() => onPlaylistSongClick(song)}
          >
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <PlayCircleIcon />
                ) : (
                  <PlayCircleOutlineIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={song.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>Playlist</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </div>
  );
}
