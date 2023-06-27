// import {
//   Card,
//   CardActionArea,
//   CardContent,
//   CardMedia,
//   Checkbox,
//   Container,
//   FormControlLabel,
//   FormGroup,
//   Typography,
// } from "@mui/material";
// import React, { useState } from "react";
// import { NewsContext } from "../App";
// import "./components.css";
// import Navbar from "./Navbar";

// const PersonalizedNewsFeed = () => {
//   const [source, setSource] = useState([]);
//   let news = React.useContext(NewsContext).news;
//   let sources = [...new Set(news?.map((item) => item?.source?.name))];
  
//   const sourcesWithIds = sources.map((item, index) => ({
//     id: `${item}-${index}`,
//     name: item,
//   }));

//   const handleChange = (e) => {
//     setSource([...source, e]);
//   };

//   return (
//     <>
//       <Navbar />
//       <Container fixed>
//         <Typography variant="h2" component="h3" align="center">
//           Personalized News Feed
//         </Typography>
//         <FormGroup className="personalizedNewsFeed">
//           <FormControlLabel
//             key="all"
//             className="checkbox"
//             control={<Checkbox />}
//             label={'All'}
//           />

//           {sourcesWithIds.map(item => (
//             <FormControlLabel
//               key={item.id}
//               className="checkbox"
//               control={
//                 <Checkbox
//                   onChange={e => handleChange(e.target.value)}
//                   value={item.name}
//                 />
//               }
//               label={item.name}
//             />
//           ))}
//         </FormGroup>
//         <div className="feed-content">
//           {news.map(newsItem => (
//             <Card key={newsItem.title} sx={{ maxWidth: 345 }} className="card">
//               <CardActionArea>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={newsItem.urlToImage}
//                   alt="green iguana"
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h6" component="div">
//                     <b>Title: </b>
//                     {newsItem.title}
//                   </Typography>
//                   <Typography variant="body2">{newsItem.description}</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     <b>Author: </b>
//                     {newsItem.author}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     <b>Source: </b>
//                     {newsItem.source.name}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     <b>Published At: </b>
//                     {newsItem.publishedAt}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           ))}
//         </div>
//       </Container>
//     </>
//   );
// };

// export default PersonalizedNewsFeed;


import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { NewsContext } from "../App";
import "./components.css";
import Navbar from "./Navbar";

const PersonalizedNewsFeed = () => {
  const [selectedSources, setSelectedSources] = useState([]);
  const allNews = React.useContext(NewsContext).news;
  const sources = [...new Set(allNews?.map((item) => item?.source?.name))];

  const sourcesWithIds = sources.map((item, index) => ({
    id: `${item}-${index}`,
    name: item,
  }));

  const handleChange = (e) => {
    const sourceName = e.target.value;
    if (selectedSources.includes(sourceName)) {
      setSelectedSources(selectedSources.filter((item) => item !== sourceName));
    } else {
      setSelectedSources([...selectedSources, sourceName]);
    }
  };

  const filteredNews = allNews.filter(
    (item) =>
      selectedSources.length === 0 || selectedSources.includes(item.source.name)
  );

  const handleSelectAll = () => {
    if (selectedSources.length === 0) {
      setSelectedSources(sources);
    } else {
      setSelectedSources([]);
    }
  };

  return (
    <>
      <Navbar />
      <Container fixed>
        <Typography variant="h2" component="h3" align="center">
          Personalized News Feed
        </Typography>
        <FormGroup className="personalizedNewsFeed">
          <FormControlLabel
            key="all"
            className="checkbox"
            control={
              <Checkbox
                checked={selectedSources.length === sources.length}
                onChange={handleSelectAll}
              />
            }
            label={"All"}
          />

          {sourcesWithIds.map((item) => (
            <FormControlLabel
              key={item.id}
              className="checkbox"
              control={
                <Checkbox
                  checked={selectedSources.includes(item.name)}
                  onChange={handleChange}
                  value={item.name}
                />
              }
              label={item.name}
            />
          ))}
        </FormGroup>
        <div className="feed-content">
          {filteredNews.map((newsItem) => (
            <Card key={newsItem.title} sx={{ maxWidth: 345 }} className="card">
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
                  <Typography variant="body2">
                    {newsItem.description}
                  </Typography>
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

export default PersonalizedNewsFeed;
