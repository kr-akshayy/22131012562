
import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Grid } from "@mui/material";

const UrlShortener = () => {
  const [urls, setUrls] = useState([{ longUrl: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addUrlField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: "", validity: "", shortcode: "" }]);
    }
  };

  const handleSubmit = async () => {
    const response = await Promise.all(
      urls.map(async (url) => {
        // Simulate backend API call
        const uniqueCode = url.shortcode || Math.random().toString(36).substr(2, 6);
        return {
          original: url.longUrl,
          short: `http://localhost:3000/${uniqueCode}`,
          expiry: url.validity || 30,
        };
      })
    );
    setResults(response);
  };

  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12}>
        <Typography variant="h4">React URL Shortener</Typography>
      </Grid>
      {urls.map((url, index) => (
        <Grid item xs={12} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6">URL {index + 1}</Typography>
              <TextField
                fullWidth
                label="Original Long URL"
                value={url.longUrl}
                onChange={(e) => handleChange(index, "longUrl", e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Validity (minutes)"
                value={url.validity}
                onChange={(e) => handleChange(index, "validity", e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Preferred Shortcode (optional)"
                value={url.shortcode}
                onChange={(e) => handleChange(index, "shortcode", e.target.value)}
                margin="normal"
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button variant="contained" onClick={addUrlField} disabled={urls.length >= 5}>
          Add Another URL
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Shorten URLs
        </Button>
      </Grid>
      <Grid item xs={12}>
        {results.map((res, idx) => (
          <Card key={idx} sx={{ mt: 2 }}>
            <CardContent>
              <Typography><strong>Original URL:</strong> {res.original}</Typography>
              <Typography><strong>Shortened URL:</strong> {res.short}</Typography>
              <Typography><strong>Valid for:</strong> {res.expiry} minutes</Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
};

export default UrlShortener;
