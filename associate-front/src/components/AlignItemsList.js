import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

function buildListItem(id, headerText, bodyText, avatarLink) {
  var link = '/experiments/run/'+id

  return (
    <>
    <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={avatarLink} />
        </ListItemAvatar>
        <ListItemText
          primary={headerText}
          secondary={
            <React.Fragment>
              {bodyText}
            </React.Fragment>
          }
        />
        <Button href={link} style={{backgroundColor:"black", }} variant="contained">Участвовать</Button>
      </ListItem>
      <Divider variant="inset" component="li" />
      </>
  );
}

export default function AlignItemsList({experiments}) {

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {experiments.map((el, i) => buildListItem(el.id, el.name,el.description,el.link))}
    </List>
  );
}