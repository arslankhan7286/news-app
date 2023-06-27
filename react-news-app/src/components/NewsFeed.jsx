import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState, useContext } from 'react';
import './components.css';
import Navbar from './Navbar';
import { NewsContext } from '../App';
import SearchIcon from '@mui/icons-material/Search';

const NewsFeed = () => {
  const [filterByAuthor, setFilterByAuthor] = useState('');
  const [filterByDate, setFilterByDate] = useState('');
  const [filterBySource, setFilterBySource] = useState('');
  const { news } = useContext(NewsContext);
  const filteredOutput = news?.filter((item) => {
    if (filterByAuthor) {
      return item.author?.toLowerCase().includes(filterByAuthor.toLowerCase());
    }
    if (filterBySource) {
      return item.source.name
        ?.toLowerCase()
        .includes(filterBySource.toLowerCase());
    }
    if (filterByDate) {
      return item.publishedAt
        ?.toLowerCase()
        .includes(filterByDate.toLowerCase());
    }
    return item;
  });

  return (
    <>
      <Navbar />
      <Container fixed>
        <Typography
          variant="h2"
          component="h3"
          align="center"
        >
          News Feed
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <SearchIcon />
          <TextField
            sx={{ marginRight: '20px' }}
            id="input-with-sx"
            label="Search by Author"
            variant="standard"
            onChange={(e) => setFilterByAuthor(e.target.value)}
          />
          <SearchIcon />
          <TextField
            sx={{ marginRight: '20px' }}
            id="input-with-sx"
            label="Search by Source"
            variant="standard"
            onChange={(e) => setFilterBySource(e.target.value)}
          />
          <SearchIcon />
          <TextField
            sx={{ marginRight: '20px' }}
            id="input-with-sx"
            label="Search by Date"
            variant="standard"
            onChange={(e) => setFilterByDate(e.target.value)}
          />
        </Box>
        <div className="feed-content">
          {filteredOutput?.map((newsItem) => (
            <Card sx={{ maxWidth: 345 }} className="card" key={newsItem.title}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={newsItem.urlToImage}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    <b>Title: </b>
                    {newsItem.title}
                  </Typography>
                  <Typography variant="body2">{newsItem.description}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    <b>Author: </b>
                    {newsItem.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <b>Source: </b>
                    {newsItem.source.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <b>Published At: </b>
                    {newsItem.publishedAt}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </Container>
     </>
    );
};

export default NewsFeed;
       
