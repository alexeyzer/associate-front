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
import logo from '../images/itemListIcon.png';

function buildListItem(id, headerText, bodyText, avatarLink) {
  var link = '/experiments/run/'+id
  var linkResults = '/experiment/'+id
  console.log(avatarLink)
  if (!avatarLink) {
    avatarLink = logo
  }
  return (
    <>
    <ListItem sx={{ width: '100%'}} alignItems="flex-start">
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
        <Button href={linkResults} style={{backgroundColor:"black", }} variant="contained">Результаты</Button>
        <Button href={link} style={{marginLeft:"10px", backgroundColor:"black", }} variant="contained">Участвовать</Button>
      </ListItem>
      <Divider variant="inset" component="li" />
      </>
  );
}

export default function AlignItemsList({experiments}) {

  return (
    <List sx={{ width: '100%' , bgcolor: 'background.paper' }}>
      {experiments.map((el, i) => buildListItem(el.id, el.name,el.description,el.link))}
    </List>
  );
}